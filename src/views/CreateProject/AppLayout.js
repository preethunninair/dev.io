import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardSubtitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from "reactstrap";

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
  { value: "SLT1_ROUND", label: "Round Highlight" },

  { value: "SLT1_ROUNDED", label: "Rounded Highlight" },
  { value: "SLT1", label: "Flat Highlight" },

  { value: "SLT2", label: "Fill Highlight" },
];

const SMP = [
  { value: "SNS", label: "Sidebar Sidemenu" },
  { value: "SNB", label: "Sidebar Submenu" },
  { value: "TNS", label: "Topnav Menu" },
];
const THT = [
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
      prevProps.wizardIndex !== this.props.wizardIndex &&
      this.props.wizardIndex === 1
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
      template[`${attr}Color`] = colorStr;
    });

    this.setState({ templateCopy: temp });
  };
  handlepageNavBGChange = (color) => {
    const temp = [...this.state.templateCopy];

    let colorStr = color.hex;
    if (color.rgb.a !== 1) {
      colorStr = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    }
    temp[this.state.templateIndex].topnavSecondaryBgColor = colorStr;

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
  selectActiveLinkTemplate = (type, elem) => {
    const temp = [...this.state.templateCopy];
    const configIndex = temp[this.state.templateIndex][
      `${elem}linktemplate`
    ].indexOf("_");
    let selection = type.value;
    if (configIndex > -1 && elem == "topnav") {
      selection += `_${
        temp[this.state.templateIndex][`${elem}linktemplate`].split("_")[1]
      }`;
    }
    temp[this.state.templateIndex][`${elem}linktemplate`] = selection;
    this.setState({ templateCopy: temp });
  };
  changeSubmenuConfig = (e) => {
    const temp = [...this.state.templateCopy];
    temp[this.state.templateIndex].submenuConfig = e.value;

    this.setState({ templateCopy: temp });
  };
  selectIconConfig = (e) => {
    const temp = [...this.state.templateCopy];

    temp[this.state.templateIndex]["topnavlinktemplate"] =
      temp[this.state.templateIndex]["topnavlinktemplate"].split("_")[0] +
      e.value;

    this.setState({ templateCopy: temp });
  };

  componentDidMount() {
    let appContent = document.getElementsByClassName("layout-editor");
    appContent[0].addEventListener("click", function (e) {
      if (
        !(e.target.closest("li") != undefined && e.target.closest("li") != null)
      ) {
        var current = document.querySelectorAll(".dropdown-menu.show");
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" show", "");
        }
      }
    });
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

  toggleCheck = (attr) => {
    const temp = [...this.state.templateCopy];

    if (temp[this.state.templateIndex][attr] === "FALSE") {
      temp[this.state.templateIndex][attr] = "TRUE";
    } else {
      temp[this.state.templateIndex][attr] = "FALSE";
    }
    if (attr === "sidenavOnly") {
      temp[this.state.templateIndex].submenuConfig = "SNS";
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
                  <CardTitle tag="h4" className="text-highlight">
                    {TEMPLATES[templateIndex].templateName.split(":")[0]}
                  </CardTitle>
                  <CardSubtitle tag="h5" className="text-highlight">
                    Variant:
                    {TEMPLATES[templateIndex].templateName.split(":")[1] !=
                    undefined
                      ? TEMPLATES[templateIndex].templateName.split(":")[1]
                      : " Default"}
                  </CardSubtitle>
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
                {templateCopy[templateIndex].layout.indexOf("SIDE") > -1 ? (
                  <li>
                    <div className="custom-control mt-1 d-flex align-items-center custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="sidenavOnly"
                        name="sidenavOnly"
                        checked={
                          templateCopy[templateIndex].sidenavOnly === "TRUE"
                        }
                        onChange={() => this.toggleCheck("sidenavOnly")}
                      />
                      <label
                        className="custom-control-label pt-1"
                        htmlFor="sidenavOnly"
                      >
                        Sidenav Only
                      </label>
                    </div>
                  </li>
                ) : null}
                {templateCopy[templateIndex].padded === "FALSE" ? (
                  <li>
                    <div className="custom-control mt-1 d-flex align-items-center custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="containedTheme"
                        name="example1"
                        checked={
                          templateCopy[templateIndex].contained === "TRUE"
                        }
                        onChange={() => this.toggleCheck("contained")}
                      />
                      <label
                        className="custom-control-label pt-1"
                        htmlFor="containedTheme"
                      >
                        Contained Theme
                      </label>
                    </div>
                  </li>
                ) : null}

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
                  style={{ background: "#0000002b" }}
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
                    {templateCopy[templateIndex].contained == "TRUE" ? (
                      <li>
                        <p>Container Background</p>
                        <div className="d-flex">
                          <CirclePicker
                            width="unset"
                            circleSize={15}
                            onChange={(color, event) =>
                              this.handleColorChange(color, "container")
                            }
                            colors={[
                              "#1e1e2f",
                              "#171725",
                              "#ffffff",
                              "#f2f2f2",
                            ]}
                          />
                          <ColorPicker
                            src={"container"}
                            handleColorChange={this.handleColorChange}
                          />
                        </div>
                      </li>
                    ) : null}
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
                            this.handleColorChange(color, "topnav")
                          }
                          colors={["#1e1e2f", "#171725", "#ffffff", "#f2f2f2"]}
                        />
                        <ColorPicker
                          src={"topnav"}
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
                            this.handleColorChange(color, "sidenav")
                          }
                          colors={["#1e1e2f", "#171725", "#ffffff", "#f2f2f2"]}
                        />
                        <ColorPicker
                          src={"sidenav"}
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
                    onChange={(e) => this.changeSubmenuConfig(e)}
                    value={
                      SMP.filter(
                        (item) =>
                          item.value ==
                          templateCopy[templateIndex].submenuConfig
                      )[0]
                    }
                    options={
                      templateCopy[templateIndex].sidenavOnly === "TRUE"
                        ? SMP.filter((item) => item.value !== "TNS")
                        : SMP
                    }
                  />
                </li>
                {templateCopy[templateIndex].layout.indexOf("SIDE") > -1 ? (
                  <>
                    <li
                      className="pointer"
                      onClick={() =>
                        this.setState((prevState) => ({
                          sidenavCtrl: !prevState.sidenavCtrl,
                        }))
                      }
                    >
                      <h4>Sidenav Settings</h4>
                    </li>
                    <Collapse
                      style={{ background: "#0000002b" }}
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
                                  templateCopy[templateIndex].sidenavsize
                                ]
                              }
                              onChange={(e) => this.applySize(e, "sidenav")}
                              id="sidWidth"
                            />
                          </li>
                        ) : null}
                        {templateCopy[templateIndex].layout.indexOf("SIDE") >
                          -1 &&
                        templateCopy[templateIndex].gridConfig !== "S0" &&
                        templateCopy[templateIndex].floatingMenu == "FALSE" ? (
                          <li>
                            <div className="custom-control mt-1 d-flex align-items-center custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="alignSidenavCenter"
                                name="alignSidenavCenter"
                                checked={
                                  templateCopy[templateIndex]
                                    .sidenavMenuAlignCenter === "TRUE"
                                }
                                onChange={() =>
                                  this.toggleCheck("sidenavMenuAlignCenter")
                                }
                              />
                              <label
                                className="custom-control-label pt-1"
                                htmlFor="alignSidenavCenter"
                              >
                                Center Align Menu
                              </label>
                            </div>
                          </li>
                        ) : null}
                        <li>
                          <p>Sidenav Active Link Template</p>
                          <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            onChange={(e) =>
                              this.selectActiveLinkTemplate(e, "sidenav")
                            }
                            value={
                              SHT.filter(
                                (item) =>
                                  item.value ==
                                  templateCopy[templateIndex]
                                    .sidenavlinktemplate
                              )[0]
                            }
                            options={
                              templateCopy[templateIndex].gridConfig == "S0"
                                ? SHT.filter(
                                    (optn) => optn.value != "SLT1_ROUND"
                                  )
                                : SHT
                            }
                          />
                        </li>

                        <li>
                          <p>Sidenav Active Link Bg Color</p>
                          <div className="d-flex position-relative">
                            <CirclePicker
                              width="unset"
                              circleSize={15}
                              onChange={(color, event) =>
                                this.handleNavlinkColorChange(
                                  color,
                                  "sidenavActiveLinkBg"
                                )
                              }
                              colors={["#1e1e2f", "#171725", "#ffffff"]}
                            />
                            <ColorPicker
                              src={"sidenavActiveLinkBg"}
                              handleColorChange={this.handleNavlinkColorChange}
                            />
                          </div>
                        </li>

                        <li>
                          <p>Sidenav Active Link Text Color</p>
                          <div className="d-flex position-relative">
                            <CirclePicker
                              width="unset"
                              circleSize={15}
                              onChange={(color, event) =>
                                this.handleNavlinkColorChange(
                                  color,
                                  "sidenavActiveLinkText"
                                )
                              }
                              colors={["#1e1e2f", "#171725", "#ffffff"]}
                            />
                            <ColorPicker
                              src={"sidenavActiveLinkText"}
                              handleColorChange={this.handleNavlinkColorChange}
                            />
                          </div>
                        </li>
                        <li>
                          <p>Sidenav Active Link Icon Color</p>
                          <div className="d-flex position-relative">
                            <CirclePicker
                              width="unset"
                              circleSize={15}
                              onChange={(color, event) =>
                                this.handleNavlinkColorChange(
                                  color,
                                  "sidenavActiveLinkIcon"
                                )
                              }
                              colors={["#06efc4", "#ef5c06", "#06a4ef"]}
                            />
                            <ColorPicker
                              src={"sidenavActiveLinkIcon"}
                              handleColorChange={this.handleNavlinkColorChange}
                            />
                          </div>
                        </li>
                        <li>
                          <p>Sidenav Link Text Color</p>
                          <div className="d-flex position-relative">
                            <CirclePicker
                              width="unset"
                              circleSize={15}
                              onChange={(color, event) =>
                                this.handleNavlinkColorChange(
                                  color,
                                  "sidenavLinkText"
                                )
                              }
                              colors={["#1e1e2f", "#171725", "#ffffff"]}
                            />
                            <ColorPicker
                              src={"sidenavLinkText"}
                              handleColorChange={this.handleNavlinkColorChange}
                            />
                          </div>
                        </li>
                      </ul>
                    </Collapse>
                  </>
                ) : null}

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
                  style={{ background: "#0000002b" }}
                  className="p-2"
                  isOpen={this.state.topnavCtrl}
                >
                  <ul className="list-unstyled">
                    {templateCopy[templateIndex].boxed != "SL_N" ? (
                      <li>
                        <div className="custom-control mt-1 d-flex align-items-center custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="tnshadow"
                            name="example1"
                            checked={
                              templateCopy[templateIndex].tnshadow === "TRUE"
                            }
                            onChange={() => this.toggleCheck("tnshadow")}
                          />
                          <label
                            className="custom-control-label pt-1"
                            htmlFor="tnshadow"
                          >
                            Enable Topnav Shadow
                          </label>
                        </div>
                      </li>
                    ) : null}
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
                            ? "2"
                            : "4"
                        }
                        step="1"
                        value={
                          SIZEMAPINVERSE[templateCopy[templateIndex].topnavsize]
                        }
                        onChange={(e) => this.applySize(e, "topnav")}
                        id="navWidth"
                      />
                    </li>
                    {templateCopy[templateIndex].layout == "TOP_NAVIGATION" ||
                    templateCopy[templateIndex].submenuConfig == "TNS" ? (
                      <>
                        <li>
                          <p>Topnav Active Link Template</p>
                          <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            onChange={(e) =>
                              this.selectActiveLinkTemplate(e, "topnav")
                            }
                            value={
                              THT.filter(
                                (item) =>
                                  templateCopy[
                                    templateIndex
                                  ].topnavlinktemplate.indexOf(item.value) > -1
                              )[0]
                            }
                            options={THT}
                          />
                        </li>
                        {templateCopy[templateIndex].topnavSecondaryBgColor !==
                        "NA" ? (
                          <li>
                            <p>Topnav Navigation Bg Color</p>
                            <div className="d-flex position-relative">
                              <CirclePicker
                                width="unset"
                                circleSize={15}
                                onChange={(color, event) =>
                                  this.handlepageNavBGChange(color)
                                }
                                colors={["#1e1e2f", "#171725", "#ffffff"]}
                              />
                              <ColorPicker
                                src={"topnavSecondaryBgColor"}
                                handleColorChange={this.handlepageNavBGChange}
                              />
                            </div>
                          </li>
                        ) : null}
                        <li>
                          <p>Topnav Active Link Bg Color</p>
                          <div className="d-flex position-relative">
                            <CirclePicker
                              width="unset"
                              circleSize={15}
                              onChange={(color, event) =>
                                this.handleNavlinkColorChange(
                                  color,
                                  "topnavActiveLinkBg"
                                )
                              }
                              colors={["#1e1e2f", "#171725", "#ffffff"]}
                            />
                            <ColorPicker
                              src={"topnavActiveLinkBg"}
                              handleColorChange={this.handleNavlinkColorChange}
                            />
                          </div>
                        </li>

                        <li>
                          <p>Topnav Active Link Text Color</p>
                          <div className="d-flex position-relative">
                            <CirclePicker
                              width="unset"
                              circleSize={15}
                              onChange={(color, event) =>
                                this.handleNavlinkColorChange(
                                  color,
                                  "topnavActiveLinkText"
                                )
                              }
                              colors={["#1e1e2f", "#171725", "#ffffff"]}
                            />
                            <ColorPicker
                              src={"topnavActiveLinkText"}
                              handleColorChange={this.handleNavlinkColorChange}
                            />
                          </div>
                        </li>
                        <li>
                          <p>Topnav Active Link Icon Color</p>
                          <div className="d-flex position-relative">
                            <CirclePicker
                              width="unset"
                              circleSize={15}
                              onChange={(color, event) =>
                                this.handleNavlinkColorChange(
                                  color,
                                  "topnavActiveLinkIcon"
                                )
                              }
                              colors={["#1e1e2f", "#171725", "#ffffff"]}
                            />
                            <ColorPicker
                              src={"topnavActiveLinkIcon"}
                              handleColorChange={this.handleNavlinkColorChange}
                            />
                          </div>
                        </li>
                        <li>
                          <p>Topnav Link Text Color</p>
                          <div className="d-flex position-relative">
                            <CirclePicker
                              width="unset"
                              circleSize={15}
                              onChange={(color, event) =>
                                this.handleNavlinkColorChange(
                                  color,
                                  "topnavLinkText"
                                )
                              }
                              colors={["#1e1e2f", "#171725", "#ffffff"]}
                            />
                            <ColorPicker
                              src={"topnavLinkText"}
                              handleColorChange={this.handleNavlinkColorChange}
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
                                  ].topnavlinktemplate.indexOf(item.value) > -1
                              )[0]
                            }
                            options={
                              templateCopy[templateIndex].topnavsize == "S" ||
                              templateCopy[templateIndex].topnavsize == "XS"
                                ? TIC.filter(
                                    (item) => item.value != "_ICONSTACK"
                                  )
                                : TIC
                            }
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
                disabled={templateIndex == templateCopy.length - 1}
                onClick={() =>
                  this.setState((prevState) => {
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
        <div className="workbench rounded p-1">
          <TemplateView config={{ ...templateCopy[templateIndex] }} />
        </div>
      </div>
    );
  }
}
export default connect()(AppLayout);
