import React,{} from 'react'
import { Link } from "react-router-dom"

const ModalRules = () => {
    return (
        <div className="col-xl-5 col-lg-4 col-md-6 modal-rules bg-white rounded p-0">
            <h4 className='py-3 px-4 m-0'>Some Rules of this Quiz</h4>
            <div className="line bg-black opacity-25"></div>
            <ul className="rules-quiz py-3 px-4">
                <li className='py-2'>1. You will have only <span className='text-primary fw-bold'>15 seconds</span> per each question.</li>
                <li className='py-2'>2. Once you select your answer, it can't be undone.</li>
                <li className='py-2'>3. You can't select any option once time goes off.</li>
                <li className='py-2'>4. You can't exit from the Quiz while you're playing.</li>
                <li className='py-2'>5. You'll get points on the basis of your correct answers.</li>
            </ul>
            <div className="line bg-black opacity-25"></div>
            <div className="py-3 px-3 d-flex justify-content-end">
                <Link to="/quiz">
                    <button className="btn btn-primary me-3">
                        Continue
                    </button>
                </Link>
                <Link to="/">
                    <button className="btn btn-outline-primary">
                        Exit Quiz
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ModalRules
