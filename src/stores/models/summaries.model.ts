import { 
    Corner,
    Distance,
    Fight,
    Fighter,
    Scorecard,
    Show,
} from "./index";
import {
    Status
} from '../enums'

export interface CornerSummary {
  id: string;
  corner: Corner;
  distanceSummary: DistanceSummary[];
  scorecards: Scorecard[];
}

export interface DistanceSummary {
  id: string;
  distance: Distance;
  showSummaries: ShowSummary[];
}

export interface ShowSummary {
  id: string;
  fightSummaries: FightSummary[];
  show: Show;
}

export interface FightSummary {
  id: string;
  fight: Fight;
  fighters: Fighter[];
}
