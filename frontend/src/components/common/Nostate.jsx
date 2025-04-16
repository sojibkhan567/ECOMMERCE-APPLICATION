import React from 'react'

const Nostate = ({ text = 'Record not found.' }) => {
  return (
    <div className='text-center py-5'>
      <h3 className='text-bold'>{text}</h3>
    </div>
  )
}

export default Nostate
