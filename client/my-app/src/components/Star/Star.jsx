import React from 'react';
import { renderStar } from '../../utils/renderStar';

export default function Star({ totalRaitings, fs = 13 }) {
   return <div className={`text-[${fs}px]`}>{renderStar(totalRaitings)}</div>;
}
