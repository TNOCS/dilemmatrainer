import m from 'mithril';
import { IGame } from '../../../common/src';
import { RestService } from './rest-service';

class GameService extends RestService<Partial<IGame>> {
  constructor() {
    super('games');
  }

  public async loadList(): Promise<Array<Partial<IGame>> | undefined> {
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
