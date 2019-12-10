import { ICharacteristic } from './characteristic';
import { IContent } from './content';
import { IDilemma } from './dilemma';
import { IRole } from './role';
import { IScenarioPhase } from './scenario-phase';
import { IWorkAgreement } from './work-agreement';
import { ILokiObj } from './scenario';

export interface ISession extends ILokiObj, IContent {
  owner: string[];
  canEdit: string[];
  published: boolean;
  dilemmas?: IDilemma[];
  characteristics?: ICharacteristic[];
  roles: IRole[];
  phases: IScenarioPhase[];
  workAgreements?: IWorkAgreement[];
}
