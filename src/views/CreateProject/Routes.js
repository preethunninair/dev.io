import React from "react";
import {
  Container,
  Card,
  CardHeader,
  Collapse,
  CardBody,
  CardTitle,
  CardFooter,
  Row,
  Col,
  CardSubtitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";
import { CirclePicker } from "react-color";
import Icon from "../../components/uilibrary/Icon";
import TemplateView from "./TemplateView";
import tinycolor from "tinycolor2";
import Select from "react-select";
import { TEMPLATES } from "../../variables/template_file";
import ColorPicker from "../../components/ColorPicker";
import { connect } from "react-redux";
import Input from "../../components/uilibrary/formcomponent/Input";
import { createRoute } from "../../redux/actions/createProjectActions";

const mapState = (state) => ({
  selectedConfig: state.templateConfig.config,
  route: state.routerReducer.routes,
});
class Routes extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      iconName: "",
      routeName: "",
      addSubRouteIndex: -1,
      editRouteIndex: -1,
      editSubRouteIndex: -1,
      modalAddRoute: false,
      toggleSubroute: -1,
      routeData: [],
    };
    this.toggleAddRoute = this.toggleAddRoute.bind(this);
    this.addRoute = this.addRoute.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.wizardIndex != this.props.wizardIndex &&
      this.props.wizardIndex == 2
    ) {
      // this.setState({})
      // this.props.dispatch(createRoute(this.state.routeData));
    }
    if (prevProps.route.length == 0 && this.props.route.length > 0) {
      this.setState({ routeData: this.props.route });
    }
    this.props.dispatch({ type: "SET_ROUTE", payload: this.state.routeData });
  }

  toggleAddRoute() {
    this.setState({
      modalAddRoute: !this.state.modalAddRoute,
    });
  }
  toggleSubroute(index) {
    if (this.state.toggleSubroute == -1) {
      this.setState({
        toggleSubroute: index,
      });
    } else {
      this.setState({ toggleSubroute: -1 });
    }
  }
  addRoute() {
    if (this.state.addSubRouteIndex == -1) {
      const newRoute = {
        title: this.state.routeName,
        icon: { family: "material-icon", name: this.state.iconName },
        module: this.state.routeName,
        path: `/${this.state.routeName.replace(/\s/gi, "").toLowerCase()}`,
        submenu: [],
        active: false,
      };
      if (this.state.editRouteIndex > -1) {
        if (this.state.editSubRouteIndex == -1) {
          let tempRouteData = [...this.state.routeData];
          newRoute.submenu = tempRouteData[this.state.editRouteIndex].submenu;
          tempRouteData[this.state.editRouteIndex] = newRoute;
          this.setState(
            {
              routeData: tempRouteData,
              iconName: "",
              routeName: "",
              addSubRouteIndex: -1,
              editRouteIndex: -1,
            },
            () => {
              this.toggleAddRoute();
            }
          );
        } else {
          let tempSubRouteData = [...this.state.routeData];
          tempSubRouteData[this.state.editRouteIndex].submenu[
            this.state.editSubRouteIndex
          ] = newRoute;
          this.setState(
            {
              routeData: tempSubRouteData,
              iconName: "",
              routeName: "",
              addSubRouteIndex: -1,
              editRouteIndex: -1,
              editSubRouteIndex: -1,
            },
            () => {
              this.toggleAddRoute();
            }
          );
        }
      } else {
        this.setState(
          (prevState) => ({
            routeData: [...prevState.routeData, newRoute],
            iconName: "",
            routeName: "",
            addSubRouteIndex: -1,
          }),
          () => {
            this.toggleAddRoute();
          }
        );
      }
    } else {
      let submenuData = [...this.state.routeData][this.state.addSubRouteIndex]
        .submenu;
      submenuData = [
        ...submenuData,
        {
          title: this.state.routeName,
          icon: { family: "material-icon", name: this.state.iconName },
          module: this.state.routeName,
          submenu: [],
          path: `${
            this.state.routeData[this.state.addSubRouteIndex].path
          }/${this.state.routeName.replace(/\s/gi, "").toLowerCase()}`,
        },
      ];
      let newRouteData = [...this.state.routeData];
      newRouteData[this.state.addSubRouteIndex].submenu = submenuData;

      this.setState(
        {
          routeData: newRouteData,
        },
        () => {
          this.setState({ iconName: "", routeName: "", addSubRouteIndex: -1 });
          this.toggleAddRoute();
        }
      );
    }
  }
  addSubRoute(index) {
    this.setState({ addSubRouteIndex: index }, () => {
      this.toggleAddRoute();
    });
  }
  editRoute(index) {
    const editRoute = [...this.state.routeData][index];
    this.setState(
      {
        iconName: editRoute.icon.name,
        routeName: editRoute.title,
        editRouteIndex: index,
      },
      () => {
        this.toggleAddRoute();
      }
    );
  }
  editSubRoute(parentIndex, childIndex) {
    const editSubRoute = this.state.routeData[parentIndex].submenu[childIndex];
    this.setState(
      {
        iconName: editSubRoute.icon.name,
        routeName: editSubRoute.title,
        editRouteIndex: parentIndex,
        editSubRouteIndex: childIndex,
      },
      () => {
        this.toggleAddRoute();
      }
    );
  }
  removeRoute(index) {
    this.setState((prevState) => ({
      routeData: prevState.routeData.filter((item, i) => i != index),
    }));
  }
  removeSubRoute(parentIndex, childIndex) {
    let submenuData = [...this.state.routeData][parentIndex].submenu;
    submenuData = submenuData.filter((item, i) => i != childIndex);
    let newRouteData = [...this.state.routeData];
    newRouteData[parentIndex].submenu = submenuData;

    this.setState({
      routeData: newRouteData,
    });
  }
  setFieldValue(e) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }
  // componentDidMount() {
  //   let appContent = document.getElementsByClassName("route-editor");
  //   appContent[0].addEventListener("click", function (e) {
  //     if (
  //       !(e.target.closest("li") != undefined && e.target.closest("li") != null)
  //     ) {
  //       var current = document.querySelectorAll("li.show");
  //       if (current.length > 0) {
  //         current[0].className = current[0].className.replace(" show", "");
  //       }
  //     }
  //   });
  // }

  render() {
    const { selectedConfig } = this.props;
    return (
      <div
        className={`${
          this.props.wizardIndex == 1 ? "" : "d-none "
        }page-grid route-editor px-3`}
      >
        <div className="leftpanel p-2">
          <Card className="h-100">
            <CardHeader className="text-left">
              <CardSubtitle style={{ fontSize: "10px" }}>
                Create Route
              </CardSubtitle>
              <CardTitle tag="h3" className="text-highlight">
                Router
              </CardTitle>
            </CardHeader>
            <CardBody className="px-1">
              <Container>
                <Row>
                  <Col className="px-4">
                    <div
                      className="border rounded border-primary  center justify-content-around pointer"
                      style={{ height: "50px" }}
                      onClick={this.toggleAddRoute}
                    >
                      <span>Create Route</span>
                      <span>+</span>
                    </div>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <ul className="list-group w-100 list-group-flush">
                    {this.state.routeData.map((menuItm, parentIndex) => (
                      <>
                        <li className="list-group-item border-0 d-flex justify-content-between bg-transparent">
                          <div className="d-flex align-items-center">
                            <Icon iconObj={menuItm.icon} />
                            <span className="ml-2">{menuItm.title}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <Icon
                              className="text-info pointer"
                              onClick={this.editRoute.bind(this, parentIndex)}
                              iconObj={{
                                family: "material-icon",
                                name: "edit",
                              }}
                            />
                            <Icon
                              className="text-danger pointer"
                              onClick={this.removeRoute.bind(this, parentIndex)}
                              iconObj={{
                                family: "material-icon",
                                name: "remove_circle_outline",
                              }}
                            />
                            <Icon
                              className="text-success pointer"
                              onClick={this.addSubRoute.bind(this, parentIndex)}
                              iconObj={{
                                family: "material-icon",
                                name: "add_circle_outline",
                              }}
                            />
                            {menuItm.submenu.length > 0 ? (
                              <Icon
                                className="text-info pointer"
                                onClick={this.toggleSubroute.bind(
                                  this,
                                  parentIndex
                                )}
                                iconObj={{
                                  family: "material-icon",
                                  name: "unfold_more",
                                }}
                              />
                            ) : null}
                          </div>
                        </li>
                        <Collapse
                          isOpen={this.state.toggleSubroute == parentIndex}
                        >
                          <ul
                            className="list-group w-100 pl-3 list-group-flush"
                            style={{ background: "#0000002e" }}
                          >
                            {menuItm.submenu.map((subMenuItm, childIndex) => (
                              <li className="list-group-item border-0 d-flex justify-content-between  bg-transparent">
                                <div className="d-flex align-items-center">
                                  <Icon iconObj={subMenuItm.icon} />
                                  <span className="ml-2">
                                    {subMenuItm.title}
                                  </span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <Icon
                                    className="text-info pointer"
                                    onClick={this.editSubRoute.bind(
                                      this,
                                      parentIndex,
                                      childIndex
                                    )}
                                    iconObj={{
                                      family: "material-icon",
                                      name: "edit",
                                    }}
                                  />
                                  <Icon
                                    className="text-danger pointer"
                                    onClick={this.removeSubRoute.bind(
                                      this,
                                      parentIndex,
                                      childIndex
                                    )}
                                    iconObj={{
                                      family: "material-icon",
                                      name: "remove_circle_outline",
                                    }}
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </Collapse>
                      </>
                    ))}
                  </ul>
                </Row>
              </Container>
            </CardBody>
            <CardFooter className="flex-row justify-content-between d-flex"></CardFooter>
          </Card>
        </div>
        <div className="workbench rounded p-3">
          <TemplateView config={selectedConfig} />
        </div>
        <Modal isOpen={this.state.modalAddRoute} toggle={this.toggleAddRoute}>
          <ModalHeader toggle={this.toggleAddRoute}>Create Route</ModalHeader>
          <ModalBody>
            <Input
              text="Icon Name"
              ref="iconName"
              value={this.state.iconName}
              name="iconName"
              validator={true}
              onChange={this.setFieldValue}
              mandatory
              emptyMessage="Icon name can't be empty"
            />
            <Input
              text="Route Name"
              ref="routeName"
              value={this.state.routeName}
              name="routeName"
              validator={true}
              onChange={this.setFieldValue}
              mandatory
              emptyMessage="Route name can't be empty"
            />
          </ModalBody>
          <ModalFooter>
            <div>
              <Button color="primary" onClick={this.addRoute}>
                Create Route
              </Button>{" "}
              <Button color="secondary" onClick={this.toggleAddRoute}>
                Cancel
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default connect(mapState)(Routes);
