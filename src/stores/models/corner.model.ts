export interface Corner {
    cornerId: string;
    admin: string;
    cornerName: string;
    cornerNotes: string | null;
    chatKey: string | null;
    distanceId: string;
    members: string[]; // each member scorecard sub + eventId,
    createdAt: string;
    updatedAt: string;
  }
  