import { Component } from "react";
import Header from './Header';
import Home from './Home';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMemes } from "../redux/actionCreators";

const mapStateToProps = state => {
    return {
        memes: state.memes
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchMemes: () => dispatch(fetchMemes())
})

class Memestream extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchMemes()
    }
    render() {
        const page = () => {
            return (
                <Home errMess={this.props.memes.errMess} memes={this.props.memes.memes} 
                    deleteMemes={this.props.deleteMemes} postMemes={this.props.postMemes} 
                    fetchMemes={this.props.fetchMemes} updateMemes={this.props.updateMemes} />
            )
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/" component={page} />
                    <Redirect to="/" />
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Memestream));
