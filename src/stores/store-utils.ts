import { Fight } from './models'

export const filterFights = (fetchedFights: Fight[]): any => {

    const upcoming: Fight[] = fetchedFights.filter( fight => fight.fightStatus === 'PENDING').reverse();
    const recent: Fight[] = fetchedFights.filter( fight => fight.fightStatus === 'COMPLETE');
    return ({
        upcoming, 
        recent,
    })
}