import React, { useRef } from 'react';

import { reduxForm } from "redux-form";

import ContactForm from './ContactForm';

function Contact() {

    return (
        <div className="container">

            <h2>Contact Us</h2>
            <hr />

            {/* INFOR */}
            <div className="row row-content">
                {/* tự động 12 ? */}
                <h3>Location Information</h3>

                <div className="col-12 col-sm-4 offset-sm-1">
                    <h5>Our Address</h5>
                    <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                    </address>
                </div>

                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>

                <div className="offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678">
                            <i className="fa fa-phone"></i> Call
                        </a>
                        <a role="button" className="btn btn-info">
                            <i className="fa fa-skype"></i> Skype
                        </a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net">
                            <i className="fa fa-envelope-o"></i> Email
                        </a>
                    </div>
                </div>

            </div>

            <hr />

            <h3>Send us Your feedback</h3>

            {/* FORM */}
            <div className="col-12 col-md-9">
                <ContactForm />
            </div>

        </div>
    )
}

export default Contact;
