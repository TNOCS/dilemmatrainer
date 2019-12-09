import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import state from './global';

import { LeafletMap } from 'mithril-leaflet';
import { Feature, Geometry } from 'geojson';
import { LatLngExpression, FeatureGroup, LeafletEvent, geoJSON } from 'leaflet'

import hud from './hud';
import help from './help';

var currentPhase = 0

const MODULE4 = {
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
        return m('div', {class: "row", id: "displayleaflet"}, [
            state.showHelp ? 
                m(help, {title:"Title", desc: ["Lorem Ipsum et dono", "This is the second page", "this is the final page"]})
            :
                m(LeafletMap, {
                    class: "col s12",
                    view: [51.505, -0.09] as LatLngExpression,
                    zoom: 13,
                    editable: ['test', 'pois'],
                    onMapClicked: console.log,
                    showScale: { imperial: false },
                    onLayerEdited: (f: FeatureGroup) => console.log(JSON.stringify(f.toGeoJSON(), null, 2))
                })
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
                    m('p', state.phases[currentPhase] ? state.phases[currentPhase].description : "loading...")
                ]),
                m('div', {id:"roleExpl" , class:"explanationArea"}, [
                    m('h6', "Your role: " + state.userRole.title),
                    m('p', state.userRole.description)
                ])
            ])
        ])
    }  
}


export default MODULE4;