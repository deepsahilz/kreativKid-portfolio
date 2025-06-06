import React from 'react'

const FeaturedWork = () => {
  const featured = [
    {name:"aaaa",src:"../src/assets/images/shabals/1.jpg"},
    {name:"bbbb",src:"../src/assets/images/shabals/1.jpg"},
    {name:"cccc",src:"../src/assets/images/shabals/1.jpg"},
    {name:"dddd",src:"../src/assets/images/shabals/1.jpg"},
    {name:"dddd",src:"../src/assets/images/shabals/1.jpg"},
    
  ]
  return (
    <div className='featured-section overflow-hidden bg-zinc-950 font-nb text-white px-20 py-20 '>
        <h1 className='font-semibold text-9xl mb-20'>Featured work</h1>
        <div className="flex gap-5 flex-wrap">
          {featured.map((item,idx)=>(
            <img className="w-70" src={item.src}></img>
          ))}
        </div>
    </div>
  )
}

export default FeaturedWork