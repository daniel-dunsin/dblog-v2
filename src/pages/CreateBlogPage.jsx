import React, { useEffect } from 'react'
import { Navbar, Footer, Preloader } from '../components';
import { addDoc } from 'firebase/firestore';
import { postsRef, auth, storage } from '../firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { CLEAR_BLOG_DETAILS, UPDATE_BLOG_CREDENTIALS, UPLOAD_IMAGE, OPEN_MODAL, START_LOADING, STOP_LOADING } from '../redux/actions';
import { FaPlus, FaPlusCircle } from 'react-icons/fa';


const getDate = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const timestamp = new Date();

  const day = timestamp.getDate();
  const month = months[timestamp.getMonth()];
  const year = timestamp.getFullYear();

  return `${day} ${month}, ${year}`;
}


const mapStateToProps = state => {
  const { title, image, body, tagsText, convertedTagsList } = state.blog.uploads;
  const { loading } = state.fetch;
  return {
    title, image, body, tagsText, convertedTagsList, loading
  }
}


function CreateBlogPage({ title, image, body, tagsText, convertedTagsList, loading, dispatch }) {
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: START_LOADING })
    try {
      await addDoc(postsRef, {
        title,
        body,
        tags: convertedTagsList,
        image,
        createdOn: getDate(),
        user: {
          uid: auth.currentUser.uid,
          username: auth.currentUser.displayName,
          email: auth.currentUser.email,
          image: auth.currentUser.photoURL
        }
      });
      dispatch({ type: STOP_LOADING })
      navigate('/')
    } catch (error) {
      console.log(error);
      dispatch({ type: OPEN_MODAL, payload: { modalText: error } });
      dispatch({ type: STOP_LOADING })
    }

  }
  const handleImageUpload = async (e) => {
    dispatch({ type: START_LOADING })
    try {
      const uploadedImage = e.target.files[0];
      if (uploadedImage === null) return;
      if (uploadedImage.type.includes('image')) {
        const imageRef = ref(storage, `${uploadedImage.name + v4()}`);
        const storedImage = await uploadBytes(imageRef, uploadedImage);
        const imageURL = await getDownloadURL(imageRef);
        dispatch({ type: UPLOAD_IMAGE, payload: { imageURL } });
        dispatch({ type: STOP_LOADING })
      }
    }
    catch (error) {
      console.log(error);
      dispatch({ type: OPEN_MODAL, payload: { modalText: error } });
      dispatch({ type: STOP_LOADING })
    }
  }
  useEffect(() => {
    dispatch({ type: CLEAR_BLOG_DETAILS })
  }, [dispatch])

  return (
    <>
      <Navbar />
      {
        loading && <Preloader />
      }
      <section className='w-full bg-gray-100 min-h-screen flex justify-center items-center'>
        <div className='max-w-[1000px] w-full mx-auto lg:p-8 p-6 bg-white rounded-lg shadow-lg md:min-h-max min-h-screen'>
          <form className='w-full' onSubmit={handleSubmit}>
            <div className='flex justify-between gap-6 lg:flex-row flex-col-reverse w-full'>
              <div className='flex-1 flex flex-col gap-y-4 w-full'>


                <input type="text" placeholder='Title...' required className='border-2 focus:border-blue-700 outline-none w-full px-3 py-3 text-[16px] rounded-md' value={title} onChange={(e) => {
                  dispatch({
                    type: UPDATE_BLOG_CREDENTIALS, payload: {
                      type: 'title',
                      variable: e.target.value
                    }
                  })
                }} />


                <input type="text" placeholder='Tags(seperate with comma)' required className='border-2 focus:border-blue-700 outline-none w-full px-3 py-3 text-[16px] rounded-md' value={tagsText} onChange={(e) => {
                  dispatch({
                    type: UPDATE_BLOG_CREDENTIALS, payload: {
                      type: 'tags',
                      variable: e.target.value
                    }
                  })
                }} />


                <textarea placeholder='Body...' required className='border-2 focus:border-blue-700 outline-none w-full px-3 py-3 text-[16px] rounded-md resize-none h-[350px]' value={body} onChange={(e) => {
                  dispatch({
                    type: UPDATE_BLOG_CREDENTIALS, payload: {
                      type: 'body',
                      variable: e.target.value
                    }
                  })
                }}></textarea>
              </div>

              <div className='flex-1 w-full'>
                <div className='border-2 rounded-md h-full w-full'>
                  <div className={`w-full h-full ${!image ? 'p-4' : null}`}>
                    {
                      image ? <div className='w-full h-full flex flex-col justify-between'>
                        <img src={image} alt="" className='w-full max-h-[450px] object-center object-cover' />
                        <div>
                          <input type="file" accept='image/jpeg, image/png' id='fileInput' className='hidden' onChange={handleImageUpload} />
                          <label htmlFor="fileInput" className='text-center text-blue-700 flex justify-center items-center gap-x-2 mb-2'>
                            <i><FaPlusCircle /></i>
                            <p>Change Image</p>
                          </label>
                        </div>
                      </div>

                        : <div className="w-full h-full">
                          <input type="file" accept='image/jpeg, image/png' id='fileInput' className='hidden' onChange={handleImageUpload} />
                          <label htmlFor="fileInput" className='rounded-md w-full h-full border-2 border-dashed border-blue-700 flex justify-center items-center flex-col gap-y-4 text-center p-4 cursor-pointer'>
                            <i className='text-blue-700 w-[50px] h-[50px] flex justify-center items-center border-2 border-dashed rounded-full border-blue-700'>
                              <FaPlus />
                            </i>
                            <p>Select image to upload (optional)</p>
                          </label>
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>



            <button type='submit' className='w-full p-3 bg-blue-700 hover:bg-blue-800 flex justify-center items-center gap-x-3 shadow-md hover:shadow-lg text-[16px] text-white mb-3 mt-6 rounded-md'>
              <p>ADD BLOG</p>
              <i>
                <FaPlus />
              </i>
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default connect(mapStateToProps)(CreateBlogPage)