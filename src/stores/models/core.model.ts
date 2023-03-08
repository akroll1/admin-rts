import { DistanceType, Networks, SeasonType, Status, WeightClass } from "../enums";

export interface Corner {
  id: string;
  chatKey: string | null;
  cornerName: string;
  distanceIds: string[] | null;
  manager: string;
  notes: string | null;
  syncs: Syncs;
  team: string[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface Distance {
  id: string; // id is the same as the type ID's.
  instance: Season | Show | Fight;
  metas: Metas;
  status: Status;
  type: DistanceType;
}

export interface Metas {
  description: string | null;
  parent: string | null;
  storyline: string | null;
  subtitle: string | null;
  syncs: Syncs | null;
  title: string;
  typeIds: string[];
  starts: string;
  ends: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Syncs {
  chatkey?: string | null;
  video: boolean;
}

export interface Fight {
  isMainEvent: boolean;
  isTitleFight: boolean;
  officialResult: string | null;
  rounds: number;
  weightclass: WeightClass;
}

export interface Show {
  location: string | null;
  network: Networks | null;
  promoter: string | null;
}

export interface Season {
  type: SeasonType;
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

export interface Scorecard {
  scorecardId: string; // sub + fightId.
  cornerIds: string[];
  displayName?: string;
  distanceId: string;
  fightId: string;
  finalScore: number | null;
  ownerId: string;
  scores: Record<string, 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15>[];
  // 11 and 12 are for the rounds property.
  // 13, 14 and 15 are for 15 round fights.
}

export interface User {
  sub: string;
  bio?: string | null;
  email: string;
  fightCoins: number;
  firstName?: string | null;
  isPublic: boolean;
  lastName?: string | null;
  username: string;
  createdAt: string;
  updatedAt: string;
}
