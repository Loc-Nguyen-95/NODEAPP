export const Dishes = ( state = {
    isLoading: true,
    errMess: null,
    dishes: []
} , action ) => {
    switch(action.type) {
        case 'dishes_loading':
            return {
                ...state,
                isLoading: true
            }
        case 'add_dishes': 
            return {
                ...state,
                dishes: action.payload,
                isLoading: false
            }
        case 'dishes_failed':
            return {
                ...state,
                errMess: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}