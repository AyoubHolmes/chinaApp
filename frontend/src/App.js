import React, {Component} from 'react';
import './App.css';
import asyncComponent from './hoc/asyncComponent';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


const SignUp = asyncComponent(() => {
  return import('./Containers/SignUp/Signup')
});

const Login = asyncComponent(() => {
  return import('./Containers/Login/Login')
});

const Main = asyncComponent(() => {
  return import('./Main')
});

const Application = asyncComponent(() => {
  return import('./Containers/Application/Client')
});


class App extends Component {

    

  componentDidMount() {
    document.title = 'loading....'
  }
  render()
  {
    return(
      <div className="App">
          <Switch>
              <Route path="/signup" exact component={SignUp} />
              <Route path="/login" exact component={Login} /> 
              <Route path="/main" exact component={Main} /> 
              <Route path="/application" component={Application} />
          </Switch>
          <Redirect from="/" to="/main" />
        </div>
    )
  }
}

export default App;
