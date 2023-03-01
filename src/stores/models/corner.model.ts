export interface Corner {
    cornerId: string;
    manager: string;
    cornerName: string;
    cornerNotes: string | null;
    chatKey: string | null;
    distanceId: string;
    members: string[] | null; 
    createdAt: string;
    updatedAt: string;
    outstandingInvites?: number
  }
 