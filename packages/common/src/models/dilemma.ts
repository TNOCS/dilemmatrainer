import { IContent } from './content';

export interface IDilemma extends IContent {
  /** Is the dilemma for this team: 100 is completely for the team, 0 is completely not for the team. */
  score?: number;
  shouldAccept: Boolean;
  /** Text to show why the team should/shouldn't have picked it up*/
  reason?: string;
  forRoles?: Array<{
    /** If the score is 100, it is 100% for this role. */
    score?: number;
    /** Role ID */
    roleId?: string;
    /** Role ID */
    roleTitle?: string;
    /** Description why it is for this role */
    description: string;
  }>;
}
