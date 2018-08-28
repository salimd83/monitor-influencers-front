import React from "react";
import { Chip, Typography, Avatar } from "@material-ui/core";

const PostSenses = ({ senses }) => {
  return (
    <div className="tags">
      <Typography variant="body2" gutterBottom>
        Mirrorr Sense <sup>TM</sup>
      </Typography>

      {senses.map(sense => (
        <Chip
          key={sense.id}
          className="tag"
          avatar={<Avatar className="score">{sense.score.toFixed(1)}</Avatar>}
          label={sense.name}
        />
      ))}
    </div>
  );
};

export default PostSenses;
