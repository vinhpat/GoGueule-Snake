export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration?: number;
}

export interface Position {
  x: number;
  y: number;
}
