import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, CardSubtitle, 
    Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Errors, LocalForm, Control } from 'react-redux-form'
import Row from 'reactstrap/lib/Row';

const minLength = (len) => (val) => (val) && (val.length >= len);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            caption: '',
            url: '',
            id: '',
            isModalOpen: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.showMeme = this.showMeme.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            name: '',
            caption: '',
            url: '',
            isModalOpen:  !this.state.isModalOpen
        });
    }

    showMeme() {
        const memeFunction = this.props.memes.map((iterator) => {
            return (
                <div className="col-12 col-md-4 col-sm-6 mt-3" key={iterator._id}>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h1">{iterator.name}</CardTitle>
                            <CardSubtitle tag="h2" className="mb-1 text-muted">
                                {iterator.caption}
                            </CardSubtitle>
                        </CardBody>
                        <img width="70%" src={iterator.url} alt="Card image cap" />
                        <CardBody>
                            <Button color="primary" onClick={() => {
                                this.setState({id: iterator._id, name: iterator.name, caption: iterator.caption,
                                        url: iterator.url, isModalOpen: !this.state.isModalOpen});
                                }}>Edit
                            </Button>
                            <Button color="danger" className="ml-3" 
                                onClick={() => {
                                    this.handleDelete(iterator._id);
                                }}>Delete
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            );
        })
        return (
            <div className="row row-content"
                style={{ maxHeight: "100px", width: "70%" }}>
                    {memeFunction}
            </div>
        )
    }

    handleDelete(memeId) {
        this.props.deleteMemes(memeId);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        this.props.postMemes(this.state.name, this.state.caption, this.state.url);
        e.preventDefault();
    }

    handleEdit(e) {
        this.props.updateMemes(this.state.id, e.name, e.caption, e.url);
        this.toggleModal();
    }

    render() {
        return (
            <React.Fragment>
                <div className="container" id="corners">
                    <div className="row row-content">
                        <div className="col-12">
                            <h1>Meme stream</h1>
                        </div>
                        <div className="col-12 col-md-9">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="name" md={2}>Meme Owner</Label>
                                    <Col md={10}>
                                        <Input type="text" id="name" name="name"
                                            placeholder="Enter your name"
                                            value={this.state.name} required
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="caption" md={2}>Place a caption here</Label>
                                    <Col md={10}>
                                        <Input type="text" id="caption" name="caption"
                                            placeholder="Be Creative With The Caption"
                                            value={this.state.caption} required
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="url" md={2}>Meme URL</Label>
                                    <Col md={10}>
                                        <Input type="url" id="url" name="url"
                                            placeholder="Enter URL of Your Meme Here"
                                            value={this.state.url} required
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                    <this.showMeme />
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Edit
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleEdit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text className="form-control" id="name" name="name"
                                        model=".name" placeholder="Your Name" defaultValue={this.state.name}
                                        disabled validators={{ minLength: minLength(3)}} />
                                    <Errors className="text-danger"
                                        show="touched" model=".name"
                                        messages={{ minLength: "Must be Greater than 3 Characters" }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="caption">Caption</Label>
                                    <Control.text className="form-control" id="caption" name="caption"
                                        model=".caption" placeholder="Caption" defaultValue={this.state.caption}
                                        validators={{ minLength: minLength(3)}} />
                                    <Errors className="text-danger" 
                                        show="touched" model=".caption" 
                                        messages={{minLength: "Must be Greater than 3 Characters"}}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="url">Link</Label>
                                    <Control.text className="form-control" id="url" name="url"
                                        model=".url" placeholder="Link" defaultValue={this.state.url}
                                        validators={{minLength: minLength(9)}} />
                                    <Errors className="text-danger"
                                        show="touched" model=".url"
                                        messages={{minLength: "Must be Greater than 9 Characters"}}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Home