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
            <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">CIS 550 Final Project</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/players">
                Artists
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/matches" >
                Albums
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/search_song">
                SearchSongs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/top_song">
                TopSongs
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar
