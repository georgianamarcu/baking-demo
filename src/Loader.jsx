import React, { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { useAppStore } from "./store";

function Loader() {
  const { progress } = useProgress();
  const started = useAppStore((state) => state.started);
  const update = useAppStore((state) => state.update);
  useEffect(() => {
    if (progress === 100) {
      update({ started: true });
    }
  }, [progress, update]);

  return (
    <div className={`loadingScreen ${started ? "loadingScreen--started" : ""}`}>
      <div className="loading-container">
        <div
          className="loadingScreen__progress__value"
          style={{
            width: `${progress}%`,
          }}
        ></div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
}

export default Loader;
