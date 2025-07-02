import React from 'react'
// import {gsap} from "gsap"
import ServiceCard from './ServiceCard'

const servicesData = [
  {color:"#ff5006",
  title:"Photoshop edits",
  images:["d",""]
  }
]

// const ServiceCard = ({children,bgColor})=>{

//   const showImages = ()=>{
//     // const t1 = gsap.timeline()

//     gsap.to(".page1",{
//       // transformOrigin:"100% 0%",
//       // rotate:10,
//       y:-50,
//       duration:1,
//       ease :"expo.out"
//     })
//     gsap.to(".page2",{
//       // transformOrigin:"100% 0%",
//       // rotate:15,
//       y:-100,
//       duration:1,
//       ease :"expo.out"
//     })
//     gsap.to(".page3",{
//       // transformOrigin:"100% 0%",
//       // rotate:20,
//       y:-150,
//       duration:1,
//       ease :"expo.out"
//     })
    
//   }
//   const hideImages = ()=>{
//     // const t1 = gsap.timeline()

//     gsap.to(".page1",{
//       // transformOrigin:"100% 0%",
//       // rotate:0,
//       y:0,
//       duration:0.5,
//       ease :"expo.inOut"
//     })
//     gsap.to(".page2",{
//       // transformOrigin:"100% 0%",
//       // rotate:0,
//       y:0,
//       duration:0.5,
//       ease :"expo.inOut"
//     })
//     gsap.to(".page3",{
//       // transformOrigin:"100% 0%",
//       // rotate:0,
//       y:0,
//       duration:0.5,
//       ease :"expo.inOut"
//     })
    
//   }

// return(
//   <div onMouseEnter={showImages} onMouseLeave={hideImages}  className='relative cursor-pointer koko folder group w-full h-full '>
    
//     <div style={{backgroundColor:bgColor}} className={`absolute w-full h-full rounded-l-xl p-[5%] z-20 rounded-b-xl `}>{children}</div>
    
//     <div 
//     style={{backgroundColor:bgColor}}
//     className='absolute rounded-t-2xl z-[200] -top-[10%]  right-0 w-[36%] h-[10%]'></div>
    
//     <div 
//     style={{backgroundColor:bgColor}}
//     className='absolute  z-[18] top-0  right-[28.2%]  -rotate-45 w-[20%] h-[10%]'></div>

//     {/* <div className=' w-full h-[26rem] bg-amber-600 -top-[10rem] absolute  overflow-hidden'> */}
//     <div className='absolute page1 bg-zinc-600 z-[10]  bottom-0 rounded-xl right-0  w-full h-60'></div>
//     <div className='absolute page2 bg-zinc-500 z-[9]   bottom-0 rounded-xl right-0  w-full h-60'></div>
//     <div className='absolute page3 bg-zinc-400 z-[8]   bottom-0 rounded-xl right-0  w-full h-60'></div>
//     {/* </div> */}


  
//   </div>
// )
// }
  
const Services = () => {
  
  return (
<div className='bg-zinc-950 font-nb   text-zinc-100 px-10 py-20 '>
        
        <h1 className='font-semibold text-8xl'>What else i do</h1>
        <p className='mb-40 text-2xl'>Just the stuff i do obsessively well !</p>
        
        <div className='grid grid-cols-4 h-60 w-full gap-2'>
        <ServiceCard  bgColor="#ff5006">
          <div className='uppercase text-xl font-semibold'>photoshop edits</div>
        </ServiceCard>
      
        <ServiceCard bgColor="#ffcc34">
          <div className='uppercase text-xl font-semibold'>poster designs</div>
        </ServiceCard>
        
        <ServiceCard bgColor="#34b8ff">
          <div className='uppercase text-xl font-semibold'>social media content </div>
        </ServiceCard>
        <ServiceCard bgColor="#c9d0d3">
          <div className=' uppercase'>photoshop edits</div>
        </ServiceCard>
        </div>

    </div>  )
}

export default Services