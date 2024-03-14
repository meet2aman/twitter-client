"use client";
import React from "react";
import Lottie from "react-lottie";

const animationData = require("./twitter-round.json");
const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};
const TwitterXLottie = () => {
  return <Lottie options={lottieOptions} height={60} width={60} />;
};

export default TwitterXLottie;
