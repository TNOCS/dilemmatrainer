import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';

import { Button } from 'mithril-materialized';
import state from './global';

var hud = {
    view: (vnode) => {
        return m('div', {class: "row", id:"hud"}, [
            state.currentDilemma != 0 ? 
                m('div', {class: "col offset-s1 s1"}, [ m(Button, {label:'BACK', style:'background-color: #4E77A0;', onclick: back})]) 
            : 
                m('div', {class: "col offset-s1 s1"}, [ m(Button, {label:'BACK', style:'background-color: rgba(78, 119, 160, 0.733); box-shadow:none'})]) ,
            m('div', {class: "col s1"}, [ m(Button, {label:'HELP', id: "helpButton", style:'background-color: #4E77A0;', onclick:()=>{state.showHelp = !state.showHelp}})]),
            m('div', {class: "col offset-s7  s1"}, [ m(Button, {label:'DONE', href: vnode.attrs.done, style:'background-color: #4E77A0;'})]),
        ]);
    } 
}

function back(){
    if (state.currentDilemma != 0){
        state.currentDilemma -=1;
    }
}

export default hud;

