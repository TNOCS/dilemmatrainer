import m from 'mithril';
import '../../css/module3.css';
import { sessionSvc, state } from '../global';
import help from './components/help';
import hud from './components/hud';

const updateSession = () => sessionSvc.update(state.session);

const MODULE3 = {
  oninit: () => {
    state.session.activeModule = 'workAgreements';
    state.session.activeStepIndex = 0;
    state.showHelp = true;
    updateSession();
  },
  view: () => {
    return m('div', { class: 'container' }, [
      m(hud, {
        done: state.scenariosModule.show ? '/module4' : '',
      }),
      m(interaction),
    ]);
  },
};

const interaction = {
  view: () => {
    return m('div', { class: 'interactionArea' }, [
      m(
        'div',
        { class: 'row' },
        state.showHelp
          ? m(help, {
              title: 'Title',
              desc: ['Discuss and enter 3 work agreements.'],
            })
          : [
              m('div', { class: 'agreements col s8 offset-s2' }, [
                m(
                  'div',
                  { class: 'row textareaWrap' },
                  m('textarea', { class: 'col s10 offset-s1', maxlength: 200 })
                ),
                m(
                  'div',
                  { class: 'row textareaWrap' },
                  m('textarea', { class: 'col s10 offset-s1', maxlength: 200 })
                ),
                m(
                  'div',
                  { class: 'row textareaWrap' },
                  m('textarea', { class: 'col s10 offset-s1', maxlength: 200 })
                ),
              ]),
            ]
      ),
    ]);
  },
};

export default MODULE3;
