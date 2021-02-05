import React, { useState, useEffect } from 'react'
import {Paper, Button, FormControl, Input, InputLabel } from '@material-ui/core'
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


const Login = (props)=> {

    const { classes } = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState({
		isError: false,
		errorMessage: ''
	});

	
	useEffect(()=>{
		/*fetch('http://161.35.129.190/checkToken')
		.then(res => {
			if (res.status === 200) {
				res.json().then(r => {
					window.location.href = ('http://161.35.129.190/user/?id=' + r.id);
				});
			}
		})
		.catch(err => {
			console.error(err);
		});*/
		document.title = "Login";
	},[]);

	const getId = (email) => {
		let id = '';
		fetch('http://161.35.129.190/api/userid/' + email)
		.then(res => {
			if (res.status === 200) {
				res.json().then(r => {
					if(r.user.isApplied === 'false')
						window.location.href = ('http://161.35.129.190/user?id=' + r.user._id);
					else
						window.location.href = ('http://161.35.129.190/application?id=' + r.user._id);
				});
			}
			else if (res.status === 404)
				setError({
					isError: true,
					errorMessage: 'user not found'
				})
		})
		.catch(err => {
			console.error(err);
		});
		return (id);
	}

	const onSubmit = (event) => {
		event.preventDefault();
		fetch('http://161.35.129.190/api/user/authenticate', {
			method: 'POST',
			body: JSON.stringify({email: email, password: password}),
			headers: {
			'Content-Type': 'application/json'
			}
		})
		.then(res => {
			
			if (res.status === 200) 
				getId(email);
			else
				res.json().then(err => {
					setError({isError: true, errorMessage: err.error})
				})
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
			<main className={classes.main} style={{marginTop: '30px'}}>
				<Paper className={classes.paper} style={{marginBottom: '25px'}}>
					<form className={classes.form} onSubmit={onSubmit}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email Address</InputLabel>
							<Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
						</FormControl>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
							Sign in
						</Button>
						<p style={{marginTop: '20px'}}>No account yet? <Link to="/signup" style={{textDecoration: 'none'}}>Get Started for free</Link></p>
					</form>
				</Paper>
			</main>
		</>
	);
}

// style={{display: 'flex',flexDirection: 'row', flexWrap:'wrap', justifyContent: 'flex-start'}}
export default withRouter(withStyles(styles)(Login));