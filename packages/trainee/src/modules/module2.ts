import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';

import { state } from '../global';

import help from './components/help';
import hud from './components/hud';
import { ScenarioInfo } from './components/scenario-info';

let charaCol: boolean[] = [];
let charaValue: number[] = []; // charaValue 0 = false, 1 = true,  2 = undefined
let charaNames: string[] = [];
let charaIcons: string[] = [];
let charaResults: any[] = [];

const hbarSize = 7;

const MODULE2 = {
  oninit: () => {
    state.session.activeStepIndex = 0;
    state.showHelp = true;
    setupCharas();
  },
  view: () => {
    return m('.container', [
      m(hud, {
        done: state.workAgreementsModule.show
          ? '/module3'
          : state.scenariosModule.show
          ? '/module4'
          : '',
      }),
      m(interaction),
    ]);
  },
};

const interaction = {
  view: () => {
    return m('.interactionArea', [
      state.showHelp
        ? m(help, {
            title: 'Dilemmas',
            desc: [
              'You will be presented with a dilemma, where a dilemma is defined by its context followed by a question.',
              'Under the dilemma you will see a table with the following characteristics: ' +
                state.charas.map(c => c.title?.toLowerCase()).join(', ') +
                '. Mark the characteristics that apply to the current dilemma.',
            ],
          })
        : state.showScenario
        ? m(ScenarioInfo, { scenario: state.dilemmasModule })
        : state.dilemmas.length >= state.session.activeStepIndex + 1
        ? m('div', [
            m('div', { class: 'row' }, [
              m('div', { class: 'col s10', id: 'dilemmaBG' }, [
                m(
                  'p',
                  { id: 'description', class: 'flow-text' },
                  state.dilemmas[state.session.activeStepIndex].description
                ),
                m(
                  'h5',
                  { id: 'title', class: 'flow-text' },
                  state.dilemmas[state.session.activeStepIndex].title
                ),
              ]),
            ]),

            m('div', { class: 'row', id: 'grid' }, [
              m('div', { class: 'row' }, [
                m(
                  'div',
                  { id: 'topItems', class: 'col offset-s4 s7 gridItems' },
                  [
                    m(
                      'div',
                      { class: 'gridVbarCont' },
                      m('div', { class: 'gridVbar' })
                    ),

                    charaNames.map((char, i) => {
                      return [
                        m('div', { class: 'charaDis' }, charaNames[i]),
                        m(
                          'div',
                          { class: 'gridVbarCont' },
                          m('div', { class: 'gridVbar' })
                        ),
                      ];
                    }),
                  ]
                ),

                m(
                  'div',
                  { class: 'gridHbarCont col offset-s4 s' + String(hbarSize) },
                  m('hr', { class: 'gridHbar', id: 'firstHBar' })
                ),
              ]),
              m('div', { class: 'row', style: 'margin-top: 30px' }, [
                m('div', { id: 'yes', class: 'col offset-s3 s1' }),

                m(
                  'div',
                  { id: 'middleItems', class: 'col offset-s4 s7 gridItems' },
                  [
                    charaNames.map((char, i) => {
                      return m('div', {
                        class: 'stampPoint',
                        id: 'yesChar' + i,
                        onclick: stamp.bind(this, i, 1),
                      });
                    }),
                  ]
                ),
                m(
                  'div',
                  { class: 'gridHbarCont col offset-s4 s' + String(hbarSize) },
                  m('hr', { class: 'gridHbar', id: 'secondHBar' })
                ),
              ]),
              m('div', { class: 'row', style: 'margin-top: 20px' }, [
                m('div', { id: 'no', class: 'col offset-s3 s1' }),

                m(
                  'div',
                  { id: 'bottomItems', class: 'col offset-s4 s7 gridItems' },
                  [
                    charaNames.map((char, i) => {
                      return m('div', {
                        class: 'stampPoint',
                        id: 'noChar' + i,
                        onclick: stamp.bind(this, i, 0),
                      });
                    }),
                  ]
                ),

                m(
                  'div',
                  { class: 'gridHbarCont col offset-s4 s' + String(hbarSize) },
                  m('hr', { class: 'gridHbar', id: 'thirdHBar' })
                ),
              ]),
            ]),
          ])
        : m('div', [m.route.set('/selection')]),
    ]);
  },
};

function stamp(col, value) {
  const target = event.target as HTMLTextAreaElement;

  if (charaValue[col] === value) {
    target.classList.remove('stamped');
    charaCol[col] = false;
  } else {
    if (charaValue[col] !== 2) {
      if (charaValue[col] === 1) {
        document.getElementById('yesChar' + col).classList.remove('stamped');
      } else {
        document.getElementById('noChar' + col).classList.remove('stamped');
      }
    }

    target.classList.add('stamped');
    charaCol[col] = true;
  }

  if (charaValue[col] === value) {
    charaValue[col] = 2;
  } else {
    charaValue[col] = value;
  }

  if (
    charaCol.every(i => {
      return i;
    })
  ) {
    state.session.activeStepIndex += 1;
    if (state.dilemmas.length >= state.session.activeStepIndex + 1) {
      // prepare next dilemma
      const stamped = document.getElementsByClassName('stamped');

      while (stamped.length) {
        // because shrinking classList
        stamped[0].classList.remove('stamped');
      }
      setupCharas();
    } else {
      m.route.set('/selection');
    }
  }
}

function setupCharas() {
  charaCol = [];
  charaValue = [];
  charaNames = [];
  charaIcons = [];
  charaResults = [];

  charaNames = state.charas.map(chara => {
    charaCol.push(false);
    charaValue.push(2);
    charaResults.push();

    const icon = chara.iconUrl;
    if (icon) {
      if (typeof icon === 'string') {
        charaIcons.push(icon);
      } else {
        charaIcons.push(icon[0]);
      }
    } else {
      charaIcons.push(null);
    }
    return chara.title;
  });

  charaResults = charaNames.map(
    char => state.dilemmas[state.session.activeStepIndex].characteristics[char]
  );
}

export default MODULE2;
