import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

function Root() {
  return (
    <div >

  <NavBar/>
  <Outlet /> 
</div>
  )
}

export default Root
