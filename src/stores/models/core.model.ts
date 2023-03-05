import { DistanceType, Networks, SeasonType, Status, WeightClass } from "../enums";

export interface Corner {
    id: string;
    chatKey: string | null;
    cornerName: string;
    distanceIds: string[] | null;
    manager: string;
    notes: string | null;
    team: string[] | null;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Distance {
    id: string;
    chatKey: string | null;
    description: string | null;
    distanceIds: string[] | null; // IF Season | Show, distanceIds are Show, distanceId is Fight.
    distanceName: string;
    distanceType: DistanceType;
    status: Status;
    starts: string;
    ends: string | null; // if not a season type.
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Fight {
    id: string;
    fighterIds: string[];
    isMainEvent: boolean;
    isTitleFight: boolean;
    officialResult: string | null;
    parent: string | null;
    rounds: number;
    status: Status;
    weightclass: WeightClass;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Fighter {
    fighterId: string;
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
    scorecardId: string; // sub + id.
    cornerIds: string[];
    displayName?: string;
    distanceId: string;
    id: string;
    finalScore: number | null;
    ownerId: string;
    scores: Record<string, 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15>[];
}

export interface Season {
    id: string;
    type: SeasonType;
    createdAt: string;
    updatedAt: string;
}
  
  export interface Show {
    id: string;
    fightIds: string[] | null;
    location: string;
    network: Networks;
    promoter: string;
    createdAt?: string;
    updatedAt?: string;
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