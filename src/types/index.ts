export * from './quiz';
export * from './job';
export * from './mbti';

import { AIJob } from './job';
import { MBTITypeInfo, IdentityInfo } from './mbti';
import { AxisResult } from './quiz';

export interface DiagnosisResult {
  type: string;
  axisResults: AxisResult[];
  job: AIJob;
  typeInfo: MBTITypeInfo;
  identityInfo: IdentityInfo;
}
