import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClientBoard from '../Components/ClientBoard/ClientBoard';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Route, Redirect, Switch } from 'react-router-dom'
//import asyncComponent from '../../hoc/asyncComponent';
import UploadComponent from '../Components/UploadComponent/UploadComponent'
import AppTable from '../Components/AppTable/AppTable'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

/*const Dashboard = asyncComponent(() => {
    return import('./Dashboard')
})

const ProductsAll = asyncComponent(() => {
    return import('./Products/All');
})  

const ShipmentsAll = asyncComponent(() => {
    return import('./Shipments/All');
});

const Invoices = asyncComponent(() => {
    return import('./Bills/Bills');
})

const Tickets = asyncComponent(() => {
    return import('./tickets/MainTickets');
});*/

const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit">
          ROAD TO CHINA
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
      },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }
}));

const Client = (props) => {
    const classes = useStyles();
    const [id, setId] = useState('')
    const [error, setError] = useState({isError: false, message: ''})
    const [success, setSuccess] = useState({isSuccess: false, message: ''})
    useEffect(() => {
        document.title ="Application-ROAD TO CHINA"
        console.log('here: ' + props.location.search)
        const query = new URLSearchParams(props.location.search);
        for (let param of query.entries()) {
            if(param[0] === 'id') {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setId(param[1])
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const errorHandler = (bool, message) => setError({isError: bool, message: message})
    const successHandler = (bool, message) => setSuccess({isSuccess: bool, message: message})

    return (
        <div className={classes.root}>
            <ClientBoard />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {success.isSuccess ? 
                        <div class="alert alert-success" role="alert">
                            {success.message}
                        </div> : null
                    }
                    {
                        error.isError ? 
                        <div class="alert alert-danger" role="alert">
                            {error.message}
                        </div> : null
                    }
                    <Grid container spacing={3}>
                        <Switch>
                            <Route path={props.match.url + '/documents'} exact >
                                <UploadComponent setSuccess={successHandler} setError={errorHandler} id={id} link="educational" title="Educational background certificates"/>
                                <UploadComponent setSuccess={successHandler} setError={errorHandler} id={id} link="professional" title="Professional background certificates"/>
                                <UploadComponent setSuccess={successHandler} setError={errorHandler} id={id} link="certificate" title="Other Certificate"/>
                            </Route>
                            <Route path={props.match.url + '/all'} exact >
                                <AppTable id={id} set={errorHandler} />
                            </Route>
                            <Redirect from={props.match.url+ '/'} exact to={props.match.url + '/documents'} />
                       </Switch>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
};

export default Client;