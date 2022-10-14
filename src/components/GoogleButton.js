import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { addDoc, getDocs } from 'firebase/firestore';
import { auth, googleProvider, usersRef } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGIN } from '../redux/actions';
import google from '../assets/images/google.png';

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => {
            dispatch({ type: LOGIN, payload: { user } })
        }
    }
}

const GoogleButton = ({ login }) => {
    const navigate = useNavigate();
    const googleSignIn = async () => {
        try {
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
            login(cred.user);
            navigate('/')
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <button className='w-full rounded-md py-3 px-3 bg-white shadow-md hover:shadow-lg text-black text-[16px] flex justify-center items-center gap-x-6' onClick={() => {
            googleSignIn()
        }}>
            <img src={google} alt="" className='w-[32px] h-[32px]' />
            <p>Sign in With Google</p>
        </button>
    )
}

export default connect(null, mapDispatchToProps)(GoogleButton)