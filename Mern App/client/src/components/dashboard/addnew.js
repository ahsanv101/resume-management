import React, { Component } from 'react';
import { BrowserRouter as  Link } from "react-router-dom";
import axios from 'axios';
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class CreateResume extends Component {
    
    constructor(props) {
        super(props);
        //defining state for all our data
        console.log(props);
        this.state = {
            name: '',
            age: '',
            gender: '',
            dob: '',
            image:null

        }

        //binding all the functions so we can use them
        this.onChangename = this.onChangename.bind(this);
        this.onChangeage = this.onChangeage.bind(this);
        this.onChangegender = this.onChangegender.bind(this);
        this.onChangedob = this.onChangedob.bind(this);
        this.onChangeimage = this.onChangeimage.bind(this);
        
      
        this.onSubmit = this.onSubmit.bind(this);
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

    onChangeimage(e) {
        
        this.setState({
            image: e.target.files[0]
        });
    }


    onSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("age", this.state.age);
        formData.append("gender", this.state.gender);
        formData.append("dob", this.state.dob);
        formData.append("image", this.state.image);


        console.log(`Form submitted:`);
        console.log(`Name: ${this.state.name}`);
        console.log(`Age: ${this.state.age}`);
        console.log(`Gender: ${this.state.gender}`);
        console.log(`DOB: ${this.state.dob}`);
        console.log(`Image: ${this.state.image}`);
        //axiom post request to add all the data from the form which is send to backend server

        axios.post("https://secret-bastion-93242.herokuapp.com/resume/add", formData, { 
            })
            .then(res => {
            console.log(res.statusText)
            })
        
        this.setState({
            name: '',
            age: '',
            gender: '',
            dob: '',
            image:null
        })
    }

    render() {
        //return <h1>Hel</h1>
        //checks if user is logged in or admin and updates the linked of the pages accordingly
        // let button;
        // if(this.props.auth.user.admin){
        //     button =<Link to="/Admin" className="nav-link"> List of Resume </Link>; 
        // }
        // else{
        //     button =<Link to="/UserBoard" className="nav-link"> List of Resume </Link>; 

        // }
       // return <h1>Hel</h1>

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
                  {button}

                  <PrivateRoute exact path="/create" component={CreateResume} />        
                  <Link to="/create" className="nav-link">      Add New Resume</Link>

                
                </li>
              </ul>
              
            </div>  */}

                <p>Add New Resume</p>

            
                <form encType="multipart/form-data" onSubmit={this.onSubmit}>

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

                    <input type="file"
                    name="image" 
                    className="form-in"
                    onChange={this.onChangeimage} />
                                        

                    <div className="form-group">
                        <input type="submit" value="Create New Resume" className="btn btn-primary" />
                    </div>
                </form>





            </div>
        )
    }
}

CreateResume.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
auth: state.auth
});
  
export default connect(
    mapStateToProps,
    { logoutUser }
  )(CreateResume);