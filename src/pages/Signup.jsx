import React, { useEffect } from 'react'
import { auth, usersRef } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc } from 'firebase/firestore'
import { connect } from 'react-redux';
import { UPDATE_CREDENTIALS, VERIFY_PATTERNS, CLEAR_VERIFICATIONS, SIGNUP_WITH_EMAIL_AND_PASSWORD, OPEN_MODAL, SET_AUTH_USER, STOP_LOADING, START_LOADING } from '../redux/actions';
import { Link, useNavigate } from 'react-router-dom';
import { FacebookButton, GoogleButton, Preloader } from '../components';
// images
import image from '../assets/images/signup.jpg';
import logo from '../assets/images/logo.png';


const mapStateToProps = (state) => {
  return {
    email: state.auth.credentials.email,
    password: state.auth.credentials.password,
    emailError: state.auth.errors.email,
    passwordError: state.auth.errors.password,
    loading: state.fetch.loading
  }
}


function Signup({ email, password, dispatch, emailError, passwordError, loading }) {
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: CLEAR_VERIFICATIONS })
  }, [dispatch]);


  const signUp = async (e) => {
    e.preventDefault();
    if (email && password && emailError === '' && passwordError === '') {
      dispatch({ type: START_LOADING })
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({ type: SIGNUP_WITH_EMAIL_AND_PASSWORD, payload: { user: cred.user } });
        dispatch({ type: SET_AUTH_USER, payload: { user: cred.user } })
        // add user to firestore
        const { displayName, email: userEmail, photoURL, phoneNumber, uid } = cred.user;

        await addDoc(usersRef, {
          displayName,
          userEmail,
          photoURL,
          phoneNumber,
          uid,
          linkedin: '',
          github: '',
          twitter: '',
          portfolio: ''
        });
        dispatch({ type: STOP_LOADING })
        navigate('/');
      } catch (error) {
        console.log(error);
        dispatch({ type: OPEN_MODAL, payload: { modalText: error.message } });
        dispatch({ type: STOP_LOADING })
      }
    }
  }

  return <section className='bg-gray-100 min-h-screen w-full flex justify-center items-center'>
    {loading && <Preloader />}
    <div className='flex w-[90vw] max-w-[900px] bg-white rounded-md overflow-hidden shadow-md'>
      <div className='flex-[.9] w-full h-full lg:block hidden'>
        <img src={image} className='w-full h-full object-center object-cover' alt="" />
      </div>
      <div className='flex-[1] w-full p-8 py-12'>
        <div className='flex justify-between items-center my-6 '>
          <div><img src={logo} className='w-[150px] mx-auto' alt="" /></div>
          <h1 className='text-center text-2xl cursor-pointer font-bold uppercase tracking-wide hover:text-blue-700'>REGISTER</h1>
        </div>

        <form className='flex flex-col gap-y-6 mt-8' onSubmit={signUp}>
          <div>

            <input type="email" required value={email} onChange={(e) => {
              dispatch({ type: UPDATE_CREDENTIALS, payload: { email: e.target.value } });
              dispatch({ type: VERIFY_PATTERNS, payload: { type: 'email' } })
            }} className='border-2 focus:border-blue-700 outline-none w-full px-3 py-3 text-[16px] rounded-md' placeholder='Enter your email' />

            {emailError !== '' && <p className='text-red-700 mt-2 text-[15px] font-bold'>{emailError}</p>}

          </div>
          <div>

            <input type="password" required value={password} onChange={(e) => {
              dispatch({ type: UPDATE_CREDENTIALS, payload: { password: e.target.value } });
              dispatch({ type: VERIFY_PATTERNS, payload: { type: 'password' } })
            }} className='border-2 focus:border-blue-700 outline-none w-full px-3 py-3 text-[16px] rounded-md' placeholder='Enter your password' />

            {passwordError !== '' && <p className='text-red-700 text-[15px] font-bold mt-2'>{passwordError}</p>}

          </div>
          <button type='submit' className='w-full rounded-md p-3 bg-black text-white text-[16px]'>
            REGISTER
          </button>
        </form>


        <p className='my-6'>
          Already have an account? <Link to='/login' className='text-blue-700'>Sign In</Link>
        </p>


        <div className='flex flex-col gap-y-6'>
          <GoogleButton />
          <FacebookButton />
        </div>
      </div>
    </div>
  </section>
}

export default connect(mapStateToProps)(Signup)