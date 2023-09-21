export const Promos = (state = {
    isLoading: true,
    promos: [],
    errmess: null
}, action) => {
    switch(action.type){
        case "promos_loading":
            return {
                ...state,
                isLoading: true
            }
        case "add_promos":
            return {
                ...state,
                promos: action.payload,
                isLoading: false
            }
        case "promos_failed":
            return {
                ...state,
                errmess: action.payload,
                isLoading: false
            }
        default: 
            return state
    }
}