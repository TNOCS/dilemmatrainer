import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';

import { Button } from 'mithril-materialized';
import hud from './hud';
import help from './help';

const MODULE1 = {
    view: () => {
        // generate list of dilemmas
        //lock them during help
        
        var interactionArea = m('div', [
            m('div'),
        ]);
        return m('div', {class: "container"},  [
            m(displayArea),
            m(controlAreaSolo),
            m(hud)
        ]);
    }
}

const displayArea = {
    view: () => {
        return m('div', {class: "row", id: "displayArea"}, [
            m(help, {title:"Title", desc: ["Lorem Ipsum et dono", "This is the second page", "this is the final page"]}),
            m('div', {class: "topic"}),
        ]);
    }  
}

const controlAreaSolo = {
    view: () => {
        return m('div', {id:"controlAreaBG"},[
            m('div', {id:"controlAreaTop"}),
            m('div', {id:"trashMod1Cont"}, [ m(Button, {id:"trashMod1Button"})]),
            m('div', {id:"personMod1Cont"}, [ m(Button, {id:"personMod1Button"})]),
        ])
    }  
}

export default MODULE1;