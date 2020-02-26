/** Component to display scenario information */
import marked from 'marked';
import m, { Component } from 'mithril';
import { FlatButton } from 'mithril-materialized';
import { IScenarioPhase } from '../../../../common/src';
import { state } from '../../global';
import { gameSvc } from '../../services/game-service';

export const ScenarioInfo: Component<{ scenario: IScenarioPhase }> = {
  view: ({ attrs: { scenario } }) => {
    const baseUrl = gameSvc.trainerAPI.replace('/api', '');
    return m(
      '.container',
      m('.row', [
        m('h1', scenario.title),
        m('.col.s12.m6', [
          m(
            'p',
            m.trust(
              marked.parse(scenario.description.replace(/(#+)/g, '$1###'))
            )
          ),
        ]),
        m('.col.s12.m6', [
          scenario.mapUrl &&
            m('img.materialboxed[width=500]', {
              src: baseUrl + scenario.mapUrl,
            }),
          scenario.legendUrl &&
            m('img.materialboxed[width=500]', {
              src: baseUrl + scenario.legendUrl,
            }),
          m(FlatButton, {
            className: 'right',
            iconName: 'visibility_off',
            label: 'Hide',
            onclick: () => (state.showScenario = false),
          }),
        ]),
      ])
    );
  },
  oncreate: () => {
    const elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
  },
};
