import { ICharacteristic } from './characteristic';
import { IClaim } from './claim';
import { IContent } from './content';
import { IDilemma } from './dilemma';
import { IRole } from './role';
import { ILokiObj } from './scenario';
import { IScenarioPhase } from './scenario-phase';
import { IWorkAgreement } from './work-agreement';

export interface IGame extends ILokiObj, IContent {
  /** Owner of the game */
  owner: string[];
  /** Editors of the game */
  canEdit: string[];
  /** Game is published publicly */
  published: boolean;
  /** Title of the game */
  title: string;
  /** Claims or 'vraagstukken' (module 1) */
  claims: IClaim[];
  /** Dilemmas (module 2) */
  dilemmas?: IDilemma[];
  /** Typical characteristics of a dilemma */
  characteristics?: ICharacteristic[];
  /** Roles in the game */
  roles: IRole[];
  /** Scenario phases */
  phases: IScenarioPhase[];
  /** Work agreements (module 3) */
  workAgreements?: IWorkAgreement[];
}
