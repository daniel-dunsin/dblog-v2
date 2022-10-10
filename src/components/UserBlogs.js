import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const mapStateToProps = state => {
  return {
    blogs: state.blog.userBlogs
  }
}


const UserBlogs = ({ blogs = [] }) => {
  return blogs.length > 0 ? <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
    {
      blogs.map((blog, index) => {
        return <Blog key={index} {...blog} />
      })
    }
  </div> : <div className='w-full flex py-4'>
    <h1 className='text-black text-[30px] text-center'>
      No Posts By This User
    </h1>
  </div>
}

export default connect(mapStateToProps)(UserBlogs)