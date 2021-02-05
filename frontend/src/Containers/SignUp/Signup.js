import React, { useState, useEffect } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom';


const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
			width: 500,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '90%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		marginTop: theme.spacing(3),
	},
})


const SignUp = (props)=> {	

    const { classes } = props;
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState({
		isError: false,
		errorMessage: ''
	})
	// eslint-disable-next-line no-unused-vars
	const [passwordConfirmed, setPasswordConfirmed] = useState(false);
	const [phoneNumber, setphoneNumber] = useState('');
	
	useEffect(()=>{
		document.title = "Signup";
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	const onSubmit = (event) => {
		event.preventDefault();
		fetch('http://localhost:5000/api/user/', {
			method: 'POST',
			body: JSON.stringify({name: fullName, email: email, password: password, phone: phoneNumber}),
			headers: {
			'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (res.status !== 201)
				res.json().then(err => {
					setError({isError: true, errorMessage: err.error})
				})
			else
				window.location.href = ('http://localhost:5000/confirmation');
		})
		.catch(err => {
			setError({isError: true, errorMessage: 'There is an iusse, try again later.'})
		});
	}
    return(
		<>
			{error.isError ? 
				<div class="alert alert-danger" role="alert">
					{error.errorMessage}
				</div> : null
			}
			<main className={classes.main}>
				<Paper className={classes.paper} style={{marginBottom: '25px'}}>
					{/*<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>*/}
					<Typography component="h1" variant="h4" style={{color: 'blue'}}>
						Road to China
					</Typography>
					<Typography component="h3" variant="h6">
						Create your account now
					</Typography>
					<form className={classes.form} onSubmit={onSubmit}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="name">Full Name</InputLabel>
							<Input id="name" name="name" autoComplete="off" autoFocus value={fullName} onChange={e => setFullName(e.target.value)} />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email Address</InputLabel>
							<Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="phone">Confirm the Password</InputLabel>
							<Input name="quote" type="password" id="quote" autoComplete="off" onChange={e => setPasswordConfirmed(e.target.value === password)}  />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="phone">phone Number</InputLabel>
							<Input name="quote" type="text" id="quote" autoComplete="off" value={phoneNumber} onChange={e => setphoneNumber(e.target.value)}  />
						</FormControl>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
							Register
						</Button>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							style={{color: 'white'}}
							component={Link}
							to="/login"
							className={classes.submit}>
							Go back to Login
						</Button>
					</form>
				</Paper>
			</main>
		</>
	);
}

export default withRouter(withStyles(styles)(SignUp));