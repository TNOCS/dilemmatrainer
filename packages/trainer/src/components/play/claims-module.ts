/** Play the claims (vraagstukken) module */
import m, { Attributes, FactoryComponent } from 'mithril';
import { FlatButton, Icon } from 'mithril-materialized';
import { IAnsweredClaim, ISession } from '../../../../common/src';
import { IActions, IAppModel, UpdateStream } from '../../services/meiosis';
import { sessionSvc } from '../../services/session-service';
import { randomItem, range } from '../../utils/index';

export interface IClaimsModule extends Attributes {
  state: IAppModel;
  actions: IActions;
}

export const ClaimsModule: FactoryComponent<IClaimsModule> = () => {
  const saveSession = (updateSession: (s: ISession) => UpdateStream) => async (
    session: ISession
  ) => {
    updateSession(session);
    await sessionSvc.save(session);
  };

  return {
    view: ({
      attrs: {
        state: {
          session: { current: session },
          game: { current: game },
        },
        actions,
      },
    }) => {
      if (
        !session ||
        !game ||
        !game.claimsModule ||
        !game.claimsModule.claims ||
        game.claimsModule.claims.length === 0
      ) {
        return;
      }
      const { updateSession } = actions;
      const save = saveSession(updateSession);
      const { groups = [], claimsModule: { claims = [] } = {} } = game;
      const { answeredClaims = [] } = session;
      const answeredClaimsIds = answeredClaims.map(a => a.index);

      const nextId = () => {
        const ids = range(0, claims.length - 1).filter(
          n => answeredClaimsIds.indexOf(n) < 0
        );
        return randomItem(ids);
      };

      const nextClaim = () => {
        const id = nextId();
        if (id && activeClaim) {
          session.activeClaimIndex = id;
          const answeredClaim = {
            ...activeClaim,
            correct: false,
          } as IAnsweredClaim;
          answeredClaims.push(answeredClaim);
          session.answeredClaims = answeredClaims;
          save(session);
        }
      };

      const correctGroups = (id: string | string[]) => {
        const i = id instanceof Array ? id : [id];
        return groups.filter(g => i.indexOf(g.id) >= 0);
      };

      const activeClaimIndex = session.activeClaimIndex || nextId();
      if (activeClaimIndex && activeClaimIndex !== session.activeClaimIndex) {
        session.activeClaimIndex = activeClaimIndex;
        save(session);
      }
      const activeClaim = activeClaimIndex
        ? claims[activeClaimIndex]
        : undefined;
      const score = answeredClaims.reduce(
        (acc, cur) => acc + (cur.correct ? 1 : 0),
        0
      );
      const l = answeredClaims.length;
      return activeClaim
        ? [
            m('h5', 'Active claim'),
            m('p', [m('strong', 'Claim: '), activeClaim.title]),
            m('p', [
              m('strong', 'Responsibility of: '),
              correctGroups(activeClaim.groupId)
                .map(g => g.title)
                .join(', '),
            ]),
            m(
              'p',
              m(
                'strong',
                `Current score is ${score} of ${l}${
                  l ? ` (${Math.round((10 * score) / l) / 10})` : ''
                }. ${claims.length - l} claims left.`
              )
            ),
            m(
              '.row.buttons',
              m(FlatButton, {
                iconName: 'navigate_next',
                className: 'btn-large right',
                iconClass: 'large',
                onclick: nextClaim,
              })
            ),
            m('table.highlight', [
              m(
                'thead',
                m('tr', [m('th', 'ID'), m('th', 'TITLE'), m('th', 'CORRECT')])
              ),
              m(
                'tbody',
                answeredClaims.reverse().map((c, i) =>
                  m('tr', [
                    m('td', l - i),
                    m('td', c.title),
                    m(
                      'td',
                      m(Icon, {
                        iconName: c.correct
                          ? 'check_box'
                          : 'check_box_outline_blank',
                      })
                    ),
                  ])
                )
              ),
            ]),
            m('pre', JSON.stringify(activeClaim, null, 2)),
          ]
        : m(
            'p',
            `There are no more claims to answer. Your final score is ${score} of ${l}.`
          );
    },
  };
};
