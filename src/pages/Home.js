import React, { useEffect } from 'react';
import { CHECK_LOCALSTORAGE_AUTH, GET_ALL_BLOGS } from '../redux/actions';
import { getDocs } from 'firebase/firestore';
import { Navbar, Footer, Blog } from '../components'
import { connect } from 'react-redux';
import logo from '../assets/images/logo.png'
import { postsRef } from '../firebase-config';

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    blogs: state.blog.allBlogs
  }
}

function Home({ dispatch, blogs }) {

  const getBlogs = async () => {
    try {
      const snapshot = await getDocs(postsRef);
      const blogs = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      return blogs;
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    dispatch({ type: CHECK_LOCALSTORAGE_AUTH });
    getBlogs().then(blogs => {
      dispatch({
        type: GET_ALL_BLOGS, payload: {
          blogs
        }
      });
    });
  }, [dispatch]);
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