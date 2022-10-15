import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux';
import { BiDotsVerticalRounded, BiLogOut, BiPlus } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { SET_AUTH_USER, OPEN_MODAL } from '../redux/actions';
import { getDocs } from 'firebase/firestore';
import { usersRef } from '../firebase-config';
import logo from '../assets/images/logo.png';
import noDp from '../assets/images/no dp.jpg';



const mapStateToProps = state => { return { isAuth: state.auth.isAuth, user: state.user.authUser } }

function Navbar({ isAuth, user, dispatch }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [error, setError] = useState(false);


  const getUser = async () => {
    if (!localStorage.getItem("dblogAuth")) return;
    try {
      const snapshot = await getDocs(usersRef);
      let user = snapshot.docs.find(doc => doc.data().uid === JSON.parse(localStorage.getItem("dblogAuth")).uid);
      dispatch({ type: SET_AUTH_USER, payload: { user: user.data() } });
      setError(false);
    }
    catch (error) {
      console.log(error);
      setError(true);
      dispatch({ type: OPEN_MODAL, payload: { modalText: 'Network Error' } });
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return !error && <nav className='w-full shadow-md'>
    <div className='max-w-[1200px] mx-auto p-6 flex justify-between items-center'>
      <Link to='/' className='flex-[0.6]'>
        <img src={logo} alt="logo" className='w-[150px]' />
      </Link>
      <div className='flex-1 flex justify-end items-center lg:gap-x-7 md:gap-x-4'>
        {isAuth
          // larger screens
          ? <div className='flex justify-center items-center gap-x-3'>
            <button className='items-center gap-x-2 bg-transparent text-blue-800 hover:bg-blue-800 border-2 border-blue-800 hover:text-white py-2 px-3 rounded-md md:flex hidden'>Sign Out <i><BiLogOut /></i></button>


            <Link to='/blog/create'>
              <button className='items-center gap-x-2 bg-blue-700 hover:bg-blue-800 border-2 border-blue-700 text-white py-2 px-3 rounded-md md:flex hidden'>Add Post <i><BiPlus /></i></button>
            </Link>


            {/* smaller screens */}
            <div className='relative md:hidden'>
              <i className='text-[30px]' onClick={() => setNavbarOpen(prev => !prev)}>
                <BiDotsVerticalRounded />
              </i>
              {navbarOpen && <div className='bg-white p-4 shadow-md absolute top-[120%] right-[20%] w-[150px] flex flex-col gap-y-4'>
                <span className='cursor-pointer hover:text-blue-600 flex flex-row gap-3 font-bold items-center'>
                  <i><BiPlus /></i>
                  <Link to='/blog/create'>Create Post</Link>
                </span>
                <span className='cursor-pointer hover:text-blue-600 flex flex-row gap-3 font-bold items-center'>
                  <i><BiLogOut /></i>
                  <p>Log Out</p>
                </span>
              </div>}

            </div>
            <Link to={`/user/${user.uid}`}>
              <img src={
                user.photoURL ? user.photoURL : noDp
              } className='w-[50px] h-[50px] rounded-full cursor-pointer border-2 transition hover:border-blue-700 object-center object-cover' alt="" />
            </Link>

          </div>
          : <div className='flex items-center justify-center gap-x-3'>
            <Link to='/login'>
              <button className=' bg-blue-700 text-white py-2 px-3 rounded-md'>LOGIN</button>
            </Link>
            <Link to='/signup'>
              <button className='text-blue-700 hover:text-white bg-transparent border border-blue-700 hover:bg-blue-700 transition py-2 px-3 rounded-md'>SIGN UP</button>
            </Link>
          </div>
        }
      </div>
    </div>
  </nav>
}

export default connect(mapStateToProps)(Navbar)