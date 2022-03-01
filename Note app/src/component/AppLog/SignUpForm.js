import React, { useRef, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { types } from '../../constants';

const SignUpForm = ({setUserSignup}) => {
  const userRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCongRef = useRef(null);

  const [warning, setWarning] = useState('');

  const handleSignUpForm = async (event) => {
    event.preventDefault();
    if(passwordRef.current.value === passwordCongRef.current.value){
      await createUserWithEmailAndPassword(
        auth, 
        emailRef.current.value,
        passwordRef.current.value
      ).then((userCredential) => {
        const { uid, email } = userCredential.user;
        setDoc(
          doc(db, 'usersdatanotes', uid),{
            id: uid, 
            email: email,
            types: types,
            notes: {}
          }
        )
        setUserSignup(true);
      }).catch((err) => {
        console.log(err)
        setWarning('Registration Failed')
      })
    }else{
      setWarning('Passwords do not match')
    }
  }

  useEffect(() => {
    setWarning('')
  }, [emailRef])

  return (
    <form className='px-3' onSubmit={handleSignUpForm}>
        {warning && <div className="alert alert-danger">{warning}</div>}
        <label htmlFor='username' className='my-2 d-block text-secondary' required>user name</label>
        <input id='username' type='username' className='border p-2 w-100 rounded' ref={userRef} />
        <label htmlFor='email' className='my-2 mt-4 d-block text-secondary'>email</label>
        <input id='email' type='email' className='border p-2 w-100 rounded' ref={emailRef} required />
        <label htmlFor="password" className='mb-2 mt-4 d-block text-secondary'>password</label>
        <input id='password' type="password" className='border p-2 w-100 rounded' ref={passwordRef} required />
        <label htmlFor="passwordconfirm" className='mb-2 mt-4 d-block text-secondary'>Password Confirmation</label>
        <input id='passwordconfirm' type="password" className='border p-2 w-100 rounded' ref={passwordCongRef} required />
        <div className='mt-4 mb-3 text-center'>
            <button type='submit' className='btn text-primary'>Sign up</button>
        </div>
    </form>
  )
}

export default SignUpForm