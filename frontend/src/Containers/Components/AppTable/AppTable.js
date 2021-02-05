import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../ClientBoard/Title';

const AppTable = (props) => {
    const [application, setApplication] = useState({})
    useEffect(()=> {
        fetch('http://localhost:5000/checkToken')
        .then(res => {
            if (res.status === 404)
                props.set({isError: true, message: 'Application not found'})
            else if(res.status === 200)
                res.json().then(result => {
                    fetch('http://localhost:5000/api/user/' + result.id)
                    .then(r => {
                        r.json().then(user => {
                            setApplication(user.user);
                        })
                    })
                })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
        <Title>All Applications:</Title>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Applicant</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
                    <TableCell>{props.id}</TableCell>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{application.email}</TableCell>
                    <TableCell>{application.ApplicationStat}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </>
    );
};

export default AppTable;