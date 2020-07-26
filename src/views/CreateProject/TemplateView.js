import React from "react";
import { connect } from "react-redux";
import AppContainer from "../../template/app/AppContainer.js";
import Initializer from "../../template/app/Initializer.js";
import Themer from "../../template/app/Themer";

class TemplateView extends React.Component {
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.config) != JSON.stringify(this.props.config)) {
      this.props.dispatch({
        type: "SET_TEMPLATECONFIG",
        payload: this.props.config,
      });
    }
  }

  render() {
    if (this.props.config === undefined) {
      return null;
    }

    return (
      <Initializer>
        <Themer>
          <AppContainer baseURL="/createproject" />
        </Themer>
      </Initializer>
    );
  }
}
export default connect()(TemplateView);
