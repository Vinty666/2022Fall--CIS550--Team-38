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
        <NavbarBrand href="/">Music Wiki</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/artists">
                Artists
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/songs" >
                Songs
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar
