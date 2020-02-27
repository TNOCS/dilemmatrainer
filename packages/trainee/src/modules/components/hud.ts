import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m, { Component } from 'mithril';
import { FlatButton } from 'mithril-materialized';
import { state } from '../../global';

const hud: Component<{ done: string }> = {
  view: ({ attrs: { done } }) => {
    const hasScenario = !state.showHelp && ['dilemmas', 'scenarios'].indexOf(state.session.activeModule) >= 0;
    console.log(hasScenario);
    return m('div', { id: 'hud' }, [
      m('#rightBar.row', [
        m('#helpButton.col.s1.offset-s11', {
          onclick: () => {
            state.showHelp = !state.showHelp;
          },
        }),
        hasScenario && m(FlatButton, {
          id: 'showScenario',
          iconName: 'chrome_reader_mode',
          class: 'col s1 offset-s11',
          iconClass: 'medium',
          onclick: () => {
            state.showScenario = !state.showScenario;
          },
        }),
      ]),

      m('#arrawWrap.row', [
        m('#backArrow.col.s1', {
          onclick: back,
        }),
        done &&
          m(m.route.Link, {
            class: 'col offset-s10 s2',
            href: done,
            id: 'nextArrow',
          }),
      ]),
    ]);
  },
};

function back() {
  window.history.back();
}

export default hud;
