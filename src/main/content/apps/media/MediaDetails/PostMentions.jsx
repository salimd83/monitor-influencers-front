import React from "react";
import { Chip, Typography, Avatar, Icon } from "@material-ui/core";

const PostMentions = ({ mentions }) => {
  return (
    <div className="tags">
      <Typography variant="body2" gutterBottom>
        Tags &amp; Mentions
      </Typography>

      {mentions.map(mention => {
        let icon;
        switch (mention.type) {
          case "tag":
            icon = "tag_faces";
            break;
          case "mention":
            icon = "user";
            break;
          case "location":
            icon = "location_on";
            break;
          default:
            icon = "label";
        }
        return (
          <Chip
            key={mention.id}
            avatar={
              <Avatar className="score">
                <Icon>{icon}</Icon>
              </Avatar>
            }
            className="tag"
            label={mention.name}
          />
        );
      })}
    </div>
  );
};

export default PostMentions;
