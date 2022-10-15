import React from 'react'
import { connect } from 'react-redux'


const mapStateToProps = state => {
  return {
    user: state.user.userData
  }
}

const AboutUser = ({ user }) => {
  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex flex-row gap-x-2'>
        <p className='font-bold'>
          Username :
        </p>
        <p>
          {user.displayName ? user.displayName : 'Not Added'}
        </p>
      </div>
      <div className='flex flex-row gap-x-2'>
        <p className='font-bold'>
          Email :
        </p>
        <p>
          {user.userEmail ? user.userEmail : 'Not Added'}
        </p>
      </div>
      <div className='flex flex-row gap-x-2'>
        <p className='font-bold'>
          Mobile Number :
        </p>
        <p>
          {user.phoneNumber ? user.phoneNumber : 'Not Added'}
        </p>
      </div>
      <div className='flex flex-row gap-x-2'>
        <p className='font-bold'>
          Portfolio URL :
        </p>
        {
          user.portfolio ? <a className='underline' href={user.portfolio}>{user.portfolio}</a> : <p>Not Added</p>
        }
      </div>
      <div className='flex flex-row gap-x-2'>
        <p className='font-bold'>
          Linkedin :
        </p>
        {
          user.linkedin ? <a className='underline' href={user.linkedin}>{user.linkedin}</a> : <p>Not Added</p>
        }
      </div>

      <div className='flex flex-row gap-x-2'>
        <p className='font-bold'>
          Twiiter :
        </p>
        {
          user.twitter ? <a className='underline' href={user.twitter}>{user.twitter}</a> : <p>Not Added</p>
        }
      </div>

      <div className='flex flex-row gap-x-2'>
        <p className='font-bold'>
          Github :
        </p>
        {
          user.github ? <a className='underline' href={user.github}>{user.github}</a> : <p>Not Added</p>
        }
      </div>

    </div>
  )
}

export default connect(mapStateToProps)(AboutUser)