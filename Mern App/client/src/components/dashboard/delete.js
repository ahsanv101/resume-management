import React, { Component } from 'react';
import axios from 'axios';




export default class DeleteResume extends Component {
    constructor(props) {
        super(props);

        console.log("de");
        axios.delete('https://secret-bastion-93242.herokuapp.com/resume/delete/'+this.props.match.params.id)
            .then(res => console.log("Deleted"));

        this.props.history.push('/Admin');
        window.location.reload(false);

    }


    render() {
        return <h1>Delete</h1>
    }
}