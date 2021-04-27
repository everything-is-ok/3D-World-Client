import React from "react";
import PropTypes from "prop-types";

import Table from "./Table";
import LongTree from "./LongTree";
import Closet from "./Closet";

function ChildFurniture({ name }) {
  switch (name) {
    case "Table":
      return <Table />;
    case "LongTree":
      return <LongTree />;
    default:
      return <Closet />;
  }
}

ChildFurniture.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ChildFurniture;
