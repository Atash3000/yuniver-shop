import React from "react";
import IcoMoon from "react-icomoon";
const iconSet = require("./svg/selection.json");

const Icon = ({ ...props }) => {
  return <IcoMoon iconSet={iconSet} {...props} />;
};

export default Icon;