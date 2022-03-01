import React from 'react'
import { Link } from 'react-router-dom'
const HelloApp = () => {
  return (
        <div className='row justify-content-center mt-5 align-items-center'>
            <div className='col-xl-6 text-center'>
                <h2 className='mt-2 mb-4'>Welcome to taking notes</h2>
                <Link to="/login"><button className='btn btn-primary px-4 fs-3'>START</button></Link>
            </div>
        </div>
  )
}

export default HelloApp