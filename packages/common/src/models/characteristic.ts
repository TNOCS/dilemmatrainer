import { IContent } from './content';

export interface ICharacteristicValue extends IContent {
  id: string;
}

export interface ICharacteristic extends IContent {
  values: ICharacteristicValue[];
}
