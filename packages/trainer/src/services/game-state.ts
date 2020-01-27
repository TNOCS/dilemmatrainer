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
    };
  },
};
