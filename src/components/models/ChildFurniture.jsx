import React from "react";
import PropTypes from "prop-types";

import Table from "./Table";
import LongTree from "./LongTree";
import Closet from "./Closet";

function ChildFurniture({ name, isSelected }) {
  switch (name) {
    case "Table":
      return <Table isSelected={isSelected} />;
    case "LongTree":
      return <LongTree isSelected={isSelected} />;
    default:
      return <Closet isSelected={isSelected} />;
  }
}

ChildFurniture.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
};

export default ChildFurniture;
