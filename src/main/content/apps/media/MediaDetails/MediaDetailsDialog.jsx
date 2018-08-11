import React, {Component} from 'react'
import Dialog             from '@material-ui/core/Dialog'
import DialogContent      from '@material-ui/core/DialogContent'
import {
    Grid,
    Typography,
    Divider,
    Hidden,
    Icon
}                         from '@material-ui/core'
import PostOwner          from './PostOwner'
import PostIcons          from './PostIcons'
import PostMedia          from './PostMedia'
import PostSenses         from './PostSenses'
import PostMentions       from './PostMentions'
import EngagmentGraph     from '../widgets/EngagmentGraph'
import engagmentData      from '../widgets/engagmentData'
import PostEngagement     from './PostEngagement'

export class MediaDetailsDialog extends Component {
    state                  = {
        width: 0
    }
    updateWindowDimensions = () => {
        this.setState({width: window.innerWidth})
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    render() {
        const {post, open, handleClose} = this.props
        const imageRatio                = post.media_width / post.media_height

        const style = {
            maxWidth: 'none',
            height  : '90vh'
        }
        if (imageRatio > 0.9) {
            style.maxWidth = '670px'
            style.height   = 'auto'
        }
        if (this.state.width <= 960) {
            style.width  = '100%'
            style.height = 'auto'
        }
        let data
        if (post.engagment && post.engagment.length > 1) {
            data = engagmentData(post.engagment)
        }
        return (
            <div>
                <Dialog
                    open={open}
                    fullWidth={true}
                    onClose={handleClose}
                    maxWidth={'md'}
                    scroll="body"
                    id="mediaPostDialog"
                    aria-labelledby="Media post details"
                >
                    {post &&
                     Object.keys(post).length > 0 && (
                         <DialogContent className="dialog-content">
                             <Hidden smUp>
                                 <Grid container>
                                     <Grid container item xs={8} spacing={8} className="post-owner">
                                         <PostOwner post={post}/>
                                     </Grid>
                                     <Grid item xs>
                                         <PostIcons post={post}/>
                                     </Grid>
                                 </Grid>
                             </Hidden>

                             <Grid container spacing={24}>
                                 <Grid item xs={12} sm={7} md lg>
                                     <PostMedia post={post} style={style}/>
                                 </Grid>

                                 <Grid item xs={12} sm={5} md lg container className="info">
                                     <Hidden xsDown>
                                         <Grid item container xs={9} spacing={8} className="post-owner">
                                             <PostOwner post={post}/>
                                         </Grid>
                                         <Grid item xs>
                                             <PostIcons post={post}/>
                                         </Grid>
                                         <div style={{
                                             clear: 'both',
                                             width: '100%'
                                         }}>
                                             <Divider className="mb-16 mt-16"/>
                                         </div>
                                     </Hidden>

                                     <div className="scrollWrap">
                                         <Typography variant="subheading" gutterBottom>
                                             {post.caption}
                                         </Typography>
                                         <Typography variant="body2" gutterBottom>
                                             {`OCR: ${post.ocr && post.ocr[0].type}`}
                                         </Typography>
                                         <Typography variant="subheading" gutterBottom>
                                             {post.ocr && post.ocr[0].meta.text}
                                         </Typography>

                                         <PostEngagement engagment={post.engagment} data={data}/>

                                         {post.senses && post.senses.length > 0 && <PostSenses senses={post.senses}/>}

                                         {post.mentions &&
                                          post.mentions.length > 0 && <PostMentions mentions={post.mentions}/>}
                                     </div>
                                 </Grid>
                             </Grid>
                         </DialogContent>
                     )}
                </Dialog>
            </div>
        )
    }
}

export default MediaDetailsDialog
