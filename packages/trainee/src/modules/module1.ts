import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';
import { IAnsweredClaim, IGroup } from '../../../common/src';
import { sessionSvc, state } from '../global';
// import dilemmaReflection from './components/dilemma-reflection';
import help from './components/help';
import hud from './components/hud';

const updateSession = () => sessionSvc.update(state.session);

const MODULE1 = {
  oninit: () => {
    state.session.activeStepIndex = 0;
    updateSession();
    // session.send();
  },
  view: () => {
    return m('div', { class: 'container' }, [
      m(hud, { done: '/module2' }),
      m(interaction),
    ]);
  },
};


const interaction = {
  view: () => {
    const mainGroup = state.groups.filter(g => g.isMain).shift();
    return m('div', { class: 'interactionArea' }, [
      state.showHelp
        ? m(help, {
            title: 'Claims',
            desc: [
              'Each turn you will see a claim.',
              'Select the organisation which you think is responsible for handling this claim.',
              'Your organization is to the right of the claim. Organisations above you in the hierarchy, are above the claim. Organisations below you in the hierarchy, are below the claim.',
            ],
          })
        : state.claims.length >= state.session.activeStepIndex + 1
        ? m('div', [
            m('div', { class: 'row' }, [
              m('div', { class: 'col offset-s1 s7', id: 'upORGrow' }, [
                state.groups.map(group => {
                  if (group.level === 1) {
                    return m('div', { class: 'upORG' }, [
                      m(
                        'div',
                        {
                          class: 'orgBG valign-wrapper',
                          onclick: () => selectOtherOrg(group),
                        },
                        [m('p', { class: 'center-align' }, group.title)]
                      ),
                      m('div', {
                        class: 'upArrow',
                      }),
                    ]);
                  }
                }),
              ]),
            ]),

            m('div', { class: 'row valign-wrapper' }, [
              m(
                'div',
                { id: 'claimBG', class: 'col offset-s1 s7 valign-wrapper' },
                [
                  m(
                    'p',
                    { class: 'center-align' },
                    state.claims[state.session.activeStepIndex].title
                  ),
                ]
              ),
              m('div', {
                id: 'rightArrow',
                class: 'col s2',
              }),
              m(
                'div',
                {
                  class: 'orgBG valign-wrapper',
                  id: 'usOrg',
                  onclick: () => selectOtherOrg(mainGroup),
                },
                [
                  m(
                    'p',
                    { class: 'center-align' },
                    state.groups.map(group => {
                      if (group.isMain) {
                        return group.title;
                      }
                    })
                  ),
                ]
              ),
            ]),

            m('div', { class: 'row' }, [
              m('div', { class: 'col offset-s1 s7', id: 'downORGrow' }, [
                state.groups.map(group => {
                  if (group.level === -1) {
                    return m('div', { class: 'upORG' }, [
                      m('div', {
                        class: 'downArrow',
                      }),
                      m(
                        'div',
                        {
                          class: 'orgBG valign-wrapper',
                          onclick: () => selectOtherOrg(group),
                        },
                        [m('p', { class: 'center-align' }, group.title)]
                      ),
                    ]);
                  }
                }),
              ]),
            ]),
          ])
        : m('div', [m.route.set('/module2')]),
    ]);
  },
};

function selectOtherOrg(org: IGroup) {
  if (!state.showHelp) {
    // state.claims[state.currentStep]["assignedTo"] = org.id;
    if (state.claims.length >= state.session.activeStepIndex + 1) {
      const claim = state.claims[state.session.activeStepIndex];
      // state.reflecting = true;
      state.session.answeredClaims[state.session.activeStepIndex] = {
        ...claim,
        answeredGroupId: org.id,
        correct: claim.groupId === org.id,
      } as IAnsweredClaim;
      state.session.activeStepIndex += 1;
      console.log(state.session);
      updateSession();
    }
  }
}

// score circle in the top right.

export default MODULE1;
