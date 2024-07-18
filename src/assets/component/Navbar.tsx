import React, { useState } from 'react';
import Logo from '../../../public/Logo.png';
import Login from './Login';
import useScrollDirection from './Hook';

interface NavbarProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  refs: {
    homeRef: React.RefObject<HTMLDivElement>;
    aboutRef: React.RefObject<HTMLDivElement>;
    portofolioRef: React.RefObject<HTMLDivElement>;
    contactRef: React.RefObject<HTMLDivElement>;
  };
  isLoggedIn: boolean;
  onLogin: (isLoggedIn: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection, refs, isLoggedIn, onLogin }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const scrollDirection = useScrollDirection();

  const NavItem = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <li>
      <a onClick={onClick} className="relative group cursor-pointer">
        {children}
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
      </a>
    </li>
  );

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLogout = () => {
    onLogin(false);
  };

  return (
    <>
      <div className={`navbar bg-gray-800 rounded-b-lg text-white fixed top-0 w-full z-50 transition-transform duration-300 ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <NavItem onClick={() => scrollToSection(refs.homeRef)}>HOME</NavItem>
              <NavItem onClick={() => scrollToSection(refs.aboutRef)}>ABOUT</NavItem>
              <NavItem onClick={() => scrollToSection(refs.portofolioRef)}>PORTFOLIO</NavItem>
              <NavItem onClick={() => scrollToSection(refs.contactRef)}>CONTACT</NavItem>
            </ul>
          </div>
          <div className="btn btn-ghost flex flex-col" onClick={() => scrollToSection(refs.homeRef)}>
            <img src={Logo} alt="Profile" className='h-10' />
          </div>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal gap-5 items-center">
            <NavItem onClick={() => scrollToSection(refs.homeRef)}>HOME</NavItem>
            <NavItem onClick={() => scrollToSection(refs.aboutRef)}>ABOUT</NavItem>
            <NavItem onClick={() => scrollToSection(refs.portofolioRef)}>PORTFOLIO</NavItem>
            <NavItem onClick={() => scrollToSection(refs.contactRef)}>CONTACT</NavItem>
            {isLoggedIn ? (
              <li><button onClick={handleLogout} className="btn btn-ghost"><i className='ph-sign-out text-2xl'></i></button></li>
            ) : (
              <li><button onClick={handleLoginClick} className="btn btn-ghost"><i className='ph-sign-in text-2xl'></i></button></li>
            )}
          </ul>
        </div>
      </div>
      {showLoginForm && !isLoggedIn && (
        <Login
          onLogin={(loggedIn) => {
            onLogin(loggedIn);
            setShowLoginForm(false);
          }}
          onClose={() => setShowLoginForm(false)}
        />
      )}
    </>
  );
}

export default Navbar;