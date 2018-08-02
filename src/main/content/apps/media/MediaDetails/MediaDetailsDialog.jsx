import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Grid, Typography, Divider, Hidden, Icon } from "@material-ui/core";
import PostOwner from "./PostOwner";
import PostIcons from "./PostIcons";
import PostMedia from "./PostMedia";
import PostSenses from "./PostSenses";
import PostMentions from "./PostMentions";
import EngagmentGraph from "../widgets/EngagmentGraph";
import engagmentData from "../widgets/engagmentData";

export class MediaDetailsDialog extends Component {
  render() {
    const { post, open, handleClose } = this.props;
    let data;
    if (post.engagment && post.engagment.length > 1) {
      data = engagmentData(post.engagment);
    }
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
              <DialogContent className="dialog-content">
                <Hidden smUp>
                  <Grid container>
                    <Grid item xs={9}>
                      <PostOwner post={post} />
                    </Grid>
                    <Grid item>
                      <PostIcons post={post} />
                    </Grid>
                  </Grid>
                </Hidden>

                <Grid container spacing={24}>
                  <Grid item sm={7}>
                    <PostMedia post={post} />
                  </Grid>

                  <Grid item sm={5} className="info">
                    <div className="wrapper">
                      <Hidden xsDown>
                        <Grid container>
                          <Grid item xs={9}>
                            <PostOwner post={post} />
                          </Grid>
                          <Grid item>
                            <PostIcons post={post} />
                          </Grid>
                        </Grid>
                        <Divider className="mb-16 mt-16" />
                      </Hidden>

                      <div>
                        <Typography variant="subheading" gutterBottom>
                          {post.caption}
                        </Typography>
                      </div>

                      {post.engagment &&
                        post.engagment.length > 0 && (
                          <div style={{ marginTop: "20px" }}>
                            <Typography variant="body2" gutterBottom>
                              Engagements Rate
                            </Typography>
                            {post.engagment.length > 1 ? (
                              <EngagmentGraph data={data} />
                            ) : (
                              <div className="engagment">
                                <ul>
                                  {post.engagment[0].views > 0 && <li>
                                    <Icon>remove_red_eye</Icon> {post.engagment[0].views}
                                  </li>}
                                  {post.engagment[0].reactions > 0 && <li>
                                    <Icon>favorite</Icon> {post.engagment[0].reactions}
                                  </li>}
                                  {post.engagment[0].comments > 0 && <li>
                                    <Icon>mode_comment</Icon> {post.engagment[0].comments}
                                  </li>}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                      {post.senses && post.senses.length > 0 && <PostSenses senses={post.senses} />}

                      {post.mentions &&
                        post.mentions.length > 0 && <PostMentions mentions={post.mentions} />}
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

export default MediaDetailsDialog;
