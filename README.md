# React Router NoMatch
[![npm](https://img.shields.io/npm/v/react-router-nomatch.svg)](https://www.npmjs.com/package/react-router-nomatch)

React Router interface that renders a component when no child route is matched.

## Why not use Switch?
`Switch` renders the first child `Route` that matches and nothing else. This is fine if your app is built as a set of monolithic pages.

`NoMatch` allows multiple child `Routes` to be rendered, and lets you specify a fallback component if none of them match. This is more suited to dynamic routing where multiple `Routes` match the same location (for instance in a responsive [master-detail layout](https://en.wikipedia.org/wiki/Master%E2%80%93detail_interface) where both the master and detail views have their own `Routes`).

## Install
```sh
$ npm install --save react-router-nomatch
```

## Props
 - `component`: The fallback component class. Renders with a `match` prop that is `true` if one of the child `Routes` matched.
 - `render`: Same as `component` but for inline rendering. Renders with a `match` prop that is true if one of the child Routes matched. `component` takes precedence over `render` if both are defined.
 - `alwaysRender`: Whether to always render the fallback component or only when none of the `Routes` match. Defaults to `false`.

## Example
```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NoMatch from 'react-router-nomatch';

const Navbar = () => <div>Navbar</div>;
const SignIn = () => <div>SignIn</div>;
const Newsfeed = () => <div>Newsfeed</div>;
const MessagesMaster = () => <div>MessagesMaster</div>;
const MessagesDetail = () => <div>MessagesDetail</div>;
const NotFound = () => <div>NotFound</div>;

const App = () => {
  return (
    <Router history={createBrowserHistory()}>
      <NoMatch component={NotFound}>
        <Navbar />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/" exact render={props => <Redirect to="/signin" />} />
        <Route path="/newsfeed" exact component={Newsfeed} />
        <Route path="/messages" component={MessagesMaster} />
        <Route path="/messages/:index?" exact component={MessagesDetail} />
      </NoMatch>
    </Router>
  );
}

const rootElement = document.createElement("DIV");
document.body.appendChild(rootElement);
ReactDOM.render(<App />, rootElement);
```

Same result using the `render` and `alwaysRender` props:
```js
...
      <NoMatch render={ match => (match ? null : <NotFound />) } alwaysRender={ true }>
...
```

## Notes
 - NoMatch considers child components without a `path` (or `from`) prop as non-matching;
 - The fallback component is always rendered before children.
