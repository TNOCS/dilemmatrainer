import { IContent } from './content';

export interface ICharacteristic extends IContent {
  values: IContent[];
  iconUrl?: string[];
}
