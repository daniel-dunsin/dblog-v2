import React from 'react';
import { Link } from 'react-router-dom';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { FaArrowRight } from 'react-icons/fa';
import noImage from '../assets/images/no image.jpg';
import noDp from '../assets/images/no dp.jpg';


function Blog({ id, image, tags, title, user, body }) {
  return (
    <article className='w-full p-3 border bg-white hover:shadow-lg shadow-md rounded-md'>
      <img src={image ? image : noImage} className="w-full h-[200px] object-center object-cover rounded-md" alt="" />
      <div className='mt-3 flex flex-col gap-y-[10px]'>

        <div className='flex flex-row flex-wrap gap-2'>
          {
            tags.map((tag, index) => (
              <span key={index} className='flex items-center gap-x-1 text-[15px] cursor-pointer'>
                <i className='text-[18px] text-blue-700'><BiPurchaseTagAlt /></i>
                <p className='capitalize'># {tag}</p>
              </span>
            ))
          }
        </div>

        <h2 className='uppercase text-[20px] font-semibold'>{title}</h2>
        <p className='text-[15px]'> {body.slice(0, 200)} </p>
        <p className='text-decoration-underline hover:text-blue-700 cursor-pointer flex flex-row items-center text-[14px] gap-x-2'>
          <Link to={`/blog/${id}`}>Read More</Link>
          <i>
            < FaArrowRight />
          </i>
        </p>

        <div className='flex flex-row gap-x-2 items-center'>
          <Link to={`/user/${user.uid}`}>
            <img src={user.image ? user.image : noDp} className='w-[50px] h-[50px] rounded-full object-cover object-center border-2 transition hover:border-blue-700' />
          </Link>
          <p className='cursor-pointer'>{user.username ? user.username : user.email}</p>
        </div>

      </div>
    </article>
  )
}

export default Blog