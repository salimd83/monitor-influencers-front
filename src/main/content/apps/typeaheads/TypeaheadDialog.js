import React, { Component } from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    InputLabel,
    Input,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    Select,
    MenuItem
}                             from '@material-ui/core';
import {withStyles}           from '@material-ui/core/styles/index'
import {bindActionCreators}   from 'redux'
import * as Actions           from './store/actions'
import {connect}              from 'react-redux'
import _                      from 'lodash'
import {JsonEditor as Editor} from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'

const styles = theme => ({
    root       : {},
    formControl: {
        marginBottom: 24
    }
});

const newTypeaheadState = {
    id          : '',
    name        : '',
    type        : '',
    note        : '',
    description : '',
    related_link: '',
    meta        : {}
};

class TypeaheadDialog extends Component {
  state = {
    ...newTypeaheadState
  };

  JsonEditorTemplate = [
    {
      text: 'Brand Search',
      title: 'Add fields required for Brand search action',
      field: 'search',
      value: {
        query: '',
        exactMatch: '',
        pageCount: 50,
        lookupSize: 'large',
        color: true,
        black: false
      }
    }
  ];

  handleChange = event => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === 'checkbox' ? event.target.checked : event.target.value
      )
    );
  };
  handleJsonEditor = value => {
    this.setState({
      meta: value
    });
  };
  closeComposeDialog = () => {
    this.props.typeaheadDialog.type === 'edit'
      ? this.props.closeEditTypeaheadDialog()
      : this.props.closeNewTypeaheadDialog();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (!prevProps.typeaheadDialog.props.open && this.props.typeaheadDialog.props.open) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
        this.props.typeaheadDialog.type === 'edit' &&
        this.props.typeaheadDialog.data &&
        !_.isEqual(this.props.typeaheadDialog.data, prevState)
      ) {
        const meta = this.props.typeaheadDialog.data.meta;
        this.setState({
          ...this.props.typeaheadDialog.data,
          meta
        });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (this.props.typeaheadDialog.type === 'new' && !_.isEqual(newTypeaheadState, prevState)) {
        const meta = newTypeaheadState.meta;
        this.setState({
          ...newTypeaheadState,
          meta
        });
      }
    }
  }

  canBeSubmitted() {
    const { name } = this.state;
    return name.length > 0;
  }

    render() {
        const {classes, typeaheadDialog, addTypeahead, updateTypeahead, removeTypeahead, types} = this.props

    return (
      <Dialog
        className={classes.root}
        {...typeaheadDialog.props}
        onClose={this.closeComposeDialog}
        fullWidth
        style={{ minWidth: '300px' }}
        maxWidth="sm"
      >
        <AppBar position="static">
          <Toolbar className="flex w-full">
            <Typography variant="subheading" color="inherit">
              {typeaheadDialog.type === 'new' ? 'New Typeahead' : 'Edit Typeahead'}
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            {typeaheadDialog.type === 'edit' && (
              <Typography variant="title" color="inherit" className="pt-8">
                {this.state.name}
              </Typography>
            )}
          </div>
        </AppBar>

        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>
            <FormControl className={classes.formControl} required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                autoFocus
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormControl>
          </div>

                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">filter_list</Icon>
                    </div>
                    <FormControl className={classes.formControl} required fullWidth>
                        <InputLabel htmlFor="type">Type</InputLabel>
                        <Select
                            value={this.state.type}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'type',
                                id  : 'type'
                            }}
                        >
                            {types && types.map(type => <MenuItem key={type.id} value={type.name}>{type.description}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">link</Icon>
                    </div>
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel htmlFor="related_link">Related Link</InputLabel>
                        <Input
                            id="related_link"
                            name="related_link"
                            value={this.state.related_link}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">note</Icon>
                    </div>
                    <TextField
                        className={classes.formControl}
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        value={this.state.description}
                        onChange={this.handleChange}
                        multiline
                        rows={2}
                        fullWidth
                    />
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">speaker_notes_off</Icon>
                    </div>
                    <TextField
                        className={classes.formControl}
                        id="note"
                        label="Internal Note"
                        type="text"
                        name="note"
                        value={this.state.note}
                        onChange={this.handleChange}
                        multiline
                        rows={2}
                        fullWidth
                    />
                </div>
                <div
                    className="flex"
                    style={{
                        width : '100%',
                        height: '300px'
                    }}
                >
                    <div className="min-w-48 pt-20">
                        <Icon color="action">code</Icon>
                    </div>
                    <Editor
                        id="meta"
                        value={this.state.meta}
                        onChange={this.handleJsonEditor}
                        templates={this.JsonEditorTemplate}
                    />
                </div>
            </DialogContent>

        {typeaheadDialog.type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="raised"
              color="primary"
              onClick={() => {
                addTypeahead(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="raised"
              color="primary"
              onClick={() => {
                updateTypeahead(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton
              onClick={() => {
                removeTypeahead(this.state.id);
                this.closeComposeDialog();
              }}
            >
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeEditTypeaheadDialog: Actions.closeEditTypeaheadDialog,
      closeNewTypeaheadDialog: Actions.closeNewTypeaheadDialog,
      addTypeahead: Actions.addTypeahead,
      updateTypeahead: Actions.updateTypeahead,
      removeTypeahead: Actions.removeTypeahead
    },
    dispatch
  );
}

function mapStateToProps({typeaheadsApp}) {
    return {
        typeaheadDialog: typeaheadsApp.typeaheads.typeaheadDialog,
        types          : typeaheadsApp.typeaheads.types
    }
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TypeaheadDialog)
);
