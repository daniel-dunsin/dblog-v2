import React from 'react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

const socials = [
  {
    icon: <FaGithub />,
    url: 'http://github.com/daniel-dunsin'
  },
  {
    icon: <FaLinkedin />,
    url: 'https://www.linkedin.com/in/daniel-adejare-551a20237'
  },
  {
    icon: <FaEnvelope />,
    url: 'mailto:adejaredaniel12@gmail.com'
  }
]

function Footer() {
  return <footer className='w-full bg-black md:p-8 py-8 px-4 flex md:flex-row flex-col-reverse md:gap-y-0 gap-y-5 md:justify-between justify-center text-white'>
    <p className='md:text-left text-center'>&copy; Copyright 2022. Designed and Developed by Daniel Dunsin</p>
    <div className='flex flex-row md:justify-end justify-center gap-x-4'>
      {
        socials.map((social, index) => {
          return <a href={social.url} key={index} className='text-[20px]'>
            {social.icon}
          </a>
        })
      }
    </div>
  </footer>
}

export default Footer