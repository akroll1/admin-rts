import { FightPropsEnum } from "../enums"

export interface FightProps {
    id: string
	fightProps: Record<FightPropsEnum, Record<string, string>>
	createdAt?: number
	updatedAt?: number
}
