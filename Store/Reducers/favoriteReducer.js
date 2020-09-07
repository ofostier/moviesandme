const initialState = { favoritesFilm: [], tagPin: [], pinData: [] }

function toggleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
            if (favoriteFilmIndex !== -1) {
                // Le film est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
                }
            }
            else {
                // Le film n'est pas dans les films favoris, on l'ajoute à la liste
                nextState = {
                    ...state,
                    favoritesFilm: [...state.favoritesFilm, action.value]
                }
            }
            return nextState || state

        case 'TOGGLE_TAG':
            const pinIndex = state.pinData.findIndex(item => item.uuid === action.value[0].uuid)
            console.log("TOGGLE_TAG VALUE: ", action.value[0].uuid, pinIndex)
            console.log("TOGGLE_TAG STATE: ", state.pinData)
            if (pinIndex !== -1) {
                console.log("TOGGLE_TAG EXIST")
                // Le film est déjà dans les favoris, on le supprime de la liste
                /*
                nextState = {
                    ...state,
                    tagPin: state.tagPin.filter( (item, index) => index !== tagIndex)
                }

nextState = {
                    ...state,
                    pinData[pinIndex]: [...state.pinData, action.value[0]]
                }
                 */


            }
            else {
                console.log("TOGGLE_TAG NOT EXITS", action.value)
                // Le film n'est pas dans les films favoris, on l'ajoute à la liste
                nextState = {
                    ...state,
                    pinData: [...state.pinData, action.value[0]]
                }
            }
            console.log("Reducer STATE: ", state)
            return nextState || state

        case 'TOGGLE_PINUUID':
            const pinIndex2 = state.tagPin.findIndex(item => item === action.value)
            console.log("TOGGLE_PINUUID VALUE: ", action.value)
console.log("TOGGLE_PINUUIDa                                                                                                                                                                                                                                                                                                                                                                                                                                                 STATE: ", state.tagPin)
            if (pinIndex !== -1) {
                console.log("TOGGLE_PINUUID EXIST")
                // Le film est déjà dans les favoris, on le supprime de la liste
                /*
                nextState = {
                    ...state,
                    tagPin: state.tagPin.filter( (item, index) => index !== pinIndex)
                }

                 */
            }
            else {
                console.log("TOGGLE_PINUUID NOT EXITS", action.value)
                // Le film n'est pas dans les films favoris, on l'ajoute à la liste
                nextState = {
                    ...state,
                    tagPin: [...state.tagPin, action.value]
                }
            }
            console.log("Reducer STATE: ", state)
            return nextState || state

        default:
            return state
    }
}

export default toggleFavorite
