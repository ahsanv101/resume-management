import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";


export class EditResume extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);


        this.onChangename = this.onChangename.bind(this);
        this.onChangeage = this.onChangeage.bind(this);
        this.onChangegender = this.onChangegender.bind(this);
        this.onChangedob = this.onChangedob.bind(this);

        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            name: '',
            age: '',
            gender: '',
            dob: ''
        }
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };
    
    onChangename(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeage(e) {
        this.setState({
            age: e.target.value
        });
    }

    onChangegender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangedob(e) {
        this.setState({
            dob: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            age: this.state.age,
            gender: this.state.gender,
            dob: this.state.dob
        };
        console.log(obj);
        axios.post('https://secret-bastion-93242.herokuapp.com/resume/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
    }

    componentDidMount() {
        axios.get('https://secret-bastion-93242.herokuapp.com/resume/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    age: response.data.age,
                    gender: response.data.gender,
                    dob: response.data.dob
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        // let button;
        // if(this.props.auth.user.admin){
        //     button =<Link to="/Admin" className="nav-link"> List of Resume </Link>; 
        // }
        // else{
        //     button =<Link to="/UserBoard" className="nav-link"> List of Resume </Link>; 

        // }
        return (
            <div>

<button
              style={{
          
                marginLeft: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-small waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>

            {/* <div className="collpase navbar-collapse">

              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                
                  {button }
                                 
                  <Link to="/create" className="nav-link">      Add New Resume</Link>

                
                </li>
              </ul>
              
            </div> */}
            <h3 align="center">Update Resume</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangename}
                                />
                    </div>

                    <div className="form-group">
                        <label>Age: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.age}
                                onChange={this.onChangeage}
                                />
                    </div>

                    <div className="form-group">
                        <label>Gender: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.gender}
                                onChange={this.onChangegender}
                                />
                    </div>

                    <div className="form-group">
                        <label>Date of Birth: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.dob}
                                onChange={this.onChangedob}
                                />
                    </div>
                    

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Resume" className="btn btn-primary" />
                    </div>
                </form>

            </div>
        )
    }
}

EditResume.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(
    mapStateToProps,
    { logoutUser }
  )(EditResume);