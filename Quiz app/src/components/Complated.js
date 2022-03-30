import React from 'react'
import Questions from './Questions'
import { Link } from 'react-router-dom';

const Complated = ({points,setPoints}) => {
    return (
        <div className="col-xl-5 col-lg-5 col-md-7 text-center bg-white rounded-3 py-4">
            <i className="bi bi-stars text-primary"></i>
            <p className='fs-5 fw-bold'>
                You've complated the Quiz! <br/> and sorry you got only {points} out of {Questions.length}
            </p>
            <div className="btns-complated d-flex justify-content-around mt-4">
                <Link to="/">
                    <button className="btn btn-primary"
                        onClick={() => setPoints(0)}
                    >
                        Replay Quiz
                    </button>
                </Link>
                <Link to="/">
                    <button className="btn btn-outline-primary"
                        onClick={() => setPoints(0)}
                    >
                        Quit Quiz
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Complated
