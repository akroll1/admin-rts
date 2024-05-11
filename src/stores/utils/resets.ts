import { 
	ModalsEnum,
    Networks,
    Status,
    WeightClass,
} from "../models/enums"

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

export const modalsReset = {
    ...Object.keys(ModalsEnum).reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
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