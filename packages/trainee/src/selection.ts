import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import { state, sessionSvc } from './global';

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
                  content: role.description,
                  id: role.id,
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
  sessionSvc
    .loadList()
    .then(res => {
      games = res;
    })
    .catch(error => console.log(error));
}

function setGame(game) {
  console.log(game);
  state.claims = game.claims;
  state.dilemmas = game.dilemmas;
  state.phases = game.phases;
  state.roles = game.roles;
}

function setRole(e) {
  state.userRole.id = e.id;
  state.userRole.title = e.title;
  state.userRole.description = e.content;

  m.route.set('module1');
}

export default SELECTION;
