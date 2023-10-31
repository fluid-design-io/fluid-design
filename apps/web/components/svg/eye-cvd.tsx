import * as React from "react";
import { SVGProps } from "react";
const EyeCVD = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 16.684c-7 0-10-7-10-7S3.987 5.047 8.5 3.32c.32-.123.654-.23 1-.321l1.23 2.89a4.002 4.002 0 1 0 3.127 7.337l1.26 2.957c-.358.12-.73.22-1.117.3a9.93 9.93 0 0 1-2 .2Zm1.068-5.31.79 1.853A4 4 0 0 0 12 5.684c-.444 0-.87.072-1.27.205l.79 1.853a2 2 0 1 0 1.548 3.633Zm0 0L11.52 7.743a2 2 0 0 1 1.548 3.633Z"
        clipRule="evenodd"
      />
      <path
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 3.854a8.81 8.81 0 0 1 3.111-.554C19.333 3.3 22 9.387 22 9.387s-2.155 4.92-7.111 5.913"
      />
      <path
        stroke="currentColor"
        strokeDasharray="4 4"
        strokeLinecap="round"
        strokeWidth={2}
        d="M3 20h19"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default EyeCVD;
