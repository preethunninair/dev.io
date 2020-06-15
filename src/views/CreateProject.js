import React from "react";
import Input from "../components/uilibrary/formcomponent/Input";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Row,
  Col,
} from "reactstrap";
import axios from "../library/axiosInstance";
import Icon from "../components/uilibrary/Icon";
class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.initializeProject = this.initializeProject.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.uploadedImage = React.createRef();
    this.imageUploader = React.createRef();
    this.state = {
      appName: "",
      file: null,
    };
  }

  setFieldValue(e) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }
  initializeProject() {
    axios
      .post("/initProject", {
        appName: this.state.appName,
        logoFile: this.state.file,
      })
      .then(() => {})
      .catch(() => {});
  }
  handleImageUpload(e) {
    const [file] = e.target.files;
    if (file) {
      const data = new FormData();
      data.append("file", e.target.files[0]);

      const reader = new FileReader();
      const { current } = this.uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      this.setState({ file: data });
      reader.readAsDataURL(file);
    }
  }
  render() {
    if (this.state.status) {
      return <Redirect to="/editproject/admin" />;
    }
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="card-contributions h-50 w-50">
          <CardHeader>
            <Row>
              <Col className="text-left" sm="12">
                <CardTitle tag="h4" style={{ fontWeight: "200" }}>
                  dev.<span style={{ color: "red" }}>io</span>
                </CardTitle>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="py-0">
            <div class="d-flex px-5 center justify-content-between h-100 flex-column">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    height: "100px",
                    width: "100px",

                    position: "relative",
                  }}
                  class="bg-transparent rounded border border-primary"
                  onClick={() => this.imageUploader.current.click()}
                >
                  <input
                    type="file"
                    style={{
                      display: "none",
                    }}
                    accept="image/*"
                    onChange={(e) => this.handleImageUpload(e)}
                    multiple="false"
                    ref={this.imageUploader}
                  />
                  <img
                    ref={this.uploadedImage}
                    className="p-2"
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                    }}
                  />
                </div>

                <Icon
                  className="position-absolute pointer"
                  iconObj={{
                    family: "linericons",
                    name: "lnr lnr-plus-circle",
                  }}
                />
              </div>
              <Input
                text="App Name"
                ref="appName"
                value={this.state.appName}
                name="appName"
                validator={true}
                onChange={this.setFieldValue}
                mandatory
                emptyMessage="App name can't be empty"
              />
            </div>
          </CardBody>
          <hr class="m-0" />
          <CardFooter className="center" style={{ height: "70px" }}>
            <Button
              color="primary"
              size="lg"
              block
              onClick={this.initializeProject}
            >
              Initialize
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default CreateProject;
