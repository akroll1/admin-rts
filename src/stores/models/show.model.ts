import { 
	NetworkEnum, 
	Status 
} from "../enums"
import { ShowSummary } from "./summaries.model"

export interface Show {
	showId: string
	chatKey: string | null
	fightIds: string[]
	location: string
	network: NetworkEnum 
	promoter: string
	showStoryline: string
	showTime: number
	showName: string
	showStatus: Status
	isFeatured: boolean
	createdAt?: number
	updatedAt?: number
}

export type ShowsByStatus = Record<Status, ShowSummary[]>
