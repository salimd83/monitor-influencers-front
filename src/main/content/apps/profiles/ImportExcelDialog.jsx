import React, { Component } from "react";
import { Dialog, Typography, LinearProgress } from "@material-ui/core";
import { FuseAnimateGroup } from "@fuse";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dropzone from "react-dropzone";
import XLSX from "xlsx";
import { simpleCall } from "../../../../fn/simpleCall";

let errors = "";

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export class ImportExcelDialog extends Component {
  state = {
    file: null,
    totalProfiles: 0,
    terminalMsg: "",
    completed: 0
  };

  getTypeaheadIdFromName = async (name, type) => {
    try {
      const res = await simpleCall("get", `typeahead/${type}`, { q: name });
      const industries = res.data.filter(ind => ind.name === name);
      return industries[0] ? industries[0].id : null;
    } catch (err) {
      console.log(`${type}/${name} ${err}`);
      errors = `${errors} \n ${type}/${name} ${err}`;
    }
  };

  onDrop = files => {
    var reader = new FileReader();
    reader.onload = async e => {
      var rawData = reader.result;
      const workbook = XLSX.read(rawData, { type: "binary" });
      var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

      const profiles = data.map((row, i) => {
        if (i === 0) return;
        const profile = {};
        row.forEach((col, i) => {
          profile[data[0][i].trim().replace(" ", "_")] = col;
        });
        return profile;
      });

      profiles.shift();

      this.setState({
        file: files[0],
        totalProfiles: profiles.length,
        terminalMsg: `Preparing to upload...`
      });

      await Promise.all(
        profiles.map(async (profile, i) => {
          const {
            tags,
            link_facebook,
            link_instagram,
            link_twitter,
            link_website,
            owner_id,
            profile_tags,
            ...profileFiltered
          } = profile;

          const typeahead = ["industry", "country", "location", "category"];
          try {
            await Promise.all(
              typeahead.map(async type => {
                const name = profileFiltered[type];
                const id = await this.getTypeaheadIdFromName(name, type);
                profileFiltered[type] = id;
                delete profileFiltered.status;
                if (!id) return;
              })
            );
          } catch (err) {
            console.log(err);
          }

          let newProfileId;
          try {
            const res = await simpleCall("post", `si/profiles`, { ...profileFiltered });
            newProfileId = res.data.id;

            const links = [
              { title: `facebook / ${link_facebook}`.substring(0, 30), value: link_facebook, type: "facebook" },
              { title: `instagram / ${link_instagram}`.substring(0, 30), value: link_instagram, type: "instagram" },
              { title: `twitter / ${link_twitter}`.substring(0, 30), value: link_twitter, type: "twitter" },
              { title: `website / ${link_website}`.substring(0, 30), value: link_website, type: "website" }
            ];

            try {
              await Promise.all(
                links.map(async link => {
                  await simpleCall("post", `si/profile/${newProfileId}/links`, link);
                })
              );
            } catch (err) {
              console.log(err);
              errors = `${errors} \n ${profileFiltered.first_name} ${profileFiltered.last_name} - ${err}`;
            }

            const tagsId = [];

            await Promise.all(
              profile_tags.split(",").map(async tag => {
                const id = await this.getTypeaheadIdFromName(tag, "profile_tag");
                if (id !== null) tagsId.push(id);
              })
            );

            try {
              await Promise.all(
                tagsId.map(async tagId => {
                  await simpleCall("post", `si/profile/${newProfileId}/tags`, { tag_id: tagId });
                })
              );
            } catch (err) {
              console.log(err);
              errors = `${errors} \n ${profileFiltered.first_name} ${profileFiltered.last_name} - ${err}`;
            }

            this.setState(prevState => ({
              terminalMsg: `Uploading profile ${i + 1}`,
              completed: prevState.completed + 100 / profiles.length
            }));
          } catch (err) {
            console.log(err);
            errors = `${errors} \n ${profileFiltered.first_name} ${profileFiltered.last_name} - ${err}`;
          }

          console.log(profileFiltered);
        })
      );

      this.setState({
        terminalMsg: "Import completed"
      });

      console.log(profiles);
      download('error-log', errors)
    };
    reader.readAsBinaryString(files[0]);
  };

  render() {
    const { open, close } = this.props;
    const { file, totalProfiles, terminalMsg, completed } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          onClose={() => {
            close();
            this.setState({
              file: null,
              totalProfiles: 0,
              terminalMsg: "",
              completed: 0
            });
          }}
          aria-labelledby="Profile delete confirmation"
          aria-describedby="are you sure you want delete this profile?"
        >
          <DialogContent style={{ width: 400 }}>
            <div id="import-dialog-content">
              {!file && (
                <div className="dropzone">
                  <Typography variant="title" className="mb-8">
                    Import Profile
                  </Typography>
                  <Dropzone
                    onDrop={this.onDrop}
                    style={{
                      width: 360,
                      height: 250,
                      border: "#999 4px dashed",
                      padding: 40,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <p>Try dropping an excel files here, or click to select files to upload.</p>
                  </Dropzone>
                </div>
              )}

              {file && (
                <FuseAnimateGroup
                  enter={{
                    animation: "transition.fadeIn",
                    duration: 400
                  }}
                  leave={{
                    animation: "transition.fadeOut",
                    duration: 400
                  }}
                >
                  <aside>
                    <Typography variant="title" className="mb-8">
                      Dropped files
                    </Typography>
                    <Typography>
                      <code style={{ color: "green" }}>{file.name}</code> - {file.size} bytes
                    </Typography>
                    <div className="terminal my-8">
                      <Typography>{totalProfiles} profiles found</Typography>

                      <div style={{ width: "100%" }} className="py-8">
                        <Typography className="pb-4">{terminalMsg}</Typography>
                        <LinearProgress variant="determinate" value={completed} />
                        {errors.length > 0 && <Typography color="error" className="pt-4">Some errors occured while uploading profiles</Typography>}
                      </div>
                    </div>
                  </aside>
                </FuseAnimateGroup>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default ImportExcelDialog;
