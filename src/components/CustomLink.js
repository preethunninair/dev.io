import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const CustomLink = (props) => {
  const {
    activeStyle,
    className,
    to,
    activeOnlyWhenExact,
    activeClassName,
  } = props;
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <Link
      to={to}
      className={`${className}  ${match && activeClassName}`}
      style={match && activeStyle}
    >
      {props.children}
    </Link>
  );
};

export default CustomLink;
