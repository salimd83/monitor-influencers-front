import React from "react";

const PostMedia = ({ post }) => {
  return (
    <div>
      <div className="media">
        {post.type.name === "igVideo" || post.type.name === "igStoryVideo" ? (
          <video style={{ width: "100%" }} src={post.media} controls>
            <source src={post.media} type="video/mp4" />
          </video>
        ) : (
          <img src={post.media} alt="" />
        )}
      </div>
    </div>
  );
};

export default PostMedia;
