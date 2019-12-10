import m from 'mithril';
import { IScenario } from '../../../common/dist';
import { RestService } from './rest-service';

class ScenarioService extends RestService<Partial<IScenario>> {
  constructor() {
    super('scenarios');
  }

  public async loadList(): Promise<Array<Partial<IScenario>> | undefined> {
    const result = await m.request<IScenario[]>({
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

export const scenarioSvc = new ScenarioService();
