import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function Menu() {
    // console.log('dishes in menu: ', dishes);
    const dishes = useSelector(state => state.dishes);

    const menuList = dishes.dishes.map(item => {

        return (
            // cho mỗi card riêng lẽ
            <div className="col-12 col-md-5 m-1">
                <Link to={`/menu/${item.id}`}>
                    <Card>
                        <CardImg src={'http://localhost:3001/' + item.image} />
                        <CardImgOverlay>
                            <CardTitle className="h5">{item.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </Link>
            </div>
        )
    })

    const isLoading = dishes.isLoading;
    const errMess = dishes.errMess;

    if(isLoading){
        return (
            <div className="container">
                <h4>Loading...</h4>
            </div>
        )
    } else if(errMess) {
        return (
            <div className="container">
                <h4>{errMess}</h4>
            </div>
        )        
    }

    return (
        <div className="container">
            <div className="row">
                {menuList}
            </div>
        </div>
    )
}

export default Menu
