import {SequraInstallmentsComponent} from '../index.js';

import {fixture, assert, expect} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import fetchMock from 'fetch-mock/esm/client.js';
import mockData from '../utils/debug-response.js';

fetchMock.get('path:/credit_agreements', mockData);

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

    await expect(el).shadowDom.to.equalSnapshot();
  });

  test('renders details modal', async () => {
    const el = (await fixture(
      html`<sequra-installments-component
        totalWithTax="300"
      ></sequra-installments-component>`
    )) as SequraInstallmentsComponent;
    await waitFor(500); // wait for finishing fetch of data
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;

    const modalShadow = el.shadowRoot!.querySelector(
      'sequra-installments-details-component'
    )!;

    await expect(modalShadow).shadowDom.to.equalSnapshot();
  });
});
