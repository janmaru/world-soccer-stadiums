import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Map } from './components/Map';
import { Data } from './components/Data';
import { Counter } from './components/Counter';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Map} />
        <Route path='/counter' component={Counter} />
        <Route path='/data' component={Data} />
      </Layout>
    );
  }
}
