import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Icon,
  Avatar,
  Fade
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FuseUtil from "@fuse/FuseUtils";



const metrics = [
  "Total Followers",
  "Total Media",
  "Activity and Engagement",
  "Followers Rate",
  "Activity Type",
  "Top Hashtag",
  "Top Location",
  "Top Mentions"
];

const ReportAppList = ({ profiles, removeProfile, classes, loading }) => {
  const { camelize } = FuseUtil;

  const renderMetric = mtrc =>
    profiles.map(prof => (
      <TableCell key={`${mtrc} ${prof.id}`}>{prof[camelize(mtrc)]}</TableCell>
    ));

  return (
    <div className={classes.root + " mt-32"}>
      <Fade in={!loading}>
      <Table className={classes.table + " metrics"}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {profiles.map(profile => (
              <TableCell key={FuseUtil.camelize(profile.name)}>
                <div className={classes.profile}>
                  <Avatar
                    alt={profile.name}
                    src={profile.image}
                    className={classes.smallAvatar}
                  />
                  {profile.name}
                  <IconButton
                    
                    className="remove-profile-action"
                    aria-label="Remove profile"
                    onClick={removeProfile(profile.id)}
                  >
                    <Icon color="error">close</Icon>
                  </IconButton>
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {metrics.map(metric => {
            return (
              <TableRow key={FuseUtil.camelize(metric)}>
                <TableCell component="th" scope="row">
                  {metric}
                </TableCell>
                {renderMetric(metric)}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </Fade>
    </div>
  );
};

const styles = {
  smallAvatar: {
    width: 24,
    height: 24,
    display: "block",
    marginRight: 5
  },
  profile: {
    display: 'flex',
    // flexDirection: 'row',
    alignItems: 'center'
  },
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
  },
};

export default withStyles(styles)(ReportAppList);
