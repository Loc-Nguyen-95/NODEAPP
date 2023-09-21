import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import CommentForm from './CommentForm';
import { baseUrl } from '../utils/url';

const RenderDish = ({ dish }) => {
    return (
        <div>
            <Card>
                <CardImg src={'http://localhost:3001/' + dish.image} alt={dish.name} />
                <CardBody>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

const RenderComments = ({ cmts, dishId }) => {
    console.log(cmts, dishId);
    const list = cmts.map(item => {
        return (
            <div>
                <li>
                    {item.comment}
                    <p>--{item.author}, {' '} {new Intl.DateTimeFormat('en-US', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    }).format(new Date(item.date))}
                    </p>
                </li>
            </div>
        )
    })

    return (
        <div>
            <h4>Comments</h4>
            <ol>
                {list}
            </ol>
            <CommentForm onSubmit={formData => {
                console.log(formData);
                const newComment = {
                    dishId: dishId,
                    rating: formData.rating,
                    author: formData.name,
                    comment: formData.comment
                }
                newComment.date = new Date().toISOString();
                fetch(baseUrl + 'comments', {
                    method: "POST",
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify(newComment),
                    credentials: "same-origin"
                }) 
                .then(response => console.log(response))
                .catch(error => console.log(error))
                window.location.reload();
            }} />
        </div>
    )
}

function DishDetail(props) {
    // console.log(dish)
    // console.log(props.cmts)
    const isLoading = props.isLoading;
    const errMess = props.errMess;

    if (isLoading) {
        return <h4>Loading...</h4>
    } else if (errMess) {
        return <h4>{errMess}</h4>
    }

    return (
        <div className="container">
            <h3>{props.dish.name}</h3>
            <hr />
            <div className="row">
                <div className="col-12 col-md">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md">
                    <RenderComments cmts={props.cmts} dishId={props.dish.id} />
                </div>
            </div>
        </div>
    )
}

export default DishDetail
