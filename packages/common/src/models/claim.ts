import { IContent } from './content';

export interface ICorrect {
  /** Index of the answered item */
  index: number;
  /** Was the answer correct */
  correct: boolean;
}

export interface IClaim extends IContent {
  /** ID of the group that is responsible for it. May be multiple. */
  groupId: string | string[];
  /** Optional reason for assigning it to this group */
  reason?: string;
}

export interface IAnsweredClaim extends IClaim, ICorrect {
  /** The answer that was given */
  answeredGroupId: string;
}
