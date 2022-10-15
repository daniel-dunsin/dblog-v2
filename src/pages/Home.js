import React, { useEffect, useState } from 'react';
import { CHECK_LOCALSTORAGE_AUTH, GET_ALL_BLOGS, OPEN_MODAL } from '../redux/actions';
import { getDocs } from 'firebase/firestore';
import { Navbar, Footer, Blog } from '../components'
import { connect } from 'react-redux';
import logo from '../assets/images/logo.png'
import { postsRef } from '../firebase-config';
import { FaSpinner } from 'react-icons/fa';

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    blogs: state.blog.allBlogs
  }
}

function Home({ dispatch, blogs = [], isAuth }) {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);

  const getBlogs = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(postsRef);
      const blogs = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      setLoading(false);
      setError(false);
      dispatch({
        type: GET_ALL_BLOGS, payload: { blogs }
      });
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
      dispatch({ type: OPEN_MODAL, payload: { modalText: 'Unable to get blogs' } })
    }
  }


  useEffect(() => {
    dispatch({ type: CHECK_LOCALSTORAGE_AUTH });
    getBlogs()
  }, [dispatch]);

  if (loading) {
    return <>
      <section className='bg-gray-100 min-h-[600px] py-9 px-6 flex justify-center items-center'>
        <i className='text-[30px] text-blue-700 animate-spin'><FaSpinner /></i>
      </section>
      <Footer />
    </>

  }

  if (error) {
    return <>
      <section className='bg-gray-100 min-h-[600px] py-9 px-6 flex justify-center items-center'>
        <h1 className='text-[40px]'>Unable to fetch blogs</h1>
      </section>
      <Footer />
    </>
  }

  return <>
    <Navbar />
    <section className='bg-gray-100 min-h-screen py-9 px-6'>
      <div className='w-full max-w-[1200px] mx-auto'>
        <img src={logo} alt="logo" className='mx-auto w-[70vw] max-w-[250px] block mb-[80px]' />

        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
          {blogs.map((blog, index) => (
            <Blog {...blog} key={index} getBlogs={getBlogs} />
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </>
}

export default connect(mapStateToProps)(Home)