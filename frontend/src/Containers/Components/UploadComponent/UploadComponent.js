import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import './UploadComponent.css';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 500,
    },
    fixedHeight2: {
      height: 140,
    },
}))

const UploadComponent = (props) => {
    const { register, handleSubmit } = useForm();
    const [filename, setFilename] = useState('');
    const classes = useStyles();
    const fixedHeightDeposits = clsx(classes.paper, classes.fixedHeight);
    useEffect(() => {
        //console.log('here: ' + props.id)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("file", data.file[0])
        console.log(data.file[1])
        const res = await fetch("http://161.35.129.190/" + props.link +"?id=" + props.id, {
          method: "POST",
          body: formData
        }).then(res => res.json().then(r => {
            if(r.status) {
                props.setError(false, '')
                props.setSuccess(true, r.message)
            }
            else {
                props.setError(true, r.message)
                props.setSuccess(false, '')
            }
        }))
        .catch (err => {
            props.setError(true, 'Try again later or contact us')
            props.setSuccess(false, '')
        })
      }
    return (
        <Grid item xs={12} sm={6}>
            <Paper className={fixedHeightDeposits}>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Typography component="h1" variant="h6" color="primary" gutterBottom>
                    {props.title}
                    </Typography>
                    <div className="frame2">
                        <div className="center">
                            <div className="title">
                                <h1>Drop file to upload</h1>
                            </div>
                            <div className="dropzone">
                                {filename === '' ? 
                                    <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon" alt="upload" />
                                    : filename
                                }
                                <input ref={register} type="file" name="file" className="upload-input" onChange={(e) => setFilename(e.target.value)} multiple />
                            </div>
                            <input type="submit" value="Upload file" className="btn" name="uploadbutton" />
                        </div>
                    </div>
                </form>
            </Paper>
    </Grid>
        
    );
};

/*
<form onSubmit={handleSubmit(onSubmit)}>
            <input ref={register} type="file" name="file" />
            <button>Submit</button>
        </form>
*/


export default UploadComponent;