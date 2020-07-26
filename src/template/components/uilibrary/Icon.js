import React from "react";

const Icon = (props) => {
  let family = props.family ? props.family : props.iconObj.family;
  let name = props.name ? props.name : props.iconObj.name;
  let className = props.className ? props.className : "";
  const standardProps = { ...props };
  delete standardProps.className;
  delete standardProps.class;
  delete standardProps.iconObj;

  switch (family) {
    case "material-icon":
      return (
        <i {...standardProps} className={`material-icons ${className}`}>
          {name}
        </i>
      );
      break;
    case "font awesome":
      return <i {...standardProps} className={`${name} ${className}`}></i>;
      break;
    case "linearicons":
      return <i className={`${name} ${props.className}`}></i>;
    default:
      return <i className={`${name} ${props.className}`}></i>;
      break;
  }
};

export default Icon;
