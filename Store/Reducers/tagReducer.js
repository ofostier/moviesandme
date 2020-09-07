const initialState = { tagPin: [] }

function toggleTag(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_TAG':
            const tagIndex = state.tagPin.findIndex(item => item.id === action.value.id)
            if (tagIndex !== -1) {
                // Le film est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,
                    tagPin: state.tagPin.filter( (item, index) => index !== tagIndex)
                }
            }
            else {
                // Le film n'est pas dans les films favoris, on l'ajoute à la liste
                nextState = {
                    ...state,
                    tagPin: [...state.tagPin, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleTag
