import Track from '../pages/Track';
import Tracks from '../pages/Tracks';
import NotFound from '../pages/NotFound';

import {
  TRACK_ROUTE,
  TRACKS_ROUTE,
  NOT_FOUND_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from '../utils/consts';
import Admin from '../pages/Admin';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

export type RouteType = {
  path: string;
  component: JSX.Element;
};

export const publicRoutes: RouteType[] = [
  { path: TRACKS_ROUTE, component: <Tracks /> },
  { path: `${TRACK_ROUTE}/:id`, component: <Track /> },
  { path: LOGIN_ROUTE, component: <Login /> },
  { path: REGISTER_ROUTE, component: <Register /> },
  { path: ADMIN_ROUTE, component: <Admin /> },

  //...
  { path: NOT_FOUND_ROUTE, component: <NotFound /> },
];
