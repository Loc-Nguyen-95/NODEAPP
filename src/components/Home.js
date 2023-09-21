import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { useSelector } from 'react-redux';


const RenderCard = ({ item, isLoading, errMess }) => {

    if (isLoading) {
        return (
            <div className="col-12 col-md">
                <h4>Loading...</h4>
            </div>
        )
    } else if (errMess) {
        return (
            <div className="col-12 col-md">
                    <h4>{errMess}</h4>
            </div>
        )
    }
    // console.log(item)
    else
        return (
            <div className="col-12 col-md m-1">
                <Card>
                    <CardImg src={'http://localhost:3001/' + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle className="h5">{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle className="h6" >{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
}

function Home() {

    const dishes = useSelector(state => state.dishes);
    const leaders = useSelector(state => state.leaders);
    const promos = useSelector(state => state.promos)

    return (
        <div className="container">
        <div className="row">
            {/* Render 3 lan */}
            <RenderCard
                item={dishes.dishes.filter(dish => dish.featured)[0]}
                isLoading={dishes.isLoading}
                errMess={dishes.errMess}
            />
            <RenderCard
                item={leaders.leaders.filter(leader => leader.featured)[0]}
                isLoading={leaders.isLoading}
                errMess={leaders.errMess}
            />
            <RenderCard
                item={promos.promos.filter(promo => promo.featured)[0]}
                isLoading={promos.isLoading}
                errMess={promos.errMess}
            />
        </div>
        </div>
    )
}

export default Home
