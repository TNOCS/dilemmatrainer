import { IAnsweredClaim, IAnsweredDilemma, IContent, ILokiObj } from '.';
import { IWorkAgreement } from './work-agreement';

/** Game session */
export interface ISession extends ILokiObj, IContent {
  /** Is the game still running */
  active: boolean;
  /** ID of the game you want to play */
  gameId: number;
  /** Active module */
  activeModule: 'claims' | 'dilemmas' | 'workAgreements' | 'scenarios';
  /** Index of the claim/dilemma/scenario that is currently active */
  activeStepIndex: number;
  /** Results so far */
  answeredClaims: IAnsweredClaim[];
  /** Finally made work agreements */
  workAgreements: IWorkAgreement[];
  /** Results so far */
  answeredDilemmas: IAnsweredDilemma[];
  /** Index of the dilemma in the scenario that is currently active */
  activeScenarioDilemmaIndex: { [activeStepIndex: number]: number };
}
