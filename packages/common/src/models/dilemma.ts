import { ICharacteristic } from './characteristic';
import { IContent } from './content';

export interface IDilemma extends IContent {
  /** Reason for assigning these characteristics */
  reason?: string;
  /** Characteristics of this dilemma */
  characteristics: ICharacteristic[];
}
