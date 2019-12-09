import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import state from './global';

import { Button } from 'mithril-materialized';
import hud from './hud';
import help from './help';

const MODULE1 = {
    oninit: () => {
        state.currentDilemma = 0;
    },
    view: () => {
        return m('div', {class: "container"},  [
            m(displayArea),
            m(controlAreaSolo),
            m(hud, {done: "#!/module2"})
        ]);
    }
}

const displayArea = {
    view: () => {
        return m('div', {class: "row valign-wrapper", id: "displayArea"}, [
            state.showHelp ? 
                m(help, {title:"Title", desc: ["Lorem Ipsum et dono", "This is the second page", "this is the final page"]})
            :
                state.dilemmas.length >= (state.currentDilemma + 1) ? 
                    m('div', {class: "topic col s6 offset-s3"}, [
                        m('h1', {class: "topicTitle"} ,state.dilemmas ? state.dilemmas[state.currentDilemma].title : "loading..."),
                        m('p', {class: "topicText"} ,state.dilemmas ? state.dilemmas[state.currentDilemma].description : "loading...")
                    ])
                :
                    m('p', {class: "col s6 offset-s3"}, "[ insert big animated checkmark to show the user is done ]")
        ]);
    }  
}

const controlAreaSolo = {
    view: () => {
        return m('div', {id:"controlAreaBG"},[
            m('div', {id:"controlAreaTop"}),
            m('div', {id:"trashMod1Cont"}, [ m(Button, {id:"trashMod1Button", onclick:acceptDilemma.bind(this,false)})]),
            m('div', {id:"personMod1Cont"}, [ m(Button, {id:"personMod1Button", onclick:acceptDilemma.bind(this,true)})]),
        ])
    }  
}


function acceptDilemma(choice){
    if (!state.showHelp){
        state.dilemmas[state.currentDilemma]["accepted"] = choice;
        if (state.dilemmas.length >= (state.currentDilemma + 1)){
            state.currentDilemma +=1;
        }
    }
}

//score circle in the top right.

export default MODULE1;