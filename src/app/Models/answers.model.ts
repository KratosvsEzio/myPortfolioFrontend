export interface AnswerModel{
  question_detail: number;
  question_type: string;
  answers: {
    answer: string
  }[];
}
