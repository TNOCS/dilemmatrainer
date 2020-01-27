import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';

import { state } from '../../global';

const hud = {
  view: vnode => {
    return m('div', { id: 'hud' }, [

      m('div', {id: 'rightBar', class: 'row'}, [
        m('div', {
          id: 'helpButton',
          class: 'col s1 offset-s11',
          onclick: () => {
            state.showHelp = !state.showHelp;
          },
        }),
        m('div', {
          id: 'docButton',
          class: 'col s1 offset-s11',
        })
      ]),

      m('div', { id: 'arrowWrap' , class: 'row'}, [
        m('div', {
          id: 'backArrow',
          class: 'col s1',
          onclick: back,
        }),
        m('div', {
          class: 'col offset-s11 s1',
          href: vnode.attrs.done,
          id: 'nextArrow',
        }),
      ]),

    ]);
  },
};

/*
const hud = {
  view: vnode => {
    return m('div', { class: 'row', id: 'hud' }, [
      state.currentDilemma !== 0
        ? m('div', { class: 'col offset-s1 s1' }, [
            m(Button, {
              label: 'BACK',
              style: 'background-color: #4E77A0;',
              onclick: back,
            }),
          ])
        : m('div', { class: 'col offset-s1 s1' }, [
            m(Button, {
              label: 'BACK',
              style:
                'background-color: rgba(78, 119, 160, 0.733); box-shadow:none',
            }),
          ]),
      m('div', { class: 'col s1' }, [
        m(Button, {
          label: 'HELP',
          id: 'helpButton',
          style: 'background-color: #4E77A0;',
          onclick: () => {
            state.showHelp = !state.showHelp;
          },
        }),
      ]),
      m('div', { class: 'col offset-s7  s1' }, [
        m(Button, {
          label: 'DONE',
          href: vnode.attrs.done,
          style: 'background-color: #4E77A0;',
        }),
      ]),
    ]);
  },
};
*/

function back() {
  if (state.currentStep !== 0) {
    state.currentStep -= 1;
  }
}

export default hud;
