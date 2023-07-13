import React from "react";
import "./index.scss";
import { useState } from "react";
import { useEffect } from "react";

const Bar = () => {
  const [barWidth, setBarWidth] = useState(0);
  const bodyElement = document.body;

  const updateBar = () => {
    let scrollPos =
      (window.scrollY / (bodyElement.scrollHeight - window.innerHeight)) * 100;
    setBarWidth(scrollPos);
    requestAnimationFrame(updateBar);
  };

  useEffect(() => {
    updateBar();
  }, []);

  return (
    <div id="bar">
      <div className="progress">
        <span className="bar" style={{ width: `${barWidth}%` }}></span>
      </div>
    </div>
  );
};

export default Bar;
