import React from 'react';
import  { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";

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
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout title={this.state.title} />}>
                        <Route path="signup" element={<SignUp setTitle={this.setTitle.bind(this)} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;