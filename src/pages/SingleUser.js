import React, { useEffect, useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { database, postsRef, usersRef } from '../firebase-config';
import { getDocs } from 'firebase/firestore';
import { Navbar, Footer, UserBlogs } from '../components';
import { CHECK_LOCALSTORAGE_AUTH, SET_USER, SET_USERS_BLOGS } from '../redux/actions';
import AboutUser from '../components/AboutUser';
import noDp from '../assets/images/no dp.jpg';



const userComponents = [
  {
    title: 'Stories',
    component: <UserBlogs />
  },
  {
    title: 'About',
    component: <AboutUser />
  }
]


const mapStateToProps = state => {
  return {
    user: state.user.userData,
    authUser: state.user.authUser,
    userBlogs: state.blog.userBlogs
  }
}
function SingleUser({ dispatch, user, authUser, userBlogs }) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Stories');
  const [componentToDisplay, setComponentToDisplay] = useState({
    title: '',
    component: '',
  });



  const getUser = useCallback(async () => {
    const snapshot = await getDocs(usersRef);
    const user = snapshot.docs.find(user => user.data().uid === id);
    dispatch({ type: SET_USER, payload: { user: user.data() } });
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
  useEffect(() => {
    setComponentToDisplay(() => {
      return userComponents.find(component => component.title === activeTab);
    })
  }, [activeTab])

  return <>
    <Navbar />
    <section className='bg-gray-100 min-h-screen py-9 px-6'>
      <div className='w-full max-w-[1200px] mx-auto'>


        {/* user photo */}
        <div className='flex md:flex-row flex-col md:justify-start items-center gap-x-6 gap-y-4'>
          <div className='md:w-[250px] md:h-[250px] h-[200px] w-[200px] rounded-full border-4 transition duration-300 hover:border-blue-600 '>
            <img src={user.photoURL ? user.photoURL : noDp} className='w-full h-full rounded-full object-cover object-center' alt="" />
          </div>
          <div className='md:text-left text-center flex flex-col gap-y-2 items-start'>
            <h1 className={`font-bold md:text-[20px] ${user.displayName ? 'capitalize' : ''}`}>{user.displayName ? user.displayName : user.userEmail}</h1>

            {user.uid === authUser.uid && <Link to={'/user/edit/' + authUser.uid} className='px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 mx-auto md:mx-0'>Edit Profile</Link>}
          </div>
        </div>


        {/* user details */}
        <section className='mt-12'>
          <div className='flex border-b-4 gap-x-4'>
            {
              userComponents.map((userComponent, index) => {
                return <h2 key={index} className={`text-[18px] cursor-pointer ${activeTab === userComponent.title ? 'text-blue-600 font-bold' : ''}`} onClick={() => {
                  setActiveTab(userComponent.title)
                }}>{userComponent.title}</h2>
              })
            }
          </div>

          <div className='mt-4'>
            {componentToDisplay.component}
          </div>
        </section>
      </div>
    </section>
    <Footer />
  </>
}

export default connect(mapStateToProps)(SingleUser)