import { EventType, Status } from "./enums"

export interface Event {
  eventId: string;
  description: string | null;
  typeIds: string[] | null;
  eventName: string;
  eventType: EventType;
  status: Status;
  storyline?: string | null;
  starts: string;
  ends: string | null; // if not a season type.
  createdAt?: string;
  updatedAt?: string;
}
  