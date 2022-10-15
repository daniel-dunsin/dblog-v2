import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { database } from '../firebase-config';
import { OPEN_MODAL, SET_SINGLE_BLOG, START_LOADING, STOP_LOADING } from '../redux/actions';
import { Navbar, Footer, Preloader } from '../components';
import { FaChevronDown, FaTrashAlt } from 'react-icons/fa';
import noDp from '../assets/images/no dp.jpg'
const mapStateToProps = state => {
  return {
    loading: state.fetch.loading,
    blog: state.blog.singleBlog,
  }
}

function SingleBlog({ loading, blog, dispatch }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const getBlog = async () => {
    dispatch({ type: START_LOADING })
    try {
      const blogRef = doc(database, 'posts', id)
      const blog = (await getDoc(blogRef)).data();
      dispatch({ type: SET_SINGLE_BLOG, payload: { blog } });
      dispatch({ type: STOP_LOADING })
    }
    catch (error) {
      console.log(error);
      dispatch({ type: STOP_LOADING })
      dispatch({ type: OPEN_MODAL, payload: { modalText: error.message } });
    }
  }

  const deleteBlog = async () => {
    dispatch({ type: START_LOADING });
    try {
      const blogRef = doc(database, 'posts', id);
      await deleteDoc(blogRef);
      dispatch({ type: STOP_LOADING })
      navigate('/');
    }
    catch (error) {
      console.log(error);
      dispatch({ type: STOP_LOADING })
      dispatch({ type: OPEN_MODAL, payload: { modalText: error.message } });
    }
  }

  useEffect(() => {
    getBlog();
  }, [])

  if (loading) {
    return <>
      <Navbar />
      <Preloader />
      <Footer />
    </>
  }

  return <>
    <Navbar />
    <section className='bg-gray-100 min-h-screen py-9'>
      <div className='w-full max-w-[1200px] mx-auto'>
        {blog.image

          ? <div className='w-full h-[250px] relative lg:rounded-md overflow-hidden mb-5 lg:mx-6'>
            <img src={blog.image} alt="" className='w-full h-full object-cover object-center' />
            <div className='absolute top-0 p-8 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-10 flex flex-col justify-center items-center gap-y-3'>
              <h1 className='text-[28px] md:text-[40px] text-white'>{blog.title}</h1>
              <i className='text-white text-[30px] md:text-[40px]'>
                <FaChevronDown />
              </i>
            </div>
          </div>

          : <h1 className='text-[28px] md:text-[40px] text-black px-6 font-bold'>{blog.title}</h1>}


        <div className='px-6 mt-4'>

          <div className='flex flex-row gap-x-2 items-center'>
            <Link to={`/user/${blog.user.uid}`}>
              <img src={blog.user.image ? blog.user.image : noDp} alt={blog.user.email} className='w-[60px] h-[60px] rounded-full object-cover object-center border-2 transition hover:border-blue-700' />
            </Link>
            <div className='flex flex-col gap-x-1'>
              <h4 className='font-bold text-[18px]'>{blog.user.username ? blog.user.username : blog.user.email}</h4>
              <p className='text-[16px] font-bold text-gray-700'>Author</p>
            </div>
          </div>

          <div className='flex flex-row justify-between w-full items-center mt-6'>
            <h4 className='text-[18px] md:font-bold capitalize'>{blog.createdOn}</h4>
            <i className='text-[20px] text-red-600 hover:text-red-800 transition cursor-pointer' onClick={deleteBlog}><FaTrashAlt /></i>
          </div>

          <div className='mt-6'>
            {blog.body}
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
}

export default connect(mapStateToProps)(SingleBlog)