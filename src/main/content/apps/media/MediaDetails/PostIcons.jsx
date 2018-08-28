import React from "react";
import { IconButton, Tooltip, Icon } from "@material-ui/core";

const PostIcons = ({ post }) => {
  return (
    <div className="top-icons">
      <Tooltip title={post.owner.link.value ? post.owner.link.value : ''} placement="left">
        <IconButton>
          <a href={post.platform_link} target="blank">
            <i className={`fab fa-${post.platform.toLowerCase()}`} />
          </a>
        </IconButton>
      </Tooltip>
      <Tooltip title={post.type.description ? post.type.description : ''} placement="left">
        <IconButton>
          <Icon>{post.type.meta.recommended_icon}</Icon>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default PostIcons;
