import React, {Component}   from 'react'
import {withStyles}         from '@material-ui/core/styles'
import {connect}            from 'react-redux'
import {withRouter}         from 'react-router-dom'
import {
    FuseUtils,
    FuseAnimate
}                           from '@fuse'
import {
    Checkbox,
    Icon,
    IconButton
}                           from '@material-ui/core'
import {bindActionCreators} from 'redux'
import * as Actions         from './store/actions'
import ReactTable           from 'react-table'
import classNames           from 'classnames'
import * as Fn              from 'fn/index'

const styles = theme => ({
    labels: {}
});

class ContactsList extends Component {
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities)
                          .map(id => entities[id])
        if (searchText.length === 0) {
            return arr
        }
        return FuseUtils.filterArrayByString(arr, searchText)
    }

    constructor() {
        super()
        this.state     = {
            data   : [],
            pages  : null,
            loading: true
        }
        this.fetchData = this.fetchData.bind(this)
    }

    fetchData(state, instance) {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({loading: true})
        // Request the data however you want.  Here, we'll use our mocked service we created earlier
        if (state.filtered[0]) {
            Fn.simpleCall('get', 'typeahead/all', {
                  q      : state.filtered[0].value.filterValue,
                  count  : state.pageSize,
                  page   : state.page,
                  sortBy : state.sorted,
                  filters: state.filtered
              })
              .then(res => {
                  // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
                  this.setState({
                                    data   : res.data,
                                    loading: false
                                })
              })
        }
    }

    render() {
        const {
                  classes, contacts, user, searchText, searchType, selectedContactIds, selectAllContacts, deSelectAllContacts, toggleInSelectedContacts, openEditContactDialog, removeContacts, removeContact, toggleStarredContact, setContactsUnstarred, setContactsStarred
              }    = this.props
        const data = this.getFilteredArray(contacts, '')

        return (<FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
                className={classNames(classes.root, '-striped -highlight')}
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: 'cursor-pointer',
                        onClick  : (e, handleOriginal) => {
                            if (rowInfo) {
                                openEditContactDialog(rowInfo.original)
                            }
                        }
                    }
                }}
                data={data}
                columns={[
                    {
                        Header   : () => (<Checkbox
                            onClick={event => {
                                event.stopPropagation()
                            }}
                            onChange={event => {
                                event.target.checked ? selectAllContacts() : deSelectAllContacts()
                            }}
                            checked={selectedContactIds.length === Object.keys(contacts).length && selectedContactIds.length > 0}
                            indeterminate={selectedContactIds.length !== Object.keys(contacts).length && selectedContactIds.length > 0}
                        />),
                        accessor : '',
                        Cell     : row => {
                            return (<Checkbox
                                onClick={event => {
                                    event.stopPropagation()
                                }}
                                checked={selectedContactIds.includes(row.value.id)}
                                onChange={() => toggleInSelectedContacts(row.value.id)}
                            />)
                        },
                        className: 'justify-center',
                        sortable : false,
                        width    : 64
                    },
                    {
                        Header    : 'Name',
                        accessor  : 'name',
                        filterable: false,
                        sortable  : false,
                        className : 'font-bold'
                    },
                    {
                        Header    : 'Type',
                        accessor  : 'type',
                        filterable: false,
                        sortable  : false,
                        className : 'font-bold'
                    },
                    {
                        Header    : 'Status',
                        accessor  : 'status',
                        filterable: false,
                        className : 'font-bold'
                    },
                    {
                        Header    : 'Public Description',
                        accessor  : 'description',
                        filterable: false
                    },
                    {
                        Header    : 'Internal Note',
                        accessor  : 'note',
                        filterable: false,
                        className : 'font-bold'
                    },
                    {
                        Header    : 'Related Link',
                        accessor  : 'related_link',
                        filterable: false,
                        className : 'font-bold'
                    },
                    {
                        Header    : 'Metadata',
                        accessor  : 'meta',
                        filterable: false,
                        className : 'font-bold'
                    },
                    {
                        Header: '',
                        width : 64,
                        Cell  : row => (<div className="flex items-center">
                            <IconButton
                                onClick={ev => {
                                    ev.stopPropagation()
                                    removeContact(row.original.id)
                                }}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        </div>)
                    }
                ]}
                //	manual
                //	onFetchData={this.fetchData} // Request new data when things change
                defaultPageSize={20}
                noDataText="No typeahead found."
            />
        </FuseAnimate>)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
                                  getContacts             : Actions.getContacts,
                                  toggleInSelectedContacts: Actions.toggleInSelectedContacts,
                                  selectAllContacts       : Actions.selectAllContacts,
                                  deSelectAllContacts     : Actions.deSelectAllContacts,
                                  openEditContactDialog   : Actions.openEditContactDialog,
                                  removeContacts          : Actions.removeContacts,
                                  removeContact           : Actions.removeContact,
                                  toggleStarredContact    : Actions.toggleStarredContact,
                                  toggleStarredContacts   : Actions.toggleStarredContacts,
                                  setContactsStarred      : Actions.setContactsStarred,
                                  setContactsUnstarred    : Actions.setContactsUnstarred
                              }, dispatch)
}

function mapStateToProps({contactsApp}) {
    return {
        contacts          : contactsApp.contacts.entities,
        selectedContactIds: contactsApp.contacts.selectedContactIds,
        searchText        : contactsApp.contacts.searchText
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactsList)))
