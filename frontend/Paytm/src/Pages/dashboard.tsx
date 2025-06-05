import React from 'react'
import { AppBar } from '../ui/AppBar'
import { Balance } from '../ui/Balance'
import { Users } from '../ui/UserComponent'

const Dashboard = () => {
  return (
    <div>
      <AppBar />
      <div className='m-8'>
        <Balance value={1000} />
        <Users/>

      </div>
    </div>
  )
}

export default Dashboard
