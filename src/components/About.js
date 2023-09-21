import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';

function About() {

    const leaders = useSelector(state => state.leaders);

    const list = leaders.leaders.map(item => {
        return (
            <div>
                {/* <div className="col-12 col-md-3">
                    <img src={'http://localhost:3001/' + item.image} style={{width: "90%"}}/>
                </div>
                <div className="col-12 col-md-9">
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                </div> */}

                <div className="media">
                    <img className="mr-3" src={'http://localhost:3001/' + item.image} alt={item.name} />
                    <div className="media-body">
                        <h5 className="mt-0">{item.name}</h5>
                        <p>{item.description}</p>
                    </div>
                </div>
                
            </div>
        )
    })

    const isLoading = leaders.isLoading;
    const errMess = leaders.errMess;
        
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
            <h2>About Us</h2>
            <hr />
            <div className="row">
                <div className="col-12 col-md-6">
                    <h3>Our story</h3>
                    <p>
                        Started in 2010, Ristorante con Fusion quickly established itself as a culinary
                        icon par excellence in Hong Kong. With its unique brand of world fusion cuisine
                        that can be found nowhere else, it enjoys patronage from the A-list clientele in
                        Hong Kong. Featuring four of the best three-star Michelin chefs in the world, you
                        never know what will arrive on your plate the next time you visit us.
                    </p>
                    <p>
                        The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful
                        chain started by our CEO, Mr. Peter Pan, that featured for the first time
                        the world's best cuisines in a pan.
                    </p>
                </div>

                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader>Facts</CardHeader>
                        <CardBody>
                            <dl className="row">
                                {/* chỉ định 1 nửa chiếm bao nhiêu */}
                                <dt className="col-6">Started</dt> 
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div>
                <Card>
                    <CardBody>
                        <blockquote>
                            <p>You better cut the pizza in four pieces because I'm not hungry enough to eat six.</p>
                            <footer>Yogi Berra, <cite title="Source Title">The Wit and Wisdom of Yougi Berra, P. Pepe, Diversion Books, 2014</cite></footer>
                        </blockquote>
                    </CardBody>
                </Card>
            </div>

            <hr />
            <h3>Corporate Leadership</h3>

            {list}

        </div >
    )
}

export default About;
