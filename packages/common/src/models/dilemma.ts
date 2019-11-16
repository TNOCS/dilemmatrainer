import { IContent } from './content';

export interface IDilemma extends IContent {
  /** Is the dilemma for this team: 100 is completely for the team, 0 is completely not for the team. */
  score?: number;
  /** Text to show as answer when the dilemma is for the team */
  forTeam?: string;
  /** Text to show as answer when the dilemma is not for the team */
  notForTeam?: string;
  /** Text to show as answer when the dilemma is not for the team */
  forRoles?: Array<{
    /** If the score is 100, it is 100% for this role. */
    score?: number;
    /** Role ID */
    roleId?: string;
    /** Description why it is for this role */
    description: string;
  }>;
  /** Each dilemma may have one or more characteristics, characterised by an ID and a valueId */
  characteristics: { [characteristicId: string]: string };
}
