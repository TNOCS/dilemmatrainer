import { saveAs } from 'file-saver';
import m from 'mithril';
import { FlatButton, Icon } from 'mithril-materialized';
import { IGame } from '../../../../common/src';
import { Roles } from '../../models/roles';
import { Auth, defaultRbtGame, gameSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';

export const EventsList = () => {
  const sortByName:
    | ((a: Partial<IGame>, b: Partial<IGame>) => number)
    | undefined = (a, b) =>
    (a.title || '') > (b.title || '')
      ? 1
      : (a.title || '') < (b.title || '')
      ? -1
      : 0;

  const sortByUpdated:
    | ((a: Partial<IGame>, b: Partial<IGame>) => number)
    | undefined = (a, b) =>
    typeof a.meta === 'undefined' ||
    typeof a.meta.updated === 'undefined' ||
    typeof b.meta === 'undefined' ||
    typeof b.meta.updated === 'undefined'
      ? 0
      : (a.meta.updated || '') > (b.meta.updated || '')
      ? 1
      : (a.meta.updated || '') < (b.meta.updated || '')
      ? -1
      : 0;

  return {
    oninit: () => gameSvc.loadList(),
    view: () => {
      const scenarios = (gameSvc.getList() || ([] as IGame[]))
        .sort(sortByUpdated)
        .sort(sortByName);
      const filteredGames =
        scenarios
          .filter(
            scenario =>
              scenario.published ||
              (Auth.isAuthenticated &&
                (Auth.roles.indexOf(Roles.ADMIN) >= 0 ||
                  Auth.canEdit(scenario)))
          )
          .filter((_, i) => i < 24) || [];
      // console.log(JSON.stringify(filteredCareProviders, null, 2));
      return m('.row', { style: 'margin-top: 1em;' }, [
        m(
          'ul#slide-out.sidenav.sidenav-fixed',
          {
            oncreate: ({ dom }) => {
              M.Sidenav.init(dom);
            },
          },
          [
            Auth.isAuthenticated &&
              m(FlatButton, {
                label: 'New RBT game (in Dutch)',
                iconName: 'add',
                class: 'col s11 indigo darken-4 white-text',
                style: 'margin: 1em;',
                onclick: async () => {
                  const scenario = await gameSvc.save(defaultRbtGame([Auth.email]));
                  if (scenario) {
                    dashboardSvc.switchTo(Dashboards.EDIT, {
                      id: scenario.$loki,
                    });
                  }
                },
              }),
            Auth.isAuthenticated &&
              m(FlatButton, {
                label: 'New game',
                iconName: 'add',
                class: 'col s11 indigo darken-4 white-text',
                style: 'margin: 1em;',
                onclick: async () => {
                  const scenario = await gameSvc.save({
                    title: 'New game',
                    owner: [Auth.email],
                    published: false,
                  } as IGame);
                  if (scenario) {
                    dashboardSvc.switchTo(Dashboards.EDIT, {
                      id: scenario.$loki,
                    });
                  }
                },
              }),
          ]
        ),
        m(
          '.contentarea',
          filteredGames.length > 0
            ? filteredGames.map(game =>
                m('.col.s12', [
                  m(
                    '.card.hoverable',
                    m('.card-content', { style: 'height: 150px;' }, [
                      m(
                        m.route.Link,
                        {
                          className: 'card-title',
                          href: dashboardSvc
                            .route(Dashboards.READ)
                            .replace(':id', `${game.$loki}`),
                        },
                        game.title || 'Untitled'
                      ),
                      m('p.light.block-with-text', game.description),
                    ]),
                    m('.card-action', [
                      m(
                        'a',
                        {
                          target: '_blank',
                          style: 'margin-right: 0',
                          onclick: () => {
                            const json = JSON.stringify(game);
                            const blob = new Blob([json], {
                              type: 'text/plain;charset=utf-8',
                            });
                            saveAs(blob, `${game.title}.json`, {
                              autoBom: true,
                            });
                          },
                        },
                        m(Icon, {
                          iconName: 'cloud_download',
                          style: 'cursor: pointer;',
                        })
                      ),
                      m(
                        'span.badge',
                        game.dilemmasModule && game.dilemmasModule.dilemmas
                          ? `${game.dilemmasModule.dilemmas.length} dilemma${
                              game.dilemmasModule.dilemmas.length === 1
                                ? ''
                                : 's'
                            }`
                          : '0 dilemmas'
                      ),
                    ])
                  ),
                ])
              )
            : m(
                '.row.center-align',
                {
                  style: 'height: 80%; position: relative;',
                },
                m('div', {
                  style:
                    'position: absolute; width: 100%; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);',
                })
              )
        ),
      ]);
    },
  };
};
