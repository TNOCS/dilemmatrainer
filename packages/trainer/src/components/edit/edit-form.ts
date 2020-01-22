import M from 'materialize-css';
import m from 'mithril';
import { Button, Chips, ModalPanel } from 'mithril-materialized';
import { LayoutForm } from 'mithril-ui-form';
import { IGame } from '../../../../common/src';
import { gameSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { Auth } from '../../services/login-service';
import { gameFormGenerator } from '../../template/form';
import { capitalizeFirstLetter } from '../../utils';
import { CircularSpinner } from '../ui/preloader';

const close = async (e?: UIEvent) => {
  // log('closing...');
  m.route.set('/');
  if (e) {
    e.preventDefault();
  }
};

export const EditForm = () => {
  const state = {
    game: {} as Partial<IGame>,
    loaded: false,
    isValid: false,
    error: '',
    /** Relevant context for the Form, can be used with show/disabling */
    context: {
      admin: true,
    },
    canSave: false,
  };

  const onsubmit = async () => {
    // log('submitting...');
    state.canSave = false;
    const { game } = state;
    if (game) {
      await gameSvc.save(game);
      state.game = gameSvc.getCurrent();
    }
  };

  const formChanged = (scenario?: Partial<IGame>) => {
    state.canSave = true;
    console.log(JSON.stringify(scenario, null, 2));
  };

  return {
    oninit: () => {
      return new Promise(async (resolve, reject) => {
        const scenario = await gameSvc.load(m.route.param('id')).catch(r => reject(r));
        state.game = scenario || ({} as IGame);
        state.loaded = true;
        m.redraw();
        resolve();
      });
    },
    view: () => {
      const { game: scenario, context, loaded } = state;
      const form = gameFormGenerator(scenario);
      if (!loaded) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 20%;' });
      }
      const sections = form
        .filter(c => c.type === 'section')
        .map(c => ({
          style: 'cursor: pointer;',
          id: c.id,
          title: c.label || capitalizeFirstLetter(c.id),
        }));
      const section = m.route.param('section') || sections[0].id;
      const canCrud = Auth.canCRUD(scenario);

      return m('.row', [
        // m(
        //   '.col.s12.l3',
        m(
          'ul#slide-out.sidenav.sidenav-fixed',
          {
            oncreate: ({ dom }) => {
              M.Sidenav.init(dom);
            },
          },
          [
            m('h5.primary-text', { style: 'margin-left: 20px;' }, 'Game form'),
            ...sections.map(s =>
              m(
                'li',
                m(
                  m.route.Link,
                  { href: dashboardSvc.route(Dashboards.EDIT).replace(':id', `${scenario.$loki}?section=${s.id}`) },
                  m('span.primary-text', s.title)
                )
              )
            ),
            m('.buttons', [
              m(Button, {
                label: 'Show overview',
                iconName: 'visibility',
                className: 'right col s12',
                onclick: () => dashboardSvc.switchTo(Dashboards.READ, { id: scenario.$loki }),
              }),
              m(Button, {
                label: 'Save game',
                iconName: 'save',
                class: `green col s12 ${state.canSave ? '' : 'disabled'}`,
                onclick: async () => {
                  await onsubmit();
                },
              }),
              m(Button, {
                modalId: 'delete-scenario',
                label: 'Delete game',
                iconName: 'delete',
                class: 'red col s12',
              }),
            ]),
            Auth.isOwner(scenario)
              ? m(
                  'li',
                  m(
                    '.col.s12',
                    m(Chips, {
                      label: 'Owner(s)',
                      placeholder: '+username',
                      onchange: async chips => {
                        scenario.owner = chips.map(({ tag }) => tag);
                        if (scenario.owner.length === 0) {
                          M.toast({ html: 'There should be at least one owner.', classes: 'red' });
                          scenario.owner.push(Auth.email);
                        }
                        await onsubmit();
                      },
                      data: (scenario.owner || []).map(owner => ({ tag: owner })),
                    })
                  )
                )
              : undefined,
            canCrud
              ? m(
                  'li',
                  m(
                    '.col.s12',
                    m(Chips, {
                      label: 'Allow edits from',
                      placeholder: '+username',
                      onchange: async chips => {
                        scenario.canEdit = chips.map(({ tag }) => tag);
                        await onsubmit();
                      },
                      data: (scenario.canEdit || []).map(editor => ({ tag: editor })),
                    })
                  )
                )
              : undefined,
          ]
        ),
        // ),
        m('.contentarea', [
          m(LayoutForm, {
            key: section,
            form,
            obj: scenario,
            disabled: !canCrud,
            onchange: () => formChanged(scenario),
            context,
            section,
          }),
        ]),
        m(ModalPanel, {
          id: 'delete-scenario',
          title: 'Delete scenario',
          description: 'Are you certain you want to delete your scenario? This action cannot be undone!',
          options: { opacity: 0.7 },
          buttons: [
            {
              label: 'Verwijder',
              onclick: async () => {
                gameSvc.delete(scenario.$loki);
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
