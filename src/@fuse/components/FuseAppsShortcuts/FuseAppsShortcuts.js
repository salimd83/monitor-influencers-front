import React, { Component } from "react";
import { Icon, IconButton, Tooltip, withStyles } from "@material-ui/core";
import * as UserActions from "auth/store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FuseUtils, FuseAnimateGroup } from "@fuse";
import { Link } from "react-router-dom";
import amber from "@material-ui/core/colors/amber";
import classNames from "classnames";
import _ from "lodash";

const propTypes = {};

const defaultProps = {};

const styles = () => ({
  root: {},
  item: {
    textDecoration: "none!important"
  },
  addIcon: {
    color: amber[600]
  }
});

class FuseAppsShortcuts extends Component {
  state = {
    addMenu: null,
    searchText: "",
    searchResults: null,
    flatNavigation: null
  };
  addMenuClick = event => {
    this.setState({ addMenu: event.currentTarget });
  };
  addMenuClose = () => {
    this.setState({ addMenu: null });
  };
  search = ev => {
    const searchText = ev.target.value;
    this.setState({ searchText });
    if (searchText.length !== 0 && this.state.flatNavigation) {
      this.setState({
        searchResults: this.state.flatNavigation.filter(item => item.title.toLowerCase().includes(searchText))
      });
      return;
    }
    this.setState({ searchResults: null });
  };

  componentDidMount() {
    this.flattenNavigation(this.props.navigation);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.flattenNavigation(this.props.navigation);
    }
  }

  flattenNavigation(navigation) {
    this.setState({ flatNavigation: FuseUtils.getFlatNavigation(navigation) });
  }

  render() {
    const { classes, navigation, userRole } = this.props;
    let navAppsItem = navigation.find(function(element) {
      return element.id === "apps";
    });

    navAppsItem = navAppsItem.children;

    let appsItems = [];

    Object.keys(navAppsItem).forEach(function(key) {
      const item = navAppsItem[key];
      if (item.auth && userRole.includes(item.auth)) {
        appsItems.push(item);
      }
    });

    // function ShortcutMenuItem({ item, onToggle }) {
    //   if (
    //     item.auth &&
    //     (!userRole.includes(item.auth) ||
    //       (userRole !== "guest" && item.auth.length === 1 && item.auth.includes("guest")))
    //   ) {
    //     return null;
    //   }

    //   return (
    //     <Link to={item.url} className={classes.item}>
    //       <MenuItem key={item.id}>
    //         <ListItemIcon>
    //           {item.icon ? (
    //             <Icon>{item.icon}</Icon>
    //           ) : (
    //             <span className="text-20 font-bold uppercase text-center">{item.title[0]}</span>
    //           )}
    //         </ListItemIcon>
    //         <ListItemText className="pl-0" primary={item.title} />
    //       </MenuItem>
    //     </Link>
    //   );
    // }

    return (
      <div className={classNames(classes.root, "flex flex-1 px-16")}>
        <FuseAnimateGroup
          enter={{
            animation: "transition.expandIn"
          }}
          className="md:flex md-flex-1"
        >
          {appsItems.map(
            item =>
              item && (
                <Link to={item.url} key={item.id} className={classes.item}>
                  <Tooltip title={item.title} placement="bottom">
                    <IconButton className="w-40 h-40">
                      {item.icon ? (
                        <Icon>{item.icon}</Icon>
                      ) : (
                        <span className="text-20 font-bold uppercase">{item.title[0]}</span>
                      )}
                    </IconButton>
                  </Tooltip>
                </Link>
              )
          )}
        </FuseAnimateGroup>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleInShortcuts: UserActions.toggleInShortcuts
    },
    dispatch
  );
}

function mapStateToProps({ fuse, auth }) {
  return {
    navigation: fuse.navigation,
    userRole: auth.user.role
  };
}

FuseAppsShortcuts.propTypes = propTypes;
FuseAppsShortcuts.defaultProps = defaultProps;

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FuseAppsShortcuts)
);
