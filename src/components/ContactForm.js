import React, { useRef, useState, useEffect } from 'react'
import { Form, Row, Col, Label, Input, Button, } from "reactstrap";
import { useDispatch } from 'react-redux';
import { baseUrl } from '../utils/url';
import { addFeedback } from '../redux/action';
import { useForm, Controller  } from "react-hook-form";

function ContactForm() {
    const initialValue = { 
        fistname: '', 
        lastname: '',
        telnum: '',
        email: '',
        checkbox: false, 
        select: 'Tel.',
        feedback: ''
    };

    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit ] = useState(false);

    const dispatch = useDispatch();
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const telRef = useRef();
    const emailRef = useRef();
    const checkRef = useRef();
    const selectRef = useRef();
    const feedbackRef = useRef();

    const handleChange = (e)=> {
        // console.log(e.target);
        // const { name, value } = e.target;
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value ;
        setFormValues( 
            {...formValues, 
                [name] : value
                }
            ) // VD: firstname = e.target.firstname
        // console.log(formValues);
    }

    const validate = values => {
        const errors = {};
        if(!values.fistname){
            errors.fistname = "Fist name is required"
        } else if (values.fistname.length > 5) {
            errors.fistname = "First name must be less than 5 characters"
        }
        if(!values.lastname){
            errors.lastname = "Last name is required"
        }
        if(!values.telnum){
            errors.telnum = "Telephone number is required"
        }
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.email){
            errors.email = "Email is required"
        } else if(!reg.test(values.email)){
            errors.email = "This is not a valid email format"
        }
        // console.log(errors)
        return errors;
    }

    const handleSubmit = () => {
        console.log('test')
        setFormErrors( validate(formValues) );
        setIsSubmit(true);

        const newFeedback = {
            firstname: formValues.fistname,
            lastname: formValues.lastname,
            telnum: formValues.telnum,
            email: formValues.email,
            checkbox: formValues.checkbox,
            select: formValues.select,
            feedback: formValues.feedback
        }
        console.log('newFeedback: ', newFeedback);

        // const newFeedback = {
        //     firsname: firstnameRef.current.value,
        //     lastname: lastnameRef.current.value,
        //     telnum: telRef.current.value,
        //     email: emailRef.current.value,
        //     check: checkRef.current.checked, // Note
        //     select: selectRef.current.value,
        //     feedback: feedbackRef.current.value
        // }
    
        fetch(baseUrl + 'feedback', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFeedback), // Đưa về string
            credentials: "same-origin"
        })
            .then(response => response.json()) // đưa về JSON 
            .then(data => {
                console.log('data success:', data)
                dispatch(addFeedback(data))
            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        console.log('formErrors: ', formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log('formValues: ', formValues);
        }
    }, [formErrors]);

    // console.log(formValues);
    // console.log('formErrors: ', formErrors);

    return (
        <div>
            <Form onSubmit={e => e.preventDefault()} >
                {/* First Name */}
                <Row className="mb-3">
                    <Label htmlFor="firstname" sm="2">First Name</Label>
                    <Col sm="10">
                        <Input 
                            type="text" 
                            name="fistname" 
                            // innerRef={firstnameRef}
                            value={ formValues.fistname }
                            onChange={handleChange}
                        /> 
                        <p>{formErrors.fistname}</p>
                    </Col>
                </Row>

                {/* Last Name */}

                <Row className="mb-3">
                    <Label htmlFor="lastname" sm="2">Last Name</Label>
                    <Col sm="10">
                        <Input type="text" name="lastname" innerRef={lastnameRef}
                        value={ formValues.lastname }
                        onChange={handleChange}
                        />
                        {/* {errors.firstname && <p>This is required</p>} */}
                        <p>{formErrors.lastname}</p>
                    </Col>
                </Row>

                {/* Tel */}

                <Row className="mb-3">
                    <Label htmlFor="telnum" sm="2">Contact Tel.</Label>
                    <Col sm="10">
                        <Input 
                            type="number" 
                            name="telnum" 
                            innerRef={telRef}
                            value={ formValues.telnum }
                            onChange={handleChange}
                        />
                        <p>{formErrors.telnum}</p>
                    </Col>
                </Row>

                {/* Email */}

                <Row className="mb-3">
                    <Label htmlFor="email" sm="2">Email</Label>
                    <Col sm="10">
                        <Input 
                        type="email" 
                        name="email" 
                        innerRef={emailRef} 
                        value={ formValues.email }
                        onChange={handleChange}
                        />
                        <p>{formErrors.email}</p>
                    </Col>
                </Row>

                {/* Check + Select */}

                <Row className="mb-3">

                    <Col sm={{ size: 5, offset: 2 }}>
                        <Label check>
                            <Input 
                            type="checkbox" 
                            name="checkbox" 
                            innerRef={checkRef} 
                            value={ formValues.check }
                            onChange={handleChange}
                            /> May we contact you?
                        </Label>
                    </Col>

                    <Col sm={{ size: 3, offset: 2 }}>
                        <Input 
                            type="select" 
                            name="select" 
                            innerRef={selectRef}
                            value={ formValues.select }
                            onChange={handleChange}
                        >
                            <option>Tel.</option>
                            <option>Email</option>
                        </Input>
                    </Col>

                </Row>

                {/* Text Area */}

                <Row className="mb-3">
                    <Label htmlFor="feedback" sm="2">Your Feedback</Label>
                    <Col sm="10">
                        <Input 
                            type="textarea" 
                            rows="10" 
                            name="feedback" 
                            innerRef={feedbackRef}
                            value={ formValues.feedback }
                            onChange={handleChange}
                             />
                    </Col>
                </Row>

                {/* Button */}
                <Col sm={{ size: 10, offset: 2 }}>
                    <Button onClick={handleSubmit} type="submit" color="primary">Send feedback</Button>
                </Col>

            </Form>
        </div>
    )

}


export default ContactForm;
