import { IAnsweredClaim, IAnsweredDilemma, IContent, ILokiObj } from '.';

/** Game session */
export interface ISession extends ILokiObj, IContent {
  /** Is the game still running */
  active: boolean;
  /** ID of the game you want to play */
  gameId: number;
  /** Active module */
  activeModule: 'claims' | 'dilemmas' | 'workAgreements' | 'scenarios';
  /** Index of the claim that is currently active */
  activeClaimIndex: number;
  /** Results so far */
  answeredClaims: IAnsweredClaim[];
  /** Index of the dilemma that is currently active */
  activeDilemmaIndex: number;
  /** Results so far */
  answeredDilemmas: IAnsweredDilemma[];
  /** Index of the scenario that is currently active */
  activeScenarioPhaseIndex: number;
}
