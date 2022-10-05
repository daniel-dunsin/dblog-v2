import React, { useEffect } from 'react'
import { auth, database, facebookProvider, googleProvider, usersRef } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { addDoc, doc, getDocs } from 'firebase/firestore'
import { connect } from 'react-redux';
import { UPDATE_CREDENTIALS, VERIFY_PATTERNS, CLEAR_VERIFICATIONS, SIGNUP_WITH_EMAIL_AND_PASSWORD, LOGIN } from '../redux/actions';
import { Link, useNavigate } from 'react-router-dom';

// images
import image from '../assets/images/login.jpeg';
import logo from '../assets/images/logo.png';
import facebook from '../assets/images/facebook.png';
import google from '../assets/images/google.png';


const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    email: state.auth.credentials.email,
    password: state.auth.credentials.password,
    emailError: state.auth.errors.email,
    passwordError: state.auth.errors.password
  }
}


function Signup({ isAuth, email, password, dispatch, emailError, passwordError }) {
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: CLEAR_VERIFICATIONS })
  }, []);


  const signUp = async () => {
    if (email && password && emailError === '' && passwordError === '') {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password)

        dispatch({ type: SIGNUP_WITH_EMAIL_AND_PASSWORD });
        // add user to firestore
        console.log(cred.user);
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
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  }
  const googleSignIn = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    const { displayName, email: userEmail, photoURL, phoneNumber, uid } = cred.user;
    const snapShot = await getDocs(usersRef);

    const user = snapShot.docs.find(doc => {
      return doc.data().uid === uid;
    })
    if (!user) {
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
    }
    dispatch({ type: LOGIN });
    navigate('/')
  }

  const facebookSignIn = async () => {
    const cred = await signInWithPopup(auth, facebookProvider);
    const { displayName, email: userEmail, photoURL, phoneNumber, uid } = cred.user;
    const snapShot = await getDocs(usersRef);
    const user = snapShot.docs.find(doc => {
      return doc.data().uid === uid;
    })
    if (!user) {
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
    }
    dispatch({ type: LOGIN });
    navigate('/')
  }

  return <section className='bg-gray-100 min-h-screen w-full flex justify-center items-center'>
    <div className='flex w-[90vw] max-w-[900px] bg-white rounded-md overflow-hidden shadow-md'>
      <div className='flex-[.9] w-full h-full lg:block hidden'>
        <img src={image} className='w-full h-full object-center object-cover' alt="" />
      </div>
      <div className='flex-[1] w-full p-8 py-12'>
        <div className='flex justify-between items-center my-6 '>
          <div><img src={logo} className='w-[150px] mx-auto' alt="" /></div>
          <h1 className='text-center text-2xl cursor-pointer font-bold uppercase tracking-wide hover:text-blue-700'>REGISTER</h1>
        </div>

        <div className='flex flex-col gap-y-6 mt-8'>
          <div>

            <input type="email" value={email} onChange={(e) => {
              dispatch({ type: UPDATE_CREDENTIALS, payload: { email: e.target.value } });
              dispatch({ type: VERIFY_PATTERNS, payload: { type: 'email' } })
            }} className='border-2 focus:border-blue-700 outline-none w-full px-3 py-3 text-[16px] rounded-md' placeholder='Enter your email' />

            {emailError !== '' && <p className='text-red-700 mt-2 text-[15px] font-bold'>{emailError}</p>}

          </div>
          <div>

            <input type="password" value={password} onChange={(e) => {
              dispatch({ type: UPDATE_CREDENTIALS, payload: { password: e.target.value } });
              dispatch({ type: VERIFY_PATTERNS, payload: { type: 'password' } })
            }} className='border-2 focus:border-blue-700 outline-none w-full px-3 py-3 text-[16px] rounded-md' placeholder='Enter your password' />

            {passwordError !== '' && <p className='text-red-700 text-[15px] font-bold mt-2'>{passwordError}</p>}

          </div>
          <button className='w-full rounded-md p-3 bg-black text-white text-[16px]' onClick={() => {
            signUp();
          }}>
            REGISTER
          </button>
        </div>


        <p className='my-6'>
          Already have an account? <Link to='/login' className='text-blue-700'>Sign In</Link>
        </p>


        <div className='flex flex-col gap-y-6'>
          <button className='w-full rounded-md py-3 px-3 bg-blue-700 hover:bg-blue-800 text-white text-[16px] flex justify-center items-center gap-x-6' onClick={facebookSignIn}>
            <img src={facebook} alt="" className='w-[32px] h-[32px]' />
            <p>Sign in With Facebook</p>
          </button>
          <button className='w-full rounded-md py-3 px-3 bg-white shadow-md hover:shadow-lg text-black text-[16px] flex justify-center items-center gap-x-6' onClick={googleSignIn}>
            <img src={google} alt="" className='w-[32px] h-[32px]' />
            <p>Sign in With Google</p>
          </button>
        </div>
      </div>
    </div>
  </section>
}

export default connect(mapStateToProps)(Signup)