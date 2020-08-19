
import React, { Component } from 'react';
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


import axios from 'axios';



const Resume = props => (
  <tr>
      <td>{props.resume.name}</td>
      <td>{props.resume.age}</td>
      <td>{props.resume.gender}</td>
      <td>{props.resume.dob}</td>
      
      <td>
        <Link to={"/edit/"+props.resume._id}>Edit</Link>
      </td>
      
  </tr>
)

class UserList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {resume: []};
    // this.deleteResume = this.deleteResume.bind(this);
}
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  getList() {
    return this.state.resume.map(function(current, i){
        return <Resume resume={current} key={i} /> ;
    })
}

  // deleteResume(i){
  //   console.log(i);
  //   // axios.post('http://localhost:3000/resume/update/'+this.props.match.params.id, obj)
  //   //         .then(res => console.log(res.data));
  // }

  componentDidMount() {
    axios.get('https://secret-bastion-93242.herokuapp.com/resume/')
        .then(response => {
            this.setState({ resume: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
}

    render() {
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

            <div className="collpase navbar-collapse">

              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/UserBoard" className="nav-link"> List of Resume </Link>
                                 
                  <Link to="/create" className="nav-link">      Add New Resume</Link>

                
                </li>
              </ul>
              
            </div>

              


            <h3>Resume List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.getList() }
                    </tbody>
                 </table>
            </div>
        )
    }
}

UserList.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(UserList);
