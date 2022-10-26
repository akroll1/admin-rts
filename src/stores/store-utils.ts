import { Fight } from './models'

export const filterFights = (fights: Fight[]): any => {
    const upcoming: Fight[] = fights.filter( fight => fight.fightStatus === 'PENDING').reverse();
    const recent: Fight[] = fights.filter( fight => fight.fightStatus === 'COMPLETE');
    const canceled: Fight[] = fights.filter( fight => fight.fightStatus === 'CANCELED');
    return ({
        canceled,
        recent,
        upcoming, 
    })
}