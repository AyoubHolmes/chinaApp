import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ReceiptIcon from '@material-ui/icons/Receipt';
import HelpIcon from '@material-ui/icons/Help';
import { Link } from 'react-router-dom';


export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/client/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Tableau de bord" />
    </ListItem>
    <ListItem button component={Link} to="/client/products">
      <ListItemIcon>
        <HomeWorkIcon />
      </ListItemIcon>
      <ListItemText primary="Gestion des produits"/>
    </ListItem>
    <ListItem button component={Link} to="/client/shipments">
      <ListItemIcon>
        <LocalShippingIcon />
      </ListItemIcon>
      <ListItemText primary="Gestion de colis" />
    </ListItem>
    <ListItem button component={Link} to="/client/invoices">
      <ListItemIcon>
        <MonetizationOnIcon/>
      </ListItemIcon>
      <ListItemText primary="Gestion des facture" />
    </ListItem>
    <ListItem button component={Link} to="/client/tickets">
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Gestion des tickets" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Need Help?" />
    </ListItem>
  </div>
);