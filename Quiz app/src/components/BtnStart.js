import React from 'react'
import { Link } from 'react-router-dom'
const BtnStart = () => {
  return (
    <Link to="/rules" className='text-center'>
        <button className="col-2 btn btn-light fs-3">Start Quiz</button>
    </Link>
  )
}

export default BtnStart