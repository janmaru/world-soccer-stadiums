import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Map } from './components/Map'; 
import { Table } from './components/Table';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Map} />
        <Route path='/Table' component={Table} />
      </Layout>
    );
  }
}
