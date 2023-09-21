import { baseUrl } from "../utils/url";
import { store } from "./store";

//1. DISHES
export const dishesLoading = () => ({
    type: "dishes_loading"
})

export const addDishes = (dishes) => ({
    type: "add_dishes",
    payload: dishes
})

export const dishesFailed = (errmess) => ({
    type: 'dishes_failed',
    payload: errmess
})

export const fetchDishes = ()  => {
    store.dispatch(dishesLoading(true));
    fetch(baseUrl + 'dishes')
    .then( response => {
        if(response.ok) {
            return response
        } else {
            var error = new Error('Error: ' + response.status + response.statusText)
            error.response = response; //?
            throw error
        }
        
    }, 
    // Nằm ngoài response 
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    }
    )
    .then( response => response.json())
    .then( data => store.dispatch(addDishes(data)))
    .catch( error => store.dispatch (dishesFailed(error.message)))
}


//2. LEARDER
export const leadersLoading = () => ({
    type: "leaders_loading"
})

export const addLeaders = (dishes) => ({
    type: "add_leaders",
    payload: dishes
})

export const leadersFailed = (errmess) => ({
    type: 'leaders_failed',
    payload: errmess
})

export const fetchLeaders = ()  => {
    store.dispatch(leadersLoading(true));
    fetch(baseUrl + 'leaders')
    .then( response => {
        if(response.ok) {
            return response
        } else {
            var error = new Error('Error: ' + response.status + response.statusText)
            error.response = response; //?
            throw error
        }
        
    }, 
    // Nằm ngoài response 
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    }
    )
    .then( response => response.json())
    .then( data => {
        store.dispatch(addLeaders(data))
    })
    .catch( error => store.dispatch (leadersFailed(error.message)))
}


//3. PROMOTION 
const promosLoading = () => ({
    type: "promo_loading"
})

const addPromos = (promos) => ({
    type: "add_promos",
    payload: promos
})

const promosFailed = (errmess) => ({
    type: "promos_failed",
    payload: errmess
})

export const fetchPromos = () => {
    store.dispatch(promosLoading(true));
    fetch(baseUrl + 'promotions')
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            var error = new Error("Error: " + response.status + response.statusText );
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error("Error 2: ", error.message);
        throw errmess;
    })
    .then(data => data.json())
    .then(promos => store.dispatch(addPromos(promos)))
    .catch(err => store.dispatch(promosFailed(err)))
}

// COMMENTS
//action 
const commentsLoading = () => ({
    type: "comments_loading"
})

const addComments = (comments) => ({
    type: "add_comments",
    payload: comments
})

const commentsFailed = (errmess) => ({
    type: "comments_failed",
    payload: errmess
})

export const fetchComments = () => {
    store.dispatch(commentsLoading(true));
    fetch(baseUrl + 'comments')
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            var error = new Error("Error: " + response.status + response.statusText );
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error("Error 2: ", error.message);
        throw errmess;
    })
    .then(data => data.json())
    .then(comments => {
        // console.log(comments)
        store.dispatch(addComments(comments))
    })
    .catch(err => store.dispatch(commentsFailed(err)))
}

//FEEDBACK 
export const addFeedback = (feedback) => ({
    type: "add_feedback",
    payload: feedback
})

//ADD COMMENT
export const addComment = (cm) => ({
    type: "add_comment",
    payload: cm
})