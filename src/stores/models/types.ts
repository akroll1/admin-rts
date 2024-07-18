import type {
    FightPropsEnum,
    JudgeType,
    Networks,
    RoundNote,
    SeasonType,
    UserFeedbackType,
    WeightClass,
} from "./enums";
  
export type AcceptCornerInvite = {
    id: string; // inviteId, used to delete invite.
    cornerId: string; // used to find Corner for update.
    displayName: string; // used for TeamMember info in Corner.
    sub: string;
};
  
export type DirtyRoundScoreUpdate = {
    scorecardId: string;
    f1: string;
    f2: string;
    round: number;
    f1Score: number;
    f2Score: number;
};
  
export type DistanceMetas = {
    id: string;
    judges?: Judge[] | null;
    props?: Props | null;
    syncs?: string | null;
    createdAt?: string;
    updatedAt?: string;
};
  
export type Fight = {
    isMainEvent: boolean;
    isTitleFight: boolean;
    officialResult: string | null;
    rounds: number;
    summary?: string;
    weightclass: WeightClass;
};
  
export type FightProps = {
    id: string
	fightProps: Record<FightPropsEnum, Record<string, string>>
	createdAt?: number
	updatedAt?: number
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
  
export type Manager = {
    id: string;
    chatKey: string | null;
    notes?: string | null;
    stageKey: string | null;
};
  
export type Message = Record<string, string>;
  
export type Props = {
    id: string; // distanceId.
    moneyline?: Record<string, string>[] | null;
    overUnder?: Record<string, Record<string, string>> | null;
    createdAt?: string;
    updatedAt?: string;
};
  
export type ResolveFightDistance = {
    fighter1: string;
    fighter2: string;
    fightId: string;
    resolution: string;
    rounds: number;
    f1Knockdowns: number;
    f2Knockdowns: number;
};
  
export type ResponseMessage = {
    status: number;
    message: string;
};
  
export type RoundScore = {
    isDirty?: boolean;
    note?: RoundNote;
    round: number;
    scores: Record<string, number>[];
};

export type ScorecardFinal = {
    finalScore?: number;
    prediction?: string;
    analysis?: string;
    createdAt?: string;
};

export type ScorecardMetas = {
    callingIt?: number; // will be 0 if not set.
    displayName?: string;
    isPH?: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export type Season = {
    seasonType: SeasonType;
};

export type Show = {
    location: string | null;
    network: Networks | null;
    promoter: string | null;
};

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

export type UserFeedback = {
    id?: string; // userId
    contact?: boolean;
    email?: string;
    can_recommend?: number;
    design_and_layout?: number;
    easy_to_understand?: number;
    entertaining?: number;
    will_use_again?: number;
    feedback?: string | null;
    subject?: string | null;
    requestMoreFightCoins?: boolean;
    type: UserFeedbackType;
};
