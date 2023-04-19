import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <Logo />
                <nav className="navbar header_nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/add_product" >Add Product</NavLink>
                </nav>
            </header>
        );
    }
}

export default Header;
