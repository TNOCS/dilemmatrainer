import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import state from './global';

import { Button } from 'mithril-materialized';
import hud from './hud';
import help from './help';

var dilemmas:Array<any>;
var currentDilemma = 0

m.request({
        method: "GET",
        url: "http://localhost:3030/api/scenarios/view", //put domain in config
        params: {props: "dilemmas"},
        body: {}
    })
    .then(function(result) {
        dilemmas = result[0].dilemmas
    })


const MODULE1 = {
    view: () => {
        //lock action during help

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
        return m('div', {class: "row valign-wrapper", id: "displayArea"}, [
            state.showHelp ? 
                m(help, {title:"Title", desc: ["Lorem Ipsum et dono", "This is the second page", "this is the final page"]})
            :
                m('div', {class: "topic col s6 offset-s3"}, [
                    m('h1', {class: "topicTitle"} ,dilemmas ? dilemmas[currentDilemma].title : "loading..."),
                    m('p', {class: "topicText"} ,dilemmas ? dilemmas[currentDilemma].description : "loading...")
                ]),
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