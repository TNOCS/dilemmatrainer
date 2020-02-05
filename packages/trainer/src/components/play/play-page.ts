import m, { FactoryComponent } from 'mithril';
import {
  Button,
  ModalPanel,
  Select,
  TextArea,
  TextInput,
} from 'mithril-materialized';
import { IGame, ISession } from '../../../../common/src';
import { IActions, IAppModel, sessionSvc, UpdateStream } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { CircularSpinner } from '../ui/preloader';
import { ClaimsModule } from './claims-module';
import { DilemmasModule } from './dilemmas-module';
import { ScenariosModule } from './scenarios-module';

export const PlayPage: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = () => {
  let newSession = {} as ISession;
  const saveSession = (updateSession: (s: ISession) => UpdateStream) => async (
    session: ISession
  ) => {
    updateSession(session);
    await sessionSvc.save(session);
  };

  return {
    oninit: ({
      attrs: {
        actions: { loadGame },
        state: { game: { current: game } = {} },
      },
    }) => {
      return new Promise(async (resolve, reject) => {
        if (!game) {
          await loadGame().catch(r => reject(r));
        }
        const sid = +m.route.param('sid');
        if (sid) {
          await sessionSvc.load(sid);
        }
        await sessionSvc.loadActiveSessions().catch(r => reject(r));
        resolve();
      });
    },
    view: ({ attrs: { actions, state } }) => {
      const { updateSession } = actions;
      const {
        game: { current: game = {} as IGame } = {},
        session: { current: session = {} as ISession } = {},
      } = state;
      const sid = +m.route.param('sid');
      if (!isNaN(sid) && session.$loki !== sid) {
        sessionSvc.load(sid);
      }
      if (!game) {
        return m(CircularSpinner, {
          className: 'center-align',
          style: 'margin-top: 20%;',
        });
      }
      const save = saveSession(updateSession);
      const { activeModule } = session;
      const gameId = game.$loki;
      const openSessions = sessionSvc.getList().filter(s => s.active);
      const closedSessions = sessionSvc.getList().filter(s => !s.active);
      const {
        claimsModule,
        dilemmasModule,
        workAgreementsModule,
        scenariosModule,
      } = game;
      const modules = [
        {
          id: 'claims',
          label: 'Claims',
          show: claimsModule?.show,
        },
        {
          id: 'dilemmas',
          label: 'Dilemmas',
          show: dilemmasModule?.show,
        },
        {
          id: 'workAgreements',
          label: 'Work agreements',
          show: workAgreementsModule?.show,
        },
        {
          id: 'scenarios',
          label: 'Scenarios',
          show: scenariosModule?.show,
        },
      ].filter(s => s.show);
      console.log('Module: ' + session.activeModule);
      return m('.row', [
        m(
          'ul#slide-out.sidenav.sidenav-fixed',
          {
            oncreate: ({ dom }) => {
              M.Sidenav.init(dom);
            },
          },
          [
            m('.col.s12', [
              m(
                'h5.primary-text',
                { style: 'margin-left: 10px;' },
                'Open sessions'
              ),
              ...openSessions.map(s =>
                m(
                  'li',
                  m(
                    m.route.Link,
                    {
                      href: dashboardSvc
                        .route(Dashboards.PLAY)
                        .replace(':id', `${gameId}`)
                        .replace(':sid', `${s.$loki}`),
                    },
                    m('span.primary-text', s.title)
                  )
                )
              ),
            ]),
            m('.buttons', [
              game &&
                gameId &&
                m(Button, {
                  modalId: 'create-session',
                  label: 'Create session',
                  iconName: 'create',
                  class: 'green col s12',
                }),
              m(Button, {
                label: 'Save session',
                iconName: 'save',
                disabled: !session || !session.title || !game,
                className: 'right col s12',
                onclick: async () => {
                  if (!game || !gameId) {
                    return;
                  }
                  await sessionSvc
                    .save({ ...session, active: true, gameId })
                    .then(s => {
                      if (s) {
                        updateSession(s);
                        dashboardSvc.switchTo(Dashboards.PLAY, {
                          id: game.$loki,
                          sid: s.$loki,
                        });
                      }
                    });
                },
              }),
              m(Button, {
                modalId: 'stop-session',
                label: 'Stop session',
                iconName: 'delete',
                disabled: !session || !session.title || !game,
                class: 'red col s12',
              }),
            ]),
            m('.col.s12', [
              m(
                'h5.primary-text',
                { style: 'margin: 20px 0 0 10px;' },
                'Closed sessions'
              ),
              ...closedSessions.map(s =>
                m(
                  'li',
                  m(
                    m.route.Link,
                    {
                      href: dashboardSvc
                        .route(Dashboards.PLAY)
                        .replace(':id', `${gameId}`)
                        .replace(':sid', `${s.$loki}`),
                    },
                    m('span.primary-text', s.title)
                  )
                )
              ),
            ]),
          ]
        ),
        m('.contentarea', [
          session &&
            typeof session.active === 'boolean' &&
            m('.row', [
              m('h5', `${session.active ? 'Active' : 'Stopped'} session`),
              m(TextInput, {
                label: 'Title',
                initialValue: session.title,
                onchange: v => {
                  session.title = v;
                  save(session);
                },
                className: 'col s6',
              }),
              m(Select, {
                label: 'Play module',
                checkedId: session.activeModule,
                options: modules,
                placeholder: 'Select a module',
                className: 'col s6',
                onchange: id => {
                  session.activeModule = id[0] as any;
                  save(session);
                },
              }),
              m(TextArea, {
                label: 'Description',
                initialValue: session.description,
                onchange: v => {
                  session.description = v;
                  save(session);
                },
              }),
              m('.col.s12', [
                activeModule === 'claims' &&
                  m(ClaimsModule, { state, actions }),
                activeModule === 'dilemmas' &&
                  m(DilemmasModule, { state, actions }),
                activeModule === 'workAgreements' && m('div', 'workAgreements'),
                activeModule === 'scenarios' &&
                  m(ScenariosModule, { state, actions }),
              ]),
            ]),
          // game && m('pre', JSON.stringify(game, null, 2)),
        ]),
        m(ModalPanel, {
          id: 'create-session',
          title: 'New session',
          fixedFooter: true,
          description: m(
            'div',
            m(TextInput, {
              label: 'Title',
              initialValue: newSession.title,
              onchange: v => (newSession.title = v),
            }),
            m(TextArea, {
              label: 'Description',
              initialValue: newSession.description,
              onchange: v => (newSession.description = v),
            })
          ),
          options: { opacity: 0.7 },
          buttons: [
            {
              label: 'Create',
              iconName: 'create',
              disabled: !newSession.title,
              onclick: async () => {
                newSession.active = true;
                sessionSvc.create(newSession);
                newSession = {} as ISession;
                close();
              },
            },
            {
              label: 'Cancel',
            },
          ],
        }),
        m(ModalPanel, {
          id: 'stop-session',
          title: 'Stop session',
          description: `Are you certain you want to stop "${session.title}"? This action cannot be undone!`,
          options: { opacity: 0.7 },
          buttons: [
            {
              label: 'Stop',
              onclick: async () => {
                session.active = false;
                sessionSvc.save(session);
                updateSession({} as ISession);
                // sessionSvc.delete(session.$loki);
                close();
              },
            },
            {
              label: 'Cancel',
            },
          ],
        }),
      ]);
    },
  };
};
