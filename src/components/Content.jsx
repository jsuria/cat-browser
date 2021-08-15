import React from 'react'
import Container from 'react-bootstrap/Container'

export class Content extends React.Component {
  
    constructor(props){
        super(props)
        this.content = props.children
    }
    
    doSomething(str){
        return str.toUpperCase()
    }
     
    render(){
      return (
        <Container fluid className="d-flex flex-wrap justify-content-center">
            {this.content}          
        </Container>
      )
    }
  }