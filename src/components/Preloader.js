import React from 'react'
import { FaSpinner } from 'react-icons/fa'
const Preloader = () => {
    return (
        <section className="fixed top-0 left-0 w-full bg-[rgba(255,255,255,0.6)] min-h-screen flex justify-center items-center z-40">
            <i className='text-[30px] text-blue-600 font-bold animate-spin'>
                <FaSpinner />
            </i>
        </section>
    )
}

export default Preloader