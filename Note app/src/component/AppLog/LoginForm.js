import React, { useRef, useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginState } from '../../redux/reducers/appDataSlice';

const LogInForm = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [warning, setWarning] = useState('');

  const pathRouter = useNavigate();
  const dispatch = useDispatch();
  
  const handleDataForm = async (event) => {
    event.preventDefault()
    await signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value,
    )
    .then(userCredential => {
      const {email, uid} = userCredential.user;
      dispatch(userLoginState({ email: email, id: uid }));
      pathRouter('/home')
    })
    .catch((err) => {
      console.log(err)
      setWarning(err.message)
    })
    
  }

  useEffect(() => {
    setWarning('')
  }, [emailRef, passwordRef])

  return (
    <form className='px-3' onSubmit={handleDataForm}>
        {warning && <div className="alert alert-danger">{warning}</div>}
        <label htmlFor='email' className='my-2 d-block text-secondary'>Email</label>
        <input id='email' name='email' type='email' className='border p-2 w-100 rounded' ref={emailRef} required />
        <label htmlFor="password" className='mb-2 mt-4 d-block text-secondary'>Password</label>
        <input id='password' name='password' type="password" className='border p-2 w-100 rounded' ref={passwordRef} required />
        <div className='mt-4 mb-3 text-center'>
            <button type='submit' className='btn text-primary'>Log in</button>
        </div>
    </form>
  )
}

export default LogInForm