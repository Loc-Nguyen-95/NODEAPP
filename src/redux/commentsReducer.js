export const Comments = ( state = {
    isLoading: true,
    comments: [],
    errMess: null
}, action ) => {
    switch(action.type){
        case "comments_loading":
            return {
                ...state,
                isLoading: true
            }
        case "add_comments":
            return {
                ...state,
                isLoading: false,
                comments: action.payload
            }
        case "comments_failed":
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            }

        case "add_comment":
            return {
                ...state,
                comments: state.comments.concat(action.payload)
            }
            
        default: 
            return state;
    }
}