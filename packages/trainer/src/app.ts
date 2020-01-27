/** During development, use this URL to access the server. */
export const apiService = () => process.env.SERVER || window.location.origin; // `http://localhost:${process.env.LOKI_PORT}/`;

import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';
import './css/style.css';
import { dashboardSvc } from './services/dashboard-service';

m.route(document.body, dashboardSvc.defaultRoute, dashboardSvc.routingTable());
