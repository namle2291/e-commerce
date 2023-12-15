import React from 'react'

function Button({ type = 'button', className, content, handleClick }) {
  return (
    <button type={type} className={className} onClick={handleClick}>
      {content}
    </button>
  )
}

export default Button
