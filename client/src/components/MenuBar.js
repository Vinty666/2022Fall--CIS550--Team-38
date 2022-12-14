import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

  class MenuBar extends React.Component {
    render() {
        return(
            <Navbar type="dark" theme="dark" expand="md">
        <NavbarBrand href="/"  style={{background:'dark', color: 'yellow'}}>Music Wiki</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/" style={{background:'dark', color: 'yellow'}}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/artists"  style={{background:'dark', color: 'yellow'}}>
                Artists
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/songs"  style={{background:'dark', color: 'yellow'}}>
                Songs
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar
