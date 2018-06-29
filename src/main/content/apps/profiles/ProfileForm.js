import React, {Component} from 'react'
import {Icon}             from '@material-ui/core'
import {
    Select,
    Input
}                         from '@fuse'

class ProfileForm extends Component {
    render() {
        const {
                  industries, countries, categories, handleChange, errors, validate
              } = this.props

        return (<React.Fragment>
            <div className="flex mb-16">
                <div className="min-w-48 pt-20">
                    <Icon color="action">account_circle</Icon>
                </div>
                <Input
                    label="First Name"
                    autoFocus
                    id="first_name"
                    name="first_name"
                    value={this.props.first_name}
                    onChange={handleChange}
                    onBlur={() => {
                        validate({
                                     name    : 'first_name',
                                     max     : 32,
                                     required: true
                                 })
                    }}
                    errorText={errors.first_name}
                    error={errors.first_name ? true : false}
                />
            </div>

            <div className="flex mb-16">
                <div className="min-w-48 pt-20">
                    <Icon color="action">account_circle</Icon>
                </div>
                <Input
                    label="Last Name"
                    id="last_name"
                    name="last_name"
                    value={this.props.last_name}
                    onChange={handleChange}
                    onBlur={() => {
                        validate({
                                     name    : 'last_name',
                                     max     : 32,
                                     required: true
                                 })
                    }}
                    errorText={errors.last_name}
                    error={errors.last_name ? true : false}
                />
            </div>

            <div className="flex mb-16">
                <div className="min-w-48 pt-20">
                    <Icon color="action">note</Icon>
                </div>
                <Input
                    label="Description"
                    id="description"
                    name="description"
                    value={this.props.description}
                    onChange={handleChange}
                    multiline
                    rows="2"
                    rowsMax="4"
                    onBlur={() => {
                        validate({
                                     name    : 'description',
                                     max     : 128,
                                     required: true
                                 })
                    }}
                    errorText={errors.description}
                    error={errors.description ? true : false}
                />
            </div>

            <div className="flex mb-16">
                <div className="min-w-48 pt-20">
                    <Icon color="action">email</Icon>
                </div>
                <Input
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={this.props.email}
                    onChange={handleChange}
                    onBlur={() => {
                        validate({
                                     name: 'email',
                                     type: 'email'
                                 })
                    }}
                    errorText={errors.email}
                    error={errors.email ? true : false}
                />
            </div>

            <div className="flex mb-16">
                <div className="min-w-48 pt-20">
                    <Icon color="action">home</Icon>
                </div>
                <Select
                    label="Country"
                    name="Country"
                    value={this.props.country}
                    onChange={handleChange}
                    id="country"
                    data={countries || []}
                />
            </div>

            <div className="flex mb-16">
                <div className="min-w-48 pt-20">
                    <Icon color="action">location_on</Icon>
                </div>
                <Select
                    label="Location"
                    value={this.props.location}
                    onChange={handleChange}
                    id="location"
                    data={countries || []}
                />
            </div>
            <div className="flex mb-16">
                <div className="min-w-48 pt-20">
                    <Icon color="action">domain</Icon>
                </div>
                <Select
                    label="Industry"
                    value={this.props.industry}
                    onChange={handleChange}
                    name="industry"
                    id="industry"
                    data={industries || []}
                />
            </div>
            <div className="flex mb-16">
                <div className="min-w-48 pt-20">
                    <Icon color="action">category</Icon>
                </div>
                <Select
                    label="Category"
                    name="category"
                    value={this.props.category}
                    onChange={handleChange}
                    id="category"
                    data={categories || []}
                />
            </div>

            <div className="flex mb-16">
                <div className="min-w-48 pt-20">
                    <Icon color="action">note</Icon>
                </div>
                <Input
                    label="Note"
                    id="internal_notes"
                    name="internal_notes"
                    value={this.props.internal_notes}
                    onChange={handleChange}
                    multiline
                    rows="2"
                    rowsMax="5"
                    onBlur={() => {
                        validate({
                                     target: {
                                         name: 'internat_note',
                                         max : 1024
                                     }
                                 })
                    }}
                    errorText={errors.internal_notes}
                    error={errors.internal_notes ? true : false}
                />
            </div>
        </React.Fragment>)
    }
}

export default ProfileForm
