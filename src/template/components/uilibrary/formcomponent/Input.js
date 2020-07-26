import React, { Component } from "react";
import Icon from "./helpers/Icon";
import PasswordValidator from "./helpers/PasswordValidator";
import { isEmpty, isUndefined } from "./helpers/Utility";
import classNames from "classnames";
import "./css/input.css";
import { FORM_CONFIG } from "../../../variables/CONSTANTS";

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    var valid = (this.props.isValid && this.props.isValid()) || true;

    this.state = {
      valid: valid,
      empty: isEmpty(this.props.value),
      focus: false,
      value: this.props.value,
      iconsVisible: !this.props.validator,
      hint: this.props.hint,
      emptyMessage: this.props.emptyMessage,
      errorMessage: null,
      validator: this.props.validator,
      validatorVisible: false,
      type: this.props.type,
      theme: this.props.theme || FORM_CONFIG["theme"] || null,
      instaCheck: this.props.instaCheck,
      instaErrorMsg: this.props.instaErrorMsg,
      minChars: this.props.minChars,
      maxChars: this.props.maxChars,
      minAlpha: this.props.minAlpha,
      maxAlpha: this.props.maxAlpha,
      minNum: this.props.minNum,
      maxNum: this.props.maxNum,
      minCaps: this.props.minCaps,
      maxCaps: this.props.maxCaps,
      minSpecialChars: this.props.minSpecialChars,
      maxSpecialChars: this.props.maxSpecialChars,
      alphabets: this.props.alphabets,
      specialChars: this.props.specialChars,
      capitals: this.props.capitalLetters,
      numbers: this.props.numbers,
      allowedChars: this.props.allowedChars,
      restrictChars: this.props.restrictChars,

      isValidatorValid: {
        minChars: false,
        maxChars: false,
        minAlpha: false,
        maxAlpha: false,
        minNum: false,
        maxNum: false,
        minCaps: false,
        maxCaps: false,
        minSpecialChars: false,
        maxSpecialChars: false,
        alphabets: false,
        specialChars: false,
        capitalLetters: false,
        numbers: false,
        allowedChars: false,
        restrictChars: false,

        all: false,
      },
      allValidatorValid: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
      empty: isEmpty(event.target.value),
    });

    if (this.props.validator) {
      this.checkRules(event.target.value);
    }

    // call input's validation method
    if (this.props.validate) {
      this.validateInput(event.target.value);
    }

    // call onChange method on the parent component for updating it's state
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  validateInput = (value) => {
    // trigger custom validation method in the parent component
    if (this.props.validate && this.props.validate(value)) {
      this.setState({
        valid: true,
        errorVisible: false,
      });
    } else {
      this.setState({
        valid: false,
        errorMessage: !isEmpty(value)
          ? this.props.errorMessage
          : this.props.emptyMessage,
      });
    }
  };

  componentWillReceiveProps(newProps) {
    // perform update only when new value exists and not empty
    if (newProps.value) {
      if (
        !isUndefined(newProps.value) &&
        newProps.value.toString().length > 0
      ) {
        if (this.props.validate) {
          this.validateInput(newProps.value);
        }
        this.setState({
          value: newProps.value,
          empty: isEmpty(newProps.value),
        });
      }
    }
  }

  isValid = () => {
    if (this.props.validate) {
      if (isEmpty(this.state.value) || !this.props.validate(this.state.value)) {
        this.setState({
          valid: false,
          errorVisible: true,
        });
        return false;
      }
    }
    if (this.props.validator) {
      return this.checkRules(this.state.value);
    }
    return true;
  };

  handleFocus = () => {
    this.setState({
      focus: true,
      validatorVisible: true,
    });

    // hide error when validator is active
    if (this.props.validator) {
      this.setState({
        errorVisible: false,
      });
    }
  };

  handleBlur = () => {
    this.setState({
      focus: false,
      errorVisible: !this.state.valid,
      validatorVisible: false,
    });
  };

  mouseEnterError = () => {
    this.setState({
      errorVisible: true,
      validatorVisible: true,
    });
  };

  hideError = () => {
    this.setState({
      errorVisible: false,
      validatorVisible: false,
    });
  };

  // validator function
  checkRules = (value) => {
    var validData = {
      minChars:
        this.props.minChars != undefined
          ? !isEmpty(value)
            ? value.length >= parseInt(this.state.minChars)
            : false
          : true,
      maxChars:
        this.props.maxChars != undefined
          ? !isEmpty(value)
            ? value.length <= parseInt(this.state.maxChars)
            : false
          : true,
      minAlpha:
        this.props.minAlpha != undefined
          ? !isEmpty(value)
            ? this.countAlpha(value, this.props.alphabets) >=
              parseInt(this.state.minAlpha)
            : false
          : true,
      maxAlpha:
        this.props.maxAlpha != undefined
          ? !isEmpty(value)
            ? this.countAlpha(value, this.props.alphabets) <=
              parseInt(this.state.maxAlpha)
            : false
          : true,
      minNum:
        this.props.minNum != undefined
          ? !isEmpty(value)
            ? this.countNumbers(value, this.props.alphabets) >=
              parseInt(this.state.minNum)
            : false
          : true,
      maxNum:
        this.props.maxNum != undefined
          ? !isEmpty(value)
            ? this.countNumbers(value, this.props.alphabets) <=
              parseInt(this.state.maxNum)
            : false
          : true,
      minSpecialChars:
        this.props.minSpecialChars != undefined
          ? !isEmpty(value)
            ? this.countSpclChars(value) >= parseInt(this.state.minSpecialChars)
            : false
          : true,
      maxSpecialChars:
        this.props.maxSpecialChars != undefined
          ? !isEmpty(value)
            ? this.countSpclChars(value) <= parseInt(this.state.maxSpecialChars)
            : false
          : true,
      minCaps:
        this.props.minCaps != undefined
          ? !isEmpty(value)
            ? this.countCapitals(value) >= parseInt(this.state.minCaps)
            : false
          : true,
      maxCaps:
        this.props.maxCaps != undefined
          ? !isEmpty(value)
            ? this.countCapitals(value) >= parseInt(this.state.maxCaps)
            : false
          : true,
      alphabets:
        this.props.alphabets != undefined
          ? !isEmpty(value)
            ? this.countAlpha(value, this.props.alphabets)
            : false
          : true,
      numbers:
        this.props.numbers != undefined
          ? !isEmpty(value)
            ? this.countNumbers(value, this.props.numbers) > 0
            : false
          : true,
      specialChars:
        this.props.specialChars != undefined
          ? !isEmpty(value)
            ? this.countSpclChars(value, this.props.specialChars) > 0
            : false
          : true,
      mandatory:
        this.props.mandatory != undefined
          ? isEmpty(value)
            ? false
            : true
          : true,
      allowedChars:
        this.props.allowedChars != undefined
          ? !isEmpty(value)
            ? this.checkChars(value, "allowed")
            : false
          : true,
      restrictChars:
        this.props.restrictChars != undefined
          ? !isEmpty(value)
            ? this.checkChars(value, "restrict")
            : true
          : true,
      capitalLetters:
        this.props.capitalLetters != undefined
          ? !isEmpty(value)
            ? this.countCapitals(value, this.props.capitalLetters)
            : false
          : true,
    };
    var allValid =
      validData.minChars &&
      validData.maxChars &&
      validData.minAlpha &&
      validData.maxAlpha &&
      validData.minNum &&
      validData.maxNum &&
      validData.minSpecialChars &&
      validData.maxSpecialChars &&
      validData.minCaps &&
      validData.maxCaps &&
      validData.alphabets &&
      validData.specialChars &&
      validData.capitalLetters &&
      validData.numbers &&
      validData.allowedChars &&
      validData.restrictChars &&
      validData.mandatory;

    this.setState({
      isValidatorValid: validData,
      allValidatorValid: allValid,
      valid: allValid,
    });
    return allValid;
  };

  checkChars = (value, type) => {
    if (type == "restrict") {
      let regex = new RegExp("[" + value + "]", "g");
      let check = value.match(regex);
      if (check) {
        return check.length;
      } else {
        return 0;
      }
    } else {
      let splChar = value.match(/\W|_/g);
      if (splChar) {
        for (var i = 0; i < value.length; i++) {
          if (splChar.some((item) => item == value.charAt(i))) {
            return false;
          }
        }
        return true;
      } else {
        return true;
      }
    }
  };
  countAlpha = (value, type) => {
    switch (type.toString().toLowerCase()) {
      case "mandatory":
      case "true":
        var str = value.match(/[a-zA-Z]/g);
        if (str) {
          return str.length > 0;
        } else {
          return false;
        }
        break;
      case "false":
        var str = value.match(/[a-zA-Z]/g);
        if (str) {
          return !str.length > 0;
        } else {
          return true;
        }
        break;
    }
  };
  countSpclChars = (value, type) => {
    switch (type.toString().toLowerCase()) {
      case "mandatory":
      case "true":
        var str = value.match(/[^A-Za-z0-9]/g);
        if (str) {
          return str.length > 0;
        } else {
          return false;
        }
        break;
      case "false":
        var str = value.match(/[^A-Za-z0-9]/g);
        if (str) {
          return !str.length > 0;
        } else {
          return true;
        }
        break;
    }
  };
  countCapitals = (value, type) => {
    switch (type.toString().toLowerCase()) {
      case "mandatory":
      case "true":
        var str = value;
        return str.replace(/[^A-Z]/g, "").length > 0 ? true : false;
        break;
      case "false":
        var str = value;
        return str.replace(/[^A-Z]/g, "").length > 0 ? false : true;
        break;
    }
  };

  countNumbers = (value, type) => {
    switch (type.toString().toLowerCase()) {
      case "mandatory":
      case "true":
        return /\d/.test(value);
        break;
      case "false":
        return /\d/.test(value) ? false : true;
        break;
    }
  };

  render() {
    var inputGroupClasses = classNames({
      input_group: true,
      input_valid: this.state.valid,
      input_error: !this.state.valid,
      input_empty: this.state.empty,
      input_hasValue: !this.state.empty,
      input_focused: this.state.focus,
      input_unfocused: !this.state.focus,
    });

    var validator;

    if (this.state.validator && this.state.errorVisible) {
      validator = (
        <PasswordValidator
          ref="passwordValidator"
          visible={this.state.validatorVisible}
          name={this.props.text}
          value={this.state.value}
          validData={this.state.isValidatorValid}
          valid={this.state.allValidatorValid}
          minChars={this.props.minChars}
          maxChars={this.props.maxChars}
          minAlpha={this.props.minAlpha}
          maxAlpha={this.props.maxAlpha}
          minNum={this.props.minNum}
          maxNum={this.props.maxNum}
          minCaps={this.props.minCaps}
          maxCaps={this.props.maxCaps}
          mandatory={this.props.mandatory}
          minSpecialChars={this.props.minSpecialChars}
          maxSpecialChars={this.props.maxSpecialChars}
          alphabets={this.props.alphabets}
          specialChars={this.props.specialChars}
          capitals={this.props.capitalLetters}
          numbers={this.props.numbers}
          allowedChars={this.props.allowedChars}
          restrictChars={this.props.restrictChars}
          instaErrorMsg={this.props.instaErrorMsg}
          errorMessage={this.state.errorMessage}
        />
      );
    }
    const inpID = this.props.id
      ? this.props.id
      : `${this.props.name.replace(/\s/g, "").toLowerCase()}`;
    return (
      <div className={inputGroupClasses + " " + this.state.theme}>
        <label className="input_label" htmlFor={inpID}>
          <span className="label_text">{this.props.text}</span>
        </label>

        <input
          {...this.props}
          placeholder={this.props.placeholder}
          className="input"
          id={inpID}
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          autoComplete="off"
        />
        <span class="bar"></span>
        {/*<InputError
          visible={this.state.errorVisible}
          errorMessage={this.state.errorMessage}
        />*/}

        <div className="validationIcons">
          <i
            className="input_error_icon"
            onMouseEnter={this.mouseEnterError}
            onMouseLeave={this.hideError}
          >
            {" "}
            <Icon type="circle_error" />{" "}
          </i>
          <i className={`input_valid_icon ${FORM_CONFIG["validTick"]}`}>
            {" "}
            <Icon type="circle_tick" />{" "}
          </i>
          {/* <i className="input_clear_icon"> <Icon type="circle_clear"/> </i> */}
        </div>

        {validator}
      </div>
    );
  }
}
