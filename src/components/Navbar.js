import React from 'react'
import { connect } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {auth} from '../firebase-config';
import logo from '../assets/images/logo.png';
import noDp from '../assets/images/no dp.jpg';
const mapStateToProps = state => { return { isAuth: state.auth.isAuth } }

function Navbar({ isAuth }) {
  
  return <nav className='w-full shadow-md'>
    <div className='max-w-[1200px] mx-auto p-6 flex justify-between items-center'>
      <div className='flex-[0.6]'>
        <img src={logo} alt="logo" className='w-[150px]' />
      </div>
      <div className='flex-1 flex justify-end items-center lg:gap-x-7 md:gap-x-4'>
        <input type="text" className='border-2 rounded-md md:block hidden py-2 px-4 outline-none focus:border-blue-700' placeholder='Search Blogs' />
        {isAuth
          ? <div className='flex justify-center items-center gap-x-3'>
            <Link to='/blog/create'>
              <button className='items-center gap-x-2 bg-blue-700 text-white py-2 px-3 rounded-md md:flex hidden'>Add Post <i><FaPlus /></i></button>
            </Link>

            <Link to='/blog/create'>
              <button className='w-[50px] h-[50px] rounded-full bg-blue-700 transition hover:bg-blue-800 text-white flex justify-center items-center text-[20px] md:hidden'>
                <FaPlus />
              </button>
            </Link>

            <img src={
              auth.currentUser?.photoURL ? auth.currentUser?.photoURL : noDp
            } className='w-[50px] h-[50px] rounded-full cursor-pointer border-2 transition hover:border-blue-700' alt="" />
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