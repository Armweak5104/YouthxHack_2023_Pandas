import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDonor: false
        };
    }
    async componentDidMount() {
        // Get user ID cookie
        var userIdCookie = document.cookie.split("; ").find((row) => row.startsWith("userID="))?.split('=')[1]
        // If don't have, redirect to login page
        if(!userIdCookie)
            window.location.replace("/login");

        var data = await this.getUserData(userIdCookie);
        this.setState({isDonor: data.donor});
    }

    getUserData = async (userId) => {
        var output = null;
        await fetch(`/api/users/${userId}/`)
        .then((res) => res.json())
        .then(async (json) => {
            const data = await json;
            output = data;
        })
        .catch((err) => {
            console.error(err);
        });
        return output;
    }

    getUsersOfTypeData = async (isDonor) => {
        var output = null;
        await fetch(`/api/users/?is_donor=${this.capitaliseFirstLetter(isDonor.toString())}`)
        .then((res) => res.json())
        .then(async (json) => {
            const data = await json;
            output = data;
        })
        .catch((err) => {
            console.error(err);
        });
        return output;
    }

    capitaliseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderDonors = async () => {
        var recepients = await this.getUsersOfTypeData(false);
        console.log(recepients);
        return(
            <h1>Donor</h1>
        );
    }

    renderRecepients = async () => {
        var donors = await this.getUsersOfTypeData(true);
        console.log(donors);
        return(
            <h1>Recepient</h1>
        );
    }
    
    async render() {
    }
}

export default Home;