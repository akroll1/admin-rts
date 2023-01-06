
export interface FightProps {
    fightId: string
	fightProps: Record<FightPropsEnum, Record<string, string>>
	createdAt?: number
	updatedAt?: number
}

export enum FightPropsEnum {
	MONEYLINE = "MONEYLINE",
    OU = "OU"
}