import React from 'react';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

class SignUpPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signUpStage: 0,
            userType: "donor",
            name: "",
            phoneNum: 0,
            password: "",
            address: "",
            postalCode: 0
        }
    }

    handleUserTypeChange = (e) => {
        this.setState({userType : e.target.value});
    }

    handleUserNameChange = (e) => {
        this.setState({name : e.target.value});
    }

    handlePhoneNumChange = (e) => {
        this.setState({phoneNum : e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password : e.target.value});
    }

    handleAddressChange = (e) => {
        this.setState({address : e.target.value});
    }

    handlePostalCodeChange = (e) => {
        this.setState({postalCode : e.target.value});
    }

    nextStage = () => {
        this.setState({signUpStage : this.state.signUpStage + 1});
    }

    prevStage = () => {
        this.setState({signUpStage : this.state.signUpStage - 1});
    }

    validateAddress = () => {
        var addressObj = {
            "address": {
                "regionCode": "SG",
                "postalCode": this.state.postalCode,
                "addressLines": [this.state.address]
            }
        };
        console.log(addressObj);

        fetch("https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyBpjghxmYKMUsrECGSErgIZy-vTWhpUlIc", {
            method: 'POST',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify(addressObj)
        })
        .then((data) => {
            console.log(data);
        });
    }

    handleSubmit = (e) => {
        // Get geo string
        this.validateAddress();
//        var submitObj = {
//            "name": this.state.name,
//            "phoneNum": this.state.phoneNum,
//            "password": bcrypt.hashSync(this.state.password, salt)
//        }
//        console.log(submitObj.password);
    }

    render() {
        switch(this.state.signUpStage) {
            case 0:
                return(
                    <div>
                        <label>You are a ...</label>
                        <select value={this.state.userType} onChange={this.handleUserTypeChange}>
                            <option value="donor">Donor</option>
                            <option value="recepient">Recepient</option>
                        </select>
                        <button onClick={this.prevStage}>{'<'} Back</button>
                        <button onClick={this.nextStage}>Next {'>'}</button>
                    </div>
                );
            case 1:
                return(
                    <div>
                        <div>
                            <label>Name</label>
                            <input type="text" value={this.state.name} onChange={this.handleUserNameChange}/>
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input type="number" value={this.state.phoneNum} onChange={this.handlePhoneNumChange}/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                        </div>
                        <button onClick={this.prevStage}>{'<'} Back</button>
                        <button onClick={this.nextStage}>Next {'>'}</button>
                    </div>
                );
            case 2:
                return(
                    <div>
                        <div>
                            <label>Address</label>
                            <input type="text" value={this.state.address} onChange={this.handleAddressChange}/>
                        </div>
                        <div>
                            <label>Postal Code</label>
                            <input type="number" value={this.state.postalCode} onChange={this.handlePostalCodeChange}/>
                        </div>
                        <button onClick={this.prevStage}>{'<'} Back</button>
                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
                );
            default:
                return(null);
        }
    }
}

export default SignUpPage;