import { IContent } from './content';

export interface IWorkAgreement extends IContent {
  /** Roles that have made this agreement, storing their IDs */
  roles: string[];
}
