import React from 'react'
import { Navbar, Footer } from '../components';
import { addDoc } from 'firebase/firestore';
import { postsRef, auth } from '../firebase-config';


// comments, title, img, tags, body, likes


function CreateBlogPage() {
  return (
    <>
      <Navbar />
      <Footer />
    </>
  )
}

export default CreateBlogPage