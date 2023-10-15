"use client";

import { Performance, useSiteSettingsStore } from "@/store/store";
import React, { useEffect } from "react"; // Replace with your actual Zustand store path

function getDeviceType() {
  const userAgent =
    typeof window.navigator === "undefined" ? "" : navigator.userAgent;
  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );
  if (window.innerWidth > 800 && !mobile) {
    return "desktop";
  } else if (window.innerWidth <= 800 && window.innerWidth > 400) {
    return "tablet";
  } else {
    return "mobile";
  }
}

function checkPerformance() {
  const cores = navigator.hardwareConcurrency || 4;
  if (cores >= 9) {
    return Performance.high;
  } else if (cores >= 4) {
    return Performance.medium;
  } else {
    return Performance.low;
  }
}

function determinePerformance() {
  const deviceType = getDeviceType();
  let performanceTier = Performance.medium;

  if (deviceType === "desktop") {
    performanceTier = Performance.high;
  } else if (deviceType === "tablet") {
    performanceTier = Performance.medium;
  } else if (deviceType === "mobile") {
    performanceTier = Performance.low;
  }

  const browserPerformance = checkPerformance();
  if (browserPerformance === Performance.high && deviceType === "desktop") {
    performanceTier = Performance.high;
  } else if (
    browserPerformance === Performance.medium &&
    deviceType === "desktop"
  ) {
    performanceTier = Performance.medium;
  } else if (browserPerformance === Performance.low) {
    performanceTier = Performance.low;
  }

  return performanceTier;
}

const PerformanceChecker = () => {
  const setPerformance = useSiteSettingsStore((state) => state.setPerformance);
  const currentPerformance = useSiteSettingsStore((state) => state.performance);

  useEffect(() => {
    const performanceTier = determinePerformance();
    setPerformance(performanceTier);
  }, [currentPerformance]);

  return null; // This component doesn't render anything
};

export default PerformanceChecker;
