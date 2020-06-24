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
import { updateSelectedTemplate } from "../../redux/actions/editProjectActions";
const SIZEMAP = { "0": "XS", "1": "S", "2": "M" };
const SIZEMAPINVERSE = { XS: 0, S: 1, M: 2 };

const SHT = [
  { value: "SLT0", label: "Text Highlight" },
  { value: "SLT1_ROUNDED", label: "Rounded Highlight" },
  { value: "SLT1", label: "Flat Highlight" },

  { value: "SLT2", label: "Fill Highlight" },
];

const SMP = [
  { value: "SNS", label: "Sidebar Submenu" },
  { value: "TNS", label: "Topbar Menu" },
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
class AppLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      templateIndex: 0,
      templateCopy: TEMPLATES,
    };
  }
  getTemplateConfig() {
    return this.state.templateCopy[this.state.templateIndex];
  }
  // componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.wizardIndex != this.props.wizardIndex &&
  //     this.props.wizardIndex == 2
  //   ) {
  //     this.props.dispatch(
  //       updateSelectedTemplate(
  //         this.state.templateCopy[this.state.templateIndex]
  //       )
  //     );
  //   }
  // }
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
                <li>
                  <p>Navbar Link Highlight Color</p>
                  <div className="d-flex">
                    <CirclePicker
                      width="unset"
                      circleSize={15}
                      onChange={(color, event) =>
                        this.handleColorChange(color, "navbarLink")
                      }
                      colors={["#1e1e2f", "#171725", "#ffffff"]}
                    />
                    <ColorPicker
                      src={"navbar"}
                      handleColorChange={this.handleColorChange}
                    />
                  </div>
                </li>

                <li>
                  <p>Sidebar Link Highlight Color</p>
                  <div className="d-flex">
                    <CirclePicker
                      width="unset"
                      circleSize={15}
                      onChange={(color, event) =>
                        this.handleColorChange(color, "sidebarLink")
                      }
                      colors={["#1e1e2f", "#171725", "#ffffff"]}
                    />
                    <ColorPicker
                      src={"sidebar"}
                      handleColorChange={this.handleColorChange}
                    />
                  </div>
                </li>
                <li>
                  <p>Card Default Background</p>
                  <div className="d-flex">
                    <CirclePicker
                      width="unset"
                      circleSize={15}
                      onChange={(color, event) =>
                        this.handleColorChange(color, "navbar")
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
            config={templateCopy[templateIndex]}
          />
        </div>
      </div>
    );
  }
}
export default connect()(AppLayout);
