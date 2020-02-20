import React from 'react'

const Footer = () => {
  var style = {
    backgroundColor: '#F8F8F8',
    borderTop: '1px solid #E7E7E7',
    textAlign: 'center',
    padding: '10px',
    position: 'fixed',
    left: '0',
    bottom: '0',
    right: '0',
    zIndex: '1'
  }

  return (
    <div>
      <div style={style}>Study Tracker &copy; 2020</div>
    </div>
  )
}

export default Footer
