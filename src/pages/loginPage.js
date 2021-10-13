import React, { Component } from "react";
import axios from "axios";
import Recaptcha from "react-recaptcha";
import {
  Alert,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
  Label,
  Col,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
} from "reactstrap";
import { HomePageCarousel } from "./HomePageCarosuel";
import { loginSchema } from "../Validation/loginSchema";
import { ValidationError } from "yup";
import { RegistrationSchema } from "../Validation/RegistrationSchema";

class LoginPage extends Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      u1: "",
      pwd1: "",
      pwd2: "",
      login: true,
      register: false,
      fn: null,
      ls: null,
      age: 0,
      gender: "",
      country: "",
      mobile: "",
      error: "",
      registered: false,
      isHuman: false,
    };
    this.authenticate = this.authenticate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegistrationChange = this.handleRegistrationChange.bind(this);
    this.register = this.register.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  componentDidMount() {
    localStorage.clear();
  }

  loadcallback = () => {
    this.setState({ isHuman: false });
  };

  verifyCallback = () => {
    this.setState({ isHuman: true });
  };

  expiredCallback = () => {
    this.setState({ isHuman: false });
  };
  handleChange = (event) => {
    this.setState({ error: "" });
    if (event && event.target.name === "u1") {
      this.setState({ u1: event.target.value });
    } else {
      this.setState({ pwd1: event.target.value });
    }
  };

  handleRegistrationChange = (event) => {
    this.setState({ error: "" });
    if (event && event.target && event.target.name) {
      switch (event.target.name) {
        case "u1":
          this.setState({ u1: event.target.value });
          break;
        case "pwd1":
          this.setState({ pwd1: event.target.value });
          break;
        case "pwd2":
          this.setState({ pwd2: event.target.value });
          break;
        case "fn":
          this.setState({ fn: event.target.value });
          break;
        case "ln":
          this.setState({ ln: event.target.value });
          break;
        case "age":
          this.setState({ age: event.target.value });
          break;
        case "gender":
          this.setState({ gender: event.target.value.toLowerCase() });
          break;
        case "country":
          this.setState({ country: event.target.value });
          break;
        case "mobile":
          this.setState({ mobile: event.target.value });
          break;
        default:
      }
    }
  };

  authenticate = async () => {
    try {
      await loginSchema.validate(
        { email_address: this.state.u1, password: this.state.pwd1 },
        { abortEarly: false }
      );
      let result = await axios.post("http://localhost:8001/user/authenticate", {
        email: this.state.u1,
        pwd: this.state.pwd1,
      });
      if (result && result.data.success) {
        localStorage.setItem("access-token", result.data.accessToken);
        localStorage.setItem("userdetails", result.data.email);
        localStorage.setItem("user", result.data.firstname);
        localStorage.setItem("userid", result.data.userid);
        localStorage.setItem("isAuth", true);
        this.props.history.push("/");
      } else {
        this.setState({ error: result.data.err });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log(error);
        this.setState({
          error: error.errors[0],
        });
      } else {
        this.setState({
          error: "There is some problem in the system.Please contact us",
        });
      }
    }
  };

  register = () => {
    this.setState({ login: !this.state.login, error: "" });
  };

  registerUser = async () => {
    this.setState({ registered: false, error: false });
    try {
      await RegistrationSchema.validate(
        {
          email_address: this.state.u1,
          password: this.state.pwd1,
          passwordConfirmation: this.state.pwd2,
          firstname: this.state.fn,
          lastname: this.state.ln,
          mobile: this.state.mobile,
          age: this.state.age,
          gender: this.state.gender,
          country: this.state.country,
        },
        { abortEarly: false }
      );
      let result = await axios.post("http://localhost:8001/user/register", {
        email: this.state.u1,
        pwd: this.state.pwd1,
        firstName: this.state.fn,
        lastName: this.state.ln,
        age: this.state.age,
        gender: this.state.gender,
        mobile: this.state.mobile,
        country: this.state.country,
      });
      console.log(result);
      if (result.data && result.data.success) {
        this.setState({ registered: true });
      } else {
        this.setState({ error: result.data.err });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log(error);
        this.setState({
          error: error.errors[0],
        });
      } else {
        this.setState({
          error: "There is some problem in the system.Please contact us",
        });
      }
    }
  };

  render() {
    const { login } = this.state;
    return (
      <div>
        <Row>
          <Col xs={{ size: 6, offset: 0.5 }}>
            {login ? (
              <Form className="form-address1 addressColumn">
                <Alert color="success">Login here</Alert>
                <FormGroup row>
                  <Label sm="2" for="ad1">
                    <b>Email</b>
                  </Label>
                  <Col sm="7">
                    <Input
                      type="text"
                      name="u1"
                      id="ad1"
                      placeholder="Email"
                      onChange={this.handleChange}
                    ></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm="2" for="ad2">
                    <b>Password</b>
                  </Label>
                  <Col sm="7">
                    <Input
                      type="password"
                      name="pwd1"
                      id="ad2"
                      placeholder="password"
                      onChange={this.handleChange}
                    ></Input>
                  </Col>
                </FormGroup>
                {this.state.error && (
                  <Alert color="danger">{this.state.error}</Alert>
                )}
                <Button
                  onClick={this.authenticate}
                  color="success"
                  type="button"
                  className="add"
                >
                  Authenticate
                </Button>
                <Button
                  style={{ color: "green" }}
                  onClick={this.register}
                  color="link"
                  className="add"
                >
                  Register
                </Button>
              </Form>
            ) : (
              <>
                <Form className="form-address1">
                  <Alert color="success">Register here</Alert>
                  <br></br>
                  <FormGroup row>
                    <Label sm="3" for="u1">
                      <b>Email</b>
                    </Label>
                    <Col sm="7">
                      <Input
                        type="text"
                        name="u1"
                        id="e1"
                        placeholder="Email"
                        onChange={this.handleRegistrationChange}
                      ></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="3" for="pwd1">
                      <b>Password</b>
                    </Label>
                    <Col sm="7">
                      <Input
                        type="password"
                        name="pwd1"
                        id="pwd1"
                        placeholder="password"
                        onChange={this.handleRegistrationChange}
                      ></Input>
                    </Col>
                    <Col>
                      <Button
                        style={{ color: "green" }}
                        id="UncontrolledPopover"
                        size="sm"
                        color="link"
                        type="button"
                      >
                        Read
                      </Button>
                      <UncontrolledPopover
                        trigger="focus"
                        placement="bottom"
                        target="UncontrolledPopover"
                      >
                        <PopoverHeader>Password policy</PopoverHeader>
                        <PopoverBody>
                          Password must contain min 6 letter and max 15 letters.
                          It should contain atleast a symbol, a number and a
                          upper case and a lower case letter.
                        </PopoverBody>
                      </UncontrolledPopover>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="3" for="pwd1">
                      <b>Confirm password</b>
                    </Label>
                    <Col sm="7">
                      <Input
                        type="password"
                        name="pwd2"
                        id="pwd2"
                        placeholder="confirm password"
                        onChange={this.handleRegistrationChange}
                      ></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="3" for="mobile">
                      <b>mobile</b>
                    </Label>
                    <Col sm="7">
                      <Input
                        type="text"
                        name="mobile"
                        id="mobile"
                        placeholder="mobile"
                        onChange={this.handleRegistrationChange}
                      ></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="3" for="fn">
                      <b>First Name</b>
                    </Label>
                    <Col sm="7">
                      <Input
                        type="text"
                        name="fn"
                        id="fn"
                        placeholder="first name"
                        onChange={this.handleRegistrationChange}
                      ></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="3" for="ln">
                      <b>Last Name</b>
                    </Label>
                    <Col sm="7">
                      <Input
                        type="text"
                        name="ln"
                        id="ln"
                        placeholder="last name"
                        onChange={this.handleRegistrationChange}
                      ></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="3" for="age">
                      <b>Age</b>
                    </Label>
                    <Col sm="7">
                      <Input
                        type="text"
                        name="age"
                        id="age"
                        placeholder="age"
                        onChange={this.handleRegistrationChange}
                      ></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="3" for="gender">
                      <b>Gender</b>
                    </Label>
                    <Col sm="7">
                      <Input
                        type="text"
                        name="gender"
                        id="gender"
                        placeholder="'male' 'female' or 'other'"
                        onChange={this.handleRegistrationChange}
                      ></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="3" for="con">
                      <b>Country</b>
                    </Label>
                    <Col sm="7">
                      <Input
                        type="text"
                        name="country"
                        id="con"
                        placeholder="country"
                        onChange={this.handleRegistrationChange}
                      ></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm={{ size: '7', offset: 3 }}>
                      <Recaptcha
                        sitekey="6Ldp7bYZAAAAAAyV2kHaCU_B_YRl967PdmYKfQJ2"
                        render="explicit"
                        onloadCallback={this.loadcallback}
                        verifyCallback={this.verifyCallback}
                        expiredCallback={this.expiredCallback}
                      />
                    </Col>
                  </FormGroup>
                  {this.state.error && (
                    <Alert color="danger">{this.state.error}</Alert>
                  )}
                  {this.state.registered && (
                    <Alert color="success">
                      You are registered in our system.Please login to shop.
                    </Alert>
                  )}
                  <Button
                    disabled={!this.state.isHuman}
                    onClick={this.registerUser}
                    type="button"
                    color="success"
                    className="add"
                  >
                    Submit
                  </Button>
                  <Button onClick={this.register} color="link" className="add">
                    Login
                  </Button>
                </Form>
              </>
            )}
          </Col>
          <Col>
            <HomePageCarousel />
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginPage;
