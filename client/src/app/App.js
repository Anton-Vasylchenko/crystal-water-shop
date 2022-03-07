import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUser } from '../redux/actions';
import { Route, Switch } from 'react-router-dom';

import Header from '../components/Layout/header';
import Footer from '../components/Layout/footer';
import ShopItemDetails from '../components/shop-item-details';
import Error404 from '../components/error-404';
import Spinner from '../components/UI/spinner';
import * as Pages from '../pages';
import UsersList from '../components/admin/users-list';
import { Routes } from '../utils/consts';
import OrdersList from '../components/orders-list';
import { useSelector } from 'react-redux';
import ResetPasswordPage from '../pages/reset-password-page/reset-password-page';

import { check } from '../services/userAPI';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import UserProfile from '../components/user/user-profile';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const { isAuth } = useSelector(({ user }) => user);

  React.useEffect(() => {
    check().then(data => {
      dispatch(setIsAuth(true))
      dispatch(setUser(data))
    }).finally(() => {
      setLoading(false)
    })
  }, [dispatch])

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      <Header />
      <Switch>

        <Route exact path={Routes.HOME_ROUTE} component={Pages.HomePage} />
        <Route exact path={Routes.ABOUT_ROUTE} component={Pages.AboutUsPage} />
        <Route exact path={Routes.CONTACTS_ROUTE} component={Pages.ContactsPage} />
        <Route exact path={Routes.PAYMENT_DELIVERY_ROUTE} component={Pages.PaymentDeliveryPage} />
        <Route exact path={Routes.CART_ROUTE} component={Pages.CartPage} />
        <Route path={Routes.SHOP_ROUTE} exact component={Pages.ShopPage} />

        <Route path={Routes.SHOP_ITEM_ROUTE} render={({ match }) => {
          return <ShopItemDetails itemId={match.params.id} exact />
        }} />

        <Route path={Routes.LOGIN_ROUTE} component={Pages.AuthPage} />
        <Route path={Routes.REGISTRATION_ROUTE} component={Pages.AuthPage} />

        {isAuth &&
          [
            <Route path={Routes.ORDERS_LIST} key={Routes.ORDERS_LIST} component={OrdersList} />,
            <Route path={Routes.USERS_LIST} key={Routes.USERS_LIST} component={UsersList} />,
            <Route path={Routes.USER_PROFILE} key={Routes.USER_PROFILE} component={UserProfile} />
          ]
        }

        <Route path={Routes.USER_RESET_PASSWORD} render={({ match }) => {
          return <ResetPasswordPage userId={match.params.id} token={match.params.token} />
        }} />

        <Route path="*" component={Error404} />
      </Switch>
      <Footer />
    </div >
  );
}

export default App;

