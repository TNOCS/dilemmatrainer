/** Play the claims (vraagstukken) module */
import m, { Attributes, FactoryComponent } from 'mithril';
import { Form, LayoutForm } from 'mithril-ui-form';
import { ISession } from '../../../../common/src';
import { IActions, IAppModel, UpdateStream } from '../../services/meiosis';
import { sessionSvc } from '../../services/session-service';

export interface IWorkAgreementsModule extends Attributes {
  state: IAppModel;
  actions: IActions;
}

export const WorkAgreementsModule: FactoryComponent<IWorkAgreementsModule> = () => {
  const saveSession = (updateSession: (s: ISession) => UpdateStream) => async (
    session: ISession
  ) => {
    updateSession(session);
    await sessionSvc.save(session);
  };
  let canSave = false;

  const onchange = () => {
    canSave = true;
    // console.log(JSON.stringify(scenario, null, 2));
  };

  return {
    oninit: ({
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
        (session.workAgreements && session.workAgreements.length === 0)
      ) {
        return;
      }
      if (
        game?.workAgreementsModule?.workAgreements &&
        (!session.workAgreements || session.workAgreements.length === 0)
      ) {
        session.workAgreements = game.workAgreementsModule.workAgreements;
        saveSession(actions.updateSession)(session);
      }
    },
    view: ({
      attrs: {
        state: {
          session: { current: session },
          game: { current: game },
        },
        actions,
      },
    }) => {
      if (!session || !game) {
        return;
      }
      const { roles } = game;
      const { updateSession } = actions;
      const options = roles?.map(r => ({ id: r.id, label: r.title }));
      const save = saveSession(updateSession);
      if (canSave) {
        canSave = false;
        save(session);
      }

      return m(LayoutForm, {
        obj: session,
        form: [
          {
            id: 'workAgreements',
            type: [
              { id: 'id', autogenerate: 'id' },
              { id: 'title', type: 'text' },
              { id: 'description', type: 'textarea' },
              { id: 'roles', type: 'select', multiple: true, options },
            ] as Form,
            repeat: true,
            label: 'Add work agreement',
            filterLabel: 'title',
            pageSize: 1,
          },
        ] as Form,
        onchange,
      });
    },
  };
};
