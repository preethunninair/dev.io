import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  FormGroup,
  Row,
  Col,
  Form,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";
import Input from "../../components/uilibrary/formcomponent/Input";
import { loginUser } from "../../redux/actions/authActions";
import jwt from "jsonwebtoken";

const mapState = (state) => ({
  isAuthenticated: state.authState.isAuthenticated,
  isFetching: state.authState.isFetching,
  errorMessage: state.authState.errorMessage,
});
class Login extends React.Component {
  static isAuthenticated(token) {
    // We check if app runs with backend mode
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    return date < data.exp;
  }

  constructor(props) {
    super(props);

    this.state = {
      login: "user",
      password: "password",
    };
  }

  changeLogin = (event) => {
    this.setState({ login: event.target.value });
  };

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  doLogin = () => {
    this.props.dispatch(
      loginUser({
        login: this.state.login,
        password: this.state.password,
      })
    );
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/app" },
    };

    if (this.props.isAuthenticated) {
      // cant access login page while logged in
      return <Redirect to={from} />;
    }

    return (
      <div className="wrapper" data-appmode={"dark"}>
        <Row className="h-100">
          <Col
            xs={{ size: 10, offset: 1 }}
            sm={{ size: 6, offset: 3 }}
            lg={{ size: 4, offset: 4 }}
            className="center"
          >
            <Card
              className="card-white"
              style={{ minHeight: "380px", maxWidth: "350px" }}
            >
              <CardHeader className="text-center">
                <CardTitle tag="h3">Login</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="mt" onSubmit={this.doLogin}>
                  {this.props.errorMessage && (
                    <Alert size="sm" color="danger">
                      {this.props.errorMessage}
                    </Alert>
                  )}
                  <FormGroup className="form-group">
                    <Input
                      className="no-border"
                      value={this.state.login}
                      onChange={this.changeLogin}
                      type="text"
                      required
                      text="Username"
                      name="username"
                      label="Username"
                      placeholder="Username"
                    />

                    <Input
                      className="no-border mt-2"
                      text="Password"
                      value={this.state.password}
                      onChange={this.changePassword}
                      type="password"
                      required
                      name="password"
                      label="Password"
                      placeholder="Password"
                    />
                  </FormGroup>

                  <Button
                    className="w-100 mt-5"
                    color="success"
                    size="sm"
                    type="submit"
                    onClick={() => this.doLogin()}
                  >
                    {this.props.isFetching ? "Loading..." : "Login"}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapState)(Login));
