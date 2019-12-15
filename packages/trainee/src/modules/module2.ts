import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';

import { getPickedDilemmas, rejectPickedDilemma, state } from '../global';

import { Button } from 'mithril-materialized';
import help from './components/help';
import hud from './components/hud';

let propertyButtons: Array<boolean> = [false, false, false];
let properties: Array<boolean> = [false, false, false];

const MODULE2 = {
  oninit: () => {
    state.currentDilemma = 0;
    getPickedDilemmas();
  },
  view: () => {
    return m('div', { class: 'container' }, [
      m(controlArea),
      m(hud, { done: '#!/module3' }),
    ]);
  },
};

const controlArea = {
  view: () => {
    return m('div', { id: 'controlAreaBG2' }, [
      m('div', { id: 'controlAreaTop2' }),

      m(
        'div',
        { class: 'row valign-wrapper', id: 'propertyControlArea' },
        state.showHelp
          ? m(help, {
              title: 'Title',
              desc: [
                'Lorem Ipsum et dono',
                'This is the second page',
                'this is the final page',
              ],
            })
          : [
              state.pickedDilemmas.length >= state.currentDilemma + 1
                ? m('div', { class: 'pickedTopic col s4' }, [
                    m(
                      'h1',
                      { class: 'topicTitle' },
                      state.pickedDilemmas
                        ? state.pickedDilemmas[state.currentDilemma].title
                        : 'loading...'
                    ),
                    m(
                      'p',
                      { class: 'topicText' },
                      state.pickedDilemmas
                        ? state.pickedDilemmas[state.currentDilemma].description
                        : 'loading...'
                    ),
                  ])
                : m('p', { class: 'col s4' }, 'done'),

              m('div', { class: 'propertySelection col s6' }, [
                m('div', { class: 'row' }, [
                  m('span', { class: 'col s4' }, 'TIME'),
                  m('span', { class: 'col s4' }, 'INFORMATION'),
                  m('span', { class: 'col s4' }, 'ACCORDANCE OF INTERESTS'),
                ]),
                m('div', { class: 'row' }, [
                  m('div', { class: 'col s4 propertyCol' }, [
                    m(
                      'div',
                      { class: 'propertyButtonCont col s12' },
                      m(
                        'button',
                        {
                          label: '+',
                          id: '0true',
                          class: 'propertyButtons col offset-s1 s10',
                          onclick: propertyAdd.bind(this, 0, true),
                        },
                        '+'
                      )
                    ),
                    m('hr', { class: 'propertyHr col s12' }),
                    m(
                      'div',
                      { class: 'propertyButtonCont col s12' },
                      m(
                        'button',
                        {
                          label: '-',
                          id: '0false',
                          class: 'propertyButtons col offset-s1 s10',
                          onclick: propertyAdd.bind(this, 0, false),
                        },
                        '-'
                      )
                    ),
                  ]),
                  m('div', { class: 'col s4 propertyCol' }, [
                    m(
                      'div',
                      { class: 'propertyButtonCont col s12' },
                      m(
                        'button',
                        {
                          label: '+',
                          id: '1true',
                          class: 'propertyButtons col offset-s1 s10',
                          onclick: propertyAdd.bind(this, 1, true),
                        },
                        '+'
                      )
                    ),
                    m('hr', { class: 'propertyHr col s12' }),
                    m(
                      'div',
                      { class: 'propertyButtonCont col s12' },
                      m(
                        'button',
                        {
                          label: '-',
                          id: '1false',
                          class: 'propertyButtons col offset-s1 s10',
                          onclick: propertyAdd.bind(this, 1, false),
                        },
                        '-'
                      )
                    ),
                  ]),
                  m('div', { class: 'col s4 propertyCol' }, [
                    m(
                      'div',
                      { class: 'propertyButtonCont col s12' },
                      m(
                        'button',
                        {
                          label: '+',
                          id: '2true',
                          class: 'propertyButtons col offset-s1 s10',
                          onclick: propertyAdd.bind(this, 2, true),
                        },
                        '+'
                      )
                    ),
                    m('hr', { class: 'propertyHr col s12' }),
                    m(
                      'div',
                      { class: 'propertyButtonCont col s12' },
                      m(
                        'button',
                        {
                          label: '-',
                          id: '2false',
                          class: 'propertyButtons col offset-s1 s10',
                          onclick: propertyAdd.bind(this, 2, false),
                        },
                        '-'
                      )
                    ),
                  ]),
                ]),
              ]),

              m('div', { id: 'trashMod2Cont' }, [
                m(Button, {
                  id: 'trashMod1Button',
                  onclick: rejectPickedDilemma,
                }),
              ]),
            ]
      ),
    ]);
  },
};

function propertyAdd(pressed, value) {
  propertyButtons[pressed] = true;
  properties[pressed] = value;

  const target = event.target as HTMLTextAreaElement;
  target.className += ' propertyButtonsPressed';

  document.getElementById(String(pressed) + String(!value)).className =
    'propertyButtons col offset-s1 s10';

  if (JSON.stringify(propertyButtons) === JSON.stringify([true, true, true])) {
    state.pickedDilemmas[state.currentDilemma]['time'] = properties[0];
    state.pickedDilemmas[state.currentDilemma]['info'] = properties[1];
    state.pickedDilemmas[state.currentDilemma]['accordance'] = properties[2];

    propertyButtons = [false, false, false];
    state.currentDilemma += 1;
  }
}

export default MODULE2;