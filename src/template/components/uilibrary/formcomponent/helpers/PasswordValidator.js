import React,{Component} from "react";
import Icon from "./Icon";

import classNames from "classnames";

export default class PasswordValidator extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      value: null,
      minChars: this.props.minChars,
      maxChars:this.props.maxChars,
      minAlpha:this.props.minAlpha,
      maxAlpha:this.props.maxAlpha,
      minNum:this.props.minNum,
      maxNum:this.props.maxNum,
      minCaps:this.props.minCaps,
      maxCaps:this.props.maxCaps,
      minSpecialChars:this.props.minSpecialChars,
      maxSpecialChars:this.props.maxSpecialChars,
      alphabets:this.props.alphabets,
      specialChars:this.props.specialChars,
      capitals: this.props.capitalLetters,
      numbers: this.props.numbers,
      allowedChars:this.props.allowedChars,
      restrictChars:this.props.restrictChars,
      instaErrorMsg:this.props.instaErrorMsg,
      errorMessage:this.props.errorMessage,
      mandatory:this.props.mandatory,
      name: this.props.name
    };
  }

  render(){
    var validatorClass = classNames({
      'password_validator':   true,
      'visible':              this.props.visible,
      'invisible':            !this.props.visible
    });



    var validatorTitle;

    if(this.props.valid) {
      validatorTitle =
        <h4 className="validator_title valid">
          {this.props.name} IS OK
        </h4>
    } else {
      validatorTitle =
        <h4 className="validator_title invalid">
          {this.props.name} RULES
        </h4>
    }

    return (
      <div className={validatorClass}>
        <div className="validator_container">

          {validatorTitle}

          <ul className="rules_list">
          {this.state.minChars!=undefined?
            <li className={classNames({'valid': this.props.validData.minChars})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.minChars} characters minimum</span>
            </li>
          :null}
          {this.state.maxChars!=undefined?
            <li className={classNames({'valid': this.props.validData.maxChars})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.maxChars} characters maximum</span>
            </li>
          :null}
          {this.state.minAlpha!=undefined?
            <li className={classNames({'valid': this.props.validData.minAlpha})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.minAlpha} alphabets minimum</span>
            </li>
          :null}
          {this.state.maxAlpha!=undefined?
            <li className={classNames({'valid': this.props.validData.maxAlpha})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.maxAlpha} alphabets maximum</span>
            </li>
          :null}
          {this.state.minNum!=undefined?
            <li className={classNames({'valid': this.props.validData.minNum})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.minNum} numerics minimum</span>
            </li>
          :null}
          {this.state.maxNum!=undefined?
            <li className={classNames({'valid': this.props.validData.maxNum})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.maxNum} numerics maximum</span>
            </li>
          :null}
          {this.state.minSpecialChars!=undefined?
            <li className={classNames({'valid': this.props.validData.minSpecialChars})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.minSpecialChars} special characters minimum</span>
            </li>
          :null}
          {this.state.maxSpecialChars!=undefined?
            <li className={classNames({'valid': this.props.validData.maxSpecialChars})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.maxSpecialChars} special characters maximum</span>
            </li>
          :null}
          {this.state.alphabets!=undefined && this.state.minAlpha==undefined?
            <li className={classNames({'valid': this.props.validData.alphabets})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">Atleast one alphabet is required</span>
            </li>
          :null}
          {this.state.numbers!=undefined && this.state.minNum==undefined?
            <li className={classNames({'valid': this.props.validData.numbers})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">Atleast one number is required</span>
            </li>
          :null}
          {this.state.specialChars!=undefined?
            <li className={classNames({'valid': this.props.validData.specialChars})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">Atleast one special character required</span>
            </li>
          :null}
          {this.state.capitalLetters!=undefined?
            <li className={classNames({'valid': this.props.validData.capitalLetters})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">Atleast one capital letter required</span>
            </li>
          :null}
          {this.state.minCaps!=undefined?
            <li className={classNames({'valid': this.props.validData.minCaps})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.minCaps} characters minimum</span>
            </li>
          :null}

          {this.state.maxCaps!=undefined?
            <li className={classNames({'valid': this.props.validData.maxCaps})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.maxCaps} characters minimum</span>
            </li>
          :null}
          {this.state.allowedChars!=undefined?
            <li className={classNames({'valid': this.props.validData.allowedChars})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.allowedChars} characters minimum</span>
            </li>
          :null}
          {this.state.restrictChars!=undefined?
            <li className={classNames({'valid': this.props.validData.restrictChars})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.restrictChars} characters minimum</span>
            </li>
          :null}
          {this.state.errorMessage!=null?
            <li className={classNames({'valid': false})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">{this.state.errorMessage}</span>
            </li>
          :null}
          {this.state.mandatory!=undefined?
            <li className={classNames({'valid': this.props.validData.mandatory})}>
              <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
              <i className="icon_invalid"> <Icon type="circle_error"/> </i>
              <span className="error_message">This field is mandatory</span>
            </li>
          :null}


          </ul>
        </div>
      </div>
    )
  }
}
