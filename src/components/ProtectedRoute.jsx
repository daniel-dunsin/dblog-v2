import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    isAuth : state.auth.isAuth
  }
}

const ProtectedRoute = ({isAuth, children}) => {
  if(!isAuth){
    return <Navigate to='/' />
  }
  return (
    children
  )
}

export default connect(mapStateToProps)(ProtectedRoute)