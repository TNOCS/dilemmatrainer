import m from 'mithril';
import { Button, Icon } from 'mithril-materialized';
import background from '../../assets/dilemma_logo_black.svg';
import tno from '../../assets/logo_tno.png';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';

export const HomePage = () => ({
  view: () => [
    m('.row', [
      m('div', { style: 'margin: 0 0 0 45%' }, m(`img.img-repsonsive[src=${tno}][height=50]`)),
      m(
        'nav',
        m('.nav-wrapper', [
          m('h3.center.hide-on-small-only', { style: 'padding: 10px 0; margin: 0 auto;' }, 'Dilemma trainer'),
        ]),
        m(
          '.overlay.center',
          {
            style: 'position: relative; top: 300px;',
          },
          [
            m(Button, {
              className: 'btn-large',
              label: 'START',
              iconName: 'play_arrow',
              onclick: () => dashboardSvc.switchTo(Dashboards.SEARCH),
            }),
          ]
        )
      ),
      m('.row.center-align', { style: 'position: relative' }, m('img.img-repsonsive', { src: background, style: 'margin: 0 auto;' })),
      m(
        '.section.white',
        m('.row.container.center', [
          m('.row', [
            m(
              '.col.s12.m4',
              m('.icon-block', [
                m('.center', m(Icon, { iconName: 'search' })),
                m('h5.center', 'Feature 1'),
                m('p.light', 'Description'),
              ])
            ),
            m(
              '.col.s12.m4',
              m('.icon-block', [
                m('.center', m(Icon, { iconName: 'edit' })),
                m('h5.center', 'Feature 2'),
                m('p.light', 'Description'),
              ])
            ),
            m(
              '.col.s12.m4',
              m('.icon-block', [
                m('.center', m(Icon, { iconName: 'link' })),
                m('h5.center', 'Feature 3'),
                m('p.light', 'Description'),
              ])
            ),
          ]),
        ])
      ),
    ]),
    m(
      'footer.page-footer',
      { style: 'height: 60px; padding: 5px 0;' },
      m(
        '.container.center-align',
        m('.clearfix', [m('.white-text', 'Footer text'), m('span', '©2019 VWS, v0.1, Oktober 2019')])
      )
    ),
  ]
});
