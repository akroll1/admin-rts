import { FightPropsEnum } from "../enums";
import type { AnalyticType, CornerType, DistanceType, JudgeType, Networks, SeasonType, Status, UserPickType, WeightClass } from "./enums";

export interface Analytic {
  id: string; // distance ID.
  analytics: Record<string, number>[];
  notes?: string | null;
  status?: Status;
  type: AnalyticType;
  createdAt?: string;
  updatedAt?: string;
}

export type BlogPost = {
	blogId: string
	author: string // only authorId in the future.
	authorId: string
	body: string
	imgs: string[] | null
	published: boolean 
	subtitle: string | null
	summary: string | null
	title: string
	createdAt?: number
	updatedAt?: number
}

export type Corner = {
  id: string; // manager.sub + <active season distanceId>
  cornerName: string;
  manager: Manager;
  team: TeamMember[];
  type: DistanceType;
  createdAt?: string;
  updatedAt?: string;
}

export type Discussion = {
	discussionId?: string
	discussionTitle?: string
	discussionSubtitle?: string
	discussionSummary?: string
	discussionBody?: string
	discussionPics?: string[]
	ownerId: string
	createdAt?: string
	updatedAt?: string
}

export type Distance = {
  id: string;
  instance: Season | Show | Fight;
  metas: UIMetas;
  status: Status;
  type: DistanceType;
}

export type DistanceMetas = {
  id: string;
  judges?: Judge[] | null;
  predictions?: Prediction[] | null;
  props?: Props | null;
  syncs?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type DistanceSummary = {
  id: string;
  distance: Distance;
  summary: DistanceSummary[] | Fighter[];
  type: DistanceType;
  createdAt?: string;
}

export type Fight = {
  isMainEvent: boolean;
  isTitleFight: boolean;
  officialResult: string | null;
  rounds: number;
  weightclass: WeightClass;
}

export type Fighter = {
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


export type FightProps = {
  id: string
  fightProps: Record<FightPropsEnum, Record<string, string>>
  createdAt?: number
  updatedAt?: number
}

export type http = 'get' | 'post' | 'put' | 'delete'

export interface Invite {
  id: string;
  cornerId: string; // <sub+activeSeason.id>
  cornerName: string;
  email: string;
  requestor: TeamMember;
  createdAt?: string;
}


export type Judge = {
  id: string;
  bio?: string | null;
  firstName: string;
  lastName: string;
  tagline?: string | null;
  type: JudgeType;
  createdAt?: string;
  updatedAt?: string;
};

export interface List {
  ownerId: string
  comment: string | null
  list: string[]
  listType: string
  updatedAt?: string
}

export type Manager = {
  id: string;
  chatKey?: string | null;
  notes?: string | null;
};

export type Prediction = {
  id: string; // sub + fightIdd
  distanceId: string;
  prediction: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Props = {
  id: string; // distanceId.
  moneyline?: Record<string, string>[] | null;
  overUnder?: Record<string, Record<string, string>> | null;
  createdAt?: string;
  updatedAt?: string;
};

export type RoundScore = {
  isDirty?: boolean;
  notes?: string | null;
  round: number;
  scores: Record<string, number>[];
};

export type Scorecard = {
  id: string; // sub+fightId.
  metas: ScorecardMetas;
  scores?: RoundScore[] | Scorecard[];
  seasonId: string;
  showId: string;
  type: DistanceType;
}

export type ScorecardMetas = {
  analysis?: string | null;
  corners?: Corner[];
  displayName: string;
  finalScore?: number | null;
  prediction?: Prediction | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Season = {
  seasonType: SeasonType;
}

export type Show = {
  location: string | null;
  network: Networks | null;
  promoter: string | null;
}

export type ScoringType = CornerType | DistanceType;

export type SwingsChart = {
  id: string; // fight.id
  notes?: string | null;
  roundScores: Record<string, number>[];
  total: number;
  createdAt?: string;
}

export type Syncs = {
  chatkey?: string | null;
  video?: boolean;
};

export type TeamMember = {
  displayName: string;
  id: string;
  notes?: string | null;
};

export type UIMetas = {
  description: string | null;
  parent: string | null;
  storyline: string | null;
  subtitle: string | null;
  title: string;
  typeIds: string[];
  starts: string;
  ends: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UISummary = {
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

export type User = {
  sub?: string
  bio?: string | null
  email?: string
  fightCoins?: number
  firstName?: string | null;
  groups?: "admin" | "panelist" | "user"
  image?: string | null
  isPublic?: boolean
  lastName?: string | null
  location?: string | null
  tagline?: string | null
  username?: string
  createdAt?: number
  updatedAt?: number
}

export type UserCorner = {
  id: string; // sub+seasonId.
  cornerIds: string[]; // subs now.
  createdAt?: string;
  updatedAt?: string;
}

export type UserPick = {
  id: string; // sub + someID
  comment?: string | null;
  list?: string[];
  score?: number;
  selected?: string;
  type: UserPickType;
  createdAt?: string;
  updatedAt?: string;
}