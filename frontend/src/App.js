import React from 'react';
import NavBar from "./components/NavBar";
import SignUpPage from "./components/SignUpPage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ""
        };
    }

    setTitle = (newTitle) => {
        this.setState({title: newTitle});
    }

    render() {
        return(
            <div>
                <NavBar title={this.state.title} />
                <SignUpPage setTitle={this.setTitle.bind(this)} />
            </div>
        );
    }
}

export default App;