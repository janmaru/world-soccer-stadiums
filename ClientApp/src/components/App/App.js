import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from '../Layout';
import { Map } from '../Map';
import { StadiumList } from '../StadiumList';
import { StadiumListServer } from '../StadiumListServer';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Map} />
                <Route path='/StadiumList' component={StadiumList} />
                <Route path='/StadiumListServer' component={StadiumListServer} />
            </Layout>
        );
    }
}
