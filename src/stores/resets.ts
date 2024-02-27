import { 
    Networks,
    Status,
    WeightClass,
} from "./enums"

export const blankScorecard = {
	scorecardId: "BLANK",
	corners: [],
	displayName: "",
	distanceId: "",
	id: "",
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
		id: '',
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
		weightclass: WeightClass.HEAVYWEIGHT,
	}, 
	fighters: [],
	show: {
		showId: '',
		fightIds: [],
		location: '',
		network: Networks.SHOWTIME,
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

export const signInErrorResets = {
	EMAIL: false,
	USERNAME: false,
	PASSWORD: false,
}

export const signinPageResets = {
    isSignin: false, 
    isSignup: false, 
    isForgotPassword: false, 
    isForcedPasswordChange: false, 
    isWaitingForCode: false,
    isWaitingForNewPasswordCode: false
}