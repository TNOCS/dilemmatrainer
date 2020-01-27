import { IContent } from './content';

export interface ICharacteristicValue extends IContent {
  iconUrl?: string;
}

export interface ICharacteristic extends IContent {
  values: ICharacteristicValue[];
}
