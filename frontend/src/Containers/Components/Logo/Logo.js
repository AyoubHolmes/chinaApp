import React from 'react';
import './Logo.css';

const Logo = (props) => {
    const style = {
        color: 'blue',
        fontSize: '50px'
    }
    return(
        <div className="logo">
            <h1 style={style}>ROAD TO CHINA</h1>
            <p>{props.value}</p>
        </div>
    );    
}
export default Logo;