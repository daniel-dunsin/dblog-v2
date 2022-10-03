import React, { useEffect } from 'react';
import { CHECK_LOCALSTORAGE_AUTH } from '../redux/actions';
import { Navbar, Footer } from '../components'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  }
}

function Home({ dispatch }) {
  useEffect(() => {
    dispatch({ type: CHECK_LOCALSTORAGE_AUTH })
  }, [])
  return <>
    <Navbar />
    <Footer />
  </>
}

export default connect(mapStateToProps)(Home)