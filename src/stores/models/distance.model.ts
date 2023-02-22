import { DistanceType, Status } from "./enums";
import { FightSummary, Show } from "./index";

export interface Distance {
  distanceId: string;
  description: string | null;
  distanceName: string;
  distanceType: DistanceType;
  showIds: string[] | null;
  status: Status;
  storyline?: string | null;
  starts: string;
  ends: string | null; // if not a season type.
  createdAt?: string;
  updatedAt?: string;
}

export interface DistanceSummary {
  distance: Distance | null;
  shows: ShowSummary[] | null;
}

export interface ShowSummary {
  show: Show;
  fightSummaries: FightSummary[] | null;
}
