import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import state from './global';

import { Button } from 'mithril-materialized';
import hud from './hud';
import help from './help';

const MODULE2 = {
    oninit: () => {
        state.currentDilemma = 0;
    },
    view: () => {
        return m('div', {class: "container"},  [
            m(controlArea),
            m(hud)
        ]);
    }
}

var controlArea = {
    view: () => {
        console.log(state.getPickedDilemmas().length);
        console.log(state.currentDilemma + 1);
        return m('div', {id:"controlAreaBG2"},[
            m('div', {id:"controlAreaTop2"}),
            
            m('div', {class:"row valign-wrapper", id:"controlArea"},             
            state.showHelp ? 
                m(help, {title:"Title", desc: ["Lorem Ipsum et dono", "This is the second page", "this is the final page"]})
            :[
                state.getPickedDilemmas().length >= (state.currentDilemma + 1) ? 
                    m('div', {class: "pickedTopic col s4"}, [
                        m('h1', {class: "topicTitle"} , state.getPickedDilemmas() ? state.getPickedDilemmas()[state.currentDilemma].title : "loading..."),
                        m('p', {class: "topicText"} , state.getPickedDilemmas() ? state.getPickedDilemmas()[state.currentDilemma].description : "loading...")
                    ])
                :
                    m('p', {class: "col s4"}, "done"),

                m('div', {class: "propertySelection col s6"},[
                    m('div', {class: "row"},[
                        m('span',{class: "col s4"}, 'TIME'),
                        m('span',{class: "col s4"}, 'INFORMATION'),
                        m('span',{class: "col s4"}, 'ACCORDANCE OF INTERESTS'),
                    ]),
                    m('div', {class: "row"},[
                        m('div',{class: "col s4 propertyCol"}, [
                            m('div', {class:"propertyButtonCont col s12"}, m("button", {label:"+", class:"propertyButtons col offset-s1 s10"}, "+")),
                            m('hr', {class: "propertyHr col s12"}),
                            m('div', {class:"propertyButtonCont col s12"}, m("button", {label:"-", class:"propertyButtons col offset-s1 s10"}, "-")),
                        ]),
                        m('div',{class: "col s4 propertyCol"}, [
                            m('div', {class:"propertyButtonCont col s12"}, m("button", {label:"+", class:"propertyButtons col offset-s1 s10"}, "+")),
                            m('hr', {class: "propertyHr col s12"}),
                            m('div', {class:"propertyButtonCont col s12"}, m("button", {label:"-", class:"propertyButtons col offset-s1 s10"}, "-")),
                        ]),
                        m('div',{class: "col s4 propertyCol"}, [
                            m('div', {class:"propertyButtonCont col s12"}, m("button", {label:"+", class:"propertyButtons col offset-s1 s10"}, "+")),
                            m('hr', {class: "propertyHr col s12"}),
                            m('div', {class:"propertyButtonCont col s12"}, m("button", {label:"-", class:"propertyButtons col offset-s1 s10"}, "-")),
                        ]),
                    ]),
                ]),
            
                m('div', {id:"trashMod2Cont"}, [ m(Button, {id:"trashMod1Button", onclick:state.acceptDilemma.bind(this,false)})]),
            ]),
        ])
    }  
}


export default MODULE2;