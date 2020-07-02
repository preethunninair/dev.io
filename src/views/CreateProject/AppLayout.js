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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
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
const SIZEMAP = { "0": "XS", "1": "S", "2": "M", "3": "L", "4": "XL" };
const SIZEMAPINVERSE = { XS: 0, S: 1, M: 2, L: 3, XL: 4 };

const SHT = [
  { value: "SLT0", label: "Text Highlight" },
  { value: "SLT1_ROUNDED", label: "Rounded Highlight" },
  { value: "SLT1", label: "Flat Highlight" },

  { value: "SLT2", label: "Fill Highlight" },
];

const SMP = [
  { value: "SNS", label: "Sidebar Submenu" },
  { value: "TNS", label: "Topnav Menu" },
];
const THT = [
  { value: "LT0", label: "Text Highlight" },
  { value: "LT1", label: "Flat Highlight" },
  { value: "LT2", label: "Rounded Highlight" },
  { value: "LT3", label: "Fill Highlight" },
];
const TIC = [
  { value: "_ICONSTACK", label: "Stack Icon" },
  { value: "_ICONONLYHIGHLIGHT", label: "Icon with Tooltip" },
  { value: "_ICONONLY", label: "Icon Only" },

  { value: "_NOICON", label: "Text Only" },
  { value: "_ICOLAB", label: "Icon + Label" },
];
const SBS = [
  {
    label: "FLOATING RIGHT",
    value: {
      placement: "RIGHT",
      width: "15vw",
      floating: true,
      hash: "FR",
    },
  },
  {
    label: "FIXED RIGHT",
    value: {
      placement: "RIGHT",
      width: "15vw",
      floating: false,
      hash: "FIR",
    },
  },
  {
    label: "FIXED LEFT",
    value: {
      placement: "LEFT",
      width: "15vw",
      floating: false,
      hash: "FL",
    },
  },
];
class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templateIndex: 0,
      templateCopy: TEMPLATES,
      dropdownOpen: false,
      sidenavCtrl: false,
      topnavCtrl: false,
      colorCtrl: true,
    };
  }
  toggleTemplateDropDown = () => {
    this.setState((prevState) => ({ dropdownOpen: !prevState.dropdownOpen }));
  };
  getTemplateConfig() {
    return this.state.templateCopy[this.state.templateIndex];
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.wizardIndex != this.props.wizardIndex &&
      this.props.wizardIndex == 1
    ) {
      this.props.dispatch(
        updateSelectedTemplate(
          this.state.templateCopy[this.state.templateIndex]
        )
      );
    }
  }
  handleNavlinkColorChange = (color, attr) => {
    const temp = [...this.state.templateCopy];

    let colorStr = color.hex;
    if (color.rgb.a !== 1) {
      colorStr = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    }

    temp.forEach((template) => {
      template[`${attr}HighlightColor`] = colorStr;
    });

    this.setState({ templateCopy: temp });
  };

  handleColorChange = (color, attr) => {
    const temp = [...this.state.templateCopy];
    let colorStr = color.hex;
    if (color.rgb.a !== 1) {
      colorStr = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    }

    temp.forEach((template) => {
      template[`${attr}BgColor`] = colorStr;
      template[`${attr}Theme`] = tinycolor(colorStr).isDark()
        ? "dark"
        : "light";
    });

    this.setState({ templateCopy: temp });
  };
  selectSBStyle = (e) => {
    const temp = [...this.state.templateCopy];
    temp[this.state.templateIndex].searchbarConfig = e.value;
    if (e.value.placement == "LEFT") {
      temp[this.state.templateIndex].submenuConfig = "SNS";
    }
    this.setState({ templateCopy: temp });
  };
  selectHighlight = (type, elem) => {
    const temp = [...this.state.templateCopy];
    const configIndex = temp[this.state.templateIndex][
      `${elem}linktemplate`
    ].indexOf("_");
    let selection = type.value;
    if (configIndex > -1 && elem == "navbar") {
      selection += `_${
        temp[this.state.templateIndex][`${elem}linktemplate`].split("_")[1]
      }`;
    }
    temp[this.state.templateIndex][`${elem}linktemplate`] = selection;
    this.setState({ templateCopy: temp });
  };
  changeAttribute = (e, attr) => {
    const temp = [...this.state.templateCopy];
    temp[this.state.templateIndex][`${attr}`] = e.value;

    this.setState({ templateCopy: temp });
  };
  selectIconConfig = (e) => {
    const temp = [...this.state.templateCopy];

    temp[this.state.templateIndex]["navbarlinktemplate"] =
      temp[this.state.templateIndex]["navbarlinktemplate"].split("_")[0] +
      e.value;

    this.setState({ templateCopy: temp });
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
  setAppMode = () => {
    const temp = [...this.state.templateCopy];

    if (temp[this.state.templateIndex]["appMode"] != "dark") {
      temp[this.state.templateIndex]["appMode"] = "dark";
    } else {
      temp[this.state.templateIndex]["appMode"] = "light";
    }

    this.setState({ templateCopy: temp });
  };
  roundedToggle = () => {
    const temp = [...this.state.templateCopy];

    if (temp[this.state.templateIndex]["rounded"] != "FALSE") {
      temp[this.state.templateIndex]["rounded"] = "FALSE";
    } else {
      temp[this.state.templateIndex]["rounded"] =
        temp[this.state.templateIndex]["boxed"];
    }

    this.setState({ templateCopy: temp });
  };

  applySize = (e, elem) => {
    const temp = [...this.state.templateCopy];

    temp[this.state.templateIndex][`${elem}size`] =
      SIZEMAP[`${e.target.value}`];

    this.setState({ templateCopy: temp });
  };

  render() {
    const { templateCopy, templateIndex } = this.state;
    return (
      <div
        className={`${
          this.props.wizardIndex == 0 ? "" : "d-none "
        }page-grid layout-editor`}
      >
        <div className="leftpanel p-2">
          <Card className="h-100">
            <CardHeader className="text-left">
              <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleTemplateDropDown}
              >
                <DropdownToggle tag="div" className="pointer" caret>
                  <CardSubtitle style={{ fontSize: "10px" }}>
                    Template Name
                  </CardSubtitle>
                  <CardTitle tag="h3" className="text-highlight">
                    {TEMPLATES[templateIndex].templateName}
                  </CardTitle>
                </DropdownToggle>
                <DropdownMenu
                  style={{
                    height: "500px",
                    overflowX: "hidden",
                    overflowY: "auto",
                  }}
                >
                  {this.state.templateCopy.map((tempName, i) => (
                    <DropdownItem
                      onClick={() => this.setState({ templateIndex: i })}
                      key={i}
                    >
                      {tempName.templateName}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
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
                <li
                  className="pointer"
                  onClick={() =>
                    this.setState((prevState) => ({
                      colorCtrl: !prevState.colorCtrl,
                    }))
                  }
                >
                  <h4>Color Palette</h4>
                </li>
                <Collapse
                  style={{ background: "#1e1e2f" }}
                  className="p-2"
                  isOpen={this.state.colorCtrl}
                >
                  <ul className="list-unstyled">
                    <li>
                      <p>App Background</p>
                      <div className="d-flex">
                        <CirclePicker
                          width="unset"
                          circleSize={15}
                          onChange={(color, event) =>
                            this.handleColorChange(color, "app")
                          }
                          colors={["#1e1e2f", "#171725", "#ffffff", "#f2f2f2"]}
                        />
                        <ColorPicker
                          src={"app"}
                          handleColorChange={this.handleColorChange}
                        />
                      </div>
                    </li>
                    <li>
                      <p>Logo Background</p>
                      <div className="d-flex">
                        <CirclePicker
                          width="unset"
                          circleSize={15}
                          onChange={(color, event) =>
                            this.handleColorChange(color, "logo")
                          }
                          colors={["#1e1e2f", "#171725", "#ffffff", "#f2f2f2"]}
                        />
                        <ColorPicker
                          src={"logo"}
                          handleColorChange={this.handleColorChange}
                        />
                      </div>
                    </li>
                    <li>
                      <p>Topnav Background</p>
                      <div className="d-flex">
                        <CirclePicker
                          width="unset"
                          circleSize={15}
                          onChange={(color, event) =>
                            this.handleColorChange(color, "navbar")
                          }
                          colors={["#1e1e2f", "#171725", "#ffffff", "#f2f2f2"]}
                        />
                        <ColorPicker
                          src={"navbar"}
                          handleColorChange={this.handleColorChange}
                        />
                      </div>
                    </li>
                    <li>
                      <p>Sidenav Background</p>
                      <div className="d-flex">
                        <CirclePicker
                          width="unset"
                          circleSize={15}
                          onChange={(color, event) =>
                            this.handleColorChange(color, "sidebar")
                          }
                          colors={["#1e1e2f", "#171725", "#ffffff", "#f2f2f2"]}
                        />
                        <ColorPicker
                          src={"sidebar"}
                          handleColorChange={this.handleColorChange}
                        />
                      </div>
                    </li>
                  </ul>
                </Collapse>
                {templateCopy[templateIndex].padded != "FALSE" ||
                templateCopy[templateIndex].templateName.indexOf("Floating") >
                  -1 ? (
                  <li>
                    <div className="custom-control mt-1 d-flex align-items-center custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck"
                        name="example1"
                        checked={templateCopy[templateIndex].rounded != "FALSE"}
                        onChange={this.roundedToggle}
                      />
                      <label
                        className="custom-control-label pt-1"
                        htmlFor="customCheck"
                      >
                        Rounded Theme
                      </label>
                    </div>
                  </li>
                ) : null}

                <li>
                  <h4>Submenu Placement</h4>
                  <Select
                    className="react-select info"
                    classNamePrefix="react-select"
                    isDisabled={
                      templateCopy[templateIndex].searchbarConfig.placement ==
                      "LEFT"
                    }
                    onChange={(e) => this.changeAttribute(e, "submenuConfig")}
                    value={
                      SMP.filter(
                        (item) =>
                          item.value ==
                          templateCopy[templateIndex].submenuConfig
                      )[0]
                    }
                    options={SMP}
                  />
                </li>
                {templateCopy[templateIndex].layout.indexOf("SIDE") > -1 ? (
                  <>
                    <li
                      onClick={() =>
                        this.setState((prevState) => ({
                          sidenavCtrl: !prevState.sidenavCtrl,
                        }))
                      }
                    >
                      <h4>Sidenav Settings</h4>
                    </li>
                    <Collapse
                      style={{ background: "#1e1e2f" }}
                      className="p-2"
                      isOpen={this.state.sidenavCtrl}
                    >
                      <ul className="list-unstyled">
                        {templateCopy[templateIndex].template.indexOf("S0") ==
                        -1 ? (
                          <li>
                            <label className="text-white" htmlFor="sidWidth">
                              Sidenav Width
                            </label>
                            <input
                              type="range"
                              className="custom-range"
                              min="0"
                              max="2"
                              step="1"
                              value={
                                SIZEMAPINVERSE[
                                  templateCopy[templateIndex].sidebarsize
                                ]
                              }
                              onChange={(e) => this.applySize(e, "sidebar")}
                              id="sidWidth"
                            />
                          </li>
                        ) : null}
                        <li>
                          <p>Sidenav Highlight Template</p>
                          <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            onChange={(e) => this.selectHighlight(e, "sidebar")}
                            value={
                              SHT.filter(
                                (item) =>
                                  item.value ==
                                  templateCopy[templateIndex]
                                    .sidebarlinktemplate
                              )[0]
                            }
                            options={SHT}
                          />
                        </li>
                        {templateCopy[
                          templateIndex
                        ].sidebarlinktemplate.indexOf("SLT0") === -1 ? (
                          <li>
                            <p>Sidenav Link Highlight Bg Color</p>
                            <div className="d-flex position-relative">
                              <CirclePicker
                                width="unset"
                                circleSize={15}
                                onChange={(color, event) =>
                                  this.handleNavlinkColorChange(color, "sideBg")
                                }
                                colors={["#1e1e2f", "#171725", "#ffffff"]}
                              />
                              <ColorPicker
                                src={"sideBg"}
                                handleColorChange={
                                  this.handleNavlinkColorChange
                                }
                              />
                            </div>
                          </li>
                        ) : null}

                        <li>
                          <p>Sidenav Link Highlight Text Color</p>
                          <div className="d-flex position-relative">
                            <CirclePicker
                              width="unset"
                              circleSize={15}
                              onChange={(color, event) =>
                                this.handleNavlinkColorChange(color, "sideText")
                              }
                              colors={["#1e1e2f", "#171725", "#ffffff"]}
                            />
                            <ColorPicker
                              src={"sideText"}
                              handleColorChange={this.handleNavlinkColorChange}
                            />
                          </div>
                        </li>
                      </ul>
                    </Collapse>
                  </>
                ) : null}
                {/* <li>
                  <p>Searchbar Style</p>
                  <Select
                    className="react-select info"
                    classNamePrefix="react-select"
                    onChange={(e) => this.selectSBStyle(e)}
                    value={
                      SBS.filter(
                        (item) =>
                          item.value.hash ==
                          templateCopy[templateIndex].searchbarConfig.hash
                      )[0]
                    }
                    options={SBS}
                  />
                </li> */}
                <li
                  className="pointer"
                  onClick={() =>
                    this.setState((prevState) => ({
                      topnavCtrl: !prevState.topnavCtrl,
                    }))
                  }
                >
                  <h4>Topnav Settings</h4>
                </li>
                <Collapse
                  style={{ background: "#1e1e2f" }}
                  className="p-2"
                  isOpen={this.state.topnavCtrl}
                >
                  <ul className="list-unstyled">
                    <li>
                      <label className="text-white" htmlFor="navWidth">
                        Topnav Height
                      </label>
                      <input
                        type="range"
                        className="custom-range"
                        min={
                          templateCopy[templateIndex].templateName.indexOf(
                            "Topnav"
                          ) == -1
                            ? "0"
                            : "0"
                        }
                        max={
                          templateCopy[templateIndex].templateName.indexOf(
                            "Topnav"
                          ) == -1
                            ? "4"
                            : "4"
                        }
                        step="1"
                        value={
                          SIZEMAPINVERSE[templateCopy[templateIndex].navbarsize]
                        }
                        onChange={(e) => this.applySize(e, "navbar")}
                        id="navWidth"
                      />
                    </li>
                    {templateCopy[templateIndex].layout == "TOP_NAVIGATION" ||
                    templateCopy[templateIndex].submenuConfig == "TNS" ? (
                      <>
                        <li>
                          <p>Topnav Highlight Template</p>
                          <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            onChange={(e) => this.selectHighlight(e, "navbar")}
                            value={
                              THT.filter(
                                (item) =>
                                  templateCopy[
                                    templateIndex
                                  ].navbarlinktemplate.indexOf(item.value) > -1
                              )[0]
                            }
                            options={THT}
                          />
                        </li>

                        {templateCopy[templateIndex].navbarlinktemplate.indexOf(
                          "LT0"
                        ) === -1 ? (
                          <li>
                            <p>Topnav Link Highlight Bg Color</p>
                            <div className="d-flex position-relative">
                              <CirclePicker
                                width="unset"
                                circleSize={15}
                                onChange={(color, event) =>
                                  this.handleNavlinkColorChange(color, "navBg")
                                }
                                colors={["#1e1e2f", "#171725", "#ffffff"]}
                              />
                              <ColorPicker
                                src={"navBg"}
                                handleNavlinkColorChange={
                                  this.handleNavlinkColorChange
                                }
                              />
                            </div>
                          </li>
                        ) : null}

                        <li>
                          <p>Topnav Link Highlight Text Color</p>
                          <div className="d-flex position-relative">
                            <CirclePicker
                              width="unset"
                              circleSize={15}
                              onChange={(color, event) =>
                                this.handleNavlinkColorChange(color, "navText")
                              }
                              colors={["#1e1e2f", "#171725", "#ffffff"]}
                            />
                            <ColorPicker
                              src={"navText"}
                              handleNavlinkColorChange={
                                this.handleNavlinkColorChange
                              }
                            />
                          </div>
                        </li>

                        <li>
                          <p>Topnav Icon Config</p>
                          <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            onChange={(e) => this.selectIconConfig(e)}
                            value={
                              TIC.filter(
                                (item) =>
                                  templateCopy[
                                    templateIndex
                                  ].navbarlinktemplate.indexOf(item.value) > -1
                              )[0]
                            }
                            options={TIC}
                          />
                        </li>
                      </>
                    ) : null}
                  </ul>
                </Collapse>
              </ul>
            </CardBody>
            <CardFooter className="flex-row justify-content-between d-flex">
              <button
                disabled={templateIndex == 0}
                className="circle border-primary bg-transparent text-primary"
                onClick={() =>
                  this.setState((prevState) => ({
                    templateIndex: prevState.templateIndex - 1,
                  }))
                }
              >
                <Icon
                  iconObj={{
                    family: "material-icon",
                    name: "chevron_left",
                  }}
                />
              </button>
              <button
                className="circle border-primary bg-transparent text-primary"
                onClick={() =>
                  this.setState((prevState) => {
                    this.initializeDropdownEventHandler();
                    return {
                      templateIndex: prevState.templateIndex + 1,
                    };
                  })
                }
              >
                <Icon
                  iconObj={{
                    family: "material-icon",
                    name: "chevron_right",
                  }}
                />
              </button>
            </CardFooter>
          </Card>
        </div>
        <div className="workbench rounded p-3">
          <TemplateView
            MENUDATA={MENUDATA}
            config={{ ...templateCopy[templateIndex] }}
          />
        </div>
      </div>
    );
  }
}
export default connect()(AppLayout);
