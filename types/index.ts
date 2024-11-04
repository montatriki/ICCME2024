export interface PosterItem {
    id: string;
    pdfId: string;
    presenter: string;
    topic: string;
  }
  
  export interface ProgramItem {
    id: number;
    time: string;
    activity: string;
    posters: PosterItem[];
  }