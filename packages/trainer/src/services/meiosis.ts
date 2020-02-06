import Stream from 'mithril/stream';
import { gameState, sessionState } from '.';
import { IGame, ISession } from '../../../common/src';
import { merge } from '../utils/mergerino';

/** Application state */
export const appStateMgmt = {
  initial: {
    app: {
      isSearching: false,
      searchQuery: '',
    },
  },
  actions: (us: UpdateStream) => {
    return {
      search: (isSearching: boolean, searchQuery?: string) =>
        us({ app: { isSearching, searchQuery } }),
    };
  },
};

export interface IAppModel {
  app: {
    isSearching?: boolean;
    searchQuery?: string;
  };
  game: {
    current: undefined | IGame;
  };
  session: {
    current: undefined | ISession;
  };
}

export interface IActions {
  updateGame: (g: IGame) => UpdateStream;
  loadGame: (id?: number) => Promise<void>;
  updateSession: (s: ISession) => UpdateStream;
}

export type ModelUpdateFunction =
  | Partial<IAppModel>
  | ((model: Partial<IAppModel>) => Partial<IAppModel>);
export type UpdateStream = Stream<ModelUpdateFunction>;

const app = {
  initial: Object.assign({}, appStateMgmt.initial, gameState.initial),
  actions: (us: UpdateStream) =>
    Object.assign({}, gameState.actions(us), sessionState.actions(us)) as IActions,
};

const update = Stream<ModelUpdateFunction>();
export const states = Stream.scan(merge, app.initial, update);
export const actions = app.actions(update);
