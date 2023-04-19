import React, { Component } from 'react'
import Logo from './Logo';

class Footer extends Component {
  render() {
    return (
        <footer className='footer'>
            <Logo />
            <nav className="navbar footer_nav">
                <span>Careers</span>
                <span>About Us</span>
                <span>Contact Us</span>
                <span>Support</span>
            </nav>
            <div className="copyright">
                © Shop Local. All Rights Reserved
            </div>
      </footer>
    )
  }
}

export default Footer;