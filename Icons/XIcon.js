import * as React from "react"

function XIcon(props) {
    const [color , setColor] = React.useState("#000000")
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color}
          className="w-6 h-6 cursor-pointer transition-all duration-300"
          onMouseEnter={()=> setColor("#444444")}
          onMouseLeave={()=> setColor("#000000")}
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    }

export default XIcon
