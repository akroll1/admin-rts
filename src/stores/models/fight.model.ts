import { FightStatus, Network, WeightClass } from './enums'

export interface Fight {
	fightId: string;
	fighterIds: string[];
	fightQuickTitle: string; 
	fightStatus: FightStatus;
	fightStoryline?: string | null;
	guestJudgeIds: string[] | null;
	isMainEvent: boolean;
	isTitleFight: boolean;
	odds: string | null; 
	officialResult: string | null;
	rounds: number;
	showId: string | null;
	weightclass: WeightClass;
	createdAt: number;
	updatedAt: number;
}

interface SummaryFightOptions {
    fightStoryline: string;
    fightQuickTitle: string;
    odds: string;
    fightId: string;
}

interface SummaryFighterOptions {
    fighterId: string;
    firstName: string;
    lastName: string;
    ringname: string;
}

interface SummaryShowOptions {
    location: string;
    network: Network;
    promoter: string;
    showId: string;
    showTime: number;
}

export interface FightSummary {
    fight: SummaryFightOptions,
    fighters: SummaryFighterOptions[],
    show: SummaryShowOptions
}

export interface Fight {
	fightId: string;
	fighterIds: string[];
	fightQuickTitle: string; 
	fightStatus: FightStatus;
	fightStoryline?: string | null;
	guestJudgeIds: string[] | null;
	isMainEvent: boolean;
	isTitleFight: boolean;
	odds: string | null; 
	officialResult: string | null;
	rounds: number;
	showId: string | null;
	weightclass: WeightClass;
	createdAt: number;
	updatedAt: number;
}