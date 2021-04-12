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
        const memeFunction = this.props.memes.map((meme) => {
            return (
                <div className="col-12 col-md-4 col-sm-6 mt-3" key={meme.id}>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">{meme.name}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-1 text-muted">
                                {meme.caption}
                            </CardSubtitle>
                        </CardBody>
                        <img width="100%" src={meme.url} alt={meme.url} />
                        <CardBody>
                            <Button color="primary" onClick={() => {
                                this.setState({
                                    id: meme.id,
                                    name: meme.name,
                                    caption: meme.caption,
                                    url: meme.url,
                                    isModalOpen: !this.state.isModalOpen
                                });
                            }}>Edit</Button>
                            <Button color="danger" className="ml-3" onClick={() => {
                                this.handleDelete(meme.id);
                            }}>Delete</Button>
                        </CardBody>
                    </Card>
                </div>
            );
        })
        return (
            <div className="row row-content overflow-auto" 
                style={{ maxHeight: "200px", width: "100%" }}>
                {memeFunction}
            </div>
        );
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
                </div>
                <this.showMeme />
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
                                        disabled />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="caption">Caption</Label>
                                    <Control.text className="form-control" id="caption" name="caption"
                                        model=".caption" placeholder="Caption" defaultValue={this.state.caption} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="url">Link</Label>
                                    <Control.text className="form-control" id="url" name="url"
                                        model=".url" placeholder="Link" defaultValue={this.state.url} />
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