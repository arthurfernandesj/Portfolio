import React, {useState, useEffect} from 'react'
import {Code, Menu, X} from 'lucide-react'
import { NAV_LINKS, PERSONAL_INFO } from '../utils/constants'
import { useScrollSpy } from '../../hooks/useScollSpy'


const Navbar = () => {

const [isOpen, setIsMenu] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);
const activeSection = useScrollSpy(NAV_LINKS.map(link => link.id));

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

 const handleNavClick = (sectionID) => {
  scrollToSection(sectionID);
  setIsMenu(false);
};



  return (
  
  <nav
    className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-gray-900 bg-opacity-90' : 'bg-transparent'}`}
    style ={{ transform: 'translate3d(0, 0, 0)' }}
    >
    <div className="max-w-[1320px]" >
      <div className='flex justify-between items-center py-4'>

        {/*LOGO*/ }
        <div className='flex items-center gap-4'>
          <Code className='w-6 h-6 text-primary' />

    <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="ml-4 text-white hover:text-primary transition-colors"
  >
    {PERSONAL_INFO.name.split(' ')[0]}

    </button>
        </div>

        <nav className=''>
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.id)}
              className={`text-white hover:text-primary transition-colors ${activeSection === link.id ? 'text-primary' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </nav>
        

        <div className=''>
          <button
            onClick={() => setIsMenu(!isOpen)}
            className='text-white hover:text-primary transition-colors md:hidden'
            >
              Hire Me
            </button>
        </div>
      </div>
    </div>
  </nav>
)
}

export default Navbar
