import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m, { Component } from 'mithril';
import { state } from '../../global';

const hud: Component<{ done: string; }> = {
  view: ({ attrs: { done }}) => {
    return m('div', { id: 'hud' }, [
      m('div', { id: 'rightBar', class: 'row' }, [
        m('div', {
          id: 'helpButton',
          class: 'col s1 offset-s11',
          onclick: () => {
            state.showHelp = !state.showHelp;
          },
        }),
      ]),

      m('div', { id: 'arrowWrap', class: 'row' }, [
        m('div', {
          id: 'backArrow',
          class: 'col s1',
          onclick: back,
        }),
        done && m(m.route.Link, {
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
