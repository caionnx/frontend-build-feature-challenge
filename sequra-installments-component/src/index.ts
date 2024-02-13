import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Task} from '@lit/task';
import type {CreditAgreement} from './types';
import debugResponse from './utils/debug-response';

import {API_URL} from './utils/constants';

@customElement('sequra-installments-component')
export class SequraInstallmentsComponent extends LitElement {
  @property() totalWithTax = '0';
  @property({type: Boolean}) debugMode = false;

  private _agreementsTask = new Task(this, {
    task: async ([totalWithTax], {signal}) => {
      if (this.debugMode) {
        const result = await Promise.resolve(debugResponse);

        return result;
      }

      const response = await fetch(
        `${API_URL}/credit_agreements?totalWithTax=${totalWithTax}`,
        {signal}
      );
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      const result = (await response.json()) as CreditAgreement[];

      return result;
    },
    args: () => [this.totalWithTax],
  });

  override render() {
    return this._agreementsTask.render({
      pending: () => html`<p>Loading installments for the product</p>`,
      complete: (agreements: CreditAgreement[]) => {
        if (!agreements.length) {
          return html`<p>
            Sorry we are unable to find an agreement for you. Try again in a few
            minutes.
          </p>`;
        }

        return html`
          <div>
            <p>Payment options:</p>
            <select
              id="sequra-installments"
            >
              ${agreements.map(
                (agreement, index) =>
                  html`<option value="${index}">
                    ${agreement.instalment_count} payments of ${agreement.instalment_total.string}
                  </option>`
              )}
            </select>
            <button>More info</button>
          </div>
        `;
      },
      error: (e) => html`<p>Failed to load data ${e}</p>`,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sequra-installments-component': SequraInstallmentsComponent;
  }
}
