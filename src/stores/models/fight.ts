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

export enum Network {
	ESPN = 'ESPN',
	ESPNPLUS = 'ESPN+',
	HBO = 'HBO',
	HBOPPV = 'HBOPPV',
	DAZN = 'DAZN',
	SHOWTIME = 'SHOWTIME',
	SHOWTIMEPPV = 'SHOWTIMEPPV',
	FIGHTSYNC = 'FIGHTSYNC',
    FIGHTTV = 'FIGHTTV',
	NONE = 'NONE'
}

export enum FightStatus {
	ACTIVE = 'ACTIVE',
	CANCELED = 'CANCELED',
	COMPLETE = 'COMPLETE',
    FANTASY = 'FANTASY',
	PENDING = 'PENDING',
}

export enum WeightClass {
	HEAVYWEIGHT = 'HEAVYWEIGHT',
	CRUISERWEIGHT = 'CRUISERWEIGHT',
	LIGHTHEAVYWEIGHT = 'LIGHTHEAVYWEIGHT',
	SUPERMIDDLEWEIGHT = 'SUPERMIDDLEWEIGHT',
	MIDDLEWEIGHT = 'MIDDLEWEIGHT',
	SUPERWELTERWEIGHT = 'SUPERWELTERWEIGHT',
	WELTERWEIGHT = 'WELTERWEIGHT',
	SUPERLIGHTWEIGHT = 'SUPERLIGHTWEIGHT',
	LIGHTWEIGHT = 'LIGHTWEIGHT',
	SUPERFEATHERWEIGHT = 'SUPERFEATHERWEIGHT',
	FEATHERWEIGHT = 'FEATHERWEIGHT',
	SUPERBANTAMWEIGHT = 'SUPERBANTAMWEIGHT',
	BANTAMWEIGHT = 'BANTAMWEIGHT',
	SUPERFLYWEIGHT = 'SUPERFLYWEIGHT',
	FLYWEIGHT = 'FLYWEIGHT',
	JRFLYWEIGHT = 'JRFLYWEIGHT'
}