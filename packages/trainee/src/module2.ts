import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import state from './global';

import { Button } from 'mithril-materialized';
import hud from './hud';
import help from './help';

var propertyButtons:Array<boolean> = [false,false,false]
var properties:Array<boolean> = [false,false,false]

const MODULE2 = {
    oninit: () => {
        state.currentDilemma = 0;
        state.getPickedDilemmas()
    },
    view: () => {
        return m('div', {class: "container"},  [
            m(controlArea),
            m(hud, {done: "#!/module3"})
        ]);
    }
}

const controlArea = {
    view: () => {
        return m('div', {id:"controlAreaBG2"},[
            m('div', {id:"controlAreaTop2"}),
            
            m('div', {class:"row valign-wrapper", id:"propertyControlArea"},             
            state.showHelp ? 
                m(help, {title:"Title", desc: ["Lorem Ipsum et dono", "This is the second page", "this is the final page"]})
            :[
                state.pickedDilemmas.length >= (state.currentDilemma + 1) ? 
                    m('div', {class: "pickedTopic col s4"}, [
                        m('h1', {class: "topicTitle"} , state.pickedDilemmas ? state.pickedDilemmas[state.currentDilemma].title : "loading..."),
                        m('p', {class: "topicText"} , state.pickedDilemmas ? state.pickedDilemmas[state.currentDilemma].description : "loading...")
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
                            m('div', {class:"propertyButtonCont col s12"}, m("button", {label:"+", class:"propertyButtons col offset-s1 s10", onclick:propertyAdd.bind(this,0,true)}, "+")),
                            m('hr', {class: "propertyHr col s12"}),
                            m('div', {class:"propertyButtonCont col s12"}, m("button", {label:"-", class:"propertyButtons col offset-s1 s10", onclick:propertyAdd.bind(this,0,false)}, "-")),
                        ]),
                        m('div',{class: "col s4 propertyCol"}, [
                            m('div', {class:"propertyButtonCont col s12"}, m("button", {label:"+", class:"propertyButtons col offset-s1 s10", onclick:propertyAdd.bind(this,1,true)}, "+")),
                            m('hr', {class: "propertyHr col s12"}),
                            m('div', {class:"propertyButtonCont col s12"}, m("button", {label:"-", class:"propertyButtons col offset-s1 s10", onclick:propertyAdd.bind(this,1,false)}, "-")),
                        ]),
                        m('div',{class: "col s4 propertyCol"}, [
                            m('div', {class:"propertyButtonCont col s12"}, m("button", {label:"+", class:"propertyButtons col offset-s1 s10", onclick:propertyAdd.bind(this,2,true)}, "+")),
                            m('hr', {class: "propertyHr col s12"}),
                            m('div', {class:"propertyButtonCont col s12"}, m("button", {label:"-", class:"propertyButtons col offset-s1 s10", onclick:propertyAdd.bind(this,2,false)}, "-")),
                        ]),
                    ]),
                ]),
            
                m('div', {id:"trashMod2Cont"}, [ m(Button, {id:"trashMod1Button", onclick:state.rejectPickedDilemma})]), 
            ]),
        ])
    }  
}

function propertyAdd(pressed, value){
    
    propertyButtons[pressed] = true;
    properties[pressed] = value
    if (JSON.stringify(propertyButtons) == JSON.stringify([true,true,true])){
        state.pickedDilemmas[state.currentDilemma]["time"] = properties[0];
        state.pickedDilemmas[state.currentDilemma]["info"] = properties[1];
        state.pickedDilemmas[state.currentDilemma]["accordance"] = properties[2];

        propertyButtons = [false, false, false];
        console.log(state.pickedDilemmas[state.currentDilemma])
        state.currentDilemma += 1;

        console.log(state.pickedDilemmas[state.currentDilemma])
    }
}

export default MODULE2;