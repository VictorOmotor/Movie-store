import React from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'

const Navigation = ({movie}) => {
  return (
    <div className='rmdb-naviagtion'>
        <div className='rmdb-navigation-content'>
            <Link to={'/'}>
            <p>Home</p>
            </Link>
            <p>/</p>
            <p>{movie}</p>
        </div>
    </div>
  )
}

export default Navigation