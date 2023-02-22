import { DistanceType, Status } from "./enums";
export interface Distance {
    distanceId: string;
    description: string | null;
    distanceName: string;
    distanceType: DistanceType;
    showIds: string[] | null;
    status: Status;
    storyline?: string | null;
    starts: string;
    ends: string | null; // if not a season type.
    createdAt?: string;
    updatedAt?: string;
  }