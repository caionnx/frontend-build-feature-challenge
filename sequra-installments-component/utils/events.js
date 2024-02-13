import { API_URL } from './constants';
export async function postEventData(debugMode, input) {
    const data = {
        context: input.context,
        type: input.type,
        selectedInstalment: input.agreement.instalment_count,
        agreementData: input.agreement,
    };
    if (debugMode) {
        console.log('[Debug Mode seQura]Posting event data: ', data);
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
    }
    catch (error) {
        console.log('seQura - failed post event');
    }
}
//# sourceMappingURL=events.js.map