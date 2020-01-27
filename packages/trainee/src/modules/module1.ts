import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';
import { state, sessionSvc } from '../global';

import { Button } from 'mithril-materialized';
import dilemmaReflection from './components/dilemma-reflection';
import help from './components/help';
import hud from './components/hud';

const MODULE1 = {
  oninit: () => {
    state.currentStep = 0;
  },
  view: () => {
    return m('div', { class: 'container' }, [
      m(hud, { done: '/module2' }),
      m(interaction)
    ]);
  },
};


const interaction = {
  view: () => {
    return m('div', {class: 'interactionArea'}, [
      state.showHelp ? 
        m(help, {
            title: 'Module 1',
            desc: [
              'Each turn you will see a claim.',
              'Select the organisation which you think is responsible for handling this claim.',
              'Your organization is to the right of the claim. Organisations above you in the hierarchy, are above the claim. Organisations below you in the hierarchy, are below the claim.',
            ],
          })
      : 
          state.claims.length >= state.currentStep + 1 ?
            m('div', [
              m('div', {class: 'row'}, [
                m('div', {class: 'col offset-s1 s7', id:'upORGrow'}, [
                  state.groups.map(group => {
                    if(group.level == 1){
                      return m('div', {class: 'upORG'}, [
                        m('div', {class: 'orgBG valign-wrapper', onclick: selectOtherOrg.bind(this, group)}, [
                          m('p', {class: 'center-align'} , group.title) 
                        ]),
                        m('div', {
                          class: 'upArrow',
                        })
                      ])
                    }
                  }),
                ])
              ]),


              m('div', {class: 'row valign-wrapper'}, [
                m('div', {id:'claimBG', class: 'col offset-s1 s7 valign-wrapper'}, [
                  m('p', {class: 'center-align'} , state.claims[state.currentStep].title )
                ]),
                m('div', {
                  id: 'rightArrow',
                  class: 'col s2',
                }),
                m('div', {class: 'orgBG valign-wrapper', id: 'usOrg'}, [
                  m('p', {class: 'center-align'} , state.groups.map(group => {if(group.isMain){return group.title}})) 
                ])
              ]),


              m('div', {class: 'row'}, [
                m('div', {class: 'col offset-s1 s7', id:'downORGrow'}, [
                  state.groups.map(group => {
                    if(group.level == -1){
                      return m('div', {class: 'upORG'}, [
                        m('div', {
                          class: 'downArrow',
                        }),
                        m('div', {class: 'orgBG valign-wrapper', onclick: selectOtherOrg.bind(this, group)}, [
                          m('p', {class: 'center-align'} , group.title) 
                        ])
                      ])
                    }
                  })
                ])
              ]),
            ])
          : 
            m.route.set('/module2')
    ])
  }
}

function selectOtherOrg(org){
  if (!state.showHelp) {
    state.claims[state.currentStep]["assignedTo"] = org.id;
    if (state.claims.length >= state.currentStep + 1) {
      //state.reflecting = true;
      state.currentStep += 1;
    }
  }
}


/*

const controlAreaSolo = {
  view: () => {
    return state.roles.length < 2
      ? 
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


function sortDilemma(role) {
  if (!state.showHelp) {
    state.dilemmas[state.currentDilemma]['accepted'] = true;
    state.dilemmas[state.currentDilemma]['assignedTo'] = role;
    if (state.dilemmas.length >= state.currentDilemma + 1) {
      state.reflecting = true;
    }
  }
}
*/

//score circle in the top right.

export default MODULE1;
