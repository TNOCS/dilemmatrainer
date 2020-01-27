import m from 'mithril';
import { IGame } from '../../../common/src';
import { Dashboards, dashboardSvc } from './dashboard-service';
import { actions } from './meiosis';
import { RestService } from './rest-service';
import { socketSvc } from './socket-service';

class GameService extends RestService<IGame> {
  constructor() {
    super('games');
  }

  public async load(id?: number | string) {
    const loadedGame = await super.load(id);
    if (this.current && this.current.$loki) {
      socketSvc.off(`games/${this.current.$loki}`);
    }
    if (loadedGame) {
      actions.updateGame(loadedGame);
      socketSvc.on(`games/${loadedGame.$loki}`, (game?: IGame) => {
        if (game && game.meta?.updated !== this.current.meta?.updated) {
          this.current = game;
          actions.updateGame(game);
          M.toast({ html: 'Game updated' });
        } else if (!game) {
          this.current = {} as IGame;
          actions.updateGame({} as IGame);
          M.toast({ html: 'Game deleted' });
          dashboardSvc.switchTo(Dashboards.HOME);
        }
        m.redraw();
      });
    }
    return loadedGame;
  }

  public async loadList(): Promise<IGame[] | undefined> {
    const result = await m.request<IGame[]>({
      method: 'GET',
      url: this.baseUrl,
      withCredentials: this.withCredentials,
    });
    if (!result) {
      console.warn('No result found at ' + this.baseUrl);
    }
    this.setList(result || []);
    return this.list;
  }
}

export const gameSvc = new GameService();
