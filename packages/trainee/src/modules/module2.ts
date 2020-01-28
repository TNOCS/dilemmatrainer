import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';

import { state } from '../global';

import { Button } from 'mithril-materialized';
import help from './components/help';
import hud from './components/hud';

let propertyButtons: Array<boolean> = [false, false, false];
let properties: Array<boolean> = [false, false, false];

let hbarSize = 7;

const MODULE2 = {
  oninit: () => {
    state.currentStep = 0;
    state.showHelp = true;
  },
  view: () => {
    return m('div', { class: 'container' }, [
      m(hud, { done: '/module3' }),
      m(interaction),
    ]);
  },
};

const interaction = {
  view: () => {
    return m('div', {class: 'interactionArea'}, [
      m('div', {class:'row'},[
        m('div', {class: 'col s10', id:'dilemmaBG'}, [
          m('p', {id:'description', class:"flow-text"} , 'desccription'), //state.dilemmas[state.currentStep].description
          m('h5', {id: 'title', class:"flow-text"} , 'title?' ) //state.dilemmas[state.currentStep].title
        ])
      ]),

      m('div', {class:'row'},[
        m('div', {class:'row'},[
          m('div', {id:'topItems', class: 'col offset-s4 s7 gridItems'}, [
            m('div', {class: 'gridVbarCont'}, m('div', {class: 'gridVbar'})),
            m('div', {class: 'charaDis'}, 'ICON/TITLE'),
            m('div', {class: 'gridVbarCont'}, m('div', {class: 'gridVbar'})),
          ]),

          m('div', {class: 'gridHbarCont col offset-s4 s' + String(hbarSize)}, m('hr', {class: 'gridHbar', id:'firstHBar'}))
        ]),
        m('div', {class:'row', style:'margin-top: 30px'},[
          m('div', {id: 'yes', class: 'col offset-s3 s1'}),

          m('div', {id:'middleItems', class: 'col offset-s4 s7 gridItems'}, [
            m('div', {class: 'stampPoint stamped'}),
          ]),
          m('div', {class: 'gridHbarCont col offset-s4 s' + String(hbarSize)}, m('hr', {class: 'gridHbar', id:'secondHBar'}))

        ]),
        m('div', {class:'row', style:'margin-top: 20px'},[
          m('div', {id: 'no', class: 'col offset-s3 s1'}),

          m('div', {id:'bottomItems', class: 'col offset-s4 s7 gridItems'}, [
            m('div', {class: 'stampPoint stamped'}),
          ]),


          m('div', {class: 'gridHbarCont col offset-s4 s' + String(hbarSize)}, m('hr', {class: 'gridHbar', id:'thirdHBar'}))
        ]),
      ])
  ])
  }
};

/*
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
                :  m('div', { class: 'col s6', id: 'greencheck' }),

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
*/
export default MODULE2;
