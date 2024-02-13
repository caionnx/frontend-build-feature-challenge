import {CreditAgreement} from '../types';
type Input = {
  agreement: CreditAgreement;
  context: string;
  type: string;
};
export declare function postEventData(
  debugMode: boolean,
  input: Input
): Promise<void>;
export {};
//# sourceMappingURL=events.d.ts.map
