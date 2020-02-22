import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';
import { state, session } from '../global';

import dilemmaReflection from './components/dilemma-reflection';
import help from './components/help';
import hud from './components/hud';

const MODULE1 = {
  oninit: () => {
    session.activeStepIndex = 0;
    session.send();
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
          state.claims.length >= session.activeStepIndex  + 1 ?
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
                  m('p', {class: 'center-align'} , state.claims[session.activeStepIndex].title )
                ]),
                m('div', {
                  id: 'rightArrow',
                  class: 'col s2',
                }),
                m('div', {class: 'orgBG valign-wrapper', id: 'usOrg', onclick: selectOtherOrg.bind(this, 'main')}, [
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
          m('div', [m.route.set('/module2')])
    ])
  }
}

function selectOtherOrg(org){
  if (!state.showHelp) {
    //state.claims[state.currentStep]["assignedTo"] = org.id;
    if (state.claims.length >= session.activeStepIndex + 1) {
      //state.reflecting = true;
      session.activeStepIndex += 1;
      console.log(session);
      session.send()
    }
  }
}

//score circle in the top right.

export default MODULE1;
