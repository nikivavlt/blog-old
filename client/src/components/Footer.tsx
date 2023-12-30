import React from 'react'

const cssStyle = { color: 'purple', fontSize: '20px' }

const Footer = (): JSX.Element => {
  return (
    <footer style={ cssStyle }>
      <p>
        It will be different logotype
      </p>
      <span>
        Text or <b>navigation menu</b> also in ideas
      </span>
      footer section like "Join Tanay's extended family (Photo)"
    </footer>
  )
}

export default Footer
