import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';
import Stream from 'mithril/stream';
import { IGame } from '../../common/src';
import './css/style.css';
import { dashboardSvc } from './services/dashboard-service';
import { merge } from './utils/mergerino';

export type ModelUpdateFunction = IAppModel | ((model: IAppModel) => IAppModel);
export type UpdateStream = Stream<ModelUpdateFunction>;

export interface IAppModel {
  game: {
    current: undefined | IGame;
  };
}

const game = {
  initial: {
    game: {
      current: undefined as undefined | IGame,
    },
  } as IAppModel,
  actions: (us: UpdateStream) => {
    return {
      refresh: (g: IGame) => us({ game: { current: g } }),
    };
  },
};

const app = {
  initial: Object.assign({}, game.initial),
  actions: (us: UpdateStream) => Object.assign({}, game.actions(us)),
};

const update = Stream<ModelUpdateFunction>();
const states = Stream.scan(merge, app.initial, update);
export const actions = app.actions(update);

m.route(document.body, dashboardSvc.defaultRoute, dashboardSvc.routingTable(states, actions));
