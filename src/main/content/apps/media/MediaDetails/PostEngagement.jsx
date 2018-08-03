import React from "react";
import { Typography, Icon } from "@material-ui/core";
import EngagmentGraph from "../widgets/EngagmentGraph";


const PostEngagement = ({engagment, data}) => {
  return (
    <React.Fragment>
      {engagment &&
        engagment.length > 0 && (
          <div style={{ marginTop: "20px", width: '250px' }}>
            <Typography variant="body2" gutterBottom>
              Engagements Rate
            </Typography>
            {engagment.length > 1 ? (
              <EngagmentGraph data={data} />
            ) : (
              <div className="engagment">
                <ul>
                  {engagment[0].views > 0 && (
                    <li>
                      <Icon>remove_red_eye</Icon> {engagment[0].views}
                    </li>
                  )}
                  {engagment[0].reactions > 0 && (
                    <li>
                      <Icon>favorite</Icon> {engagment[0].reactions}
                    </li>
                  )}
                  {engagment[0].comments > 0 && (
                    <li>
                      <Icon>mode_comment</Icon> {engagment[0].comments}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
    </React.Fragment>
  );
};

export default PostEngagement;
