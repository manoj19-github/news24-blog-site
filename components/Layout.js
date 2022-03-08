import React from 'react'
import Header from "./Header"
import Footer from "./Footer"
const Layout = ({children}) => {
    return (
        <div className="w-full mt-4  ">
          <Header/>
            <div className="m-4 lg:ml-8 lg:mr-4  min-h-[180vh] ">{children}</div>
          <Footer/>
        </div>
    )
}

export default Layout
