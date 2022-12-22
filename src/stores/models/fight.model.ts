import { FightStatus, Network, ShowStatus, WeightClass } from './enums'
import { Fighter, Show } from './index'

export interface Fight {
	fightId: string;
	fighterIds: string[];
	fightQuickTitle: string; 
	fightStatus: FightStatus;
	fightStoryline?: string | null;
	guestJudgeIds: string[] | null;
	isMainEvent: boolean;
	isTitleFight: boolean;
	officialResult: string | null;
	rounds: number;
	showId: string | null;
	weightclass: WeightClass;
	createdAt?: number;
	updatedAt?: number;
}

export type FightStatusesObj = {
    ACTIVE: FightSummary[]
    COMPLETE: FightSummary[]
    CANCELED: FightSummary[]
    FANTASY: FightSummary[]
    PENDING: FightSummary[]
}

export const fightSummaryStub = {
	fight: {
		fightId: '',
		fighterIds: [],
		fightQuickTitle: '',
		fightStatus: FightStatus.PENDING,
		fightStoryline: '',
		guestJudgeIds: null,
		isMainEvent: true,
		isTitleFight: true,
		odds: '',
		officialResult: null,
		rounds: 12,
		showId: '',
		weightclass: WeightClass.HEAVYWEIGHT,
	}, 
	fighters: [],
	show: {
		showId: '',
		fightIds: [],
		location: '',
		network: Network.SHOWTIME,
		promoter: '',
		showStoryline: '',
		showTime: 0,
		showName: '',
		showStatus: ShowStatus.UPCOMING,
		isFeatured: true,
	}
}
export interface FightSummary {
    fight: Fight,
    fighters: Fighter[],
    show: Show
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
	weightclass: WeightClass;
}

export interface FightUpdateOptions {
	fightId: string
	fightQuickTitle?: string; 
	fightStatus?: FightStatus;
	fightStoryline?: string | null;
	guestJudgeIds?: string[] | null;
	isMainEvent?: boolean;
	isTitleFight?: boolean;
	officialResult?: string | null;
	rounds?: number;
	showId?: string | null;
	weightclass?: WeightClass;
}
