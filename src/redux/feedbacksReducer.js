export const Feedback = ( state = {
    feedbacks: []
}, action ) => {
    
    switch(action.type){
        case "add_feedback":
            const feedback = action.payload;
            alert("Thank for your feedback: " + JSON.stringify(feedback) ) //Note, lại đưa về string
            return {
                ...state,
                feedbacks: state.feedbacks.concat(feedback) // Note, JSON 
            }
        default: 
            return state;
    }
}