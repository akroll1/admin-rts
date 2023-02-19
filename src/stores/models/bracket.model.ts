
export interface Bracket {
    bracketId: string;
    admin: string;
    bracketName: string;
    bracketNotes: string | null;
    chatKey: string | null;
    eventId: string;
    members: string[]; // each member scorecard sub + eventId,
    createdAt: string;
    updatedAt: string;
  }
  
  