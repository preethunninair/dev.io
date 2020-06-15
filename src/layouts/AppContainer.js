import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import { MENUDATA } from "../variables/mockdata";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import logo from "assets/img/react-logo.png";

var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      route: MENUDATA,
      selectedPage: localStorage.getItem("selectedPage")
        ? localStorage.getItem("selectedPage")
        : "/overview",
      bgColor: "light",
      layout: "SIDE_NAVIGATION",
      submenuConfig: "SNS",
      searchbarConfig: { placement: "RIGHT", width: "15vw", floating: true },
      gridConfig: "S2",
      rounded: "FALSE",
      boxed: "FALSE",
      padded: "FALSE",
      template: "S2",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.history.location.pathname != prevState.selectedPage) {
      let loc = nextProps.history.location.pathname.split("/")[1];
      if (loc == "" || loc == "/") {
        localStorage.setItem("selectedPage", `/overview}`);
        return {
          selectedPage: `/overview`,
        };
      }
      localStorage.setItem("selectedPage", `/${loc}`);
      return {
        selectedPage: `/${loc}`,
      };
    }
    return null;
  }

  componentDidMount(e) {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    this.initializeDropdownEventHandler();
  }

  queryPageURL(name) {
    switch (name) {
      case "":
        break;
      case "/":
        return "/overview";
        break;
      default:
        return name;
        break;
    }
  }

  initializeDropdownEventHandler = () => {
    let appContent = document.getElementsByClassName("app-container");
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
    let dropdowns = document.querySelectorAll('a[data-toggle="dropdown"]');
    dropdowns.forEach((elem, i) => {
      elem.addEventListener("click", function (e) {
        var current = document.querySelectorAll("li.show");
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" show", "");
        }

        e.currentTarget.parentNode.className += " show";
      });
    });
  };
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  // componentDidUpdate(prevProps) {
  //  if(this.props.history.location.pathname!=prevProps.history.location.pathname){
  //   localStorage.setItem("selectedPage",this.props.history.location.pathname);
  //   this.setState({selectedPage:this.props.history.location.pathname});
  //  }

  // }

  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  toggleLayout = () => {
    this.setState({ layout: this.state.layout == "L0" ? "L1" : "L0" });
  };

  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };

  render() {
    const {
      layout,
      padded,
      boxed,
      template,
      bgColor,
      rounded,
      gridConfig,
      route,
      searchbarConfig,
      selectedPage,
    } = this.state;
    return (
      <div className="wrapper" data-appmode={"light"}>
        <div
          class="app-container"
          data-navbarsize={"XS"}
          data-padded={padded}
          data-boxed={boxed}
          data-layout={layout}
          data-rounded={rounded}
          data-grid={gridConfig}
        >
          {layout == "SIDE_NAVIGATION" || layout == "SIDEONLYNAVIGATION" ? (
            <div class="app-brand d-none d-md-block" data-grid={gridConfig}>
              <div className="brand-img h-100" data-theme={"dark"}>
                <img
                  src="https://get.fabric.io/assets/fabric-logo-b099a6226e4705de4a36fe3ffac7e160dea56f9661b90f02f58fdb1c26d6a8bd.svg"
                  alt="react-logo"
                />
                {/* {this.props.brandText} */}
              </div>
            </div>
          ) : null}
          {layout != "SIDEONLYNAVIGATION" ? (
            <div class="app-header">
              <AdminNavbar
                {...this.props}
                routes={route}
                layout={layout}
                searchbarConfig={searchbarConfig}
                submenuConfig={this.state.submenuConfig}
                selectedPage={selectedPage}
                theme={"dark"}
                logo="https://get.fabric.io/assets/fabric-logo-b099a6226e4705de4a36fe3ffac7e160dea56f9661b90f02f58fdb1c26d6a8bd.svg"
                linktemplate={"LT0_NOICON"}
                template={template}
                toggleSidebar={this.toggleSidebar}
              />
            </div>
          ) : null}
          {layout == "SIDE_NAVIGATION" || layout == "SIDEONLYNAVIGATION" ? (
            <div class="app-menu">
              <Sidebar
                {...this.props}
                routes={route}
                submenuConfig={this.state.submenuConfig}
                theme={"dark"}
                layout={layout}
                selectedPage={selectedPage}
                logo={{
                  imgSrc: "https://www.casece.com/PublishingImages/logo.gif",
                }}
                showToggler={false}
                linktemplate={"SLT1"}
                template={template}
                toggleLayout={this.toggleLayout}
                toggleSidebar={this.toggleSidebar}
              />
            </div>
          ) : null}

          {/* <Switch>
              {this.getRoutes(routes)}
              <Redirect from="*" to="/admin/dashboard"/>
            </Switch> */}
          {/* {// we don't want the Footer to be rendered on map page
            this.props.location.pathname.indexOf("maps") !== -1 ? null : (
              <Footer fluid />
            )} */}
          <div class="app-main" data-rounded={rounded}>
            <div className="scroller" ref="mainPanel"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
