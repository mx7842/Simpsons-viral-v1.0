export enum AppStep {
  IDLE = 'IDLE',
  LANGUAGE_SELECT = 'LANGUAGE_SELECT',
  TOPIC_INPUT = 'TOPIC_INPUT',
  GENERATING = 'GENERATING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export interface Headline {
  headline: string;
  translation: string;
  score: string;
}

export interface VideoDescription {
  copy: string;
  hashtags: string[];
}

export interface ScriptResponse {
  step1_script: string;
  step2_prompts: string[];
  step3_headlines: Headline[];
  step4_description: VideoDescription;
  step5_risk: string;
}

export type Language = 'Português' | 'Espanhol' | 'Inglês';