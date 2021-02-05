import React, { useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../ClientBoard/Title';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import ClientContext from '../../context/client-context';

const Tables = (props) => {
    const clientContext = useContext(ClientContext);
    const deleteProductHandler = (id) => {
        if (window.confirm("Are you sure?"))
            firebase.deleteProduct(id).then(() => {
                firebase.deleteShipmentByProductID(id);
                clientContext.fetchData();
            }) 
    }
    const deleteShipmentHandler = (row) => {
        if (window.confirm("Are you sure?"))
            firebase.deleteShipment(row.shipmentID).then(clientContext.fetchData).then (() => {
                if (row.status === "Prés") {
                    const ticketsWaitingForPickup = clientContext.data.tickets.find(ticket => ticket.status === "Prés")
                    ticketsWaitingForPickup.shipments = ticketsWaitingForPickup.shipments.filter(ship => ship !== row.shipmentID);
                    firebase.editTicket(ticketsWaitingForPickup, ticketsWaitingForPickup.id)
                }
            });
    }
    useEffect(() => {
        console.log(props.rows)
    }, [props.rows])
    return (
    <React.Fragment>
        <Title>{props.title}</Title>
        <Table size="small">
            <TableHead>
                <TableRow>
                   {props.header.map((header, id) => (
                       <TableCell key={id}>{header}</TableCell>
                   ))}
                   {props.actions ?(
                            <TableCell>
                                actions
                            </TableCell>
                         ) : null}
                </TableRow>
            </TableHead>
            <TableBody>
                {props.rows.map((row, id) => (
                    <TableRow key={id}>
                        {Object.keys(row).filter(val => (val !== 'productID' && val !== 'shipmentID')).map((value, id) => {
                            return (
                                <TableCell key={id}>{row[value]}</TableCell>
                            )
                        })}
                        {props.productRowActions ?(
                            <TableCell>
                                <button onClick={()=>props.editProductHandler({...row})} className="btn text-primary">
                                    <CreateIcon />
                                </button>
                                <button 
                                    onClick={() => deleteProductHandler(id)}
                                    className="btn text-danger">
                                    <DeleteIcon />
                                </button>
                            </TableCell>
                         ) : null}
                         {
                             props.shipmentRowActions && row.status === "Prés" ? (
                                <TableCell>
                                    <button onClick={()=>props.editShipmentHandler({...row})} className="btn text-primary">
                                        <CreateIcon />
                                    </button>
                                    <button 
                                        onClick={() => deleteShipmentHandler(row)}
                                        className="btn text-danger">
                                        <DeleteIcon />
                                    </button>
                                </TableCell>
                             ) : null
                         }
                         {
                             props.ticketRowActions ? (
                                <TableCell>
                                    <button onClick={()=>props.openTicketHandler(row.uuid)} className="btn text-danger">
                                        <PictureAsPdfIcon />
                                    </button>
                                </TableCell>
                             ) : null
                         }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </React.Fragment>
    );
};

export default withRouter(Tables);

/*

<TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ship To</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Sale Amount</TableCell>
                <TableCell>Ship To</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Sale Amount</TableCell>
            
<TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                */