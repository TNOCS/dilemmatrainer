import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';

import { state } from '../../global';

let pages: string[] = [];
let currentPage: number = 0;
let currentPageText: string;
let helpCard: any;
let cardActions;

const help = {
  view: vnode => {
    pages = vnode.attrs.desc;
    currentPageText = pages[currentPage];

    const visP = pages.length > 2 && currentPage !== 0 ? 'visible' : 'hidden';
    const visN =
      pages.length > 2 && currentPage !== pages.length - 1 ? true : false;

    if (visN) {
      cardActions = [
        m(
          'a',
          {
            style: 'color:#4E77A0; visibility:' + visP + ';',
            onclick: prevPage,
          },
          'PREVIOUS'
        ),
        m(
          'a',
          {
            style: 'color:#4E77A0; float:right;',
            onclick: nextPage,
          },
          'NEXT'
        ),
      ];
    } else {
      cardActions = [
        m(
          'a',
          {
            style: 'color:#4E77A0; visibility:' + visP + ';',
            onclick: prevPage,
          },
          'PREVIOUS'
        ),
        m(
          'a',
          {
            style: 'color:#4E77A0; float:right;',
            onclick: e => {
              e.preventDefault();
              currentPage = 0;
              state.showHelp = false;
            },
          },
          'START'
        ),
      ];
    }

    if (!state.showHelp) {
      helpCard = null;
      currentPage = 0;
    } else {
      helpCard = m(
        'div',{ class: 'row valign-wrapper', id: 'help' },
        m('div', { class: 'card col s8 offset-s2' }, [
          m('div', { class: 'card-content' }, [
            m('h6', { class: 'card-title' }, vnode.attrs.title),
            m('p', currentPageText),
          ]),
          m('div', { class: 'card-action' }, cardActions),
        ])
      );
    }

    return helpCard;
  },
};

function nextPage(e) {
  e.preventDefault();
  currentPage += 1;
}

function prevPage(e) {
  e.preventDefault();
  currentPage -= 1;
}

export default help;
