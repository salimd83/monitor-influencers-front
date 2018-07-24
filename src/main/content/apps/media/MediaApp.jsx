import React, { Component } from "react";
import { FusePageCarded } from "@fuse";
import MediaAppHeader from "./MediaAppHeader";
import MediaAppList from './MediaAppList'


export class MediaApp extends Component {
  render() {
    return (
      <FusePageCarded
        header={<MediaAppHeader />}
        content={<MediaAppList />}
        sidebarInner
        onRef={instance => {
          this.pageLayout = instance;
        }}
      />
    );
  }
}

export default MediaApp;
