import React, {useState} from 'react';
import { reduxForm, Field } from "redux-form";
import { Modal, ModalHeader, ModalBody, Form, Row, FormGroup, Label, Col, Button } from 'reactstrap';

function CommentForm( props ) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClickButton = () => {
        setIsModalOpen(true)
    }
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }
    const {handleSubmit} = props
  return (
    <div>
        <Button onClick={handleClickButton}>Submit Comment</Button>
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader>Leave your comment</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    {/* <Row> */}
                    <FormGroup row>
                        <Label sm={2}>Rating</Label>
                        <Col sm={10}>
                            <Field component="select" name="rating" 
                                style={{height: "100%", width: "100%"}}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </Field>
                        </Col>
                        </FormGroup>
                    {/* </Row> */}
                    <FormGroup row>
                        <Label sm={2}>Name</Label>
                        <Col sm={10}>
                            <Field component="input" name="name" 
                            style={{height: "100%", width: "100%"}}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Comment</Label>
                        <Col sm={10}>
                            <Field component="textarea" name="comment" 
                            rows="5"
                            style={{height: "100%", width: "100%"}}/>
                        </Col>
                    </FormGroup>

                    <Col sm={{offset: 2}}>
                        <Button>Submit</Button>
                    </Col>
                </Form>
            </ModalBody>
        </Modal>
    </div>
  )
}

export default reduxForm({form: "comment"})(CommentForm)
