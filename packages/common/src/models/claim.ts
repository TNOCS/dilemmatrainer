import { IContent } from './content';

export interface IClaim extends IContent {
  /** ID of the group that is responsible for it. May be multiple. */
  groupId: string | string[];
  /** Optional reason for assigning it to this group */
  reason?: string;
}
