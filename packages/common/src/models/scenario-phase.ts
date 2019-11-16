import { IContent } from './content';

export interface IScenarioPhase extends IContent {
  /** Link to external overlays or internal geojson (preferably the latter) */
  overlays?: string[];
}
