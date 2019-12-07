import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import state from './global';

import { TextArea } from 'mithril-materialized';
import hud from './hud';
import help from './help';

var propertyButtons:Array<boolean> = [false,false,false]
var properties:Array<boolean> = [false,false,false]

const MODULE3 = {
    oninit: () => {
        state.currentDilemma = 0;
        state.getPickedDilemmas()
    },
    view: () => {
        return m('div', {class: "container"},  [
            m(controlArea),
            m(hud, {done: "#!/module4"})
        ]);
    }
}

const controlArea = {
    view: () => {
        return m('div', {id:"controlAreaBG2"},[
            m('div', {id:"controlAreaTop2"}),
            
            m('div', {class:"row"},             
            state.showHelp ? 
                m('div', {id:"helpWrapper valign-wrapper"},
                    m(help, {title:"Title", desc: ["Lorem Ipsum et dono", "This is the second page", "this is the final page"]})
                )
            :[
                m('div', {class: "agreements col s10 offset-s1"},[
                    m('div', {class: "row"},[
                        m('span',{class: "col s4"}, [
                            m('p', 'AGREEMENT'),
                            m('p', '1'),
                            m(TextArea, {maxLength: 200})
                        ]),
                        m('span',{class: "col s4"}, [
                            m('p', 'AGREEMENT'),
                            m('p', '2'),
                            m(TextArea, {maxLength: 200})
                        ]),
                        m('span',{class: "col s4"}, [
                            m('p', 'AGREEMENT'),
                            m('p', '3'),
                            m(TextArea, {maxLength: 200})
                        ]),
                    ]),
                ]),
            ]),
        ])
    }  
}

export default MODULE3;