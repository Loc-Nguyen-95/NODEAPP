import { createStore, combineReducers } from "redux";
import { Comments } from "./commentsReducer";
import { Dishes } from "./dishesReducer";
import { Feedback } from "./feedbacksReducer";
import { Leaders } from "./leadersReducer";
import { Promos } from "./promosReducer";

import { reducer } from 'redux-form';

const rootReducer = combineReducers({
    dishes: Dishes,
    leaders: Leaders,
    promos: Promos,
    comments: Comments,
    feedbacks: Feedback,
    form: reducer // Note
})

export const store = createStore(
    rootReducer
)