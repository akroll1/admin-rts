import { 
	Status,
	WeightclassEnum,
} from '../index'

export interface Fight {
	fightId: string;
	fighterIds: string[];
	fightQuickTitle: string; 
	fightStatus: Status;
	fightStoryline?: string | null;
	guestJudgeIds: string[] | null;
	isMainEvent: boolean;
	isTitleFight: boolean;
	officialResult: string | null;
	rounds: number;
	showId: string | null;
	weightclass: WeightclassEnum;
	createdAt?: number;
	updatedAt?: number;
}
export interface FightResolution {
    fighterUpdates: Record<string, string[]>[]
    fightId: string
    fightStatus: string
	officialResult: string
	showId: string
}

export interface FightPostObj {
	fighterIds: string[];
	fightQuickTitle: string; 
	fightStoryline?: string | null;
	isMainEvent: boolean;
	isTitleFight: boolean;
	rounds: number;
	weightclass: WeightclassEnum;
}

export interface FightUpdateOptions {
	fightId: string
	fightQuickTitle?: string; 
	fightStatus?: Status;
	fightStoryline?: string | null;
	guestJudgeIds?: string[] | null;
	isMainEvent?: boolean;
	isTitleFight?: boolean;
	officialResult?: string | null;
	rounds?: number;
	showId?: string | null;
	weightclass?: WeightclassEnum;
}
