import { Answer, AxisResult, Axis } from '@/types';

const AXIS_PAIRS: Record<Axis, [string, string]> = {
  EI: ['E', 'I'],
  SN: ['S', 'N'],
  TF: ['T', 'F'],
  JP: ['J', 'P'],
  AT: ['A', 'T'],
};

export function calculateAxisScore(answers: Answer[], axis: Axis): AxisResult {
  const axisAnswers = answers.filter((a) => a.axis === axis);
  const totalScore = axisAnswers.reduce((sum, a) => sum + a.value, 0);

  const maxScore = axisAnswers.length * 2;
  const normalizedScore = (totalScore + maxScore) / (maxScore * 2);
  const percentage = Math.round(normalizedScore * 100);

  const [first, second] = AXIS_PAIRS[axis];
  const primary = percentage >= 50 ? first : second;
  const secondary = percentage >= 50 ? second : first;

  return {
    axis,
    primary,
    secondary,
    percentage: percentage >= 50 ? percentage : 100 - percentage,
  };
}

export function calculateMBTIType(answers: Answer[]): {
  type: string;
  axisResults: AxisResult[];
} {
  const axes: Axis[] = ['EI', 'SN', 'TF', 'JP', 'AT'];
  const axisResults = axes.map((axis) => calculateAxisScore(answers, axis));

  const mbtiCode = axisResults
    .slice(0, 4)
    .map((r) => r.primary)
    .join('');

  const identity = axisResults[4].primary;
  const type = `${mbtiCode}-${identity}`;

  return { type, axisResults };
}

export function shuffleQuestions<T extends { axis: Axis }>(questions: T[]): T[] {
  const grouped: Record<Axis, T[]> = {
    EI: [],
    SN: [],
    TF: [],
    JP: [],
    AT: [],
  };

  questions.forEach((q) => {
    grouped[q.axis].push(q);
  });

  Object.keys(grouped).forEach((axis) => {
    grouped[axis as Axis] = shuffleArray(grouped[axis as Axis]);
  });

  const result: T[] = [];
  const maxLength = Math.max(...Object.values(grouped).map((g) => g.length));

  for (let i = 0; i < maxLength; i++) {
    const axes: Axis[] = ['EI', 'SN', 'TF', 'JP', 'AT'];
    const shuffledAxes = shuffleArray(axes);

    shuffledAxes.forEach((axis) => {
      if (grouped[axis][i]) {
        result.push(grouped[axis][i]);
      }
    });
  }

  return result;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
