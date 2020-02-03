import { ICharacteristic, IContent, ICorrect } from '.';

export interface IDilemma extends IContent {
  /** Notes */
  notes?: string;
  /** Characteristics of this dilemma */
  characteristics: ICharacteristic[];
}

export interface IAnsweredDilemma extends IDilemma, ICorrect {
  /** IDs of the answered characteristic values */
  answeredValues: string[];
}
