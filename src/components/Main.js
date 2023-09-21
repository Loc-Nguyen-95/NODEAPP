import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from './Header';
import Menu from './Menu';
import About from './About';
import Contact from './Contact';
import Home from './Home';
import DishDetail from './DishDetail';

import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/action';
import { Route, Routes } from "react-router-dom";

import { useParams } from "react-router-dom"


function Main() {

    useEffect(() => {
        fetchDishes()
        fetchLeaders()
        fetchPromos()
        fetchComments()
    }, [])

    const dishes = useSelector(state => state.dishes);
    const comments = useSelector(state => state.comments);

    console.log(comments);

    const DishwithId = () => {
        const { dishId } = useParams();
        return <DishDetail
                    dish = {dishes.dishes.filter(dish => dish.id === parseInt(dishId))[0]} //để lấy phtử obj đầu tiên của array filter ra
                    cmts = {comments.comments.filter((comment) => comment.dishId === parseInt(dishId))}
                    isLoading = {dishes.isLoading}
                    errMess = {dishes.errMess}
                />
    }

    return (
        <div className="container">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} /> 
                
                {/* sử dụng param  */}
                <Route path="/menu/:dishId" element={<DishwithId />} /> 
                
                <Route path="/about" element={<About />} /> 
                <Route path="/contact" element={<Contact/>} />
            </Routes>
        </div>
    )
}

export default Main;