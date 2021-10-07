import React, { ReactElement, useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import AuthenticationRedirect from '../pages/AuthenticationRedirect/AuthenticationRedirect';
import Profile from '../pages/Profile/Profile';
import RecoverPassword from '../pages/RecoverPassword/RecoverPassword';
import SignIn from '../pages/SignIn/SignIn';
import { getUserData } from '../services/profile.service';
import { AuthContext } from '../store/auth.context';
import { ProfileContext } from '../store/profile.context';
import { AIVOI_ROLES } from '../utils/roles';

const Routing = (): ReactElement => {
  const history = useHistory();
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);
  const [isFirstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    const role = sessionStorage.getItem('role');

    if (token && userId && role && isFirstLoad) {
      getUserData(+userId)
        .then((response) => {
          profileContext.setProfile(response.data, +role || AIVOI_ROLES.CLIENT);
          authContext.setToken(token ?? null);
          history?.push('/profile');
        })
        .catch(() => history?.push('/'));
        setFirstLoad(false);
    }
  }, [profileContext, authContext, isFirstLoad, setFirstLoad, history]);

  return (
    <Router>
      <Switch>
        <AuthContext.Consumer>
          {({ token }) => (
            <>
              {!token && (
                <>
                  <Route
                    exact
                    path="/linking/:userId/:role"
                    component={AuthenticationRedirect}
                  />
                  <Route exact path="/login" component={SignIn} />
                  <Route
                    exact
                    path="/recover-password"
                    component={RecoverPassword}
                  />
                </>
              )}
              {token && <Route exact path="/profile" component={Profile} />}
            </>
          )}
        </AuthContext.Consumer>
      </Switch>
    </Router>
  );
};

export default Routing;
