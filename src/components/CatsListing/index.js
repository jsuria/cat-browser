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
     
        this.state = {
            cats: [],
            catBreedId: this.props.match.params.breed_id,
            catBreedName: this.props.match.params.breed_name
        }
    }

    componentDidMount(){
        this.loadScrollListener()

        if(!this.state.catBreedId){
            this.doListingQuery()
        } else {
            this.doFilterQuery()
        }
    }

    loadDetail(url){
        this.props.history.push(url)
    }   

    processImage(obj){
        if(obj?.image && obj.image?.url){
            return obj.image.url
        } else if(obj?.url && obj.url !== "") {
            return obj.url
        } else {
            return "/cat_white.png"
        }
    }

    async doListingQuery(){
        await axios.get(`https://api.thecatapi.com/v1/breeds?limit=${this.limit}`)
            .then(res => {
                const cats = res.data
                this.setState({ cats })
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
        this.limit += 20

        if(!this.state.catBreedId){
            this.doListingQuery()
        } else {
            this.doFilterQuery()
        }
    }


    render() {

        const catBreedId = this.state.catBreedId
        const resultCount = this.state.cats.length

        return (
            <>
            <div className="d-block p-3 w-100 listing-header">
                <h3>
                {
                    !catBreedId ? "All Breeds" : `${this.state.catBreedName}`
                }
                </h3>
            </div>
            <Container 
                fluid 
                className={`d-flex flex-wrap flex-fill p-0 ${resultCount < 10 ? 'compressed' : ''}`}
                id="listing-container"
            >    
                {
                    this.state.cats.map((cat, index) => 
                        <Card className="col-12 col-md-4 col-lg-3 col-xl-2 bg-dark flex-fill text-white catslisting"
                            onClick={() => this.loadDetail(`/detail/${encodeURI(cat.breeds ? cat.breeds[0].name : cat.name)}`)}
                            key={index}     
                            id={`card-item-${index}`}
                            style={{
                                backgroundImage: `url(${this.processImage(cat)})`
                            }}> 

                            <Card.ImgOverlay className="overlay">
                                <Card.Title className={cat.breeds ? "title filter" : "title"}>
                                    {cat.breeds ? "View details" : cat.name}
                                </Card.Title>
                                <Card.Subtitle className={cat.breeds ? "d-none" : "mb-4 mb-lg-5"}>{cat.origin}</Card.Subtitle>

                            </Card.ImgOverlay>                            
                        </Card>
                    )
                }
             
            </Container>
            </>
        )
    }
}

export default withRouter(CatsListing)