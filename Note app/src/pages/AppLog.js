import React, { useState } from 'react'
import LogInForm from '../component/AppLog/LoginForm';
import SignUpForm from '../component/AppLog/SignUpForm';

const AppLog = () => {
    const [userSignup, setUserSignup] = useState(true);
    return (
        <div className='row justify-content-center mt-5 px-2'>
            <div className='col-xl-4 col-lg-6 col-md-8 bg-white border rounded-3 p-0'>
                <div className='d-flex justify-content-around mb-4 '>
                    <button className={`w-100 py-3 ${userSignup && 'text-white bg-primary'}`}
                        onClick={() => setUserSignup(true)}
                    >Log in</button>
                    <button className={`w-100 py-3 ${!userSignup && 'text-white bg-primary'}`}
                        onClick={() => setUserSignup(false)}
                    >Sign up</button>
                </div>
                {userSignup ? <LogInForm /> : <SignUpForm setUserSignup={setUserSignup} /> }
            </div>
        </div>
    )
}

export default AppLog