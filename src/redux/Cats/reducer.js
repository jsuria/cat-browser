import * as actionTypes from "./types"

const INITIAL_STATE = {
    breeds:[],
    images:[],
    currentFilter: null
}

const catReducer = (state, action) => {

    switch(action.type) {
        case actionTypes.LIST_ALL_BREEDS:
            return {}
        case actionTypes.SEARCHBY_BREED_ID:
            return {}
        case actionTypes.SEARCHBY_BREED_NAME:
            return {}
        case actionTypes.GET_IMAGE:
            return {}
    }

}

