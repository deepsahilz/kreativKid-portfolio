import { useOutlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  const outlet = useOutlet();
  return (
    <>
    <Navbar/>
    {outlet}
    <Footer/>
    </>
  )
}
export default Layout