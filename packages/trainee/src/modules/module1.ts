import m from 'mithril';
import { IAnsweredClaim, IGroup } from '../../../common/src';
import '../../css/module1.css';
import { sessionSvc, state } from '../global';
// import dilemmaReflection from './components/dilemma-reflection';
import help from './components/help';
import hud from './components/hud';

const updateSession = () => sessionSvc.update(state.session);

const MODULE1 = {
  oninit: () => {
    state.session.activeStepIndex = 0;
    updateSession();
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
            m('.row', [
              m('.col.offset-s1.s7[id=upORGrow]', [
                state.groups.map(group => {
                  if (group.level === 1) {
                    return m('.upORG', [
                      m(
                        '.orgBG.valign-wrapper',
                        {
                          onclick: () => selectOtherOrg(group),
                        },
                        [m('p.center-align', group.title)]
                      ),
                      m('.upArrow'),
                    ]);
                  }
                }),
              ]),
            ]),

            m('.row.valign-wrapper', [
              m('.col.offset-s1.s7.valign-wrapper[id=claimBG]', [
                m(
                  'p.center-align',
                  state.claims[state.session.activeStepIndex].title
                ),
              ]),
              m('.col.s2[id=rightArrow]'),
              m(
                '.orgBG.valign-wrapper[id=usOrg]',
                {
                  onclick: () => selectOtherOrg(mainGroup),
                },
                [
                  m(
                    'p.center-align',
                    state.groups.map(group => {
                      if (group.isMain) {
                        return group.title;
                      }
                    })
                  ),
                ]
              ),
            ]),

            m('.row', [
              m('.col.offset-s1.s7[id=downORGrow]', [
                state.groups.map(group => {
                  if (group.level === -1) {
                    return m('.upORG', [
                      m('.downArrow'),
                      m(
                        '.orgBG.valign-wrapper',
                        {
                          onclick: () => selectOtherOrg(group),
                        },
                        [m('p.center-align', group.title)]
                      ),
                    ]);
                  }
                }),
              ]),
            ]),
          ])
        : m(
            '.valign-wrapper',
            m(
              'h3.center-align',
              `End of the claims module. You have ${state.session.answeredClaims.reduce(
                (acc, cur) => acc + (cur.correct ? 1 : 0),
                0
              )} of ${state.session.answeredClaims.length} correct.`
            )
          ),
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
