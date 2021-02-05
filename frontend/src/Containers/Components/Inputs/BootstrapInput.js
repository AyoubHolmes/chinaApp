import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  buttonStyle: {
    margin: theme.spacing(1),
    borderRadius: 4,
    position: 'relative',
    fontSize: 12,
  }
}));

export default function CustomizedSelects(props) {
  const classes = useStyles();
  return (
    <form onSubmit={(event) => {event.preventDefault()}}>
      <FormControl className={classes.margin}>
        <BootstrapInput id="demo-customized-textbox" onChange={props.filterVar} />
      </FormControl>
      <FormControl className={classes.margin}>
        <NativeSelect
          id="demo-customized-select-native"
          onChange={props.filterBy}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="">Tous</option>
          {props.conditions.map((cond, index) => {
            return (<option key={index} value={cond.value}>{cond.label}</option>);
          })}
        </NativeSelect>
      </FormControl>
      <Button type="submit" className={classes.buttonStyle} variant="contained" color="primary" onClick={props.filter}>
            <i className="fas fa-filter"></i> {' '}Filtre
        </Button>
    </form>
  );
}
