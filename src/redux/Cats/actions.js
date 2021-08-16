import * as actionTypes from './types'

export const listAllBreeds = (searchLimit) => {
    return {
        type: actionTypes.LIST_ALL_BREEDS,
        payload: searchLimit
    }
}   

export const searchByBreedId = (breedId) => {
    return {
        type: actionTypes.SEARCHBY_BREED_ID,
        payload: breedId
    }
}

export const searchByBreedName = (breedName) => {
    return {
        type: actionTypes.SEARCHBY_BREED_NAME,
        payload: breedName
    }
}

export const getImage = (referenceImageId) => {
    return {
        type: actionTypes.GET_IMAGE,
        payload: referenceImageId
    }
}

