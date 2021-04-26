import React from "react";
import PropTypes from "prop-types";

import Table from "../components/models/Table";
import LongTree from "../components/models/LongTree";
import Closet from "../components/models/Closet";

function getFurniture(name) {
  return function () {
    switch (name) {
      case "Table":
        return <Table />;
      case "LongTree":
        return <LongTree />;
      default:
        return <Closet />;
    }
  };
}

getFurniture.propTypes = {
  name: PropTypes.string.isRequired,
};

export default getFurniture;
