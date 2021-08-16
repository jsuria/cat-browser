import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'

import axios from 'axios'

import {
  withRouter
} from "react-router"

import './style.scss'

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
              
              <Navbar.Brand className="navbar-brand" href="/">
                  <h3>OMG Cats!</h3> 
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                
                <Nav>
                  <NavDropdown 
                    align="end"
                    title="Choose a Breed" 
                    id="collasible-nav-dropdown"
                    >
                      {
                            this.state.breeds.map((breed, index) => 
                              <NavDropdown.Item
                                key={index} 
                                href={`/filter/${encodeURI(breed.id)}/${encodeURI(breed.name)}`}>
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