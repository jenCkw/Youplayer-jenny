import React from 'react'
import './Navbar.css'
import Search from '../Search'
import { Link } from 'react-router-dom';

function Nav({search}) {
  const [isactive, setIsactive] = React.useState(false);
  
  return (
    <header>
      <Link className='navLogo' to='/'>YouPlayer</Link>
      <div className="menu" onClick={()=> setIsactive(!isactive)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <nav className={isactive ? `nav-active`: ``}>
        <Search search={search} isactive={isactive}/>
        <div>
          <Link to="/login" className={isactive ? 'nav__login-active': 'nav__login'}>Login</Link>
        </div>
      </nav>
    </header>
  )
}

export default Nav
