import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import state from './global';

import { Collection, CollectionMode } from 'mithril-materialized';

var scenarios: any = [];

const SELECTION = {
    oninit: () => {
        getScenarios()
    },
    view: () => {
        return m('div', {class: "container"},
            m('div', {class: "row"}, [ //Collection doesn't work well with valign-wrapper
            (JSON.stringify(state.roles) == JSON.stringify([]) ) ? 
                m(Collection, {
                    header: 'Select a Scenario',
                    class: 'col s6 offset-s3',
                    mode: CollectionMode.LINKS,
                    items: scenarios.map( scenario => {
                        return { title: scenario.title , onclick: getRoles.bind(this, scenario) }
                    }) 
                })
            :
                m(Collection, {
                    header: 'Select your role',
                    class: 'col s6 offset-s3',
                    mode: CollectionMode.AVATAR,
                    items: state.roles.map( role => {
                        return { title: role.title, content: role.description, onclick: m.route.set("#!/module1") }
                    }) 
                })
            ])
        );
    }
}

function getScenarios(){
    m.request({
        method: "GET",
        url: "http://localhost:3030/api/scenarios", //put domain in config 
        body: {}
    })
    .then(function(result) {
        scenarios = result;
    })
}

function getRoles(scene){
    state.roles = scene.roles
}

function setScenario(){

}

export default SELECTION;