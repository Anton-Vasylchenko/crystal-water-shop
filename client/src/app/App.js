import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../redux/actions';
import { Route, Switch } from 'react-router-dom';
import { Header, Footer, ItemDetails, Error404 } from '../components';
import { check } from '../services/userAPI';
import { Spinner } from '../components';

import * as Pages from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  // const checkPath = window.location.pathname;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    check().then(data => {
      dispatch(setIsAuth(true))
    }).finally(() => {
      setLoading(false)
    }
    )

  }, [dispatch])

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Pages.HomePage} />
        <Route exact path="/about-us" component={Pages.AboutUsPage} />
        <Route exact path="/contacts" component={Pages.ContactsPage} />
        <Route exact path="/payment-delivery" component={Pages.PaymentDeliveryPage} />
        <Route exact path="/cart" component={Pages.CartPage} />
        <Route path="/shop" exact component={Pages.ShopPage} />
        <Route path="/shop/:id" render={({ match }) => {
          return <ItemDetails itemId={match.params.id} exact />
        }} />
        <Route path="/user-login" component={Pages.LoginPage} />
        <Route path="*" component={Error404} />
      </Switch>
      <Footer />
      {/* {(checkPath !== '/user-login') ? <Footer /> : ''} */}
    </div >
  );
}

export default App;

