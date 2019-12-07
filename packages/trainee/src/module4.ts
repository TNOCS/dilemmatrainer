import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import state from './global';

import hud from './hud';
import help from './help';

var currentPhase = 0

const MODULE4 = {
    view: () => {
        //lock action during help

        var interactionArea = m('div', [
            m('div'),
        ]);
        return m('div', {class: "container"},  [
            m(displayArea),
            m(controlAreaSolo),
            m(hud, {done: "#!/module2"})
        ]);
    }
}

const displayArea = {
    view: () => {
        return m('div', {class: "row", id: "displayArea"}, [
        ]);
    }  
}

const controlAreaSolo = {
    view: () => {
        return m('div', {id:"controlAreaBG"},[
            m('div', {id:"controlAreaTop"}),
            m('div', {id:"explAreas"}, [
                m('div', {id:"scenarioExpl", class:"explanationArea"}, [
                    m('h6', "The scenario"),
                    m('p', state.phases[currentPhase].description)
                ]),
                m('div', {id:"roleExpl" , class:"explanationArea"}, [
                    m('h6', "Your role"),
                    m('p', 'placeholder')
                ])
            ])
        ])
    }  
}


export default MODULE4;