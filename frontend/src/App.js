import React from 'react';
import  { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";


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
                        <Route index element={<Home />} />
                        <Route path="signup" element={<SignUp setTitle={this.setTitle.bind(this)} />} />
                        <Route path="login" element={<Login setTitle={this.setTitle.bind(this)} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;