import { 
    DistanceType,    
    Status,
} from '../index'

export interface Distance {
    distanceId: string;
    description: string | null;
    showIds: string[] | null;
    distanceName: string;
    distanceType: DistanceType;
    status: Status;
    storyline?: string | null;
    starts: string;
    ends: string | null; // if not a season type.
    createdAt?: string;
    updatedAt?: string;
}