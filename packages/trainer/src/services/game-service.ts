import m from 'mithril';
import { IGame, stripSpaces } from '../../../common/src';
import { actions } from '../app';
import { AppState } from '../models/app-state';
import { ChannelNames } from '../models/channels';
import { Dashboards, dashboardSvc } from './dashboard-service';
import { RestService } from './rest-service';
import { socketSvc } from './socket-service';

class GameService extends RestService<IGame> {
  constructor() {
    super('games', ChannelNames.GAME);
  }

  public async load(id?: number | string) {
    const loadedGame = await super.load(id);
    if (this.current && this.current.$loki) {
      socketSvc.off(`games/${this.current.$loki}`);
    }
    if (loadedGame) {
      actions.refresh(loadedGame);
      socketSvc.on(`games/${loadedGame.$loki}`, (game?: IGame) => {
        if (game && game.meta?.updated !== this.current.meta?.updated) {
          this.current = game;
          actions.refresh(game);
          M.toast({ html: 'Game updated' });
        } else if (!game) {
          this.current = {} as IGame;
          actions.refresh({} as IGame);
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

  public async search(
    query: string
  ): Promise<Array<Partial<IGame>> | undefined> {
    const cleaned = stripSpaces(query).toLowerCase();
    if (cleaned.length <= 2) {
      this.setList(this.filteredList);
      m.redraw();
      return;
    }
    const q = {
      $or: [
        { target: { $contains: cleaned } },
        { 'locaties.target': { $contains: cleaned } },
      ],
    };
    // http://localhost:3000/zorgaanbieders?q={"target":{"$contains":"parn"}}
    // http://localhost:3000/zorgaanbieders?q={"locaties.target":{"$contains":"car"}}
    // http://localhost:3000/zorgaanbieders?q={"$or":[{"target":{"$contains":"car"}},{"locaties.target":{"$contains":"car"}}]}
    AppState.isSearching = true;
    const result = await m.request<IGame[]>({
      method: 'GET',
      url: this.baseUrl,
      params: { q: JSON.stringify(q) },
      withCredentials: this.withCredentials,
    });
    AppState.isSearching = false;
    if (!result) {
      console.warn('No result found at ' + this.baseUrl);
    }
    this.setList(result || []);
    return this.list;
  }

  // public async loadFilteredList(): Promise<Array<Partial<IScenario>> | undefined> {
  //   const filter = 'view?props=$loki,naam,kvk,locaties,owner,published,canEdit';
  //   // http://localhost:3000/events/view?props=name,cmFunctions,incidentType,eventType
  //   const result = await m.request<IScenario[]>({
  //     method: 'GET',
  //     url: this.baseUrl + filter,
  //     withCredentials: this.withCredentials,
  //   });
  //   if (!result) {
  //     console.warn('No result found at ' + this.baseUrl);
  //   }
  //   this.setList(result || []);
  //   return this.list;
  // }
}

export const gameSvc = new GameService();
