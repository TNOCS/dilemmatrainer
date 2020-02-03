import m from 'mithril';
import { gameSvc } from '.';
import { IGame } from '../../../common/src';
import { IAppModel, UpdateStream } from './meiosis';

export const gameState = {
  initial: {
    game: {
      current: undefined as undefined | IGame,
    },
  } as IAppModel,
  actions: (us: UpdateStream) => {
    return {
      updateGame: (g: IGame) => us({ game: { current: g } }),
      loadGame: async (id?: number) => {
        id = id || +m.route.param('id');
        const current = await gameSvc.load(id) || {} as IGame;
        us({ game: { current } });
      },
    };
  },
};
