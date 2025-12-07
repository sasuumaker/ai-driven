export type FutureProspect = 'high' | 'medium' | 'low';

export interface Aptitudes {
  strengths: string[];
  workStyles: string[];
}

export interface AIJob {
  id: string;
  type: string;
  name: string;
  description: string;
  skills: string[];
  futureProspect: FutureProspect;
  futureProspectDescription: string;
  aptitudes: Aptitudes;
}

export interface JobsData {
  version: string;
  lastUpdated: string;
  jobs: Record<string, AIJob>;
}
