import { ICharacteristic } from './characteristic';
import { IClaim } from './claim';
import { IContent } from './content';
import { IDilemma } from './dilemma';
import { IRole } from './role';
import { IScenarioPhase } from './scenario-phase';
import { IWorkAgreement } from './work-agreement';
import { IGroup } from './group';

export interface ILokiObj {
  $loki: number;
  meta: {
    created: number; // Date().getTime()
    revision: number;
    updated: number; // Date().getTime()
    version: number;
  };
}

export interface IGameModule extends IContent {
  /** Use the module in the game */
  show?: boolean;
}

export interface IClaimsModule {
  /** Claims or 'vraagstukken' (module 1) */
  claims: IClaim[];
}

export interface IDilemmasModule {
  /** Dilemmas (module 2) */
  dilemmas?: IDilemma[];
}

export interface IWorkAgreementsModule {
  /** Work agreements (module 3) */
  workAgreements?: IWorkAgreement[];
}

export interface IScenarioModule {
  /** Scenario phases (module 4) */
  scenarios: IScenarioPhase[];
}

export interface IGame extends ILokiObj, IContent {
  /** Owner of the game */
  owner: string[];
  /** Editors of the game */
  canEdit: string[];
  /** Game is published publicly */
  published: boolean;
  /** Typical characteristics of a dilemma */
  characteristics?: ICharacteristic[];
  /** Roles in the game */
  roles: IRole[];
  /** Groups or organisations in the game */
  groups: IGroup[];
  /** Claims, module 1 */
  claimsModule: IClaimsModule;
  /** Dilemmas, module 2 */
  dilemmasModule: IDilemmasModule;
  /** Work agreements, module 3 */
  workAgreementsModule: IWorkAgreementsModule;
  /** Scenarios, module 4 */
  scenariosModule: IScenarioModule;
}
