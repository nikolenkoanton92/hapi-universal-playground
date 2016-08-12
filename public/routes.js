import React, { Component } from 'react';
import { Route, IndexRoute, Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        {this.props.children}
      </div>
      );
  }
}

class Index extends Component {
  render() {
    return (
      <h1>Hello I am Index Page</h1>
      );
  }
}

class About extends Component {
  render() {
    return (
      <h1>Hello I am About Page</h1>
      );
  }
}

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="about" component={About} />
  </Route>
);
