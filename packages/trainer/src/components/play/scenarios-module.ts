/** Play the claims (vraagstukken) module */
import m, { Attributes, FactoryComponent } from 'mithril';
import { FlatButton, ModalPanel } from 'mithril-materialized';
import { SlimdownView } from 'mithril-ui-form';
import { ISession } from '../../../../common/src';
import { apiService } from '../../app';
import { IActions, IAppModel, UpdateStream } from '../../services/meiosis';
import { sessionSvc } from '../../services/session-service';

export interface IScenariosModule extends Attributes {
  state: IAppModel;
  actions: IActions;
}

export const ScenariosModule: FactoryComponent<IScenariosModule> = () => {
  const saveSession = (updateSession: (s: ISession) => UpdateStream) => async (
    session: ISession
  ) => {
    updateSession(session);
    await sessionSvc.save(session);
  };

  return {
    view: ({
      attrs: {
        state: {
          session: { current: session },
          game: { current: game },
        },
        actions,
      },
    }) => {
      if (
        !session ||
        !game ||
        !game.scenariosModule ||
        !game.scenariosModule.scenarios ||
        game.scenariosModule.scenarios.length === 0
      ) {
        return;
      }
      const { updateSession } = actions;
      const save = saveSession(updateSession);
      const { scenariosModule: { scenarios = [] } = {} } = game;

      if (!session.activeScenarioIndex) {
        session.activeScenarioIndex = 0;
      }
      if (!session.activeScenarioDilemmaIndex) {
        session.activeScenarioDilemmaIndex = { [0]: 0 };
      }
      const { activeScenarioIndex, activeScenarioDilemmaIndex } = session;
      const scenario = scenarios[activeScenarioIndex];
      const { dilemmas, mapUrl, legendUrl, title, description } = scenario;
      const di = activeScenarioDilemmaIndex[activeScenarioIndex];
      const dilemma =
        dilemmas && di < dilemmas.length ? dilemmas[di] : undefined;
      return [
        m('ul.inline', [
          m('li', m(FlatButton, { iconName: 'info', modalId: 'show-info' })),
          mapUrl &&
            m('li', m(FlatButton, { iconName: 'map', modalId: 'show-map' })),
        ]),
        m(ModalPanel, {
          id: 'show-info',
          title,
          fixedFooter: true,
          description: m(SlimdownView, { md: description }),
        }),
        m(ModalPanel, {
          id: 'show-map',
          title: 'Map',
          fixedFooter: true,
          description: m('div', [
            m('img.responsive-img', {
              src: apiService() + mapUrl,
              alt: 'Map of the area.',
            }),
            m('img.responsive-img', {
              src: apiService() + legendUrl,
              alt: 'Legend',
            }),
          ]),
        }),
        dilemma && [
          m('h5', 'Active dilemma'),
          m('p', [m('strong', 'Context: '), dilemma.description]),
          m('p', [m('strong', 'Dilemma: '), dilemma.title]),
          dilemma.notes &&
            m('p', [
              m('strong', 'Notes: '),
              m(SlimdownView, { md: dilemma.notes }),
            ]),
          // m(DecisionTypeView, { characteristics, dilemma, readonly: true }),
          // m(CharacteristicsView, { characteristics, dilemma }),
          // m(
          //   'p',
          //   m(
          //     'strong',
          //     `Current score is ${score} of ${l}${
          //       l ? ` (${Math.round((10 * score) / l) / 10})` : ''
          //     }. ${dilemmas.length - l} dilemmas left.`
          //   )
          // ),
          m(
            '.row.buttons',
            m(FlatButton, {
              iconName: 'navigate_before',
              className: 'btn-large left',
              iconClass: 'large',
              disabled:
                typeof dilemmas === 'undefined' ||
                dilemmas.length === 0 ||
                di <= 0,
              onclick: () => {
                if (dilemmas && di > 0) {
                  session.activeScenarioDilemmaIndex[activeScenarioIndex]--;
                  save(session);
                }
              },
            }),
            m(FlatButton, {
              iconName: 'navigate_next',
              className: 'btn-large right',
              iconClass: 'large',
              disabled:
                typeof dilemmas === 'undefined' ||
                dilemmas.length === 0 ||
                di >= dilemmas.length,
              onclick: () => {
                if (dilemmas && di < dilemmas.length) {
                  session.activeScenarioDilemmaIndex[activeScenarioIndex]++;
                  save(session);
                }
              },
            })
          ),
          // m('table.highlight', [
          //   m(
          //     'thead',
          //     m('tr', [m('th', 'ID'), m('th', 'TITLE'), m('th', 'CORRECT')])
          //   ),
          //   m(
          //     'tbody',
          //     answeredDilemmas.reverse().map((c, i) =>
          //       m('tr', [
          //         m('td', l - i),
          //         m('td', c.title),
          //         m(
          //           'td',
          //           m(Icon, {
          //             iconName: c.correct
          //               ? 'check_box'
          //               : 'check_box_outline_blank',
          //           })
          //         ),
          //       ])
          //     )
          //   ),
          // ]),
          // m('pre', JSON.stringify(dilemma, null, 2)),
        ],
        // : m(
        //     'p',
        //     `There are no more dilemmas to answer. Your final score is ${score} of ${l}.`
        //   ),
      ];
    },
  };
};
