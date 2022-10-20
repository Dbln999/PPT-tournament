import React from "react";
import { Link } from "react-router-dom";

const StatsName = ({ stats }) => {

  return (
    <>
      <div className="d-flex align-items-center">

        <div className="d-flex flex-column">
          <h2
            name="nickname"
            className=" mt-2 w-100"
            style={{ border: 0, backgroundColor: "var(--profileBg)" }}
          >
            {stats.nickname}
          </h2>

          <h5
            name="name"
            className="pb-2 mt-1 w-100"
            style={{
              border: 0,
              backgroundColor: "var(--profileBg)",
              textIndent: "10px",
            }}
          >
            {stats.name}
          </h5>

          <p
            id={"age"}
            className="mx-3 fs-4 d-flex"
            style={{
              border: 0,
              backgroundColor: "var(--profileBg)",
              borderRadius: "10px",
            }}
          >
            Age: {stats.age}
          </p>
        </div>
      </div>
    </>
  );
};

export default StatsName;
