import React from "react";
import { connect } from "react-redux";
import MENUDATA from "../codespace_config/route.json";
class Initializer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: null,
    };
  }
  componentDidMount() {
    this.props.dispatch({ type: "SET_ROUTE", payload: MENUDATA });
  }

  render() {
    return this.props.children;
  }
}

export default connect()(Initializer);
