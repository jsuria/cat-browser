import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'

import {
    withRouter
  } from "react-router"

import './style.scss'

class CatsDetail extends React.Component {

    constructor(props){
        super(props)
        this.catBreed = this.props.match.params.breed_name
        this.state = {
            catDetail: [],
            catImageUrl: {}
        }
    }

    componentDidMount(){
        this.doQuery()
    }

    async doQuery(){
        await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${this.catBreed}`)
        .then(res => {
            const catDetail = res.data;
            this.setState({ catDetail });
        })

        this.doGetImage(this.getImageReferenceId())
    }

    async doGetImage(imageId){
        await axios.get(`https://api.thecatapi.com/v1/images/${imageId}`)
        .then(res => {
            const catImageUrl = res.data;
            this.setState({ catImageUrl });
        })
        .catch(error => {
            alert("We are down for maintenance at the moment. Please try again later!")
            console.log("Status: ", error.response.status, "Details: ", error.response.data)
        })
    }

    getImageReferenceId(){
        const firstElement = this.state.catDetail.filter((elem,idx) => idx === 0)
        return firstElement[0].reference_image_id
    }

    render() {

        let imageUrl = this.state.catImageUrl.url ?? "./cat_white.png"

        return (
            <Container
                className="d-flex flex-wrap justify-content-center container-lg h-100">
                    {
                        this.state.catDetail.map((catDetail, index) => 
                            <Card className="my-5 catsdetail"
                                  key={index}
                            >  
                                <Row className="g-0">
                                    <Col className="col-12 col-sm-6">
                                        <Image src={imageUrl} className="w-100 rounded-start float-start" />
                                    </Col>
                                    <Col className="col-12 col-sm-6">
                                        <Card.Body>
                                            <Card.Title className="title text-start mt-5">
                                                {catDetail.name}
                                            </Card.Title>
                                            <Card.Subtitle className="text-start mb-5">{catDetail.origin}</Card.Subtitle>
                                            <Card.Text className="text-start">
                                                {catDetail.description}
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        )
                     }
            </Container>
        )
    }
}

export default withRouter(CatsDetail)