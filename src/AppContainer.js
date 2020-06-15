import React from "react";
import { Card, CardBody, CardTitle, CardFooter, Row, Col } from "reactstrap";
import axios from "axios";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import EditProject from "./views/EditProject";
class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   loadState: -1,
    // };
  }
  componentDidMount() {
    // axios
    //   .get("./devioconfig.json")
    //   .then((res) => {
    //     this.setState({
    //       loadState: 1,
    //     });
    //   })
    //   .catch(() =>
    //     this.setState({
    //       loadState: 0,
    //     })
    //   );
  }

  render() {
    return (
      <div className="wrapper overflow-hidden" data-appmode={"dark"}>
        <EditProject />
      </div>
    );
  }
}

export default AppContainer;
