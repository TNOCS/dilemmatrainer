import { IContent } from '.';

/** Group or organisation that plays a role in the game */
export interface IGroup extends IContent {
  /** If true, it represents the main group with all the roles */
  isMain?: boolean;
  /** The main group is at level 0, the group directly below is at -1, the group directly above at +1 etc. */
  level?: number;
}
