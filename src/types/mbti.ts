export type Identity = 'A' | 'T';

export type MBTICode =
  | 'ENFJ' | 'ENFP' | 'ENTJ' | 'ENTP'
  | 'ESFJ' | 'ESFP' | 'ESTJ' | 'ESTP'
  | 'INFJ' | 'INFP' | 'INTJ' | 'INTP'
  | 'ISFJ' | 'ISFP' | 'ISTJ' | 'ISTP';

export type MBTIType = `${MBTICode}-${Identity}`;

export interface MBTITypeInfo {
  code: MBTICode;
  nickname: string;
  description: string;
  color: string;
}

export interface IdentityInfo {
  code: Identity;
  name: string;
  description: string;
}

export interface TypesData {
  version: string;
  types: Record<MBTICode, MBTITypeInfo>;
  identities: Record<Identity, IdentityInfo>;
}
