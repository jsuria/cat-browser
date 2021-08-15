import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'

import axios from 'axios'

import {
  Link
} from "react-router-dom"

import {
  withRouter
} from "react-router"

import './style.css'

class Navibar extends React.Component {

    state = {
      breeds:[]
    }

    componentDidMount(){
      this.doQuery()
    }

    doQuery(){
      axios.get(`https://api.thecatapi.com/v1/breeds`)
          .then(res => {
              const breeds = res.data
              this.setState({ breeds })
          })
  }

    render(){

      return (

          <Navbar expand="lg" 
                  variant="dark" 
                  bg="dark" 
                  sticky="top"
                  className="catsnav"
            >
            <Container fluid>
              
              <Link className="navbar-brand" to="/">Cats Browser!</Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
                
                <Nav fill>
                  <NavDropdown 
                    title="Choose a Breed" 
                    id="collasible-nav-dropdown"
                    >
                      {
                            this.state.breeds.map((breed, index) => 
                              <NavDropdown.Item
                                key={index} 
                                href={`/filter/${encodeURI(breed.id)}`}>
                                  {breed.name}
                              </NavDropdown.Item>
                            )
                      }
                    </NavDropdown>
                  </Nav>
      
              </Navbar.Collapse>
            </Container>
          </Navbar>
      )
    }
  }

  export default withRouter(Navibar)