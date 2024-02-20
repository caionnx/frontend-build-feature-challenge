import {CreditAgreement} from '../types';
import {API_URL} from './constants';

type Input = {
  agreement: CreditAgreement;
  context: string;
  type: string;
};

type OutputEvent = {
  context: string;
  type: string;
  selectedInstalment: number;
  agreementData: CreditAgreement;
};

export async function postEventData(debugMode: boolean, input: Input) {
  const data: OutputEvent = {
    context: input.context,
    type: input.type,
    selectedInstalment: input.agreement.instalment_count,
    agreementData: input.agreement,
  };

  if (debugMode) {
    console.log('[Debug Mode]Posting event data: ', data);
    return;
  }

  try {
    await fetch(`${API_URL}/events`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log('failed post event');
  }
}
