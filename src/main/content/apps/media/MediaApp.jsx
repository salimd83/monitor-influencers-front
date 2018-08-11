import React, { Component } from "react";
import { FusePageCarded } from "@fuse";
import { connect } from "react-redux";
import MediaAppHeader from "./MediaAppHeader";
import MediaAppList from "./MediaAppList";
import {
  getMedia,
  setFilters,
  setTagsFilter,
  setTypesFilter,
  closePostDialog,
  loadPost
} from "./store/actions/media.actions";
import { simpleCall } from "../../../../fn";
import moment from "moment";

const mapState = ({ mediaApp, async }) => ({
  from: mediaApp.from,
  to: mediaApp.to,
  profile: mediaApp.profile,
  tags: mediaApp.tags,
  types: mediaApp.types,
  media: mediaApp.media,
  page: mediaApp.page,
  showPost: mediaApp.showPost,
  post: mediaApp.post,
  loading: async.loading
});

const actions = {
  getMedia,
  setFilters,
  setTagsFilter,
  setTypesFilter,
  loadPost,
  closePostDialog
};

export class MediaApp extends Component {
  async componentDidMount() {
    const {
      from,
      to,
      profile,
      tags,
      types,
      match,
      getMedia,
      setFilters,
      setTagsFilter,
      setTypesFilter,
      showMessage
    } = this.props;
    const strFrom = match.params.from || moment(from).toISOString();
    const strTo = match.params.to || moment(to).toISOString();
    const profileId = match.params.id || profile.value;
    let profileObj = profileId;

    if (match.params.id && match.params.id !== "*") {
      try {
        const response = await simpleCall("get", `si/profiles/${profileId}`);
        profileObj = response.data;
      } catch (error) {
        console.log(error);
      }
    }
    const strTags = match.params.tags || tags.join();
    let tagsId = [];
    let tagsArr = [];
    if (strTags !== "" && strTags !== "*" && typeof strTags !== undefined) {
      tagsId = strTags.split(",");
      tagsArr = await Promise.all(
        tagsId.map(async tagId => {
          try {
            const response = await simpleCall("get", `typeahead/all?id=${tagId}`);
            return {
              label: response.data[0].name,
              value: response.data[0].name,
              id: response.data[0].id
            };
          } catch (error) {
            console.log(error);
          }
        })
      );
    }
    const strTypes = match.params.types || types.join();
    let typesIds = [];
    if (strTypes !== "" && strTypes !== "*") {
      typesIds = strTypes.split(",");
    }
    getMedia(strFrom, strTo, profileId, strTags, strTypes);
    setFilters(strFrom, strTo, profileObj);
    setTagsFilter(tagsArr);
    setTypesFilter(typesIds);

    if (typeof match.params.postid !== "undefined") {
      this.props.loadPost(match.params.postid);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params }
    } = this.props;
    const {
      match: { params: prevParams }
    } = prevProps;

    if (
      params.from !== prevParams.from ||
      params.to !== prevParams.to ||
      params.id !== prevParams.id ||
      params.tags !== prevParams.tags ||
      params.types !== prevParams.types
    ) {
      const { from, to, profile, tags, types, match, getMedia } = this.props;
      const strFrom = match.params.from || moment(from).toISOString();
      const strTo = match.params.to || moment(to).toISOString();
      const profileId = match.params.id || profile.id;
      const strTags = match.params.tags || tags.join();
      const strTypes = match.params.types || types.join();
      getMedia(strFrom, strTo, profileId, strTags, strTypes, null, true);
    }
  }

  fromChange = from => {
    const { to, profile, setFilters } = this.props;
    setFilters(from, to, profile);
  };
  toChange = to => {
    const { from, profile, setFilters } = this.props;
    setFilters(from, to, profile);
  };

  profileChange = profile => {
    const { from, to, setFilters } = this.props;
    setFilters(from, to, profile);
  };

  tagsChange = tags => this.props.setTagsFilter(tags);

  typesChange = event => this.props.setTypesFilter(event.target.value);

  handleClick = () => {
    const { from, to, profile, tags, types, history } = this.props;
    const strFrom = moment(from).toISOString();
    const strTo = moment(to).toISOString();
    const profileId = typeof profile.id !== "undefined" && profile.id !== "" ? profile.id : "*";
    const strTags = tags.map(tag => tag.id).join() || "*";
    history.push(`/mirrorr/media/${profileId}/${strFrom}/${strTo}/${strTags}/${types.join()}`);
  };

  loadNextPage = isVisible => {
    const { from, to, profile, match, tags, types, getMedia, page } = this.props;
    if (isVisible && page) {
      const strFrom = match.params.from || moment(from).toISOString();
      const strTo = match.params.to || moment(to).toISOString();
      const profileId = match.params.id || profile.id;
      const strTags = match.params.tags || tags.join();
      const strTypes = match.params.types || types.join();
      getMedia(strFrom, strTo, profileId, strTags, strTypes, page);
    }
  };

  onPostClick = postId => () => {
    const { from, to, profile, tags, types, history, loadPost } = this.props;
    const strFrom = moment(from).toISOString();
    const strTo = moment(to).toISOString();
    const profileId = typeof profile.id !== "undefined" && profile.id !== "" ? profile.id : "*";
    const strTags = tags.map(tag => tag.id).join() || "*";
    loadPost(postId);
    history.push(
      `/mirrorr/media/${profileId}/${strFrom}/${strTo}/${strTags}/${types.join() || "*"}/${postId}`
    );
  };

  onPostClose = () => {
    this.props.closePostDialog();
    const { from, to, profile, tags, types, history } = this.props;
    const strFrom = moment(from).toISOString();
    const strTo = moment(to).toISOString();
    const profileId = typeof profile.id !== "undefined" && profile.id !== "" ? profile.id : "*";
    const strTags = tags.map(tag => tag.id).join() || "*";
    history.push(
      `/mirrorr/media/${profileId}/${strFrom}/${strTo}/${strTags}/${types.join() || "*"}`
    );
  };

  render() {
    const { from, to, tags, types, profile, media, page, post, showPost, loading } = this.props;
    const {
      fromChange,
      toChange,
      profileChange,
      tagsChange,
      typesChange,
      handleClick,
      loadNextPage,
      onPostClick,
      onPostClose
    } = this;

    return (
      <FusePageCarded
        header={
          <MediaAppHeader
            {...{
              from,
              to,
              tags,
              types,
              profile,
              fromChange,
              toChange,
              profileChange,
              tagsChange,
              typesChange,
              handleClick
            }}
          />
        }
        content={
          <MediaAppList
            {...{ media, page, loadNextPage, onPostClick, showPost, post, onPostClose, loading }}
          />
        }
        sidebarInner
        onRef={instance => {
          this.pageLayout = instance;
        }}
      />
    );
  }
}

export default connect(
  mapState,
  actions
)(MediaApp);
