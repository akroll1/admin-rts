import type {
  AnalyticType,
  DistanceType,
  Networks,
  SeasonType,
  Status,
  UserPickType,
  WeightClass,
} from "./enums";
import type { Manager, RoundScore, ScorecardMetas, TeamMember, UIMetas } from "./types";

export interface Analytic {
  id: string; // distance ID.
  analytics: Record<string, number>[];
  notes?: string | null;
  status?: Status;
  type: AnalyticType;
  createdAt?: string;
  updatedAt?: string;
}

export interface Corner {
  id: string; // manager.sub + <active season distanceId>
  cornerName: string;
  manager: Manager;
  team: TeamMember[];
  type: DistanceType;
  createdAt?: string;
  updatedAt?: string;
}

export interface Distance {
  id: string;
  instance: Season | Show | Fight;
  metas: UIMetas;
  status: Status;
  type: DistanceType;
}

export interface DistanceSummary {
  id: string;
  distance: Distance;
  summary: DistanceSummary[] | Fighter[];
  type: DistanceType;
  createdAt?: string;
}

export interface Fight {
  isMainEvent: boolean;
  isTitleFight: boolean;
  officialResult: string | null;
  rounds: number;
  weightclass: WeightClass;
}

export interface Fighter {
  id: string;
  firstName: string;
  home: string | null;
  lastName: string;
  profileImg?: string | null;
  ringname?: string | null;
  socials: string[] | null;
  wins: number;
  losses: number;
  draws: number;
  kos: number;
  dq: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Invite {
  id: string;
  cornerId: string; // <sub+activeSeason.id>
  cornerName: string;
  email: string;
  requestor: TeamMember;
  createdAt?: string;
}

export interface Scorecard {
  id: string; // sub+fightId.
  metas: ScorecardMetas;
  scores?: RoundScore[] | Scorecard[];
  seasonId: string;
  showId: string;
  type: DistanceType;
}

export interface Season {
  seasonType: SeasonType;
}

export interface Show {
  location: string | null;
  network: Networks | null;
  promoter: string | null;
}

export interface SwingsChart {
  id: string; // fight.id
  notes?: string | null;
  roundScores: Record<string, number>[];
  total: number;
  createdAt?: string;
}

export interface UISummary {
  id: string;
  description: string | null;
  isMainEvent?: boolean;
  isTitleFight?: boolean;
  location?: string | null;
  network?: Networks | null;
  officialResult?: string | null;
  parent: string | null;
  promoter?: string | null;
  rounds?: number;
  seasonType?: SeasonType;
  starts: string;
  ends?: string | null;
  status: Status;
  storyline?: string | null;
  subtitle?: string | null;
  summary: UISummary[] | Fighter[];
  title: string;
  type: DistanceType;
  typeIds: string[] | null;
  weightclass?: WeightClass;
  createdAt: string;
  updatedAt?: string;
}

export interface User {
  sub: string;
  bio?: string | null;
  email: string;
  fightCoins?: number;
  firstName?: string | null;
  image?: string | null;
  isPublic?: boolean;
  lastName?: string | null;
  location?: string | null;
  tagline?: string | null;
  username?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserCorner {
  id: string; // sub+seasonId.
  cornerIds: string[]; // subs now.
  createdAt?: string;
  updatedAt?: string;
}

export interface UserPick {
  id: string; // sub + someID
  comment?: string | null;
  list?: string[];
  score?: number;
  selected?: string;
  type: UserPickType;
  createdAt?: string;
  updatedAt?: string;
}
