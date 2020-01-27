import { ISession } from '../../../common/src';
import { IAppModel, UpdateStream } from './meiosis';

export const sessionState = {
  initial: {
    session: {
      current: undefined as undefined | ISession,
    },
  } as IAppModel,
  actions: (us: UpdateStream) => {
    return {
      updateSession: (s: ISession) => us({ session: { current: s } }),
    };
  },
};
