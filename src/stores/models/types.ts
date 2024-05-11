import { DistanceType, FightPropsEnum, ModalsEnum, Networks, ReviewType, SeasonType, Status, WeightClass } from "./enums"

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

export type Chats = {
    cornerKey: string | null
    cornerToken: string | null
    showKey: string | null
    showToken: string | null
}

export type Corner = {
    id: string; // manager.sub + <active season distanceId>
    cornerName?: string;
    manager?: Manager;
    team?: TeamMember[];
    type?: DistanceType;
    createdAt?: string;
    updatedAt?: string;
}

export type CornerWithPicks = {
    corner: Corner | null;
    teamPicks: UserPick[];
};
  
export type CreatePoundList = {
    id: string;
    list: string[];
    type: "LIST";
    comment: string;
}

export type Distance = {
    id: string; 
    instance: Season | Show | Fight;
    metas: Metas;
    status: Status;
    type: DistanceType;
}

export type DistanceMetas = {
    id: string;
    officialJudges?: OfficialJudge[] | null;
    predictions?: string[] | null;
    props?: Props | null;
    syncs?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export type DistanceSummary = {
    id: string; // same as the base schema ID.
    distance: Distance;
    summary: DistanceSummary[] | Fighter[];
    type: DistanceType;
    createdAt?: string;
}

export type FightProps = {
    id: string
	fightProps: Record<FightPropsEnum, Record<string, string>>
	createdAt?: number
	updatedAt?: number
}

export type InviteAction = {
    inviteId: string 
    displayName: string 
    email: string
}

export type Manager = {
    id: string;
    chatKey?: string | null;
    displayName: string;
    notes?: string | null;
}

export interface Modals extends Record<ModalsEnum, boolean>{}

export type OfficialJudge = {
    id: string;
    bio?: string | null;
    firstName: string;
    lastName: string;
    tagline?: string | null;
    createdAt?: string;
    updatedAt?: string;
}  

export type Prediction = {
    id: string; // sub + distanceId, just like scorecard
    distanceId: string;
    prediction: string;
    createdAt: string;
    updatedAt: string;
}

export type Props = {
    id: string; // distanceId
    moneyline?: Record<string, string>[] | null;
    overUnder?: Record<string, Record<string, string>> | null;
    createdAt?: string;
    updatedAt?: string;
}

export type ResolveFightDistance = {
    fighter1: string;
    fighter2: string;
    fightId: string;
    resolution: string;
    rounds: number;
    f1Knockdowns: number;
    f2Knockdowns: number;
};

export type RoundScore = {
    [key: string]: string | number
}

export type ScorecardMetas = {
    analysis?: string | null;
    displayName: string | null;
    finalScore?: number | null;
    prediction?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export type ScoringType = DistanceType;

export type SeasonScorecardsSummary = {
    season: UISummary;
    scorecards: Scorecard[];
};

export type Syncs = {
    chatkey?: string | null;
    video: boolean;
}

export type TeamMember = {
    displayName: string;
    id: string;
    notes?: string | null;
};
  
export interface Toast {
    description?: string
    duration?: number
    isClosable?: boolean
    position?: "top" | "bottom"
    status?: "success" | "error" | "warning" | "info"
    title?: string
    variant?: "solid" | "subtle" | "left-accent" | "top-accent"
}

export type UserCorner = {
    id: string; // sub+seasonId.
    cornerIds: string[];
    createdAt?: string;
    updatedAt?: string;
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

export type Invite = {
    id: string;
    cornerId: string; // <sub+activeSeason.id>
    cornerName: string;
    email: string;
    requestor: TeamMember;
    createdAt?: string;
}

export type Metas = {
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
}

export type Review = {
	reviewId: string;
	likes: number;
	ownerId: string;
	rating: number;
	review: string;
    reviewType: ReviewType;
	showId: string;
	title: string;
	unlikes: number;
	username: string;
	createdAt?: string;
	updatedAt?: string;
}

export type RoundSwingsChart = {
    id: string
    notes?: string
    roundScores?: Record<string, number>[]
}

export type Scorecard = {
    id: string; // sub+distanceId.
    cornerIds?: string[] | null;
    metas: ScorecardMetas;
    parent: string; // seasonId.
    scores?: RoundScore[] | Scorecard[];
    season: string;
    type: DistanceType;
}

export type Season = {
    seasonType: SeasonType;
}

export type Show = {
    location: string | null;
    network: Networks | null;
    promoter: string | null;
}

export type UISummary = {
    id: string;
    fightSummaries?: UISummary[] | null;
    status: Status;
    type: DistanceType;
    description: string | null;
    parent: string | null;
    storyline?: string | null;
    subtitle?: string | null;
    summary: UISummary[] | Fighter[];
    title: string;
    typeIds: string[] | null;
    isMainEvent?: boolean;
    isTitleFight?: boolean;
    officialResult?: string | null;
    rounds?: number;
    weightclass?: WeightClass;
    location?: string | null;
    network?: Networks | null;
    promoter?: string | null;
    seasonType?: SeasonType;
    starts: string;
    ends?: string | null;
    createdAt: string;
    updatedAt?: string;
}
  
export interface User {
    sub?: string;
    accessToken?: string;
    idToken?: string;
    isAdmin?: boolean;
    isBetaA?: boolean;
    refreshToken?: string;
    bio?: string | null;
    email?: string;
    fightCoins?: number;
    firstName?: string | null;
    isPublic?: boolean;
    isLoggedIn?: boolean;
    lastName?: string | null;
    username?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type UserPick = {
    id: string; // sub + someID
    comment?: string | null;
    list?: string[];
    score: number;
    selected?: string;
    type: DistanceType;
    createdAt?: string;
    updatedAt?: string;
  }
  