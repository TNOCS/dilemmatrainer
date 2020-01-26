import m, { FactoryComponent } from 'mithril';
import { FlatButton, InputCheckbox, TextInput } from 'mithril-materialized';
import { deepCopy } from 'mithril-ui-form';
import { IGame, stripSpaces } from '../../../../common/src';
import { gameSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { DisplayForm } from '../../services/display-form';
import { Auth } from '../../services/login-service';
import { CircularSpinner } from '../ui/preloader';

export const FormView: FactoryComponent = () => {
  const state = {
    filterValue: '',
    game: {} as IGame,
    loaded: false,
  };

  return {
    oninit: () => {
      return new Promise(async (resolve, reject) => {
        const event = await gameSvc.load(m.route.param('id')).catch(r => reject(r));
        state.game = event ? deepCopy(event) : ({} as IGame);
        state.loaded = true;
        resolve();
      });
    },
    view: () => {
      const { game, loaded, filterValue } = state;
      // console.log(JSON.stringify(careProvider, null, 2));
      if (!loaded) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 20%;' });
      }
      if (!game) {
        return undefined;
      }
      return m('.row', { style: 'margin-top: 1em;' }, [
        m(
          'ul#slide-out.sidenav.sidenav-fixed',
          {
            oncreate: ({ dom }) => {
              M.Sidenav.init(dom);
            },
          },
          [
            m('h4.primary-text', { style: 'margin-left: 0.5em;' }, 'Filter locaties'),
            m(TextInput, {
              label: 'Filter op adres, naam of nummer',
              id: 'filter',
              placeholder: 'Vestigings, adres',
              iconName: 'filter_list',
              onkeyup: (_: KeyboardEvent, v?: string) => (state.filterValue = v ? stripSpaces(v) : ''),
              style: 'margin-right:100px',
              className: 'col s12',
            }),
            // m(Select, {
            //   placeholder: 'Select one',
            //   label: 'Country',
            //   checkedId: countryFilter,
            //   options: countries,
            //   iconName: 'public',
            //   multiple: true,
            //   onchange: f => (state.countryFilter = f),
            //   className: 'col s12',
            // }),
            m(FlatButton, {
              label: 'Wis alle filters',
              iconName: 'clear_all',
              class: 'col s11',
              style: 'margin: 1em;',
              onclick: () => {
                state.filterValue = '';
              },
            }),
          ]
        ),
        m('.contentarea', [
          Auth.canEdit(game)
            ? m('ul.do-not-print', [
                m(
                  'li',
                  m(FlatButton, {
                    label: 'Edit game',
                    iconName: 'edit',
                    className: 'right hide-on-small-only',
                    onclick: () => dashboardSvc.switchTo(Dashboards.EDIT, { id: game.$loki }),
                  })
                ),
                m(
                  'li',
                  m(InputCheckbox, {
                    className: 'left margin-top7',
                    checked: game.published,
                    onchange: async checked => {
                      game.published = checked;
                      await gameSvc.save(game);
                    },
                    label: 'Publish game',
                  })
                ),
              ])
            : undefined,
          m(DisplayForm, { game, filterValue }),
        ]),
      ]);
    },
  };
};
