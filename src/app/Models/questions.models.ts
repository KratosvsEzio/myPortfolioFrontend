export interface QuestionsModel {
  id: number;
  options: {
    optionA: string;
    optionB: string;
    optionC: string;
    optionD?: string;
    optionE?: string;
    optionF?: string;
    optionG?: string;
    optionH?: string;
    optionI?: string;
  }[];
  text: string;
  question_type: number;
  image: any;
  answer: number;
  difficulty_level?: number;
}
