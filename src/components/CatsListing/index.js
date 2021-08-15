import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import {
    withRouter
  } from "react-router"

import './style.scss'

class CatsListing extends React.Component {

    constructor(props){
        super(props)

        this.limit = 20
        this.loading = false
        //this.catBreedId = this.props.match.params.breed_id

        this.state = {
            cats: [],
            catBreedId: this.props.match.params.breed_id
        }
    }

    componentDidMount(){
        this.loadScrollListener()

        if(!this.catBreedId){
            this.doQuery()
        } else {
            this.doFilterQuery()
        }
    }

    processImage(obj){
        if(obj?.image && obj.image?.url){
            return obj.image.url
        } else {
            return "/cat_white.png"
        }
    }

    async doQuery(){
        await axios.get(`https://api.thecatapi.com/v1/breeds?limit=${this.limit}`)
            .then(res => {
                const cats = res.data
                this.setState({ cats })
                this.loading = false
            })
            .catch(error => {
                alert("We are down for maintenance at the moment. Please try again later!")
                console.log("Status: ", error.response.status, "Details: ", error.response.data)
            })
    }

    async doFilterQuery(){
        const breedId = this.state.catBreedId

        await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${this.limit}&breed_id=${breedId}`)
            .then(res => {
                const cats = res.data
                this.setState({ cats })
                this.loading = false
            })
            .catch(error => {
                alert("We are down for maintenance at the moment. Please try again later!")
                console.log("Status: ", error.response.status, "Details: ", error.response.data)
            })
    }

    loadScrollListener(){
         // Detect when scrolled to bottom.
         const listElm = document.querySelector('#listing-container')

         listElm.addEventListener('scroll', e => {
             if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                 this.scrollQuery();
             }
         });
    }

    scrollQuery(){  
        this.loading = true
        this.limit += 20

        if(!this.catBreedId){
            this.doQuery()
        } else {
            this.doFilterQuery()
        }
    }

    render() {
        return (
            <Container 
                fluid 
                className="d-flex flex-wrap justify-content-center"
                style={{
                    minWidth: "560px",
                    height: "90vh",
                    overflow: "auto"
                }}
                id="listing-container"
            >
            {
                this.state.cats.map((cat, index) => 
                    <Card className="col-12 col-md-4 col-lg-3 col-xl-2 m-1 bg-dark text-white catslisting" 
                        key={index} 
                        style={{
                            backgroundImage: `url(${this.processImage(cat)})`
                        }}>  
                        <Card.ImgOverlay className="overlay">
                            <Card.Title className="title">
                                {cat.name}
                            </Card.Title>
                            <Card.Subtitle>{cat.origin}</Card.Subtitle>
                            <Card.Link href={`/detail/${encodeURI(cat.name)}`}>Details</Card.Link>
                        </Card.ImgOverlay>
                    </Card>
                )
            }
            </Container>
        )
    }
}

export default withRouter(CatsListing)