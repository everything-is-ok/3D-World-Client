import React from "react";
import PropTypes from "prop-types";

import Furniture from "./Furniture";

function Items({
  items = [{
    itemName: "a",
    position: [2, 5],
  }],
}) {
  console.log("item rendered");
  // store에서 받아오자
  return (
    <group rotateX={-Math.PI / 2}>
      {items.map((item) => {
        const { x, y } = item.position;
        return (
          <Furniture
          // eslint-disable-next-line react/no-array-index-key
            key={`x:${x}, y:${y}`}
            name={item.itemName}
            position={[x, y]}
            onClick={() => console.log("X", x, "Y", y)}
          />
        );
      })}
    </group>
  );
}

Items.propTypes = {
  // width: PropTypes.number.isRequired,
  // height: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
};

export default Items;
