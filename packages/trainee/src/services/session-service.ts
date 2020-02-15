import m from 'mithril';
import { ISession } from '../../../common/src';
import { RestService } from './rest-service';

class SessionService extends RestService<Partial<ISession>> {
  constructor() {
    super('session');
  }

  public async loadList(): Promise<Array<Partial<ISession>> | undefined> {
    const result = await m.request<ISession[]>({
      method: 'GET',
      url: this.baseUrl,
      withCredentials: this.withCredentials,
    });
    if (!result) {
      console.warn('No result found at ' + this.baseUrl);
    }
    console.log(result)
    this.setList(result || []);
    return this.list;
  }
}

export const sessionSvc = new SessionService();
