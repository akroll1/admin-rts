import { FighterOptions } from "./fighter.model"

export interface PanelSummary {
    fightQuickTitle: string
    fighters: FighterOptions[]
    panelId: string
    rounds: number
}
