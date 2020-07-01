import React from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Row,
  Col,
  CardSubtitle,
} from "reactstrap";
import { MENUDATA } from "../../variables/mockdata";

import { CirclePicker } from "react-color";
import Icon from "../../components/uilibrary/Icon";
import TemplateView from "./TemplateView";
import tinycolor from "tinycolor2";
import Select from "react-select";
import { TEMPLATES } from "../../variables/template_file";
import ColorPicker from "../../components/ColorPicker";
import { connect } from "react-redux";
import { updateSelectedTemplate } from "../../redux/actions/createProjectActions";

const mapState = (state) => ({
  selectedConfig: state.templateConfig.templateConfig,
});
class ColorPalette extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sideBgHighlightColor: "",
      navBgHighlightColor: "",
      navTextHighlightColor: "",
      sideTextHighlightColor: "",
    };
  }
  getTemplateConfig() {
    return this.state.templateCopy[this.state.templateIndex];
  }

  handleColorChange = (color, attr) => {
    let colorStr = color.hex;
    if (color.rgb.a !== 1) {
      colorStr = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    }

    this.setState({ [`${attr}HighlightColor`]: colorStr });
  };

  initializeDropdownEventHandler() {
    let dropdowns = document.querySelectorAll('a[data-toggle="dropdown"]');
    dropdowns.forEach((elem, i) => {
      elem.addEventListener("click", function (e) {
        var current = document.querySelectorAll("li.show");
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" show", "");
        }
        e.target.setAttribute("listener", "true");
        e.currentTarget.parentNode.className += " show";
      });
    });
  }

  componentDidMount() {
    let appContent = document.getElementsByClassName("layout-editor");
    appContent[0].addEventListener("click", function (e) {
      if (
        !(e.target.closest("li") != undefined && e.target.closest("li") != null)
      ) {
        var current = document.querySelectorAll("li.show");
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" show", "");
        }
      }
    });

    this.initializeDropdownEventHandler();
  }

  render() {
    return (
      <div
        className={`${
          this.props.wizardIndex == 1 ? "" : "d-none "
        }page-grid layout-editor`}
      >
        <div className="leftpanel p-2">
          <Card className="h-100">
            <CardHeader className="text-left">
              <CardSubtitle style={{ fontSize: "10px" }}></CardSubtitle>
              <CardTitle tag="h3" className="text-highlight">
                Color Palette
              </CardTitle>
            </CardHeader>
            <CardBody className="px-1">
              <ul
                className="list-unstyled p-2 layout-control"
                style={{
                  height: "97%",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                {this.props.selectedConfig.submenuConfig == "TNS" ? (
                  <li>
                    <p>Navbar Link Highlight Bg Color</p>
                    <div className="d-flex">
                      <CirclePicker
                        width="unset"
                        circleSize={15}
                        onChange={(color, event) =>
                          this.handleColorChange(color, "navBg")
                        }
                        colors={["#1e1e2f", "#171725", "#ffffff"]}
                      />
                      <ColorPicker
                        src={"navBg"}
                        handleColorChange={this.handleColorChange}
                      />
                    </div>
                  </li>
                ) : null}
                {this.props.selectedConfig.submenuConfig == "TNS" ? (
                  <li>
                    <p>Navbar Link Highlight Text Color</p>
                    <div className="d-flex">
                      <CirclePicker
                        width="unset"
                        circleSize={15}
                        onChange={(color, event) =>
                          this.handleColorChange(color, "navText")
                        }
                        colors={["#1e1e2f", "#171725", "#ffffff"]}
                      />
                      <ColorPicker
                        src={"navText"}
                        handleColorChange={this.handleColorChange}
                      />
                    </div>
                  </li>
                ) : null}
                {this.props.selectedConfig.layout !== "TOP_NAVIGATION" ? (
                  <li>
                    <p>Sidebar Link Highlight Bg Color</p>
                    <div className="d-flex">
                      <CirclePicker
                        width="unset"
                        circleSize={15}
                        onChange={(color, event) =>
                          this.handleColorChange(color, "sideBg")
                        }
                        colors={["#1e1e2f", "#171725", "#ffffff"]}
                      />
                      <ColorPicker
                        src={"sideBg"}
                        handleColorChange={this.handleColorChange}
                      />
                    </div>
                  </li>
                ) : null}
                {this.props.selectedConfig.layout !== "TOP_NAVIGATION" ? (
                  <li>
                    <p>Sidebar Link Highlight Text Color</p>
                    <div className="d-flex">
                      <CirclePicker
                        width="unset"
                        circleSize={15}
                        onChange={(color, event) =>
                          this.handleColorChange(color, "sideText")
                        }
                        colors={["#1e1e2f", "#171725", "#ffffff"]}
                      />
                      <ColorPicker
                        src={"sideText"}
                        handleColorChange={this.handleColorChange}
                      />
                    </div>
                  </li>
                ) : null}
                <li>
                  <p>Card Default Background</p>
                  <div className="d-flex">
                    <CirclePicker
                      width="unset"
                      circleSize={15}
                      onChange={(color, event) =>
                        this.bgColorHandler(color, "card")
                      }
                      colors={["#1e1e2f", "#171725", "#ffffff"]}
                    />
                    <ColorPicker
                      src={"navbar"}
                      handleColorChange={this.handleColorChange}
                    />
                  </div>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
        <div className="workbench rounded p-3">
          <TemplateView
            MENUDATA={MENUDATA}
            config={Object.assign({}, this.props.selectedConfig, this.state)}
          />
        </div>
      </div>
    );
  }
}
export default connect(mapState)(ColorPalette);
