import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';

import { Button } from 'mithril-materialized';
import state from './global';

var hud = {
    view: () => {
        return m('div', {class: "row", id:"hud"}, [
            m('div', {class: "col offset-s1 s1"}, [ m(Button, {label:'BACK', style:'background-color: #4E77A0;'})]),
            m('div', {class: "col s1"}, [ m(Button, {label:'HELP', id: "helpButton", style:'background-color: #4E77A0;', onclick:()=>{state.showHelp = !state.showHelp}})]),
            m('div', {class: "col offset-s7  s1"}, [ m(Button, {label:'DONE', style:'background-color: #4E77A0;'})]),
        ]);
    } 
}

export default hud;

