import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';

import { Button } from 'mithril-materialized';
import hud from './hud';

const MODULE2 = {
    view: () => {
        return m('div', {class: "container"},  [
            m(controlArea),
            m(hud)
        ]);
    }
}

var controlArea = {
    view: () => {
        return m('div', {id:"controlAreaBG2"},[
            m('div', {id:"controlAreaTop2"}),
            m('div', {class:"row", id:"controlArea"}, [
                m('div', {class: "currentDilemma col offset-s1 s3"}, [m("p", {class: "dilemmaText"},"communicatie naar bevolking media")]),
                m('div', {class: "propertySelection col s5"},[
                    m('div', {class: "row"},[
                        m('span',{class: "col s4"}, 'TIME'),
                        m('span',{class: "col s4"}, 'INFORMATION'),
                        m('span',{class: "col s4"}, 'ACCORDANCE OF INTERESTS'),
                    ]),
                    m('div', {class: "row"},[
                        m('div',{class: "col s4 propertyCol"}, [
                            m('div', {class:"propertyButtonCont col s12"}, [m(Button, {label:"+", class:"propertyButtons col offset-s1 s10", style:'background-color: #7F7DBB;'})]),
                            m('hr', {class: "propertyHr col s12"}),
                            m('div', {class:"propertyButtonCont col s12"}, [m(Button, {label:"-", class:"propertyButtons col offset-s1 s10", style:'background-color: #7F7DBB;'})]),
                        ]),
                        m('div',{class: "col s4 propertyCol"}, [
                            m('div', {class:"propertyButtonCont col s12"}, [m(Button, {label:"+", class:"propertyButtons col offset-s1 s10", style:'background-color: #7F7DBB;'})]),
                            m('hr', {class: "propertyHr col s12"}),
                            m('div', {class:"propertyButtonCont col s12"}, [m(Button, {label:"-", class:"propertyButtons col offset-s1 s10", style:'background-color: #7F7DBB;'})]),
                        ]),
                        m('div',{class: "col s4 propertyCol"}, [
                            m('div', {class:"propertyButtonCont col s12"}, [m(Button, {label:"+", class:"propertyButtons col offset-s1 s10", style:'background-color: #7F7DBB;'})]),
                            m('hr', {class: "propertyHr col s12"}),
                            m('div', {class:"propertyButtonCont col s12"}, [m(Button, {label:"-", class:"propertyButtons col offset-s1 s10", style:'background-color: #7F7DBB;'})]),
                        ]),
                    ]),
                    m('div', {class: "row"},[]),
                ]),
                m('div', {id: "nextDilemmaCont", class: "col s2"}, [m(Button, {label:"NEXT", class:"col offset-s1 s6", id:"nextDilemmaButton"})])
            ]),
        ])
    }  
}

export default MODULE2;