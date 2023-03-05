import { DistanceType } from "../enums";
import type {
  Corner,
  Distance, 
  Fight, 
  Fighter,
  Season,
  Show,
} from "./index";

export interface Summary {
  id: string;
  distance: Distance | Corner;
  instance: Corner | Season | Show | Fight;
  summary:
    | DistanceSummary[]
    | ShowSummary[]
    | FightSummary[]
    | FightSummary[]
    | Fighter[];
  type: DistanceType;
  createdAt?: string;
  updatedAt?: string;
}

export interface CornerSummary {
  id: string;
  distance: Corner;
  instance: Corner;
  summary: DistanceSummary[];
  type: DistanceType;
  createdAt?: string;
  updatedAt?: string;
}

export interface DistanceSummary {
  id: string;
  distance: Distance;
  instance: Season | Show;
  summary: ShowSummary[] | FightSummary[];
  type: DistanceType;
  createdAt?: string;
  updatedAt?: string;
}

export interface ShowSummary {
  id: string;
  distance: Distance;
  instance: Show;
  summary: FightSummary[];
  type: DistanceType;
  createdAt?: string;
  updatedAt?: string;
}

export interface FightSummary {
  id: string;
  distance: Distance;
  instance: Fight;
  summary: Fighter[];
  type: DistanceType;
  createdAt?: string;
  updatedAt?: string;
}
