import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';
import '../css/main.css';
import router from './router';

m.route(document.body, '/', router);
