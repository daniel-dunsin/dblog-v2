import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { addDoc, getDocs } from 'firebase/firestore';
import { auth, facebookProvider, usersRef } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGIN, OPEN_MODAL } from '../redux/actions';
import facebook from '../assets/images/facebook.png';

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => {
            dispatch({ type: LOGIN, payload: { user } })
        },
        showError: (modalText) => {
            dispatch({ type: OPEN_MODAL, payload: { modalText } })
        }
    }
}

const FacebookButton = ({ login, showError }) => {

    const navigate = useNavigate();

    const facebookSignIn = async () => {
        try {
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

            login(cred.user);
            navigate('/')
        }
        catch (error) {
            console.log(error);
            showError(error.message);
        }
    }


    return (
        <button className='w-full rounded-md py-3 px-3 bg-blue-700 hover:bg-blue-800 text-white text-[16px] flex justify-center items-center gap-x-6' onClick={() => {
            facebookSignIn();
        }}>
            <img src={facebook} alt="" className='w-[32px] h-[32px]' />
            <p>Sign in With Facebook</p>
        </button>
    )
}

export default connect(null, mapDispatchToProps)(FacebookButton)