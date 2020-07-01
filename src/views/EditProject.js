import React from "react";
import { ButtonGroup, Button } from "reactstrap";
import Icon from "../components/uilibrary/Icon";
import AppLayout from "./CreateProject/AppLayout";
import Routes from "./CreateProject/Routes";
import GenerateProject from "./CreateProject/GenerateProject";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../library/axiosInstance";
import ColorPalette from "./CreateProject/ColorPalette";
const mapState = (state) => ({
  config: state.templateConfig.templateConfig,
  route: state.templateConfig.route,
});
class EditProject extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleAppMode = this.toggleAppMode.bind(this);
    this.statusCode = this.statusCode.bind(this);
    this.generateProject = this.generateProject.bind(this);
    this.state = {
      appMode: "",
      wizardIndex: 0,
      generateStatus: [],
    };
  }

  statusCode(status) {
    switch (status) {
      case 0:
        this.setState((prevState) => ({
          generateStatus: [...prevState.generateStatus, "Generating Project"],
        }));
        break;
      case 1:
        this.setState((prevState) => ({
          generateStatus: [
            ...prevState.generateStatus,
            "Project Created Successfully !",
          ],
        }));

        break;
      case 2:
        this.setState((prevState) => ({
          generateStatus: [
            ...prevState.generateStatus,
            "Applying configuration",
          ],
        }));

        break;
      case 3:
        this.setState((prevState) => ({
          generateStatus: [...prevState.generateStatus, "Creating Routes"],
        }));

        break;
      case 4:
        this.setState((prevState) => ({
          generateStatus: [...prevState.generateStatus, "Done"],
        }));

        break;
    }
  }
  componentDidMount() {
    const appMode = localStorage.getItem("appMode")
      ? localStorage.getItem("appMode")
      : "dark";
    this.setAppMode(appMode);
  }
  generateProject() {
    this.statusCode(0);
    axios
      .post("/generateProject", {
        config: this.props.config,
        route: this.props.route,
      })
      .then((res) => {
        setTimeout(() => this.statusCode(1), 1000);
        setTimeout(() => this.statusCode(2), 2000);
        setTimeout(() => this.statusCode(3), 3000);
        setTimeout(() => this.statusCode(4), 4000);
      });
  }
  setAppMode(mode) {
    document
      .getElementsByClassName("wrapper")[0]
      .setAttribute("data-appmode", mode);
    this.setState({ appMode: mode });
  }
  toggleAppMode() {
    if (this.state.appMode === "dark") {
      this.setAppMode("light");
      localStorage.setItem("appMode", "light");
    } else {
      this.setAppMode("dark");
      localStorage.setItem("appMode", "dark");
    }
  }
  wizardView(counter) {
    this.setState((prevState) => ({
      wizardIndex: prevState.wizardIndex + counter,
    }));
  }
  render() {
    const { appMode, wizardIndex } = this.state;
    return (
      <div className="editor">
        <div className="app-brand">
          <div
            className="brand-img pl-0 center text-center h-100"
            data-theme={"dark"}
            style={{ fontSize: "22px" }}
          >
            &#60;&#47;&#62; dev.<span style={{ color: "red" }}>io</span>
          </div>
        </div>
        <div className="app-header">
          <nav
            data-theme="transparent"
            className="navbar-absolute  navbar navbar-expand-lg px-0"
          >
            <div className="container-fluid px-0">
              <div className="navbar-wrapper">
                <a
                  className="navbar-brand"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="brand-img d-flex align-items-center h-100">
                    <img src={this.props.logo} alt="react-logo" />
                    dev.io
                  </div>
                </a>
              </div>

              <div className="collapse navbar-collapse">
                <ul className="navbar-nav m-auto page-nav">
                  <li className="nav-item">
                    <a className="nav-link">
                      <Icon
                        className={wizardIndex == 0 ? "text-highlight" : ""}
                        iconObj={{
                          family: "material-icon",
                          name: "view_compact",
                        }}
                      />
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link">
                      <Icon
                        className={wizardIndex == 1 ? "text-highlight" : ""}
                        iconObj={{
                          family: "material-icon",
                          name: "account_tree",
                        }}
                      />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">
                      <Icon
                        className={wizardIndex == 2 ? "text-highlight" : ""}
                        iconObj={{
                          family: "material-icon",
                          name: "assignment_turned_in",
                        }}
                      />
                    </a>
                  </li>
                </ul>
                <ul className="ml-auto form-inline navbar-nav">
                  <li className="nav-item">
                    <a
                      className="nav-link pointer"
                      onClick={this.toggleAppMode}
                    >
                      <Icon
                        iconObj={{
                          family: "material-icon",
                          name:
                            appMode === "light"
                              ? "brightness_3"
                              : "brightness_1",
                        }}
                      />
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link pointer">
                      <Icon
                        iconObj={{
                          family: "material-icon",
                          name: "menu_open",
                        }}
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="app-main">
          <AppLayout wizardIndex={wizardIndex} />

          <Routes wizardIndex={wizardIndex} />
          <GenerateProject
            msg={this.state.generateStatus}
            wizardIndex={wizardIndex}
          />
          <div className="editor-footer center" style={{ height: "50px" }}>
            <ButtonGroup className="ml-auto">
              <Button
                color="primary"
                disabled={wizardIndex == 0}
                onClick={() => this.wizardView(-1)}
              >
                Previous
              </Button>
              <Button
                color="primary"
                disabled={wizardIndex == 2}
                onClick={() => this.wizardView(1)}
              >
                Next
              </Button>
            </ButtonGroup>
            <Button
              color="success"
              disabled={wizardIndex != 2}
              onClick={this.generateProject}
              className="ml-auto mr-3"
            >
              Generate
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapState)(EditProject);
