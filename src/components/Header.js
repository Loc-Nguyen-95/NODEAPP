import React from 'react';
import { Nav, NavItem, Navbar, NavLink } from 'reactstrap';

class Header extends React.Component {
    render(){
        return(
            <div>
                <Nav>
                    <NavItem><NavLink href="/">Home</NavLink></NavItem>
                    <NavItem><NavLink href="/menu">Menu</NavLink></NavItem>
                    <NavItem><NavLink href="/contact">Contact</NavLink></NavItem>
                    <NavItem><NavLink href="/about">About</NavLink></NavItem>
               </Nav>
            </div>
        )
    }
}

export default Header;