import { IContent, ILokiObj } from '.';

/** Game session */
export interface ISession extends ILokiObj, IContent {
  gameId: string;
  activeModule: number;
}
