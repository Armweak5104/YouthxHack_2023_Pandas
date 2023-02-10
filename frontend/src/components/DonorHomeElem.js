import React from 'react';

class DonorHomeElem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ""
        };
    }
    componentDidMount() {
        this.getReverseAddress();
    }

    getReverseAddress = async () => {
        await fetch(`/api2/maps/api/place/details/json?place_id=${this.props.obj.address}&key=AIzaSyBpjghxmYKMUsrECGSErgIZy-vTWhpUlIc`)
        .then((res) => res.json())
        .then(async (json) => {
            const data = await json;
            this.setState({address: data.result.formatted_address});
        })
        .catch((err) => console.error(err));
    }

    getInventory = () => {
        var inventoryArr = this.props.obj.inventory.split(";");
        inventoryArr.pop();
        return <ul>{inventoryArr.map((i) => <div className="recepient-home-inventory-container">{i}<button name={i} onClick={this.sendRequest}>Request</button></div>)}</ul>;
    }

    sendRequest = async (e) => {
        var submitObj = {
            "recepient_id": Number(this.props.recepientId),
            "donor_id": Number(this.props.obj.id),
            "food": e.target.name,
            "is_accepted": false
        };

        await fetch("/api1/api/requests/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitObj)
        })
        .catch((err) => console.error(err))
    }

    render() {
        return(
            <div className="donor-home-elem">
                <div className="recepient-home-data-container">
                    <h3>{this.props.obj.name}</h3>
                    <label>Address: {this.state.address}</label>
                    {this.getInventory()}
                </div>
                <hr />
            </div>
        );
    }
}

export default DonorHomeElem;