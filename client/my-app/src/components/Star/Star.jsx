import React from "react";
import { renderStar } from "../../utils/renderStar";

export default function Star({ totalRaitings, fs = 13 }) {
  return (
    <span className={`text-yellow-500 flex mb-[10px] mt-[6px] text-[${fs}px]`}>
      {renderStar(totalRaitings)}
    </span>
  );
}
