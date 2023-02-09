import React from 'react';
import bcrypt from 'bcryptjs';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.props.setTitle("Login");
        this.state = {
            phoneNum: "",
            password: ""
        };
    }

    handlePhoneNumChange = (e) => {
        this.setState({phoneNum : e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password : e.target.value});
    }

    handleSubmit = async (e) => {
        var data = await this.getUserData();
        this.checkPassword(data);
    }

    getUserData = async () => {
        var output = null;
        await fetch(`/api/users?phone_num=${this.state.phoneNum}`)
        .then((res) => res.json())
        .then(async (json) => {
            output = await json;
        })
        .catch((err) => {
            console.error(err);
        })
        return output;
    }

    checkPassword = (data) => {
        bcrypt.compare(this.state.password, data[0].password, (err, result) => {
            if(result) {
                // Assign user ID cookie
                document.cookie = `userID=${data[0].id}; SameSite=Strict`;
                // Go to home page
                window.location = "/";
            }
        });
    }

    render() {
        return(
            <div className="signup-page">
                <div className="signup-page-container">
                    <div className="signup-page-input-container">
                        <label>Phone Number</label>
                        <input type="number" value={this.state.phoneNum} onChange={this.handlePhoneNumChange}/>
                    </div>
                    <div className="signup-page-input-container">
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                    </div>
                    <div className="signup-page-button-container">
                        <button style={{backgroundColor: "#f27495", color: "white"}} className="signup-page-button--2" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;