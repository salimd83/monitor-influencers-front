import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Actions from "auth/store/actions/index";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles/index";
import { Avatar, Button, Card, CardContent, Icon, Typography } from "@material-ui/core";
import { simpleStore } from "fn";

import classNames from "classnames";
import { TextFieldFormsy, FuseAnimate } from "@fuse";
import Formsy from "formsy-react";

const styles = theme => ({
  root: {
    backgroundImage:
      "url('https://secure.aadcdn.microsoftonline-p.com/c1c6b6c8-ogpfrapdxzkqbtgla7whfe5enpck3dusb7h-rcuk018/logintenantbranding/0/illustration')",
    backgroundColor: "#000000",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  intro: {
    color: "#ffffff"
  },
  card: {
    width: "100%",
    maxWidth: 400
  },
  bgoverlay: {
    backgroundAttachment: "scroll",
    backgroundClip: "border-box",
    backgroundColor: "rgba(0, 0, 0, 0.32)",
    backgroundOrigin: "padding-box",
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    position: "absolute"
  }
});

class Locked extends Component {
  state = {
    canSubmit: false,
    step: 1,
    user: this.props.user
  };

  form = React.createRef();

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  onSubmitRequest = async model => {
    this.disableButton();
    const a = await this.props.submitRequest(model);
    if (a.success) {
      this.setState({ step: 2 });
    }
  };

  onSubmit = model => {
    this.disableButton();
    this.props.submitLogin(model);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.login.error && (this.props.login.error.username || this.props.login.error.password)) {
      this.form.updateInputsWithError({
        ...this.props.login.error
      });

      this.props.login.error = null;
      this.disableButton();
    }

    if (!this.props.user.role.includes("guest")) {
      const pathname =
        this.props.location.state && this.props.location.state.redirectUrl
          ? this.props.location.state.redirectUrl
          : "/";
      this.props.history.push({
        pathname
      });
    }
    return null;
  }

  nextStep() {
    if (this.refs.form.walk(this.refs.form.childs)) {
      let step = this.state.step;
      if (step < 3) {
        step++;
      }
      this.setState({ step }, () => this.refs.form.walk(this.refs.form.childs));
    }
  }

  renderStep() {
    if (!simpleStore.lookup("hiUsername", "local")) {
      return <Redirect to="/login" />;
    }

    const { step, canSubmit } = this.state;
    let content = null;
    switch (step) {
      case 1:
        content = (
          <Formsy
            onValidSubmit={this.onSubmitRequest}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            ref={form => (this.form = form)}
            className="flex flex-col justify-center w-full"
          >
            <TextFieldFormsy
              className="hidden"
              type="hidden"
              name="username"
              value={simpleStore.lookup("hiUsername", "local")}
            />
            <Button
              type="submit"
              variant="raised"
              color="primary"
              className="w-full mx-auto mt-16 normal-case"
              aria-label="Login"
              disabled={!canSubmit}
              value="legacy"
            >
              Get Password
            </Button>
          </Formsy>
        );

        break;
      case 2:
        content = (
          <Formsy
            onValidSubmit={this.onSubmit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            ref={form => (this.form = form)}
            className="flex flex-col justify-center w-full"
          >
            <TextFieldFormsy
              className="hidden"
              type="hidden"
              name="username"
              value={simpleStore.lookup("hiUsername", "local")}
            />
            <TextFieldFormsy
              className="mb-16 mt-16"
              type="text"
              name="password"
              label="Passcode"
              helperText={"Please check your mobile for a one time passcode."}
              validations={{
                minLength: 2
              }}
              validationErrors={{
                minLength: "Passcode is too short."
              }}
              required
            />

            <Button
              type="submit"
              variant="raised"
              color="primary"
              className="w-full mx-auto mt-16 normal-case"
              aria-label="Login"
              disabled={!canSubmit}
              value="legacy"
            >
              Login
            </Button>
          </Formsy>
        );
        break;
        default:
    }
    return content;
  }

  render() {
    const { classes } = this.props;
    const { step, user } = this.state;

    return (
      <div
        className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}
      >
        <div className={classNames(classes.bgoverlay)} />

        <div className="flex flex-col items-center justify-center w-full">
          <FuseAnimate animation="transition.expandIn">
            <Card className={classes.card}>
              <CardContent className="flex flex-col items-center justify-center p-32">
                <div className="w-full flex flex-col items-center justify-center sm:flex-row sm:justify-start sm:items-center">
                  <div className="relative mr-16">
                    <Avatar className="w-72 h-72" src={user.data.photoURL} />
                    <Icon className="text-36 absolute pin-r pin-b" color="error">
                      lock
                    </Icon>
                  </div>

                  <div>
                    <Typography variant="title" className="mb-8">
                      YOUR SESSION IS LOCKED
                    </Typography>
                    <Typography color="textSecondary">
                      Due to inactivity or login from another device, your session is locked.
                    </Typography>
                  </div>
                </div>
                {this.renderStep(step)}
              </CardContent>
            </Card>
          </FuseAnimate>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      submitLogin: Actions.submitLogin,
      submitRequest: Actions.submitRequest
    },
    dispatch
  );
}

function mapStateToProps({ auth }) {
  return {
    login: auth.login,
    user: auth.user
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Locked)
  )
);
