import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';

import { state } from '../../global';

let forRoles: string[] = [];
let correct: boolean;

const dilemmaReflection = {
  oninit: () => {
    setReflection();
  },
  view: () => {
      const { dilemmas, currentDilemma } = state;
      const reasonColor = correct ? 'color: #379200;' : 'color: #920034;';

      const reflection = m('div', { class: 'row col offset-s1 s10', id: 'reflection' }, [
        m('div', { class: 'reflectionContent' }, [
            m('div', { class: 'row' }, [
                m('span', {class: 'reflectionLabel col s2'}, 'Dilemma:'),
                m('span', {class: 'reflectionData col s4'}, dilemmas[currentDilemma].title)
            ]),
            m('div', { class: 'row' }, [
                    m('span', {class: 'reflectionLabel col s2'}, 'Intended for:'),
                    forRoles.map( (title) => m('span', {class: 'reflectionData col s1'}, title))
            ]),
            m('div', { class: 'row' },
              m('p', {id:'reflectionExpl', style: reasonColor}, dilemmas[currentDilemma].reason)
            )
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
  forRoles = [];
  setReflection();
}

function setReflection(){
  const {dilemmas, currentDilemma, roles} = state;
  correct = (dilemmas[currentDilemma].accepted === dilemmas[currentDilemma].shouldAccept);

  if (dilemmas[currentDilemma].forRoles.length > 0) {
    roles.map((role) => {
      dilemmas[currentDilemma].forRoles.map((forRole) => {
        if (forRole.roleId === role.id) {
          forRoles.push(role.title);
        }
      });
    });
  } else{
    forRoles = (dilemmas[currentDilemma].shouldAccept === true) ?
        ['everyone'] : ['no one']
    }
}

export default dilemmaReflection;
