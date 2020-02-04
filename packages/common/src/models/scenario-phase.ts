import { IContent } from './content';
import { IDilemma } from './dilemma';

export interface IScenarioPhase extends IContent {
  dilemmas?: IDilemma[];
  mapUrl?: string;
  legendUrl?: string;

  /** Link to external overlays or internal geojson (preferably the latter) */
  overlays?: string[];
  long: number;
  lat: number;
}
