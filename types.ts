
export type Year = 'Terceiro Ano' | 'Quarto Ano';

export type AnswerType = 'S' | 'A' | 'V';

export interface Level {
  id: number;
  year: Year;
  sentence: string;
  boldWord: string;
  correctAnswer: AnswerType;
  answerType: 'Substantivo' | 'Adjetivo' | 'Verbo';
}
