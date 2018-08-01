import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Grid,
  IconButton,
  Avatar,
  Chip,
  Typography,
  Divider,
  Hidden,
  Tooltip,
  Icon
} from "@material-ui/core";
import { format } from "date-fns";

export class MediaDetailsDialog extends Component {
  render() {
    const { post, open, handleClose } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          fullWidth={true}
          onClose={handleClose}
          maxWidth={"md"}
          scroll="body"
          id="mediaPostDialog"
          aria-labelledby="Media post details"
        >
          {post &&
            Object.keys(post).length > 0 && (
              <DialogContent class="dialog-content">
                <Hidden smUp="hide">
                  <div className="top-icons">
                    <Tooltip title={post.owner.link.value} placement="left">
                        <IconButton>
                        <a href={post.platform_link} target="blank">
                          <i className={`fab fa-${post.platform.toLowerCase()}`} />
                          </a>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={post.type.description} placement="left">
                      <IconButton>
                        <Icon>{post.type.meta.recommended_icon}</Icon>
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div className="post-owner">
                    <Grid container spacing={8} style={{ margin: "15px" }}>
                      <Grid item xs={1.5} style={{ textAlign: "center" }}>
                        <Avatar aria-label="Recipe">
                          <img src={post.owner.profile_picture} alt="" />
                        </Avatar>
                      </Grid>
                      <Grid item>
                      <Typography variant="body2" gutterBottom>
                          {post.owner.first_name} {post.owner.last_name}
                        </Typography>
                        <Typography variant="caption">
                          <b>Created at:</b> {format(post.created_at, "MMMM D, YYYY")} |{" "}
                          <b>Captured at:</b> {format(post.captured_at, "MMMM D, YYYY")}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider className="mt-16" />
                  </div>
                </Hidden>
                <Grid container spacing={24}>
                  <Grid item sm={7}>
                    <div className="media">
                      {post.type.name === "igVideo" || post.type.name === "igStoryVideo" ? (
                        <video style={{ width: "100%" }} src={post.media} controls>
                          <source src={post.media} type="video/mp4" />
                        </video>
                      ) : (
                        <img src={post.media} alt="" />
                      )}
                    </div>
                  </Grid>
                  <Grid item sm={5} className="info">
                    <Hidden xsDown>
                      <div className="top-icons">
                        <Tooltip title={post.owner.link.value} placement="left">
                            <IconButton>
                            <a href={post.platform_link} target="blank">
                              <i className={`fab fa-${post.platform.toLowerCase()}`} />
                              </a>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={post.type.description} placement="left">
                          <IconButton>
                            <Icon>{post.type.meta.recommended_icon}</Icon>
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div className="post-owner">
                        <Grid container spacing={8}>
                          <Grid item xs={1.5} style={{ textAlign: "center" }}>
                            <Avatar aria-label="Recipe">
                              <img src={post.owner.profile_picture} alt="" />
                            </Avatar>
                          </Grid>
                          <Grid item>
                          <Typography variant="body2">
                              {post.owner.first_name} {post.owner.last_name}
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                              <b>Created at:</b> {format(post.created_at, "MMMM D, YYYY")} |{" "}
                              <b>Captured at:</b> {format(post.captured_at, "MMMM D, YYYY")}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider className="mb-16 mt-16" />
                      </div>
                    </Hidden>
                    <div>
                        <Typography variant="subheading" gutterBottom>
                          {post.caption}
                        </Typography>
                    </div>

                    {post.senses && post.senses.length > 0 &&<div className="tags">
                      <Typography variant="body2" gutterBottom>Mirrorr Sense <sup>TM</sup></Typography>
                      
                        {post.senses.map(sense => (
                          <Chip
                            className="tag"
                            avatar={
                              <Avatar className="score">{sense.score.toFixed(1)}</Avatar>
                            }
                            label={sense.name}
                          />
                        ))}
                    </div>}

                    {post.mentions && post.mentions.length > 0 && <div className="tags">
                      <Typography variant="body2" gutterBottom>Tags &amp; Mentions</Typography>
                      
                        
                        {post.mentions.map(mention => (
                          <Chip
                            className="tag"
                            label={mention.name}
                          />
                        ))}
                    </div>}
                  </Grid>
                </Grid>
              </DialogContent>
            )}
        </Dialog>
      </div>
    );
  }
}

export default MediaDetailsDialog;
