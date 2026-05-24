import type { LeadAnswers } from './types';

export function isQualified(a: Pick<LeadAnswers, 'budget' | 'setup'>): boolean {
  return a.budget !== '0-2k' && a.setup === 'yes';
}
