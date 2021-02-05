var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var e = React.createElement;
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

var Login = function Login() {
  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      email = _React$useState2[0],
      setEmail = _React$useState2[1];

  var _React$useState3 = React.useState(''),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      password = _React$useState4[0],
      setPassword = _React$useState4[1];

  React.useEffect(function () {
    document.title = "Login2";
  }, []);
  return React.createElement(
    Router,
    null,
    React.createElement(
      'div',
      null,
      React.createElement(
        'nav',
        null,
        React.createElement(
          'ul',
          null,
          React.createElement(
            'li',
            null,
            React.createElement(
              Link,
              { to: '/' },
              'Home'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              Link,
              { to: '/about' },
              'About'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              Link,
              { to: '/users' },
              'Users'
            )
          )
        )
      ),
      React.createElement(
        Switch,
        null,
        React.createElement(
          Route,
          { path: '/about' },
          React.createElement(About, null)
        ),
        React.createElement(
          Route,
          { path: '/users' },
          React.createElement(Users, null)
        ),
        React.createElement(
          Route,
          { path: '/' },
          React.createElement(Home, null)
        )
      )
    )
  );
};

var domContainer = document.querySelector('#login_page');
ReactDOM.render(e(Login), domContainer);