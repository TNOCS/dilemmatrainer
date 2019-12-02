import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import state from './global';

import { Button } from 'mithril-materialized';
import hud from './hud';
import help from './help';

var currentDilemma = 0

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
                state.dilemmas.length >= (currentDilemma + 1) ? 
                    m('div', {class: "topic col s6 offset-s3"}, [
                        m('h1', {class: "topicTitle"} ,state.dilemmas ? state.dilemmas[currentDilemma].title : "loading..."),
                        m('p', {class: "topicText"} ,state.dilemmas ? state.dilemmas[currentDilemma].description : "loading...")
                    ])
                :
                    m('p', {class: "col s6 offset-s3"}, "[ insert big green animated checkmark to show the user he is done ]")
        ]);
    }  
}

const controlAreaSolo = {
    view: () => {
        return m('div', {id:"controlAreaBG"},[
            m('div', {id:"controlAreaTop"}),
            m('div', {id:"trashMod1Cont"}, [ m(Button, {id:"trashMod1Button", onclick:accept.bind(this,false)})]),
            m('div', {id:"personMod1Cont"}, [ m(Button, {id:"personMod1Button", onclick:accept.bind(this,true)})]),
        ])
    }  
}

function accept(choice){
    if (!state.showHelp){
        state.dilemmas[currentDilemma]["accepted"] = choice;
        if (state.dilemmas.length >= (currentDilemma + 1)){
            currentDilemma +=1;
        }
    }
    //check if we are on the last dilemma
    //go to the next dillema if not
    //show done if you are 
}


//score circle in the top right.

export default MODULE1;