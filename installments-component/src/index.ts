import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Task} from '@lit/task';
import type {CreditAgreement} from './types';
import debugResponse from './utils/debug-response';

import './installments-details-component';
import {postEventData} from './utils/events';
import {API_URL} from './utils/constants';

@customElement('installments-component')
export class InstallmentsComponent extends LitElement {
  static override styles = css`
    :host {
      border-radius: 3px !important;
      border: 1px solid black !important;
      display: block;
      font-family: arial, sans-serif;
      padding: 1.2rem 1rem;
    }
    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.85rem;
      padding: 0;
      text-decoration: none;
    }
    button:hover {
      text-decoration: underline;
    }
    select {
      font-size: 0.85rem;
      height: 2rem;
    }
    section {
      display: flex;
      flex-direction: column;
    }
    div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;

      p {
        font-size: 0.85rem;
        margin: 0;
      }
    }
  `;

  @property() totalWithTax = '0';
  @property({type: Boolean}) debugMode = false;
  @property() _showDetails = false;
  private _selectedAgreement: CreditAgreement | null = null;

  private _agreementsTask = new Task(this, {
    task: async ([totalWithTax], {signal}) => {
      if (this.debugMode) {
        const result = await Promise.resolve(debugResponse);

        this._selectedAgreement = result[0];

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

      this._selectedAgreement = result[0];

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
          <section>
            <div class="flex space-between">
              <p>Payment options:</p>
              <button @click=${this._toggleDetails}>More info</button>
            </div>
            <select @change=${this._changeSelectedAgreement} id="installments">
              ${agreements.map(
                (agreement, index) =>
                  html`<option value="${index}">
                    ${agreement.instalment_count} payments of
                    ${agreement.instalment_total.string}
                  </option>`
              )}
            </select>
            ${this._showDetails
              ? html`<installments-details-component
                  @toggleDetails=${this._toggleDetails}
                  .agreement=${this._selectedAgreement}
                ></installments-details-component>`
              : ''}
          </section>
        `;
      },
      error: (e) => html`<p>Failed to load data ${e}</p>`,
    });
  }

  private _toggleDetails() {
    if (this._selectedAgreement) {
      postEventData(this.debugMode, {
        context: 'checkoutWidget',
        type: this._showDetails
          ? 'simulatorInstallmentCloseDetails'
          : 'simulatorInstallmentOpenDetails',
        agreement: this._selectedAgreement,
      });
    }

    this._showDetails = !this._showDetails;
  }

  private _changeSelectedAgreement(e: Event) {
    const target = e?.target as HTMLSelectElement;
    const selectedIndex = parseInt(target?.value);

    if (
      this._agreementsTask.value &&
      this._agreementsTask.value[selectedIndex]
    ) {
      this._selectedAgreement = this._agreementsTask.value[selectedIndex];
    }

    if (this._selectedAgreement) {
      postEventData(this.debugMode, {
        context: 'checkoutWidget',
        type: 'simulatorInstalmentChanged',
        agreement: this._selectedAgreement,
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'installments-component': InstallmentsComponent;
  }
}
