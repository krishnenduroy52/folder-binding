import React from "react";

const Header = ({ curr }) => {
  return curr === "/" ? (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "lightblue",
        padding: "10px",
        width: "100%",
        color: "rgb(221, 105, 50)",
        alignItems: "center",
      }}
    >
      <h1>Elkalkin Folder View</h1>
    </div>
  ) : curr === "/folder" ? (
    <div>
      <h1>Image Gallery</h1>
    </div>
  ) : (
    <div>
      <h1>File Upload</h1>
    </div>
  );
};

export default Header;
