import {range} from 'underscore';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import MemberForm from './MemberForm';
import ResultDisplay from './ResultDisplay';
import * as actionCreators from '../action_creators';

export const AddressFormSet = React.createClass({
  mixins: [PureRenderMixin],

  /* props:
    members
  [
    initial_forms
    min_forms
    max_forms
    action
    method
    csrftoken
  ]

  */

  render: function() {
    return (<form action={this.props.action || '/'} method={this.props.method || 'post'}>
      <div className='form-group'>
      <input type="hidden" name="csrfmiddlewaretoken" value={this.props.csrftoken || window.csrftoken} />
      <input id="id_member_set-TOTAL_FORMS" name="member_set-TOTAL_FORMS" type="hidden" value={this.props.members.size} />
      <input id="id_member_set-INITIAL_FORMS" name="member_set-INITIAL_FORMS" type="hidden" value={this.props.initial_forms || 0} />
      <input id="id_member_set-MIN_NUM_FORMS" name="member_set-MIN_NUM_FORMS" type="hidden" value={this.props.min_forms || 0} />
      <input id="id_member_set-MAX_NUM_FORMS" name="member_set-MAX_NUM_FORMS" type="hidden" value={this.props.max_forms || 1000} />
        <div className='row'>
            <label style={{display: 'flex', justifyContent: 'center'}}
              className='control-label col-xs-6'> Name</label>
            <label style={{display: 'flex', justifyContent: 'center'}}
              className='control-label col-xs-6'>Address</label>
        </div>
        {range(this.props.members.size).map((index) => {
          console.log('assigning index'+index)
          return <MemberForm index={index} member={this.props.members.get(index)} key={'form-member-'+index}
            changeName={this.props.changeName} changeAddress={this.props.changeAddress}
             />
        })}
        <div className='row' style={{display: 'flex', justifyContent: 'center'}}>
          <button type="submit" className="btn btn-default"
            onClick={(evt) => {
              evt.preventDefault()
              this.props.submitForm()
            }} >Pick a Host</button>
        </div>
        <div className='row' style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '10px'
        }}>
          <ResultDisplay best={this.props.best} />
        </div>
      </div>
    </form>)
  }
});

function mapStateToProps(state) {
  return {
    members: state.get('members'),
    best: state.get('best')
  }
}

export const AddressFormSetContainer = connect(
  mapStateToProps,
  actionCreators
)(AddressFormSet);;
