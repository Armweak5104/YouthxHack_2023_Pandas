import React from 'react';
import DonorHomeElem from '../components/DonorHomeElem';
import RequestHomeElem from '../components/RequestHomeElem';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDonor: false,
            userId: null,
            renderObj: null
        };
    }
    async componentDidMount() {
        // Get user ID cookie
        var userIdCookie = document.cookie.split("; ").find((row) => row.startsWith("userID="))?.split('=')[1]
        // If don't have, redirect to login page
        if(!userIdCookie)
            window.location.replace("/login");
        else
            this.setState({userId: userIdCookie});

        var data = await this.getUserData(userIdCookie);
        this.setState({isDonor: data.donor}, () => {
            if(this.state.isDonor)
                this.renderDonors();
            else
                this.renderRecepients();
        });

    }

    getUserData = async (userId) => {
        var output = null;
        await fetch(`/api1/api/users/${userId}/`)
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
        await fetch(`/api1/api/users/?is_donor=${this.capitaliseFirstLetter(isDonor.toString())}`)
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

    getRequestsOfId = async (donorId) => {
        var output = null;
        await fetch(`/api1/api/requests/?donor_id=${donorId}`)
        .then((res) => res.json())
        .then(async (json) => {
            const data = await json;
            output = data;
        })
        .catch((err) => console.error(err));
        return output;
    }

    capitaliseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderDonors = async () => {
        var requests = await this.getRequestsOfId(this.state.userId);
        var requestMap = requests.map((r) => <RequestHomeElem obj={r} key={r.recepient_id} />)
        this.setState({renderObj: requestMap});
    }

    renderRecepients = async () => {
        var donors = await this.getUsersOfTypeData(true);
        const donorsMap = donors.map((r) => <DonorHomeElem obj={r} key={r.id} recepientId={this.state.userId} />);
        this.setState({renderObj: donorsMap});
    }
    
    render() {
        return(
            <div className="home-page">
                {this.state.renderObj}
            </div>
        );
    }
}

export default Home;