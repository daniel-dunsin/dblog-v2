import React from 'react'
import { connect } from 'react-redux'
import { CLOSE_MODAL } from '../redux/actions';
import { FaTimes } from 'react-icons/fa'
const mapStateToProps = state => {
    const { modalOpen, modalText } = state.modal
    return {
        modalOpen, modalText
    }
}

const Modal = ({ modalOpen, modalText, dispatch }) => {
    return (modalOpen && <section className='fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-[rgba(0,0,0,0.6)] z-40'>
        <div className='w-[90vw] max-w-[600px] bg-white p-8 rounded-md text-center flex flex-col gap-y-4 justify-center items-center'>
            <i className='text-[60px] text-red-700'>
                <FaTimes />
            </i>
            <h1 className='text-[18px]'>{modalText}</h1>
            <button className='w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-5 text-[16px] rounded-md' onClick={() => {
                dispatch({ type: CLOSE_MODAL })
            }}>Okay</button>
        </div>
    </section>
    )
}

export default connect(mapStateToProps)(Modal)