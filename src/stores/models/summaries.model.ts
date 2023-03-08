import { DistanceType } from "../enums";
import type {
  Distance, 
  Fighter,
} from "./index";

export interface Summary {
  summary: SeasonSummary | ShowSummary[] | FightSummary[] | Fighter[];
}

export interface DistanceSummary {
  id: string;
  distance: Distance;
  summary: Summary;
  type: DistanceType;
}

// export interface CornerSummary {
//   id: string;
//   distance: Corner;
//   instance: Corner;
//   summary: DistanceSummary[];
//   type: DistanceType;
// }

export interface SeasonSummary {
  summary: ShowSummary[];
}

export interface ShowSummary {
  summary: FightSummary[];
}

export interface FightSummary {
  summary: Fighter[];
}
