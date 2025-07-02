import React from 'react'

const About = () => {
  return (
    <div className='bg-zinc-950 text-zinc-100 '>
        <div className='px-20'>
            <h1 className='text-center  pt-40 pb-10 leading-none text-[17rem] uppercase font-semibold font-founders'>About</h1>

            <div className='mb-14 bg-zinc-300 w-full h-50 rounded-xl'>

            </div>

            
          <div className='pb-20 text-4xl text-justify leading-15 font-nb flex flex-col gap-5 text-zinc-200'>
            <p>Hey, my name is Sahildeep Singh, currently 21, from Punjab, India. I recently completed my graduation, and most of what I know, I’ve learned through hands-on practice, reading docs, and asking the internet.</p>
            
            <p>I believe in learning by doing. I’ve spent the past couple of years working on personal projects, hackathon builds, and random ideas that made me better at what I love—building stuff that’s useful, creative, or just plain cool.</p> 
          <div className='hidden  gap-3 mt-10'>
            {["Passionate","Artist","Coder"].map((item,idx)=>(
              <div key={idx} className='py-1 px-4  rounded-full border border-zinc-700 text-lg'>{item}</div>
            ))}
          </div>
            <p>I’m also into graphic design and digital art, with freelance experience in tools like Photoshop and Figma.  Whether it's code or visuals, I like making things that serve a purpose and bring ideas to life. Always learning, always building.</p>
            
          </div>
        </div>
    </div>
  )
}

export default About
