import { 
    NetworkEnum,
    Status,
    WeightclassEnum,
} from "./enums"
export const blankScorecard = {
	scorecardId: "BLANK",
	corners: [],
	displayName: "",
	distanceId: "",
	fightId: "",
	finalScore: 0,
	ownerId: "",
	scores: null,
}

export const blankScorecardWithCorners = {
	scorecard: blankScorecard,
	cornerIds: null,
}

export const fightSummaryStub = {
	fight: {
		fightId: '',
		fighterIds: [],
		fightQuickTitle: '',
		fightStatus: Status.PENDING,
		fightStoryline: '',
		guestJudgeIds: null,
		isMainEvent: true,
		isTitleFight: true,
		odds: '',
		officialResult: null,
		rounds: 12,
		showId: '',
		weightclass: WeightclassEnum.HEAVYWEIGHT,
	}, 
	fighters: [],
	show: {
		showId: '',
		fightIds: [],
		location: '',
		network: NetworkEnum.SHOWTIME,
		promoter: '',
		showStoryline: '',
		showTime: 0,
		showName: '',
		showStatus: Status.PENDING,
		isFeatured: true,
	}
}

export const resetModals = {
    ADD_MEMBER_MODAL: false,
    CREATE_GROUP_MODAL: false,
    EXPIRED_TOKEN_MODAL: false,
    FIGHT_REVIEW_FORM_MODAL: false,
    GUEST_JUDGE_MODAL: false,
    MONEYLINE_MODAL: false,
    PREDICTION_MODAL: false,
}
export const resetScoringNavGroups = {
    ANALYTICS: false,
    BRACKET: false,
    CHAT: false,
    FIGHT: false,
    MONEYLINE: false,
    PANELISTS: false,
    PROPS: false,
    ROUNDPROP: false,
}

export const resetTabs = {
    INFO: false,
    SCORING: false,
    ANALYTICS: false,
    BRACKET: false,
    FOLLOWING: false,
    ALL: false,
}
