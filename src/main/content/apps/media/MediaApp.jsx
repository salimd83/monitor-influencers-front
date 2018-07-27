import React, { Component } from "react";
import { FusePageCarded } from "@fuse";
import { connect } from "react-redux";
import MediaAppHeader from "./MediaAppHeader";
import MediaAppList from "./MediaAppList";
import { getMedia, setFilters, setTagsFilter, setTypesFilter } from "./store/actions/media.actions";
import { simpleCall } from "../../../../fn";
import moment from "moment";

const mapState = ({ mediaApp }) => ({
  from: mediaApp.from,
  to: mediaApp.to,
  profile: mediaApp.profile,
  tags: mediaApp.tags,
  types: mediaApp.types,
  media: mediaApp.media,
  page: mediaApp.page
});

const actions = {
  getMedia,
  setFilters,
  setTagsFilter,
  setTypesFilter
};

export class MediaApp extends Component {
  async componentDidMount() {
    const { from, to, profile, tags, types, match, getMedia, setFilters, setTagsFilter, setTypesFilter } = this.props;
    const strFrom = match.params.from || moment(from).toISOString();
    const strTo = match.params.to || moment(to).toISOString();
    const profileId = match.params.id || profile.value;
    let profileObj = profileId;
    
    if (match.params.id &&  match.params.id !== '*') {
      const response = await simpleCall("get", `/si/profiles/${profileId}`);
      profileObj = {
        label: `${response.data.first_name} ${response.data.last_name}`,
        value: response.data.id
      };
    }
    const strTags = match.params.tags || tags.join();
    let tagsId = [];
    let tagsArr = []
    if(strTags !== '' && strTags !== '*') {
      tagsId = strTags.split(',');
      tagsArr = await Promise.all(tagsId.map(async tagId => {
        const response = await simpleCall("get", `typeahead/all?id=${tagId}`);
        return {
          label: response.data[0].name,
          value: response.data[0].name,
          id: response.data[0].id
        }
      }));
    }
    const strTypes = match.params.types || types.join();
    let typesIds = [];
    let typesArr = []
    if(strTypes !== '' && strTypes !== '*') {
      typesIds = strTypes.split(',');
    }
    getMedia(strFrom, strTo, profileId, strTags, strTypes);
    setFilters(strFrom, strTo, profileObj);
    setTagsFilter(tagsArr)
    setTypesFilter(typesIds)
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
      const profileId = match.params.id || profile.value;
      const strTags = match.params.tags || tags.join();
      const strTypes = match.params.types || types.join();
      getMedia(strFrom, strTo, profileId, strTags, strTypes);
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
    console.log(profile)
    const profileId = (typeof profile.value !== 'undefined' && profile.value !== '') ? profile.value : "*";
    const strTags = tags.map(tag => tag.id).join() || "*";
    // getMedia(strFrom, strTo, profileId, tags, types);
    history.push(`/apps/media/${profileId}/${strFrom}/${strTo}/${strTags}/${types.join()}`);
  };

  loadNextPage = isVisible => {
    const { from, to, profile, match, tags, types, getMedia, page } = this.props;
    if (isVisible && page) {
      const strFrom = match.params.from || moment(from).toISOString();
      const strTo = match.params.to || moment(to).toISOString();
      const profileId = match.params.id || profile.value;
      const strTags = match.params.tags || tags.join();
      const strTypes = match.params.types || types.join();
      getMedia(strFrom, strTo, profileId, strTags, strTypes, page);
    }
  };

  render() {
    const { from, to, tags, types, profile, media, page } = this.props;
    const {
      fromChange,
      toChange,
      profileChange,
      tagsChange,
      typesChange,
      handleClick,
      loadNextPage
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
        content={<MediaAppList media={media} page={page} loadNextPage={loadNextPage} />}
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
