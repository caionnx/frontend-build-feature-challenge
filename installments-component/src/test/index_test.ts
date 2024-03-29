import {InstallmentsComponent} from '../index.js';

import {fixture, assert, expect} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import fetchMock from 'fetch-mock/esm/client.js';
import {mockForTesting} from '../utils/debug-response.js';

fetchMock.get('path:/credit_agreements', mockForTesting);
fetchMock.post('path:/events', {});

async function waitFor(ms = 500) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, ms)
  );
}

suite('installments-component', () => {
  test('is defined', () => {
    const el = document.createElement('installments-component');
    assert.instanceOf(el, InstallmentsComponent);
  });

  test('renders with with loading state', async () => {
    const el = await fixture(
      html`<installments-component totalWithTax="300"></installments-component>`
    );
    assert.shadowDom.equal(el, `<p>Loading installments for the product</p>`);
  });

  test('renders payments options in a select element', async () => {
    const el = await fixture(
      html`<installments-component totalWithTax="300"></installments-component>`
    );
    console.log(mockForTesting);
    await waitFor(500); // wait for finishing fetch of data

    await expect(el).shadowDom.to.equalSnapshot();
  });

  test('renders details modal', async () => {
    const el = (await fixture(
      html`<installments-component totalWithTax="300"></installments-component>`
    )) as InstallmentsComponent;
    await waitFor(500); // wait for finishing fetch of data
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;

    // expects that one event was posted to the API
    assert.equal(fetchMock.called('path:/events'), true);

    const modalShadow = el.shadowRoot!.querySelector(
      'installments-details-component'
    )!;

    await expect(modalShadow).shadowDom.to.equalSnapshot();
  });
});
