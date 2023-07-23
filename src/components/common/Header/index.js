import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import './styles.css'
import { auth } from '../../../firebase';
import { signOut } from "firebase/auth";
import { clearUser } from "../../../slices/userSlice";
import { useDispatch } from 'react-redux';

function Header() {
  const [user, loading, error] = useAuthState(auth);

  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className='navbar'>
      <div className='gradient'></div>
      <div className='links'>
        <NavLink to='/' >Signup</NavLink>
        <NavLink to='/podcasts' >Podcasts</NavLink>
        <NavLink to='/create-a-podcast' >Start A Podcast</NavLink>
        <NavLink to='/profile' >Profile</NavLink>
        {user && (
          <>
            <NavLink to='/editprofile'>Edit Profile</NavLink>
            <NavLink className={'logoutLink'} to='#' onClick={handleSignOut}>Logout</NavLink>
          </>
        )}
      </div>
    </div>
  )
}

export default Header