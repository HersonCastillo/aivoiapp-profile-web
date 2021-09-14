import React, { ReactElement, useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { IUser } from '../interfaces/user';
import Profile from '../pages/Profile/Profile';
import SignIn from '../pages/SignIn/SignIn';
import { AuthContext } from '../store/auth.context';
import { ProfileContext } from '../store/profile.context';
import { AIVOI_ROLES } from '../utils/roles';

const Routing = (): ReactElement => {
  const history = useHistory();
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);
  const [isFirstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    try {
      const token = sessionStorage.getItem('token');
      const user = sessionStorage.getItem('user');
      const role = sessionStorage.getItem('role');

      if (token && user && role && isFirstLoad) {
        const userDecoded: IUser = JSON.parse(user) ?? null;
        profileContext.setProfile(userDecoded, +role || AIVOI_ROLES.CLIENT);
        authContext.setToken(token ?? null);
        setFirstLoad(false);
      }
    } catch (ex) {}
  }, [profileContext, authContext, history, isFirstLoad, setFirstLoad]);

  return (
    <Router>
      <Switch>
        <AuthContext.Consumer>
          {({ token }) => (
            <>
              {!token && <Route exact path="/login" component={SignIn} />}
              {token && <Route exact path="/profile" component={Profile} />}
              <Route path="*">
                <Redirect to={!!token ? '/profile' : '/login'} />
              </Route>
            </>
          )}
        </AuthContext.Consumer>
      </Switch>
    </Router>
  );
};

export default Routing;
