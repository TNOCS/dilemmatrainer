import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import { state } from './global';

import { Button } from 'mithril-materialized';
import hud from './hud';
import help from './help';

const MODULE1 = {
  oninit: () => {
    state.currentDilemma = 0;
  },
  view: () => {
    return m('div', { class: 'container' }, [
      m(displayArea),
      m(controlAreaSolo),
      m(hud, { done: '#!/module2' }),
    ]);
  },
};

const displayArea = {
  view: () => {
    var display = state.roles.length < 2 ? 'displayArea' : 'displayAreaMulti';

    return m('div', { class: 'row valign-wrapper', id: display }, [
      state.showHelp
        ? m(help, {
            title: 'Title',
            desc: [
              'Lorem Ipsum et dono',
              'This is the second page',
              'this is the final page',
            ],
          })
        : state.dilemmas.length >= state.currentDilemma + 1
        ? m('div', { class: 'topic col s6 offset-s3' }, [
            m(
              'h1',
              { class: 'topicTitle' },
              state.dilemmas
                ? state.dilemmas[state.currentDilemma].title
                : 'loading...'
            ),
            m(
              'p',
              { class: 'topicText' },
              state.dilemmas
                ? state.dilemmas[state.currentDilemma].description
                : 'loading...'
            ),
          ])
        : m(
            'p',
            { class: 'col s6 offset-s3' },
            '[ insert big animated checkmark to show the user is done ]'
          ),
    ]);
  },
};

const controlAreaSolo = {
  view: () => {
    return state.roles.length < 2
      ? m('div', { id: 'soloMod1' }, [
          m('div', { id: 'controlAreaBG' }, [
            m('div', { id: 'controlAreaTop' }),
            m(
              'div',
              { id: 'trashMod1Cont' },
              m(Button, {
                id: 'trashMod1Button',
                onclick: acceptDilemma.bind(this, false),
              })
            ),
            m(
              'div',
              { id: 'personMod1Cont' },
              m(Button, {
                id: 'personMod1Button',
                onclick: acceptDilemma.bind(this, true),
              })
            ),
          ]),
        ])
      : m('div', { id: 'multiMod1' }, [
          m('div', { id: 'controlAreaMod1Mutli' }, [
            m('div', { id: 'controlAreaTopMod1Multi' }),
            m(
              'div',
              { id: 'trashMod1ContMulti' },
              m(Button, {
                id: 'trashMod1ButtonMulti',
                onclick: acceptDilemma.bind(this, false),
              })
            ),
            m('div', { id: 'usersCont' }, [
              state.roles.map(role => {
                return m(Button, {
                  class: 'userButton',
                  label: role.title,
                  onclick: sortDilemma.bind(this, role),
                  style: 'background-color: #BEC4D9; height: 80px;',
                });
              }),
            ]),
            m(
              'div',
              { id: 'groupMod1Cont' },
              m(Button, {
                id: 'groupMod1Button',
                onclick: acceptDilemma.bind(this, true),
              })
            ),
          ]),
        ]);
  },
};

function acceptDilemma(choice) {
  if (!state.showHelp) {
    state.dilemmas[state.currentDilemma]['accepted'] = choice;
    if (state.dilemmas.length >= state.currentDilemma + 1) {
      state.currentDilemma += 1;
    }
  }
}

function sortDilemma(role) {
  if (!state.showHelp) {
    state.dilemmas[state.currentDilemma]['accepted'] = true;
    state.dilemmas[state.currentDilemma]['assignedTo'] = role.title;
    if (state.dilemmas.length >= state.currentDilemma + 1) {
      state.currentDilemma += 1;
    }
  }
}

//score circle in the top right.

export default MODULE1;
