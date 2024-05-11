export enum ChatEnums {
  COACHES = "COACHES",
  CORNER = "CORNER",
  FSL = "FSL",
  CALLING_IT = "CALLING_IT",
}

export enum ChatMessageType {
  CALLING_IT = "CALLING_IT",
  CORNER = "CORNER",
  ERROR = "ERROR",
  FIGHT = "FIGHT",
  FSL = "FSL",
  GLOBAL = "GLOBAL",
  SCORE_UPDATE = "SCORE_UPDATE",
}

export enum ChatPermissions {
  SEND_MESSAGE = "SEND_MESSAGE",
  DELETE_MESSAGE = "DELETE_MESSAGE",
  DISCONNECT_USER = "DISCONNECT_USER",
}

export enum CookieSelectionEnum {
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED"
}

export enum DistanceType {
  FIGHT = "FIGHT",
  SHOW = "SHOW",
  SEASON = "SEASON",
}

export enum FightPropsEnum {
  MONEYLINE = "MONEYLINE",
    OU = "OU"
}


export enum ModalsEnum {
  SIGN_IN_MODAL = "SIGN_IN_MODAL",
}


export enum Networks {
  BLKPRIME = "BLKPRIME",
  DAZN = "DAZN",
  ESPN = "ESPN",
  ESPNPLUS = "ESPN+",
  FSL = "FSL",
  FIGHTTV = "FIGHT TV",
  FITETV = "FITE TV",
  HBO = "HBO",
  HBOPPV = "HBO PPV",
  PRIME = "PRIME",
  SHOWTIME = "ShowTime",
  SHOWTIMEPPV = "ShowTime PPV",
  NONE = "NONE",
}

export enum OfficialResults {
  CANCELED = "CANCELED",
  DECISION = "DECISION",
  DRAW = "DRAW",
  UD = "UD",
  MD = "MD",
  MDD = "MDD",
  SD = "SD",
  SDD = "SDD",
  DQ = "DQ",
  KO1 = "KO1",
  KO2 = "KO2",
  KO3 = "KO3",
  KO4 = "KO4",
  KO5 = "KO5",
  KO6 = "KO6",
  KO7 = "KO7",
  KO8 = "KO8",
  KO9 = "KO9",
  KO10 = "KO10",
  KO11 = "KO11",
  KO12 = "KO12",
  KO13 = "KO13",
  KO14 = "KO14",
  KO15 = "KO15",
  R12 = "R12",
  R11 = "R11",
  R10 = "R10",
  R9 = "R9",
  R8 = "R8",
  R7 = "R7",
}

export enum ReviewType {
  FANTASY = 'FANTASY',
  HISTORICAL = 'HISTORICAL',
  PREDICTION = 'PREDICTION',
  REVIEW = 'REVIEW',
}

export const ROUND_LENGTH_ENUMS = [3,4,6,8,10,12,15];

export enum ScoringNavGroupEnum {
  ANALYTICS = "ANALYTICS",
  BRACKETS = "BRACKETS",
  CHAT = "CHAT",
  FIGHT = "FIGHT",
  MONEYLINE = "MONEYLINE",
  PANELISTS = "PANELISTS",
  PROPS = "PROPS",
  ROUNDPROP = "ROUNDPROP",
}

export enum SeasonType {
  ANNUAL = "ANNUAL",
  MONTH = "MONTH",
  QUARTER = "QUARTER",
  FANTASY = "FANTASY",
  HISTORICAL = "HISTORICAL",
}

export enum SignInErrors {
  EMAIL = "EMAIL",
  USERNAME = "USERNAME",
  PASSWORD = "PASSWORD",
} 

export enum Status {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  COMPLETE = "COMPLETE",
  PENDING = "PENDING",
  TESTING = "TESTING",
}

export enum Tabs {
  INFO = "INFO",
  SCORING = "SCORING",
  ANALYTICS = "ANALYTICS",
  BRACKET = "BRACKET",
  FOLLOWING = "FOLLOWING",
  ALL = "ALL",
}

export enum Token {
  ID = "id_token",
  ACCESS = "access_token",
}

export enum WeightClass {
  HEAVYWEIGHT = "Heavyweight",
  CRUISERWEIGHT = "Cruiserweight",
  LIGHTHEAVYWEIGHT = "Light Heavyweight",
  SUPERMIDDLEWEIGHT = "Super Middleweight",
  MIDDLEWEIGHT = "Middleweight",
  SUPERWELTERWEIGHT = "Super Welterweight",
  WELTERWEIGHT = "Welterweight",
  JRWELTERWEIGHT = "Jr Welterweight",
  SUPERLIGHTWEIGHT = "Super Lightweight",
  LIGHTWEIGHT = "Lightweight",
  SUPERFEATHERWEIGHT = "Super Featherweight",
  FEATHERWEIGHT = "Featherweight",
  SUPERBANTAMWEIGHT = "Super Bantamweight",
  BANTAMWEIGHT = "Bantamweight",
  SUPERFLYWEIGHT = "Super Flyweight",
  FLYWEIGHT = "Flyweight",
  JRFLYWEIGHT = "Jr Flyweight",
  MINIMUMWEIGHT = "Minimumweight",
  STRAWWEIGHT = "Strawweight",
  CATCHWEIGHT = "Catchweight",
}

export const officialResultOptions = [
  "KO1",
  "KO2",
  "KO3",
  "KO4",
  "KO5",
  "KO6",
  "KO7",
  "KO8",
  "KO9",
  "KO10",
  "KO11",
  "KO12",
  "KO13",
  "KO14",
  "KO15",
  "10-0",
  "9-1",
  "8-2",
  "7-3",
  "6-4",
  "12-0", 
  "11-1", 
  "10-2", 
  "9-3", 
  "8-4", 
  "7-5", 
  "DRAW",
  "DQ",
  "NC",
]