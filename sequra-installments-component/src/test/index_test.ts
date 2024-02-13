import {SequraInstallmentsComponent} from '../index.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import fetchMock from 'fetch-mock/esm/client.js';
import mockData from '../utils/debug-response.js';

fetchMock.get('path:/credit_agreements', mockData);
fetchMock.post('path:/events', {});

async function waitFor(ms = 500) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, ms)
  );
}

suite('sequra-installments-component', () => {
  test('is defined', () => {
    const el = document.createElement('sequra-installments-component');
    assert.instanceOf(el, SequraInstallmentsComponent);
  });

  test('renders with with loading state', async () => {
    const el = await fixture(
      html`<sequra-installments-component
        totalWithTax="300"
      ></sequra-installments-component>`
    );
    assert.shadowDom.equal(el, `<p>Loading installments for the product</p>`);
  });

  test('renders payments options in a select element', async () => {
    const el = await fixture(
      html`<sequra-installments-component
        totalWithTax="300"
      ></sequra-installments-component>`
    );
    await waitFor(500); // wait for finishing fetch of data

    assert.shadowDom.equal(
      el,
      `
      <div>
        <p>Payment options:</p>
          <select id="sequra-installments">
            <option value="0">3 payments of 6,66 €</option>
            <option value="1">6 payments of 5,83 €</option>
          </select>
        <button>More info</button>
      </div>
      `
    );
  });
});
