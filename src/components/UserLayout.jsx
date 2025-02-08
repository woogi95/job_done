import React from "react";

function UserLayout({ src }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        src="\images\logo.svg"
        style={{
          Width: "300",
          height: "70",
        }}
      />
    </div>
  );
}
export default UserLayout;
