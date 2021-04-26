import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import Table from "./Table";
import LongTree from "./LongTree";
import Closet from "./Closet";

// function withLogin(name) {
//   return function ChildFurniture({ isLoggedIn, ...props }) {
//     if (isLoggedIn) {
//       return <Component {...props} />;
//     }

//     return (
//       <div>
//         <p>Hello, please login to see your profile!</p>
//       </div>
//     );
//   };
// }

// const ShowProfile = withLogin(Profile);

// function App({ profile, isLoggedIn }) {
//   return (
//     <div>
//       <h1>Hello Conditional Rendering</h1>

//       <ShowProfile isLoggedIn={isLoggedIn} profile={profile} />
//     </div>
//   );
// }
// function getFurniture(name) {
//   return function ({ name }) {
//     switch (name) {
//       case "Table":
//         return <Table />;
//       case "LongTree":
//         return <LongTree />;
//       default:
//         return <Closet />;
//     }
//   };
// }

function Furniture({ name, position, onClick }) {
  const group = useRef();
  const mesh = useRef();

  const [isSelected, setIsSelected] = useState(false);

  function handleClick() {
    setIsSelected((prev) => !prev);
    onClick();
  }

  // const ChildFurniture = getFurniture(name);

  return (
    <group ref={group} position={position}>
      <mesh
        ref={mesh}
        rotation={[0, 0, 0]}
        onClick={handleClick}
        color={isSelected ?? "red"}
      >
        {name === "Table" && <Table />}
        {name === "LongTree" && <LongTree />}
        {name === "Closet" && <Closet />}
        {/* <ChildFurniture name={name} /> */}
      </mesh>
    </group>
  );
}

Furniture.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

export default Furniture;
