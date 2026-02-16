import {gsap} from "gsap"

const ServiceCard = ({children,bgColor})=>{

  const showImages = (e)=>{
    // const t1 = gsap.timeline()
    const page1 = e.currentTarget.querySelector(".page1")
    const page2 = e.currentTarget.querySelector(".page2")
    const page3 = e.currentTarget.querySelector(".page3")

    gsap.to(page1,{
      // transformOrigin:"100% 0%",
      // rotate:10,
      y:-80,
      duration:1,
      ease :"expo.out"
    })
    gsap.to(page2,{
      // transformOrigin:"100% 0%",
      // rotate:15,
      y:-150,
      duration:1,
      ease :"expo.out"
    })
    gsap.to(page3,{
      // transformOrigin:"100% 0%",
      // rotate:20,
      y:-210,
      duration:1,
      ease :"expo.out"
    })
    
  }
  const hideImages = (e)=>{
    // const t1 = gsap.timeline()
    const page1 = e.currentTarget.querySelector(".page1")
    const page2 = e.currentTarget.querySelector(".page2")
    const page3 = e.currentTarget.querySelector(".page3")

    gsap.to(page1,{
      // transformOrigin:"100% 0%",
      // rotate:0,
      y:0,
      duration:0.5,
      ease :"expo.inOut"
    })
    gsap.to(page2,{
      // transformOrigin:"100% 0%",
      // rotate:0,
      y:0,
      duration:0.5,
      ease :"expo.inOut"
    })
    gsap.to(page3,{
      // transformOrigin:"100% 0%",
      // rotate:0,
      y:0,
      duration:0.5,
      ease :"expo.inOut"
    })
    
  }

return(
  <div onMouseEnter={showImages} onMouseLeave={hideImages}  className='relative text-zinc-900 cursor-pointer koko folder group w-full h-full '>
    
    <div style={{backgroundColor:bgColor}} className={`absolute w-full h-full rounded-l-xl p-[5%] z-20 rounded-b-xl `}>{children}</div>
    
    <div 
    style={{backgroundColor:bgColor}}
    className='absolute rounded-t-2xl z-[200] -top-[10%]  right-0 w-[36%] h-[10%]'></div>
    
    <div 
    style={{backgroundColor:bgColor}}
    className='absolute  z-[18] top-0  right-[28.2%]  -rotate-45 w-[20%] h-[10%]'></div>

    <div className=' w-full h-full relative flex justify-center items-center'>
        <div className='absolute page1 bg-zinc-600 z-[10] overflow-hidden bottom-0  right-0  w-full h-60'>
            <img src="/images/artworks/img (6).webp" className="w-full h-full object-cover" />
        </div>
        <div className='absolute page2 bg-zinc-500 z-[9] overflow-hidden  bottom-0  w-[98%] h-60'>
            <img src="/images/artworks/img (4).webp" className="w-full h-full object-cover" />
        </div>
        <div className='absolute page3 bg-zinc-400 z-[8] overflow-hidden  bottom-0  w-[96%] h-60'>
            <img src="/images/artworks/img (13).webp" className="w-full h-full object-cover" />
        </div>
    </div>


  
  </div>
)
}

export default ServiceCard