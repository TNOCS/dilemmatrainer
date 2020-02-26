// import marked from 'marked';
import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';
import { Button, Collection, CollectionMode } from 'mithril-materialized';
import { IRole, ISession } from '../../common/src';
import { gameSvc, sessionSvc, state } from './global';

let sessions: Array<Partial<ISession>> = [];

const SELECTION = {
  oninit: () => getSessions(),
  view: () => {
    return m('div', { class: 'container' }, [
      m('div', { class: 'row' }, [
        // Collection doesn't work well with valign-wrapper
        JSON.stringify(state.roles) === JSON.stringify([])
          ? m(Collection, {
              header: 'Select a Scenario',
              class: 'col s6 offset-s3',
              mode: CollectionMode.LINKS,
              items: sessions.map(ses => {
                return {
                  title: ses.title,
                  onclick: () => setGame(ses),
                };
              }),
            })
          : m(Collection, {
              header: 'Select your role',
              class: 'col s6 offset-s3',
              mode: CollectionMode.AVATAR,
              items: state.roles.map(role => {
                return {
                  title: role.title,
                  id: role.id,
                  // content: marked.parse(String(role.description)),
                  onclick: () => setRole(role),
                };
              }),
            }),
      ]),
      m(
        'div',
        { class: 'row' },
        m(Button, {
          label: 'Back',
          onclick: () => (state.roles = []),
          class: 'col s1 offset-s3',
          style: 'background-color: #4E77A0',
        })
      ),
    ]);
  },
};

function getSessions() {
  sessionSvc
    .loadList()
    .then(res => {
      sessions = res.filter(s => s.active);
      console.log(res);
    })
    .catch(error => console.log(error));
}

const setGame = async (s: Partial<ISession>) => {
  if (s.gameId) {
    state.session = s;
    const game = await gameSvc.load(s.gameId);
    state.groups = game.groups;
    state.charas = game.characteristics;
    state.roles = game.roles;
    state.claims = game.claimsModule && game.claimsModule.show ? game.claimsModule.claims : [];
    state.dilemmas = game.dilemmasModule && game.dilemmasModule.show ? game.dilemmasModule.dilemmas : [];
    state.claimsModule = game.claimsModule;
    state.dilemmasModule = game.dilemmasModule;
    state.workAgreementsModule = game.workAgreementsModule;
    state.scenariosModule = game.scenariosModule;
    state.scenarios = game.scenariosModule && game.scenariosModule.show ? game.scenariosModule.scenarios : [];
  }
};

function setRole(e: IRole) {
  state.userRole.id = e.id;
  state.userRole.title = e.title;
  state.userRole.description = e.description;
  m.route.set('module1');
}

// function setSession(s: Partial<ISession>) {
//   // change depending on single/multiplayer
//   sessionSvc.clearAllSessions();
//   sessionSvc.create(new Object(session));
// }

export default SELECTION;
