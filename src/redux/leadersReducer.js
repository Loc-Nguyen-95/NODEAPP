export const Leaders = ( state = {
    isLoading: true,
    leaders: [],
    errmess: null
}, action) => {
    switch(action.type){
        case "leaders_loading": 
            return {
                ...state,
                isLoading: true
            }
        case "add_leaders":
            return {
                ...state,
                leaders: action.payload,
                isLoading: false
            }
        case "leaders_failed":
            return {
                ...state,
                errmess: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}