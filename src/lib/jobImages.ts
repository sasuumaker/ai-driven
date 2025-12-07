// 職業タイプと画像ファイルのマッピング
export const jobImages: Record<string, string> = {
  // ENFJ
  'ENFJ-A': '/images/jobs/ai-comunity-manager.jpeg',
  'ENFJ-T': '/images/jobs/ai-comunity-manager.jpeg',

  // ENFP
  'ENFP-A': '/images/jobs/ai-creative-producer.jpeg',
  'ENFP-T': '/images/jobs/ai-writer-contentsplanner.jpeg',

  // ENTJ
  'ENTJ-A': '/images/jobs/ai-system-owner.jpeg',
  'ENTJ-T': '/images/jobs/ai-product-director.jpeg',

  // ENTP
  'ENTP-A': '/images/jobs/ai-growth-hacker.jpeg',
  'ENTP-T': '/images/jobs/ai-growth-hacker.jpeg',

  // ESFJ
  'ESFJ-A': '/images/jobs/ai-customer-success.jpeg',
  'ESFJ-T': '/images/jobs/ai-customer-success.jpeg',

  // ESFP
  'ESFP-A': '/images/jobs/ai-creative-producer.jpeg',
  'ESFP-T': '/images/jobs/ai-creative-producer.jpeg',

  // ESTJ
  'ESTJ-A': '/images/jobs/ai-operation-manager.jpeg',
  'ESTJ-T': '/images/jobs/ai-operation-manager.jpeg',

  // ESTP
  'ESTP-A': '/images/jobs/ai-growth-hacker.jpeg',
  'ESTP-T': '/images/jobs/ai-growth-hacker.jpeg',

  // INFJ
  'INFJ-A': '/images/jobs/ai-esixdesigner.jpeg',
  'INFJ-T': '/images/jobs/ai-experience-designer.jpeg',

  // INFP
  'INFP-A': '/images/jobs/ai-visual-designer.jpeg',
  'INFP-T': '/images/jobs/ai-writer-contentsplanner.jpeg',

  // INTJ
  'INTJ-A': '/images/jobs/ai-archetect.jpeg',
  'INTJ-T': '/images/jobs/ai-engeneer.jpeg',

  // INTP
  'INTP-A': '/images/jobs/ai-engeneer.jpeg',
  'INTP-T': '/images/jobs/prompt-engeneer.jpeg',

  // ISFJ
  'ISFJ-A': '/images/jobs/ai-knowledge-culator.jpeg',
  'ISFJ-T': '/images/jobs/ai-knowledge-culator.jpeg',

  // ISFP
  'ISFP-A': '/images/jobs/ai-visual-designer.jpeg',
  'ISFP-T': '/images/jobs/ai-visual-designer.jpeg',

  // ISTJ
  'ISTJ-A': '/images/jobs/ai-operation-manager.jpeg',
  'ISTJ-T': '/images/jobs/ai-operation-manager.jpeg',

  // ISTP
  'ISTP-A': '/images/jobs/ai-engeneer.jpeg',
  'ISTP-T': '/images/jobs/context-engineer.jpeg',
};

export function getJobImage(type: string): string | null {
  return jobImages[type] || null;
}
