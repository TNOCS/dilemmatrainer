import m, { Component } from 'mithril';
import { FlatButton } from 'mithril-materialized';
import { IScenarioPhase } from '../../../common/src';
import '../../css/module4.css';
import { sessionSvc, state } from '../global';
import help from './components/help';
import hud from './components/hud';
import { ScenarioInfo } from './components/scenario-info';

const updateSession = () => sessionSvc.update(state.session);

const MODULE4: Component = {
  oninit: () => {
    state.session.activeModule = 'scenarios';
    state.session.activeStepIndex = 0;
    state.showHelp = true;
    updateSession();
  },
  view: () => {
    return m('div', { class: 'container' }, [
      m(hud, { done: '' }),
      m(interaction),
    ]);
  },
};

const interaction: Component = {
  oninit: () => (state.session.activeStepIndex = 0),
  view: () => {
    const scenarioIndex = state.session?.activeStepIndex || 0;
    const scenario =
      state.scenarios && state.scenarios.length > scenarioIndex
        ? state.scenarios[scenarioIndex]
        : undefined;
    const dilemmas = scenario?.dilemmas || [];
    const dilemmaIndex = state.session.activeScenarioDilemmaIndex
      ? state.session.activeScenarioDilemmaIndex[scenarioIndex] <
        dilemmas.length
        ? state.session.activeScenarioDilemmaIndex[scenarioIndex]
        : 0
      : 0;
    const dilemma = dilemmas ? dilemmas[dilemmaIndex] : undefined;
    return m('.interactionArea.module4', [
      m(
        '.row',
        state.showHelp
          ? m(help, {
              title: 'Master the scenario',
              desc: [
                `You will be presented with a scenario.
                Each scenario has several dilemmas, and each dilemma is defined by its context followed by a question.
                Discuss together how you want to handle the dilemma and defend your decision.`,
              ],
            })
          : state.showScenario
          ? scenario && m(ScenarioInfo, { scenario })
          : dilemma && [
              m('.row', m('.col.s12', m('h4', scenario.title))),
              m(
                '.row',
                m('.col.s12#dilemmaBG', [
                  m('p.flow-text#description', dilemma.description),
                  m('h5.flow-text#title', dilemma.title),
                ])
              ),
              m(
                '.row',
                m('.col.s12#navigation', [
                  (dilemmaIndex > 0 || scenarioIndex > 0) &&
                    m(FlatButton, {
                      label: 'Previous dilemma',
                      iconName: 'navigate_before',
                      onclick: () => prevDilemma(scenarioIndex, dilemmaIndex),
                    }),
                  (dilemmaIndex < scenario.dilemmas.length - 1 ||
                    scenarioIndex < state.scenarios.length - 1) &&
                    m(FlatButton, {
                      className: 'right',
                      label: 'Next dilemma',
                      iconName: 'navigate_next',
                      iconClass: 'right',
                      onclick: () =>
                        nextDilemma(scenarioIndex, dilemmaIndex, scenario),
                    }),
                ])
              ),
            ]
      ),
    ]);
  },
};

const nextDilemma = (
  scenarioIndex: number,
  dilemmaIndex: number,
  scenario: IScenarioPhase
) => {
  if (dilemmaIndex < scenario.dilemmas.length - 1) {
    state.session.activeScenarioDilemmaIndex[scenarioIndex] = dilemmaIndex + 1;
  } else {
    const activeStepIndex = scenarioIndex + 1;
    state.session.activeStepIndex = activeStepIndex;
    state.session.activeScenarioDilemmaIndex[activeStepIndex] = 0;
    state.showScenario = true;
  }
  updateSession();
};

const prevDilemma = (scenarioIndex: number, dilemmaIndex: number) => {
  if (dilemmaIndex > 0) {
    state.session.activeScenarioDilemmaIndex[scenarioIndex] = dilemmaIndex - 1;
  } else {
    const activeStepIndex = scenarioIndex - 1;
    state.session.activeStepIndex = activeStepIndex;
    const s = state.scenarios[activeStepIndex];
    state.session.activeScenarioDilemmaIndex[activeStepIndex] =
      s.dilemmas.length - 1;
  }
  updateSession();
};

export default MODULE4;
