import * as React from "react";
import { SVGProps } from "react";
const FigmaLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 15 15"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M7 2.05H5.525a1.475 1.475 0 0 0 0 2.95H7V2.05Zm0-1h2.475a2.475 2.475 0 0 1 1.492 4.45A2.475 2.475 0 0 1 8 9.463V11.425A2.475 2.475 0 1 1 4.033 9.45a2.471 2.471 0 0 1-.983-1.975c0-.807.386-1.523.983-1.975a2.475 2.475 0 0 1 1.492-4.45H7Zm1 1V5h1.475a1.475 1.475 0 1 0 0-2.95H8Zm-2.475 6.9H7V6H5.525a1.475 1.475 0 0 0-.006 2.95h.006ZM4.05 11.425c0-.813.657-1.472 1.47-1.475H7v1.475a1.475 1.475 0 0 1-2.95 0ZM8 7.472a1.475 1.475 0 1 1 0 .006v-.006Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
export default FigmaLogo;
