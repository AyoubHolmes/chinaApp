import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClientBoard from '../Components/ClientBoard/ClientBoard';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//import { Route, Redirect, Switch } from 'react-router-dom'
//import asyncComponent from '../../hoc/asyncComponent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import UploadComponent from '../Components/UploadComponent/UploadComponent'

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
    useEffect(() => {
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.root}>
            <ClientBoard />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid spacing={3}>
                        <UploadComponent />
                        {/*<Switch>
                            <Route path={props.match.url + '/dashboard'} exact component={Dashboard} />
                            <Route path={props.match.url + '/products'} exact component={ProductsAll} />
                            <Route path={props.match.url + '/shipments'} exact component={ShipmentsAll} />
                            <Route path={props.match.url + '/invoices'} exact component={Invoices} />
                            <Route path={props.match.url + '/tickets'} exact component={Tickets} />
                            <Redirect from={props.match.url+ '/'} exact to={props.match.url + '/dashboard'} />
                        </Switch>*/}
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