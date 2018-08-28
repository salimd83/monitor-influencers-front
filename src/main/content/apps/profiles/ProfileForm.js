import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  hasLengthLessThan
} from 'revalidate';
import { Icon, Button } from '@material-ui/core';
import { TextInput, SelectInput } from '@fuse';

const validate = combineValidators({
  first_name: isRequired({ message: 'First name is required' }),
  last_name: isRequired({ message: 'Last name is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' }),
      hasLengthLessThan(513)({message: 'Description needs to be less than 512 characters'})
  )(),
  internal_note: hasLengthLessThan(1024)({ message: 'Note needs to be less than 1025 characters' })
});

class ProfileForm extends Component {
  onSubmit = values => {
    if (this.props.initialValues.id) {
      this.props.updateProfile(values);
    } else {
      const newProfile = {
        ...values
      };
      this.props.addProfile(newProfile);
    }
  };

  render() {
    const {
      industries,
      countries,
      categories,
      invalid,
      submitting,
      pristine,
      addingProfile
    } = this.props;

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} style={{ marginBottom: '100px' }}>
        <div className="flex mb-16">
          <div className="min-w-48 pt-20">
            <Icon color="action">account_circle</Icon>
          </div>
          <Field name="first_name" type="text" component={TextInput} label="First Name" autoFocus />
        </div>

        <div className="flex mb-16">
          <div className="min-w-48 pt-20">
            <Icon color="action">account_circle</Icon>
          </div>
          <Field name="last_name" type="text" component={TextInput} label="Last Name" />
        </div>

        <div className="flex mb-16">
          <div className="min-w-48 pt-20">
            <Icon color="action">note</Icon>
          </div>
          <Field
              label="Description"
              name="description"
              multiline
              rows="4"
              rowsMax="6"
              component={TextInput}
          />
        </div>

        <div className="flex mb-16">
          <div className="min-w-48 pt-20">
            <Icon color="action">email</Icon>
          </div>
          <Field label="Email" name="email" type="email" component={TextInput} />
        </div>

        <div className="flex mb-16">
          <div className="min-w-48 pt-20">
            <Icon color="action">home</Icon>
          </div>
          <Field label="Country" name="country" options={countries} component={SelectInput} />
        </div>

        <div className="flex mb-16">
          <div className="min-w-48 pt-20">
            <Icon color="action">location_on</Icon>
          </div>
          <Field label="Location" name="location" options={countries} component={SelectInput} />
        </div>
        <div className="flex mb-16">
          <div className="min-w-48 pt-20">
            <Icon color="action">domain</Icon>
          </div>
          <Field label="Industry" name="industry" options={industries} component={SelectInput} />
        </div>
        <div className="flex mb-16">
          <div className="min-w-48 pt-20">
            <Icon color="action">category</Icon>
          </div>
          <Field label="Category" name="category" options={categories} component={SelectInput} />
        </div>

        <div className="flex mb-16">
          <div className="min-w-48 pt-20">
            <Icon color="action">note</Icon>
          </div>
          <Field
            label="Note"
            name="internal_notes"
            multiline
            rows="2"
            rowsMax="5"
            component={TextInput}
          />
        </div>

        <div className="justify-between pl-16" style={actionButtonStyles}>
          <Button
            variant="raised"
            color="primary"
            type="submit"
            disabled={invalid || submitting || pristine || addingProfile}
          >
            Save
          </Button>
        </div>
      </form>
    );
  }
}

const actionButtonStyles = {
  position: 'absolute',
  bottom: '0px',
  backgroundColor: '#f5f5f5',
  width: 'calc(100% - 17px)',
  left: '0',
  padding: '20px',
  margin: '0'
};

export default reduxForm({ form: 'profileForm', enableReinitialize: true, validate })(ProfileForm);
