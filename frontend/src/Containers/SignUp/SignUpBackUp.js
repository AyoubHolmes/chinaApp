import React from 'react'
import Input from "../../Components/Input/Input";
import Logo from "../../Components/Logo/Logo";
import Button from '../../Components/Input/Button';
import Radium from 'radium';
import { Link, withRouter } from 'react-router-dom';

const signUp = (props)=> {
    const style = {
        backgroundColor: 'white',
        border: '1px solid #eee',
        boxShadow: '0 2px 3px #ccc',
        textAlign: 'left',
        width: '90%',
        margin: '5%',
        justifyContent: 'flex-start',
        '@media (min-width : 600px)':{
            width: '900px',
            textAlign: 'center',
            margin: '30px auto'
        }
    }
    if (props.auth === 'admin')
        props.history.replace('/admin');
    else if (props.auth === 'livreur')
        props.history.replace('/livreur');
    else if (props.auth === 'client')
        props.history.replace('/client');

    return(
        <div style={style}>
            <Logo style={{fontSize: '16px'}}value="Create your account now" />
            <h5 style={{textAlign: 'center'}}>we will send you a confirmation email.</h5>
            <table style={{width: '100%', margin: 'auto'}}>
                <tbody>
                    <tr>
                        <td><Input styleName="inputText" label="First Name" typeInput="text"/></td>
                        <td><Input styleName="inputText" label="Last Name" typeInput="text"/></td>
                    </tr>
                    <tr>
                        <td><Input styleName="inputText" label="Phone Number" typeInput="text"/></td>
                        <td><Input styleName="inputText" label="Email" typeInput="email"/></td>
                    </tr>
                    <tr>
                        <td><Input styleName="inputText" label="Password" typeInput="password"/></td>
                        <td><Input styleName="inputText" label="Confirm the password" typeInput="password"/></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><Button width="40%" margin="5% 30%" value="Sign up"/></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><p style={{marginLeft:"37%", width: '50%'}} className="Input">You have already an account ? <Link style={{textDecoration: 'none'}} to="/login">Login here.</Link></p></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

// style={{display: 'flex',flexDirection: 'row', flexWrap:'wrap', justifyContent: 'flex-start'}}
export default withRouter(Radium(signUp));