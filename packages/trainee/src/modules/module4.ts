import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m, { Component } from 'mithril';
import { state } from '../global';
import help from './components/help';
import hud from './components/hud';

const MODULE4: Component = {
  oninit: () => (state.showHelp = true),
  view: () => {
    return m('div', { class: 'container' }, [
      m(hud, { done: '/selection' }),
      m(interaction),
    ]);
  },
};

const interaction: Component = {
  view: () => {
    return m('.interactionArea', [
      m(
        '.row',
        state.showHelp
          ? m(help, {
              title: 'Title',
              desc: [
                `You will be presented with a scenario.
                Each scenario has several dilemmas, and each dilemma is defined by its context followed by a question.
                Discuss together how you want to handle the dilemma and defend your decision.`,
              ],
            })
          : []
      ),
    ]);
  },
};

/*
const displayArea = {
  view: () => {
    return m('div', { class: 'row', id: 'displayleaflet' }, [
      state.showHelp
        ? m(help, {
            title: 'Title',
            desc: [
              'Lorem Ipsum et dono',
              'This is the second page',
              'this is the final page',
            ],
          })
        : m(LeafletMap, {
            class: 'col s12',
            view: [state.phases[currentPhase].lat, state.phases[currentPhase].long] as LatLngExpression,
            zoom: 13,
            editable: ['test', 'pois'],
            onMapClicked: console.log,
            showScale: { imperial: false },
            onLayerEdited: (f: FeatureGroup) =>
              console.log(JSON.stringify(f.toGeoJSON(), null, 2)),
          }),
    ]);
  },
};

const controlAreaSolo = {
  view: () => {
    return m('div', { id: 'controlAreaBG' }, [
      m('div', { id: 'controlAreaTop' }),
      m('div', { id: 'explAreas' }, [
        m('div', { id: 'scenarioExpl', class: 'explanationArea' }, [
          m('h6', 'The scenario'),
          m(
            'p',
            state.phases[currentPhase]
              ? state.phases[currentPhase].description
              : 'loading...'
          ),
        ]),
        m('div', { id: 'phaseUIcont'}, [
          m(Button, {
            id: 'nextPhaseButton',
            label: 'NEXT PHASE',
            class: 'phaseUI',
            onclick: () => {
              currentPhase += 1;
            },
          }),
          currentPhase > 0
            ? m(Button, {
                id: 'previousPhaseButton',
                label: 'PREVIOUS PHASE',
                class: 'phaseUI',
                onclick: () => {
                  currentPhase -= 1;
                },
              })
            : null,
        ]),
        m('div', { id: 'roleExpl', class: 'explanationArea' }, [
          m('h6', 'Your role: ' + state.userRole.title),
          m('p', state.userRole.description),
        ]),
      ]),
    ]);
  },
};
*/

export default MODULE4;
