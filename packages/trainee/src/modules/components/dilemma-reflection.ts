import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';

import { state } from '../../global';

const dilemmaReflection = {
  view: () => {
      const { dilemmas, currentDilemma } = state;
      const reflection = m('div', { class: 'row col offset-s1 s10', id: 'reflection' }, [
        m('div', { class: 'reflectionContent' }, [
            m('div', { class: 'row' }, [
                m('span', {class: 'reflectionLabel col s2'}, 'Dilemma:'),
                m('span', {class: 'reflectionData col s4'}, dilemmas[currentDilemma].title)
            ]),
            m('div', { class: 'row' }, [
                    m('span', {class: 'reflectionLabel col s2'}, 'Intended for:'),
                    m('span', {class: 'reflectionData col s4'}, 'get role name')
            ]),
            m('div', { class: 'row' }, [
              m('p', {id:'reflectionExpl'}, dilemmas[currentDilemma].reason), //change backend to make for/not for the same key as reason
            ])
          ]),
        m('div', { class: 'card-action row reflectActions', onclick: nextDilemma},  m(
          'a',
          {
            id: 'continue',
          },
          'CONTINUE'
        )),
        ]);

      return reflection;
  },
};

function nextDilemma(){
  state.currentDilemma += 1;
  state.reflecting = false;
}

export default dilemmaReflection;
