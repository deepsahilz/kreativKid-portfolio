import React, { useState } from 'react'
import {Link, NavLink} from "react-router-dom"


const NavEffects =({text,target,font,isLogo})=>{
  return(
    <NavLink to={target}  className={`overflow-hidden relative h-6 ${isLogo&&"text-xl"} cursor-pointer hover:text-zinc-500 ${font?`font-${font}`:""}`}>
      <span className='block uppercase transition-transform duration-300 ease-in-out hover:-translate-y-full'>
        <span className='block'>{text}</span>
        <span className='block absolute left-0 top-full'>{text}</span>
      </span>
    </NavLink>
  )
}

const Navbar = () => {


  const [showMenu,setShowMenu] = useState(false);

  return (
    <>
    <div className='fixed top-2 mix-blend-difference w-full b z-50'>

        {/* <div className=' bg-white/10 rounded-xl backdrop-blur-sm w-[95vw] '> */}
        <div className='rounded-xl w-full overflow-hidden px-6 md:px-10 '>
          <div className='flex justify-between  items-center py-4 text-zinc-100'>
              <NavEffects target="/" text="kreativkid" isLogo="true" font="rejouice"/>

              <ul className='hidden lg:flex gap-5'>
                <NavEffects target="/" text="home"/>
                <NavEffects target="/work" text="Work"/>
                <NavEffects target="/about" text="about"/>
              </ul>
              <ul className='hidden lg:flex'>
              <NavEffects  text="Contact"/>
              </ul>
            <div onClick={()=>setShowMenu(!showMenu)} className='flex lg:hidden flex-col gap-2 w-14 group h-6'>
              <p className={`w-full h-0.5 bg-white  ${showMenu&&"translate-y-[10px] rotate-16"} transition-transform duration-150`}></p>
              <p className={`w-full h-0.5 bg-white ${showMenu&&"hidden"}`}></p>
              <p className={`w-full h-0.5 bg-white ${showMenu&&"-rotate-[15.5deg] -translate-y-[0px]"} transition-transform duration-150`}></p>
            </div>

          </div>
        </div>

    </div>
        {showMenu&&
        <div className='w-full h-[100vh] px-6 py-20  z-50 bg-zinc-200'>
          <ul className='flex flex-col text-xl'>
            <Link to="/" className='hover:text-blue-500'>Home</Link>
            <Link to="/work"  >Work</Link>
            <Link to="/about" >About</Link>
          </ul>
          
          <ul className='flex mt-20 flex-col text-2xl'>
            <span className='font-bold text-lg '>SOCIALS</span>
            <li className='hover:text-blue-500'>Instagram</li>
            <li>Behance</li>
            <li>Upwork</li>
          </ul>

        </div>
        }
    </>
  )
}

export default Navbar