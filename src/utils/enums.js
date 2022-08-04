export const REVIEW_TYPE = {
    FANTASY: 'FANTASY',
    HISTORICAL: 'HISTORICAL',
    PREDICTION: 'PREDICTION',
    REVIEW: 'REVIEW'
};

export const ROUND_LENGTH_ENUMS = [3,4,6,8,10,12,15];

export const WEIGHTCLASS_ENUMS = [ 
	{value: 'HEAVYWEIGHT', label: 'Heavyweight'},
	{value: 'CRUISERWEIGHT', label: 'Cruiserweight'},
	{value: 'LIGHTHEAVYWEIGHT', label: 'Light Heavyweight'},
	{value: 'SUPERMIDDLEWEIGHT', label: 'Super Middleweight'},
	{value: 'MIDDLEWEIGHT', label: 'Middleweight'},
	{value: 'SUPERWELTERWEIGHT', label: 'Super Welterweight'},
	{value: 'WELTERWEIGHT', label:'Welterweight'},
	{value: 'SUPERLIGHTWEIGHT', label:'Super Lightweight'},
	{value: 'LIGHTWEIGHT', label:'Lightweight'},
	{value: 'SUPERFEATHERWEIGHT', label:'Super Featherweight'},
	{value: 'FEATHERWEIGHT', label:'Featherweight'},
	{value: 'SUPERBANTAMWEIGHT', label:'Super Bantamweight'},
	{value: 'BANTAMWEIGHT', label:'Bantamweight'},
	{value: 'SUPERFLYWEIGHT', label:'Super Flyweight'},
	{value: 'FLYWEIGHT', label:'Flyweight'},
	{value: 'JRFLYWEIGHT', label:'Jr. Flyweight'}
];

export const NETWORK_ENUMS = [
	{ value: 'ESPN', label: 'ESPN' },
	{ value: 'ESPN+', label: 'ESPN+' },
	{ value: 'HBO', label: 'HBO' },
	{ value: 'HBOPPV', label: 'HBOPPV' },
	{ value: 'DAZN', label: 'DAZN' },
	{ value: 'SHOWTIME',  label: 'SHOWTIME' },
	{ value: 'SHOWTIMEPPV', label: 'SHOWTIMEPPV' },
	{ value: 'FIGHTSYNC', label: 'FIGHTSYNC' },
	{ value: 'FIGHTTV', label: 'FIGHTTV' },
	{ value: 'NONE', label: 'NONE' }
];

export const FIGHT_SHOW_STATUS_ENUMS = [
	{ value: 'ACTIVE', label: 'ACTIVE' },
	{ value: 'CANCELED', label: 'CANCELED' },
	{ value: 'COMPLETED', label: 'COMPLETED' },
	{ value: 'FANTASY', label: 'FANTASY' },
	{ value: 'PENDING', label: 'PENDING' }
];

export const FIGHT_SHOW_STATUS_CONSTANTS = {
	ACTIVE: 'ACTIVE',
	CANCELED: 'CANCELED',
	COMPLETED: 'COMPLETED',
	FANTASY: 'FANTASY',
	PENDING: 'PENDING'
};
export const STATUS_CONSTANTS = {
	ACTIVE: 'ACTIVE',
	CANCELED: 'CANCELED',
	COMPLETED: 'COMPLETED',
	FANTASY: 'FANTASY',
	PENDING: 'PENDING',
};

export const OFFICIAL_RESULTS_ARRAY = [
    { value: 'UD', label: 'UD' },
    { value: 'MD', label: 'MD' },
    { value: 'MDD', label: 'MDD' },
    { value: 'SD', label: 'SD' },
    { value: 'SDD', label: 'SDD' },
    { value: 'DQ', label: 'DQ' },
    { value: 'DC', label: 'Decision' },
    { value: 'KO1', label: 'KO1' },
    { value: 'KO2', label: 'KO2' },
    { value: 'KO3', label: 'KO3' },
    { value: 'KO4', label: 'KO4' },
    { value: 'KO5', label: 'KO5' },
    { value: 'KO6', label: 'KO6' },
    { value: 'KO7', label: 'KO7' },
    { value: 'KO8', label: 'KO8' },
    { value: 'KO9', label: 'KO9' },
    { value: 'KO10', label: 'KO10' },
    { value: 'KO11', label: 'KO11' },
    { value: 'KO12', label: 'KO12' },
    { value: 'KO13', label: 'KO13' },
    { value: 'KO14', label: 'KO14' },
    { value: 'KO15', label: 'KO15' }
];

export const PANELIST_PREDICTIONS_OPTIONS = [
	{ value: 'DC', label: 'Decision' },
	{ value: 'KO13' , label: 'KO - Rds 1-3' },
	{ value: 'KO46' , label: 'KO - Rds 4-6' },
	{ value: 'KO79' , label: 'KO - Rds 7-9' },
	{ value: 'KO10' , label: 'KO - Rds 10-12' }
]