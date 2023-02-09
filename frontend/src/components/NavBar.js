import React from 'react';

class NavBar extends React.Component {
    render() {
        return(
            <div className="navbar">{this.props.title}</div>
        );
    }
}

export default NavBar;