import React, {Component}     from 'react'
import {withStyles}           from '@material-ui/core/styles/index'
import {
    Icon,
    TextField,
    Typography,
    Grid
}                             from '@material-ui/core'
import * as Actions           from './store/actions'
import { bindActionCreators } from 'redux';
import {connect}              from 'react-redux'
import classNames             from 'classnames'
import {FuseAnimate}          from '@fuse'
import MenuItem               from '@material-ui/core/MenuItem'
import Select                 from '@material-ui/core/Select'
import FormControl            from '@material-ui/core/FormControl'
import _                      from 'lodash'

const styles = theme => ({
  root: {}
});

class TypeaheadsHeader extends Component {
  state = {
    searchType: 'all',
    searchText: ''
  };

  handleChange = event => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      ),
      () => {
        this.props.setSearchText(this.state);
      }
    );

    // this.props.setSearchText(this.state);
  };

  render() {
      const {classes} = this.props

    return (
      <div
        className={classNames(
          classes.root,
          'flex flex-1 flex-col sm:flex-row items-center justify-between p-24'
        )}
      >
        <div className="flex flex-1 items-center">
          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32 mr-12">account_box</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography variant="title">Typeahead</Typography>
            </FuseAnimate>
          </div>
        </div>

        <div className="flex items-end">
          <FuseAnimate animation="transition.expandIn" delay={300}>
            <Icon color="action">search</Icon>
          </FuseAnimate>

          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <FormControl
              className={classes.container + ' ml-12'}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={8}>
                <Grid item md={7}>
                  <Select
                    style={{ width: '100%' }}
                    value={this.state.searchType}
                    name="searchType"
                    id="searchType"
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'searchType',
                      id: 'searchType'
                    }}
                  >
                    <MenuItem value="all">
                      <strong>All</strong>
                    </MenuItem>
                    <MenuItem value="brand">Brand</MenuItem>
                    <MenuItem value="hashtag">Hashtag</MenuItem>
                    <MenuItem value="industry">industry</MenuItem>
                    <MenuItem value="category">category</MenuItem>
                    <MenuItem value="gender">gender</MenuItem>
                    <MenuItem value="language">language</MenuItem>
                    <MenuItem value="country">country</MenuItem>
                  </Select>
                </Grid>
                <Grid item md={5}>
                  <TextField
                    style={{ width: '100%' }}
                    placeholder="Search Name"
                    value={this.state.searchText}
                    onChange={this.handleChange}
                    name="searchText"
                    id="searchText"
                    inputProps={{
                      'aria-label': 'Search'
                    }}
                  />
                </Grid>
              </Grid>
            </FormControl>
          </FuseAnimate>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setSearchText: Actions.setSearchText
    },
    dispatch
  );
}

function mapStateToProps({ typeaheadsApp }) {
  return {
    searchText: typeaheadsApp.typeaheads.searchText,
    searchType: typeaheadsApp.typeaheads.searchType
  };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TypeaheadsHeader)
);
