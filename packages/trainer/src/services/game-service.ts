import m from 'mithril';
import { IGame } from '../../../common/src';
import { Dashboards, dashboardSvc } from './dashboard-service';
import { actions } from './meiosis';
import { RestService } from './rest-service';
import { socketSvc } from './socket-service';

export const defaultRbtGame = (owner: string[]) =>
  ({
    title: 'Nieuwe RBT game',
    owner,
    published: false,
    groups: [
      { id: 'rbt', title: 'RBT', isMain: true },
      { id: 'ncc', title: 'NCC', level: 1 },
      { id: 'rot', title: 'ROT', level: -1 },
      { id: 'copi', title: 'COPI', level: -1 },
    ],
    roles: [
      { id: 'major', title: 'Burgemeester' },
      { id: 'dyke', title: 'Dijkgraaf' },
      { id: 'policeChief', title: 'Politiecommisaris' },
      { id: 'fireChief', title: 'Brandweercommandant' },
      { id: 'secretary', title: 'Secretaris' },
    ],
    characteristics: [
      {
        id: 'time',
        title: 'Hoge tijdsdruk',
        iconUrl: '/icons/hourglass.svg',
        values: [
          { id: 'yes', title: 'Ja' },
          { id: 'no', title: 'Nee' },
        ],
      },
      {
        id: 'uncertainty',
        title: 'Hoge onzekerheid',
        iconUrl: '/icons/uncertain.svg',
        values: [
          { id: 'yes', title: 'Ja' },
          { id: 'no', title: 'Nee' },
        ],
      },
      {
        id: 'conflicts',
        title: 'Tegenstrijdige belangen',
        iconUrl: '/icons/conflict.svg',
        values: [
          { id: 'yes', title: 'Ja' },
          { id: 'no', title: 'Nee' },
        ],
      },
    ],
  } as IGame);

class GameService extends RestService<IGame> {
  constructor() {
    super('games');
  }

  public async load(id?: number | string) {
    const loadedGame = await super.load(id);
    if (this.current && this.current.$loki) {
      socketSvc.off(`${this.urlFragment}/${this.current.$loki}`);
    }
    if (loadedGame) {
      actions.updateGame(loadedGame as IGame);
      socketSvc.on(
        `${this.urlFragment}/${loadedGame.$loki}`,
        (game?: IGame) => {
          if (game) {
            if (
              this.current.meta?.revision &&
              game.meta?.revision !== this.current.meta.revision + 1
            ) {
              M.toast({ html: 'Game updated' });
            }
            this.current = game;
            actions.updateGame(game);
          } else if (!game) {
            this.current = {} as IGame;
            actions.updateGame({} as IGame);
            M.toast({ html: 'Game deleted' });
            dashboardSvc.switchTo(Dashboards.HOME);
          }
          m.redraw();
        }
      );
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
    return this.list as IGame[];
  }
}

export const gameSvc = new GameService();
