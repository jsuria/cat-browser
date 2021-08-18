import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
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
            const catImageUrl = {
                url: "/cat_white.png"
            };
            this.setState({ catImageUrl})
            console.log("Status: ", error.response.status, "Details: ", error.response.data)
        })
    }

    getImageReferenceId(){
        const firstElement = this.state.catDetail.filter((elem,idx) => idx === 0)
        return firstElement[0].reference_image_id
    }

    render() {

        let imageUrl = this.state.catImageUrl.url ?? "/cat_white.png"

        return (
            <>
            <div className="d-block p-3 w-100 listing-header">
                <h3>{this.catBreed}</h3>
            </div>
            <Container
                fluid
                className="d-flex flex-wrap h-100 p-0">
                    {
                        this.state.catDetail.map((catDetail, index) => 
                            <Card className="catsdetail rounded flex-fill"
                                  key={index}
                            >  
                                <Row className="g-0">
                                    <Col className="col-12 col-lg-6 h-100 image-bg" style={{
                                        backgroundImage: `url(${imageUrl})`
                                    }}>
                                    </Col>
                                    <Col className="col-12 col-lg-6 detail-bg mb-5 mb-lg-0">
                                        <Card.Body className="pb-5 mb-5 bg-transparent">
                                            <Card.Subtitle className="text-start my-4 mt-lg-5">
                                                <b>Breed Name:</b> {catDetail.name}
                                            </Card.Subtitle>
                                            <Card.Subtitle className="text-start mb-4 mb-lg-5"><b>Origin:</b> {catDetail.origin}</Card.Subtitle>
                                            <Card.Text className="text-start">
                                                <b>Description:</b> {catDetail.description}
                                            </Card.Text>
                                            <Card.Text className="text-start">
                                                <b>Temperament:</b> {catDetail.temperament}
                                            </Card.Text>
                                            <Card.Text className="text-start">
                                                <b>Life Span:</b> {catDetail.life_span} years
                                            </Card.Text>
                                    
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        )
                     }
            </Container>
            </>
        )
    }
}

export default withRouter(CatsDetail)