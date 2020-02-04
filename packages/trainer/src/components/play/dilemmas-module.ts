/** Play the claims (vraagstukken) module */
import m, { Attributes, FactoryComponent } from 'mithril';
import { FlatButton, Icon } from 'mithril-materialized';
import {
  IAnsweredDilemma,
  ICharacteristic,
  IDilemma,
  ISession,
} from '../../../../common/src';
import { apiService } from '../../app';
import { IActions, IAppModel, UpdateStream } from '../../services/meiosis';
import { sessionSvc } from '../../services/session-service';
import { randomItem, range } from '../../utils/index';
import { DecisionTypeView } from '../ui/decision-type-view';

export const CharacteristicsView: FactoryComponent<{
  characteristics: ICharacteristic[];
  dilemma: IDilemma | IAnsweredDilemma;
}> = () => {
  const getValue = (c: ICharacteristic, id: string) => {
    const { values } = c;
    return values.filter(v => v.id === id).shift()?.title;
  };

  return {
    view: ({ attrs: { characteristics, dilemma } }) => {
      const { answeredValues } = dilemma as IAnsweredDilemma;
      console.table(characteristics);
      return m(
        'row',
        m(
          '.col.s12',
          m('table', [
            m(
              'thead',
              m('tr', [
                m('th', 'Type'),
                ...characteristics.map(c =>
                  m(
                    'th',
                    c.iconUrl && c.iconUrl.length > 0
                      ? m('img', {
                          height: '30px',
                          src: apiService() + c.iconUrl[0],
                          alt: c.title,
                        })
                      : c.title
                  )
                ),
              ])
            ),
            m('tbody', [
              m('tr', [
                m('td', 'Expected'),
                ...characteristics.map(c =>
                  m('td', getValue(c, dilemma.characteristics[c.id]))
                ),
              ]),
              answeredValues &&
                m('tr', [
                  m('td', 'Answered'),
                  ...characteristics.map(c =>
                    m('td', getValue(c, answeredValues[c.id]))
                  ),
                ]),
            ]),
          ])
        )
      );
    },
  };
};

export interface IDilemmasModule extends Attributes {
  state: IAppModel;
  actions: IActions;
}

export const DilemmasModule: FactoryComponent<IDilemmasModule> = () => {
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
        !game.dilemmasModule ||
        !game.dilemmasModule.dilemmas ||
        game.dilemmasModule.dilemmas.length === 0
      ) {
        return;
      }
      const { updateSession } = actions;
      const save = saveSession(updateSession);
      const {
        characteristics = [],
        dilemmasModule: { dilemmas = [] } = {},
      } = game;
      const { answeredDilemmas = [] } = session;
      const answeredDilemmasIds = answeredDilemmas.map(a => a.index);

      const nextId = () => {
        const ids = range(0, dilemmas.length - 1).filter(
          n => answeredDilemmasIds.indexOf(n) < 0
        );
        return randomItem(ids);
      };

      const nextDilemma = () => {
        const id = nextId();
        if (id && dilemma) {
          session.activeDilemmaIndex = id;
          const answeredDilemma = {
            ...dilemma,
            correct: false,
          } as IAnsweredDilemma;
          answeredDilemmas.push(answeredDilemma);
          session.answeredDilemmas = answeredDilemmas;
          save(session);
        }
      };

      const activeDilemmaIndex = session.activeDilemmaIndex || nextId();
      if (
        activeDilemmaIndex &&
        activeDilemmaIndex !== session.activeDilemmaIndex
      ) {
        session.activeDilemmaIndex = activeDilemmaIndex;
        save(session);
      }
      const dilemma = activeDilemmaIndex
        ? dilemmas[activeDilemmaIndex]
        : undefined;
      const score = answeredDilemmas.reduce(
        (acc, cur) => acc + (cur.correct ? 1 : 0),
        0
      );
      const l = answeredDilemmas.length;
      return dilemma
        ? [
            m('h5', 'Active dilemma'),
            m('p', [m('strong', 'Context: '), dilemma.description]),
            m('p', [m('strong', 'Dilemma: '), dilemma.title]),
            dilemma.notes && m('p', [m('strong', 'Notes: '), dilemma.notes]),
            m(CharacteristicsView, { characteristics, dilemma }),
            m(DecisionTypeView, { characteristics, dilemma }),
            m(
              'p',
              m(
                'strong',
                `Current score is ${score} of ${l}${
                  l ? ` (${Math.round((10 * score) / l) / 10})` : ''
                }. ${dilemmas.length - l} dilemmas left.`
              )
            ),
            m(
              '.row.buttons',
              m(FlatButton, {
                iconName: 'navigate_next',
                className: 'btn-large right',
                iconClass: 'large',
                onclick: nextDilemma,
              })
            ),
            m('table.highlight', [
              m(
                'thead',
                m('tr', [m('th', 'ID'), m('th', 'TITLE'), m('th', 'CORRECT')])
              ),
              m(
                'tbody',
                answeredDilemmas.reverse().map((c, i) =>
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
            m('pre', JSON.stringify(dilemma, null, 2)),
          ]
        : m(
            'p',
            `There are no more dilemmas to answer. Your final score is ${score} of ${l}.`
          );
    },
  };
};
