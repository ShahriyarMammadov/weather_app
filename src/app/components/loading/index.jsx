import Image from "next/image";
import React from "react";
// import loadingImage from "../../assets/images/loading.gif";
import "./index.scss";

const LoadingComponent = () => {
  return (
    <div className="loading">
      <span className="loader"></span>
    </div>
  );
};

export default LoadingComponent;
