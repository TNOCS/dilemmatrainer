import m from 'mithril';
import { ISession } from '../../../common/src';
import { Dashboards, dashboardSvc } from './dashboard-service';
import { actions } from './meiosis';
import { RestService } from './rest-service';
import { socketSvc } from './socket-service';

class SessionService extends RestService<ISession> {
  constructor() {
    super('sessions');
  }

  public async load(id?: number | string) {
    const loadedSession = await super.load(id);
    if (this.current && this.current.$loki) {
      socketSvc.off(`${this.urlFragment}/${this.current.$loki}`);
    }
    if (loadedSession) {
      actions.updateSession(loadedSession);
      socketSvc.on(
        `${this.urlFragment}/${loadedSession.$loki}`,
        (session?: ISession) => {
          console.log(JSON.stringify(session, null, 2));
          if (session) {
            if (
              this.current.meta?.revision &&
              session.meta?.revision !== this.current.meta.revision + 1
            ) {
              M.toast({ html: 'Session updated' });
            }
            this.current = session;
            actions.updateSession(session);
          } else if (!session) {
            this.current = {} as ISession;
            actions.updateSession({} as ISession);
            M.toast({ html: 'Session deleted' });
            dashboardSvc.switchTo(Dashboards.SEARCH);
          }
          m.redraw();
        }
      );
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

  public async loadActiveSessions(): Promise<
    Array<Partial<ISession>> | undefined
  > {
    const filter = 'view?props=$loki,active,title';
    // http://localhost:3000/sessions/view?props=$loki,active
    const result = await m.request<ISession[]>({
      method: 'GET',
      url: this.baseUrl + filter,
      withCredentials: this.withCredentials,
    });
    if (!result) {
      console.warn('No result found at ' + this.baseUrl);
    }
    this.setList(result || []);
    return this.list;
  }
}

export const sessionSvc = new SessionService();
