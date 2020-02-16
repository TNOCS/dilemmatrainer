import m from 'mithril';
import marky from 'marky-markdown' ;
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import { state, gameSvc, sessionSvc } from './global';

import { Button, Collection, CollectionMode } from 'mithril-materialized';

let games: any = [];

const SELECTION = {
  oninit: () => {
    getGames();
  },
  view: () => {
    return m('div', { class: 'container' }, [
      m('div', { class: 'row' }, [
        // Collection doesn't work well with valign-wrapper
        JSON.stringify(state.roles) === JSON.stringify([])
          ? m(Collection, {
              header: 'Select a Scenario',
              class: 'col s6 offset-s3',
              mode: CollectionMode.LINKS,
              items: games.map(game => {
                return {
                  title: game.title,
                  onclick: setGame.bind(this, game),
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
                  content: marky(String(role.description)),
                  onclick: setRole,
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

function getGames() {
  gameSvc
    .loadList()
    .then(res => {
      games = res;
    })
    .catch(error => console.log(error));
}

function setGame(game) {
  clearSessions()
  state.claims = game.claimsModule.claims;
  state.groups = game.groups;
  state.dilemmas = game.dilemmasModule.dilemmas;
  state.charas = game.characteristics;
  state.scenarios = game.scenariosModule.scenarios;
  state.roles = game.roles;
}

function setRole(e) {
  state.userRole.id = e.id;
  state.userRole.title = e.title;
  state.userRole.description = e.content;

  m.route.set('module1');
}

function setSession(game){

}

export default SELECTION;
