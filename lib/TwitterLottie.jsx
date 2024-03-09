"use client";
import React from "react";
import Lottie from "react-lottie";

const animationData = require("./twitter-x.json");
const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};
const TwitterLottie = () => {
  return <Lottie options={lottieOptions} height={200} width={200} />;
};

export default TwitterLottie;
