import { ICharacteristic } from './characteristic';
import { IContent } from './content';

export interface IDilemma extends IContent {
  /** Notes */
  notes?: string;
  /** Characteristics of this dilemma */
  characteristics: ICharacteristic[];
}
