"use client"
import { type SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={100} height={100} viewBox="0 0 48 48" {...props}>
    <linearGradient
      id="a"
      x1={37.1}
      x2={10.9}
      y1={10.9}
      y2={37.1}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset={0} />
      <stop offset={0} />
      <stop offset={0.2} />
      <stop offset={0.4} />
      <stop offset={0.5} />
      <stop offset={0.7} />
      <stop offset={0.8} />
      <stop offset={1} />
    </linearGradient>
    <circle cx={24} cy={24} r={18.5} fill="url(#a)" />
    <path
      fill="none"
      stroke="#10e36c"
      d="M35.4 38.8A18.7 18.7 0 0 1 6.9 16.6m5.1-7a18.7 18.7 0 0 1 29.4 21"
    />
    <path fill="none" stroke="#10e36c" d="m16.5 23.5 5 5L32 18" />
  </svg>
)
export default SvgComponent
