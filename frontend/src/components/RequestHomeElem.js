import React from 'react';

class RequestHomeElem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recepientData: null
        };
    }
    componentDidMount() {
        this.getRecepientUserData();
    }

    getReverseAddress = async () => {
        await fetch(`/api2/maps/api/place/details/json?place_id=${this.state.recepientData.address}&key=AIzaSyBpjghxmYKMUsrECGSErgIZy-vTWhpUlIc`)
        .then((res) => res.json())
        .then(async (json) => {
            const data = await json;
            this.setState({address: data.result.formatted_address});
        })
        .catch((err) => console.error(err));
    }

    getRecepientUserData = async () => {
        await fetch(`/api1/api/users/${this.props.obj.recepient_id}/`)
        .then((res) => res.json())
        .then(async (json) => {
            const data = await json;
            this.setState({recepientData: data}, () => {
                this.getReverseAddress();
            });
        })
        .catch((err) => console.error(err));
    }

    render() {
        var name =  ""
        if(this.state.recepientData) {
            name = this.state.recepientData.name;
        }

        return(
            <div className="donor-home-elem">
                <div className="recepient-home-data-container">
                    <h3>{name}</h3>
                    <label>Address: {this.state.address}</label>
                    <p>Food request: {this.props.obj.food}</p>
                </div>
                <hr />
            </div>
        );
    }
}

export default RequestHomeElem;