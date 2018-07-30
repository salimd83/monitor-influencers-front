import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { Grid, IconButton, Avatar, Chip, Typography, Divider, Hidden } from "@material-ui/core";
import { format } from "date-fns";

export class MediaDetailsDialog extends Component {
  render() {
    const { post, open, handleClose, fullScreen } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          fullWidth={true}
          onClose={handleClose}
          maxWidth = {'md'}
          scroll="body"
          id="mediaPostDialog"
          aria-labelledby="Media post details"
        >
          {post &&
            Object.keys(post).length > 0 && (
              <DialogContent class="dialog-content">
                <Hidden smUp="hide">
                  <div className="post-owner">
                    <Grid container spacing={8} style={{margin: '15px'}}>
                      <Grid item xs={1.5} style={{ textAlign: "center" }}>
                        <Avatar aria-label="Recipe">
                          <img src={post.owner.profile_picture} alt="" />
                        </Avatar>
                      </Grid>
                      <Grid item xs={6}>
                        <p>
                          {post.owner.first_name} {post.owner.last_name}
                        </p>
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
                      <div className="post-owner">
                        <Grid container spacing={8}>
                          <Grid item xs={1.5} style={{ textAlign: "center" }}>
                            <Avatar aria-label="Recipe">
                              <img src={post.owner.profile_picture} alt="" />
                            </Avatar>
                          </Grid>
                          <Grid item xs={6}>
                            <p>
                              {post.owner.first_name} {post.owner.last_name}
                            </p>
                          </Grid>
                        </Grid>
                        <Divider className="mb-16 mt-16" />
                      </div>
                    </Hidden>
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography variant="title" gutterBottom>
                          {post.caption}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          <b>Created at:</b> {format(post.created_at, "MMMM D, YYYY")} |{" "}
                          <b>Captured at:</b> {format(post.captured_at, "MMMM D, YYYY")}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} style={{ textAlign: "right" }}>
                        <IconButton>
                          <a href={post.platform_link} target="blank">
                            <i className={`fab fa-${post.platform.toLowerCase()}`} />
                          </a>
                        </IconButton>
                      </Grid>
                    </Grid>

                    <div className="tags">
                      {post.tags &&
                        post.tags.length > 0 &&
                        post.tags.map(tag => (
                          <Chip
                            avatar={
                              <Avatar style={{ fontSize: "13px" }}>{tag.score.toFixed(1)}</Avatar>
                            }
                            label={tag.name}
                          />
                        ))}
                    </div>
                  </Grid>
                </Grid>
              </DialogContent>
            )}
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(MediaDetailsDialog);
