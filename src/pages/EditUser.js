import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaPlus, FaSpinner } from 'react-icons/fa';
import { useState } from 'react';
import { auth, database, postsRef, storage, usersRef } from '../firebase-config';
import { v4 } from 'uuid';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { Navbar, Footer } from '../components';
import { HANDLE_EDIT_USER_CHANGE, SET_EDIT_USER, ADD_EDIT_USER_IMAGE } from '../redux/actions';
import noDp from '../assets/images/no dp.jpg';
import { doc, getDocs, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
const mapStateToProps = state => {
  return {
    authUser: state.user.authUser,
    editUser: state.user.editUser
  }
}

function EditUser({ authUser, editUser, dispatch }) {
  const [displayImage, setDisplayImage] = useState(editUser.photoURL ? editUser.photoURL : authUser.photoURL);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const uploadImage = async (e) => {
    setLoading(true);
    const imageUploaded = e.target.files[0];
    const imageRef = ref(storage, `${imageUploaded.name + v4()}`);
    await uploadBytes(imageRef, imageUploaded);
    const photoURL = await getDownloadURL(imageRef);
    console.log(photoURL);
    setDisplayImage(photoURL);
    dispatch({ type: ADD_EDIT_USER_IMAGE, payload: { photoURL } });
    setLoading(false);
  }
  //  get the user, set some of his values into the states
  const handleChange = (event) => {
    const { name, value } = event.target
    dispatch({ type: HANDLE_EDIT_USER_CHANGE, payload: { name, value } })
  };

  const handleSubmit = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const usersSnapshot = await getDocs(usersRef);
      const user = usersSnapshot.docs.find((user) => user.data().uid === authUser.uid);
      const userRef = doc(database, 'users', user.id);
      const cred = await updateProfile(auth.currentUser, {
        photoURL: editUser.photoURL,
        displayName: editUser.displayName,
        email: editUser.email,
        phoneNumber: editUser.phoneNumber,
      });
      await updateDoc(userRef, editUser);
      // get all blogs and update their user image
      const blogsSnapshot = await getDocs(postsRef);
      const blogs = blogsSnapshot.docs.filter(blog => blog.data().user.uid === user.data().uid);
      blogs.forEach(async (blog) => {
        const postRef = doc(database, 'posts', blog.id);
        await updateDoc(postRef, {
          user: {
            uid: authUser.uid,
            username: editUser.displayName,
            email: editUser.userEmail,
            image: editUser.photoURL
          }
        })
      });
      setLoading(false);
      navigate('/');
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch({ type: SET_EDIT_USER });
  }, [])

  return <>
    <Navbar />
    <section className='bg-gray-100 min-h-screen py-9 px-6'>
      {/* preloader */}
      {loading && <section className="fixed top-0 left-0 w-full bg-[rgba(255,255,255,0.6)] min-h-screen flex justify-center items-center">
        <i className='text-[30px] text-blue-600 font-bold animate-spin'>
          <FaSpinner />
        </i>
      </section>}

      <div className='w-full max-w-[1200px] mx-auto'>
        <form className='w-[90vw] max-w-[900px] bg-white rounded-md shadow-lg mx-auto' onSubmit={handleSubmit}>
          <div className='w-full flex lg:flex-row flex-col'>
            <aside className='lg:flex-[0.26] md:border-r-2 md:border-b-0 border-b-2 p-8'>
              <div className='w-[150px] h-[150px] mx-auto rounded-full border-4 hover:border-blue-600 overflow-hidden'>
                <img src={displayImage ? displayImage : noDp} className="w-full h-full object-center object-cover" alt="" />
              </div>

              <p className="my-2 text-center font-semibold">Upload a different image</p>
              <div>
                <input type="file" id="fileUpload" className='hidden' onChange={uploadImage} />
                <label htmlFor="fileUpload" className='flex gap-x-2 text-blue-600 font-semibold items-center justify-center cursor-pointer'>
                  <i><FaPlus /></i>
                  <p>Select Image</p>
                </label>
              </div>
            </aside>

            <section className='w-full lg:flex-[0.74] h-full p-8'>
              <h1 className='font-bold text-[26px] md:text-[32px] text-gray-800'>Edit Details</h1>
              <div className='grid md:grid-cols-2 grid-cols-1 mt-6 mb-12 gap-6'>
                <input type="text" className='col-span-1 w-full px-3 py-3 rounded-md border-2 focus:border-blue-600 outline-none' placeholder='Username' value={editUser.displayName} name='displayName' onChange={handleChange} />


                <input type="email" className='col-span-1 w-full px-3 py-3 rounded-md border-2 focus:border-blue-600 outline-none' placeholder='Email' name='userEmail' value={editUser.userEmail} onChange={handleChange} />


                <input type="number" className='col-span-1 w-full px-3 py-3 rounded-md border-2 focus:border-blue-600 outline-none' placeholder='Mobile Number' name='phoneNumber' value={editUser.phoneNumber} onChange={handleChange} />


                <input type="text" className='col-span-1 w-full px-3 py-3 rounded-md border-2 focus:border-blue-600 outline-none' placeholder='Portfolio URL' name='portfolio' value={editUser.portfolio} onChange={handleChange} />


                <input type="text" className='col-span-1 w-full px-3 py-3 rounded-md border-2 focus:border-blue-600 outline-none' placeholder='Linkedin profile' name='linkedin' value={editUser.linkedin} onChange={handleChange} />


                <input type="text" className='col-span-1 w-full px-3 py-3 rounded-md border-2 focus:border-blue-600 outline-none' placeholder='Github profile' value={editUser.github} name='github' onChange={handleChange} />


                <input type="text" className='col-span-1 w-full px-3 py-3 rounded-md border-2 focus:border-blue-600 outline-none' placeholder='Twitter profile' value={editUser.twitter} name='twitter' onChange={handleChange} />

              </div>
              <button type='submit' className='w-full p-3 bg-blue-600 hover:bg-blue-800 text-white text-[16px] rounded-md flex flex-row gap-x-4 justify-center items-center'>
                <i className='text-[25px]'>
                  <FaCheckCircle />
                </i>
                <p>Save</p>
              </button>
            </section>
          </div>

        </form>
      </div>
    </section>
    <Footer />
  </>
}

export default connect(mapStateToProps)(EditUser)