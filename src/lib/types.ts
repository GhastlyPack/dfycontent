export type Content = 'yes' | 'inconsistent' | 'no';
export type Issue = 'time' | 'ideas' | 'comfort' | 'editing';
export type Budget = '0-2k' | '2-5k' | '5-10k' | '10-20k' | '20k+';
export type Setup = 'yes' | 'no';

export type LeadContact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  socialHandle?: string;
};

export type LeadAnswers = {
  content: Content;
  issues: Issue[];
  budget: Budget;
  setup: Setup;
};
