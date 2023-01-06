import { FightPropsEnum } from "./enums"

export interface FightProps {
    fightId: string
	fightProps: Record<FightPropsEnum, Record<string, string>>
	createdAt?: number
	updatedAt?: number
}
