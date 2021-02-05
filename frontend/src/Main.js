import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import './Main.css'


/*
  const logout = async () => {
    handleClose();
		await firebase.logout();
		props.history.push('/login')
  }
*/

const Main = (props) => {
  useEffect(() => {
    fetch('http://localhost:5000/checkToken').then(res =>{
      console.log(res.status);
      if(res.ok){
           res.json().then(r => {
            fetch('http://localhost:5000/api/user/' + r.id)
            .then(result => {
              result.json().then(user => {
                if (user.user.isApplied === 'true')
                  props.history.replace('/application?id=' + user.user._id);
                else
                  window.location.href = ('http://localhost:5000/user?id=' + user.user._id);
              })
            })
           });
      }
      else
        props.history.replace('/login');
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    
    return (
      <>
        <div id="loader2"><CircularProgress /></div>
      </>
    );
};

export default Main;