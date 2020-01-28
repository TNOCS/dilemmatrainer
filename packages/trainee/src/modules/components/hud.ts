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
        
        vnode.attrs.done == '/selection'? null
        
        
        : null,
      ]),

      m('div', { id: 'arrowWrap' , class: 'row'}, [
        m('div', {
          id: 'backArrow',
          class: 'col s1',
          onclick: back,
        }),
        m(m.route.Link, {
          class: 'col offset-s11 s1',
          href: vnode.attrs.done,
          id: 'nextArrow',
        }),
      ]),

    ]);
  },
};

function back() {
  if (state.currentStep !== 0) {
    state.currentStep -= 1;
  }
  else{
    window.history.back();
  }
}

export default hud;
