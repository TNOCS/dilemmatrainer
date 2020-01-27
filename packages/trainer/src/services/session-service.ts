import m from 'mithril';
import { ISession } from '../../../common/src';
import { Dashboards, dashboardSvc } from './dashboard-service';
import { actions } from './meiosis';
import { RestService } from './rest-service';
import { socketSvc } from './socket-service';

class SessionService extends RestService<ISession> {
  constructor() {
    super('games');
  }

  public async load(id?: number | string) {
    const loadedSession = await super.load(id);
    if (this.current && this.current.$loki) {
      socketSvc.off(`games/${this.current.$loki}`);
    }
    if (loadedSession) {
      actions.updateSession(loadedSession);
      socketSvc.on(`games/${loadedSession.$loki}`, (game?: ISession) => {
        if (game && game.meta?.updated !== this.current.meta?.updated) {
          this.current = game;
          actions.updateSession(game);
          M.toast({ html: 'Game updated' });
        } else if (!game) {
          this.current = {} as ISession;
          actions.updateSession({} as ISession);
          M.toast({ html: 'Game deleted' });
          dashboardSvc.switchTo(Dashboards.HOME);
        }
        m.redraw();
      });
    }
    return loadedSession;
  }

  public async loadList(): Promise<ISession[] | undefined> {
    const result = await m.request<ISession[]>({
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

export const sessionSvc = new SessionService();
