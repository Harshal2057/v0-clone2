import { onboardUser } from '../../modules/auth/actions/index.js';
import React from 'react'
import Navbar from '../../modules/home/components/navbar.jsx';

const Layout = async({children}) => {

  await onboardUser();  //from action/index.js

  return (
    <main className='flex flex-col min-h-screen relative overflow-x-hidden'>
        <Navbar/>
        <div
        className="fixed inset-0 -z-10 h-full w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] bg-[radial-gradient(#dadde2_1px,transparent_1px)] [background-size:16px_16px]"
      /> 
      <div className='flex-1 w-full mt-20'>
            {children}
      </div>
    </main>
  )
}

export default Layout