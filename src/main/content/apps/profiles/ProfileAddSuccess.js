import React from 'react';
import { Button, Icon, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles/index';

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

const ProfileAddSuccess = ({addedProfile, resetAddProfile, addedProfileId, classes}) => {
  return (
    <React.Fragment>
      <div align="center">
        <Icon className="mt-8" style={{ fontSize: 36 }} color="secondary">
          check_circle
        </Icon>
        <Typography variant="subheading" align="center" className="py-8" color="secondary">
          {addedProfile}
        </Typography>
      </div>
      <div className={classes.wrapper} justify="center">
        <Button
          variant="raised"
          color="primary"
          onClick={() => {
            resetAddProfile();
          }}
        >
          Add Another
        </Button>
        <Button href={`/apps/profile/${addedProfileId}`} className={classes.button} color="primary">
          View Profile <Icon className={classes.rightIcon}>exit_to_app</Icon>
        </Button>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(ProfileAddSuccess);
