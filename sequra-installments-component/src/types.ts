export type CreditAgreementValue = {
  value: number;
  string: string;
};

export type CreditAgreement = {
  instalment_count: number;
  apr: CreditAgreementValue;
  total_with_tax: CreditAgreementValue;
  cost_of_credit: CreditAgreementValue;
  cost_of_credit_pct: CreditAgreementValue;
  grand_total: CreditAgreementValue;
  max_financed_amount: CreditAgreementValue;
  instalment_amount: CreditAgreementValue;
  instalment_fee: CreditAgreementValue;
  instalment_total: CreditAgreementValue;
};
