import { IContent } from './content';

export interface IClaim extends IContent {
  /** ID of the role that is responsible for it. May be multiple. */
  roleId: string | string[];
  /** Optional reason for assigning it to this role */
  reason?: string;
}
