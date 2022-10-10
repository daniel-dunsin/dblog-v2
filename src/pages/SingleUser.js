import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { database, postsRef, usersRef } from '../firebase-config';
import { getDocs } from 'firebase/firestore';
import { Navbar, Footer } from '../components';
import { CHECK_LOCALSTORAGE_AUTH, SET_USER, SET_USERS_BLOGS } from '../redux/actions';
import noDp from '../assets/images/no dp.jpg';
const mapStateToProps = state => {
  return {
    user: state.user.userData,
    authUser: state.user.authUser,
    userBlogs: state.blog.userBlogs
  }
}
function SingleUser({ dispatch, user, authUser, userBlogs }) {
  const { id } = useParams()

  const getUser = useCallback(async () => {
    const snapshot = await getDocs(usersRef);
    const user = snapshot.docs.find(user => user.data().uid === id);
    dispatch({ type: SET_USER, payload: { user: user.data() } })
  }, [id]);

  const getUserBlogs = useCallback(async () => {
    const snapshot = await getDocs(postsRef);
    let blogs = snapshot.docs.filter(blog => blog.data().user.uid == id);
    blogs = blogs.map(blog => {
      return { ...blog.data(), id: blog.id }
    });
    dispatch({ type: SET_USERS_BLOGS, payload: { blogs } });
  }, [id])

  useEffect(() => {
    getUser();
    getUserBlogs();
  }, [getUser, getUserBlogs])
  useEffect(() => {
    dispatch({ type: CHECK_LOCALSTORAGE_AUTH });

  }, [dispatch]);


  return <>
    <Navbar />
    <section className='bg-gray-100 min-h-screen py-9 px-6'>
      <div className='w-full max-w-[1200px] mx-auto'>
        <div className='flex md:flex-row flex-col md:justify-start items-center gap-x-6 gap-y-4'>
          <div className='md:w-[250px] md:h-[250px] h-[200px] w-[200px] rounded-full border-4 transition duration-300 hover:border-blue-600 '>
            <img src={user.photoURL ? user.photoURL : noDp} className='w-full h-full rounded-full object-cover object-center' alt="" />
          </div>
          <div className='md:text-left text-center'>
            <h1 className={`font-bold mb-2 md:text-[20px] ${user.displayName ? 'capitalize': ''}`}>{user.displayName ? user.displayName : user.userEmail}</h1>
            
            {user.uid === authUser.uid && <button className='px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700'>Edit Profile</button>}
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
}

export default connect(mapStateToProps)(SingleUser)