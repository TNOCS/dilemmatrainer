import { saveAs } from 'file-saver';
import m from 'mithril';
import { FlatButton, Icon } from 'mithril-materialized';
import { IScenario } from '../../../../common/dist';
import { AppState } from '../../models/app-state';
import { Roles } from '../../models/roles';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { Auth } from '../../services/login-service';
import { scenarioSvc } from '../../services/scenario-service';
import { careProviderToCSV } from '../../utils';
import { CircularSpinner } from '../ui/preloader';
import { SearchComponent } from '../ui/search-component';

export const EventsList = () => {
  const sortByName:
    | ((a: Partial<IScenario>, b: Partial<IScenario>) => number)
    | undefined = (a, b) =>
    (a.title || '') > (b.title || '')
      ? 1
      : (a.title || '') < (b.title || '')
      ? -1
      : 0;

  const sortByUpdated:
    | ((a: Partial<IScenario>, b: Partial<IScenario>) => number)
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
    oninit: () => scenarioSvc.loadList(),
    view: () => {
      const scenarios = (scenarioSvc.getList() || ([] as IScenario[]))
        .sort(sortByUpdated)
        .sort(sortByName);
      const filteredCareProviders =
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
            Auth.isAuthenticated
              ? m(FlatButton, {
                  label: 'New game',
                  iconName: 'add',
                  class: 'col s11 indigo darken-4 white-text',
                  style: 'margin: 1em;',
                  onclick: async () => {
                    const scenario = await scenarioSvc.save({
                      title: 'New game',
                      owner: [Auth.email],
                      published: false,
                    });
                    if (scenario) {
                      dashboardSvc.switchTo(Dashboards.EDIT, {
                        id: scenario.$loki,
                      });
                    }
                  },
                })
              : undefined,
          ]
        ),
        m(
          '.contentarea',
          filteredCareProviders.length > 0
            ? filteredCareProviders.map(scenario =>
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
                            .replace(':id', `${scenario.$loki}`),
                        },
                        scenario.title || 'Untitled'
                      ),
                      m('p.light.block-with-text', scenario.description),
                    ]),
                    m('.card-action', [
                      m(
                        'a',
                        {
                          target: '_blank',
                          style: 'margin-right: 0',
                          onclick: () => {
                            const csv = careProviderToCSV(scenario);
                            const blob = new Blob([csv], {
                              type: 'text/plain;charset=utf-8',
                            });
                            saveAs(blob, `${scenario.title}.csv`, {
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
                        scenario.dilemmas
                          ? `${scenario.dilemmas.length} dilemma${
                              scenario.dilemmas.length === 1 ? '' : 's'
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
