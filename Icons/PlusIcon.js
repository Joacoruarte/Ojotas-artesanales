import React from 'react'

export default function PlusIcon (props) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.621 1.089c3.593 0 6.533 2.94 6.533 6.532 0 3.593-2.94 6.533-6.533 6.533-3.593 0-6.532-2.94-6.532-6.533 0-3.593 2.94-6.532 6.532-6.532zm0-1.089C3.43 0 0 3.43 0 7.621c0 4.192 3.43 7.621 7.621 7.621 4.192 0 7.621-3.429 7.621-7.62C15.242 3.43 11.813 0 7.622 0z"
        fill={props.color || 'rgb(71 85 105 / 1)'}
      />
      <path
        d="M11.977 7.077H8.166v-3.81H7.077v3.81h-3.81v1.089h3.81v3.81h1.089v-3.81h3.81v-1.09z"
        fill={props.color || 'rgb(71 85 105 / 1)'}
      />
    </svg>
  )
}
