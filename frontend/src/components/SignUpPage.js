import React from 'react';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.setTitle("Sign Up");
        this.state = {
            signUpStage: 0,
            userType: "donor",
            name: "",
            phoneNum: "",
            password: "",
            address: "",
            postalCode: "",
            placeId: ""
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

    validateAddress = async () => {
        // Create object to convert to JSON body
        var addressObj = {
            "address": {
                "regionCode": "SG",
                "postalCode": this.state.postalCode.toString(),
                "addressLines": [this.state.address]
            }
        };

        // Send POST request to Google Maps Address Validation API
        await fetch("https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyBpjghxmYKMUsrECGSErgIZy-vTWhpUlIc", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addressObj)
        })
        .then((response) => response.json())
        .then(async (json) => {
            const data = await json;
            // Store the returning placeId in state
            this.setState({placeId : data.result.geocode.placeId}, () => {
                this.submitData();
            });
        });
    }

    submitData = () => {
        var submitObj = {
            "name": this.state.name,
            "phoneNum": this.state.phoneNum,
            "password": bcrypt.hashSync(this.state.password, salt),
            "placeId": this.state.placeId,
            "isDonor": (this.state.userType === "donor")
        }
        console.log(submitObj);
        // TODO: Send obj to REST API
    }

    handleSubmit = async (e) => {
        // Validate address and get placeId
        await this.validateAddress();
    }

    render() {
        switch(this.state.signUpStage) {
            case 0:
                return(
                    <div className="signup-page">
                        <div className="signup-page-container">
                            <div className="signup-page-input-container">
                                <label>You are a ...</label>
                                <select value={this.state.userType} onChange={this.handleUserTypeChange}>
                                    <option value="donor">Donor</option>
                                    <option value="recepient">Recepient</option>
                                </select>
                            </div>
                            <div className="signup-page-button-container">
                                <button className="signup-page-button--2" onClick={this.nextStage}>Next {'>'}</button>
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return(
                    <div className="signup-page">
                        <div className="signup-page-container">
                            <div className="signup-page-input-container">
                                <label>Name</label>
                                <input type="text" value={this.state.name} onChange={this.handleUserNameChange}/>
                            </div>
                            <div className="signup-page-input-container">
                                <label>Phone Number</label>
                                <input type="number" value={this.state.phoneNum} onChange={this.handlePhoneNumChange}/>
                            </div>
                            <div className="signup-page-input-container">
                                <label>Password</label>
                                <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                            </div>
                            <div className="signup-page-button-container">
                                <button className="signup-page-button--1" onClick={this.prevStage}>{'<'} Back</button>
                                <button className="signup-page-button--2" onClick={this.nextStage}>Next {'>'}</button>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return(
                    <div className="signup-page">
                        <div className="signup-page-container">
                            <div className="signup-page-input-container">
                                <label>Address</label>
                                <input type="text" value={this.state.address} onChange={this.handleAddressChange}/>
                            </div>
                            <div className="signup-page-input-container">
                                <label>Postal Code</label>
                                <input type="number" value={this.state.postalCode} onChange={this.handlePostalCodeChange}/>
                            </div>
                            <div className="signup-page-button-container">
                                <button className="signup-page-button--1" onClick={this.prevStage}>{'<'} Back</button>
                                <button style={{backgroundColor: "#f27495", color: "white"}} className="signup-page-button--2" onClick={this.handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return(null);
        }
    }
}

export default SignUpPage;