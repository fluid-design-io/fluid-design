import * as React from "react";
const FluidColor = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 58 90"
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      d="M17.8 87.9c3.4 1.4 7.1 2 10.7 2 7.2 0 14.5-2.6 19.9-7.4 4.8-4.2 12.1-13.9 7.4-31.2-1.8-6.7-7.745-14.948-8.6-18.4C44.5 22 44.5 14 47 2.7c0-.8-.5-1.6-1.2-1.9-.8-.3-1.6-.2-2.3.3-25.7 17.8-46.952 40.4-42 67.2 1.7 9.2 7.3 16 16.3 19.6ZM37.2 72c3.4-2.4 4.724-6.8 4.024-10.3-.3-1.4.376-2.9 1.776-3.2 1.4-.3 2.7 1.1 3 2.5 1.1 5.5-.8 11.6-5.8 15.1-1.2.9-1.94.9-2.7.9-.5 0-1.383 0-1.8-.5-1-1.2-1.2-3 1.5-4.5Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={29.047}
        x2={29.047}
        y1={0.631}
        y2={89.9}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="hsl(var(--primary-400))" />
        <stop offset={1} stopColor="hsl(var(--primary-800))" />
      </linearGradient>
    </defs>
  </svg>
);
export default FluidColor;
