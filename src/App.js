import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
              <Route exact path='/builder' component={BurgerBuilder} />
              <Route exact path='/checkout' component={Checkout} />
              <Redirect exact from='/' to='/builder' />
              <Route render={() => <h3 style={{textAlign: 'center'}}>404 Page not found</h3>} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
