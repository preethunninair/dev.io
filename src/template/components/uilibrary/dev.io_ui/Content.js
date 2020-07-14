import React from "react";
import { connect } from "react-redux";
import PerfectScrollbar from "perfect-scrollbar";
var ps;
const mapState = (state) => ({
  rounded: state.templateConfig.config.rounded,
});
class Content extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  render() {
    return (
      <div class="app-main">
        <div
          className="scroller"
          ref="mainPanel"
          data-rounded={this.props.contentDivRounded}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default connect(mapState)(Content);
