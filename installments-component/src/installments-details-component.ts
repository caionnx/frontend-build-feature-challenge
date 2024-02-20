import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {CreditAgreement} from './types';

function queryFirstFocusableElement(
  rootElement: HTMLElement | ShadowRoot | null
): HTMLElement | null | undefined {
  return rootElement?.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
}

@customElement('installments-details-component')
export class InstallmentsDetailComponent extends LitElement {
  static override styles = css`
    :host {
      background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
      display: block;
      font-family: arial, sans-serif;
      height: 100%;
      left: 0;
      overflow: auto;
      padding-top: 100px;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    .modal-content {
      background-color: #fefefe;
      border: 1px solid #888;
      margin: auto;
      padding: 20px;
      position: relative;
      width: 70%;
    }

    .close {
      background: none;
      border: 0;
      cursor: pointer;
      height: 1.5rem;
      margin: 0;
      padding: 0;
      position: absolute;
      right: 20px;
      width: 1.5rem;

      &:before,
      &:after {
        background: black;
        border-radius: 0.2rem;
        content: '';
        height: 0.2rem;
        left: 0;
        position: absolute;
        right: 0;
        top: calc((1.5rem - 0.2rem) / 2);
      }

      &:before {
        transform: rotate(45deg);
      }

      &:after {
        transform: rotate(-45deg);
      }

      span {
        display: block;
      }
    }
  `;

  @property({type: Object}) agreement: CreditAgreement | null = null;
  private _previouslyFocusedEl: HTMLElement | null | undefined = null;

  override async connectedCallback() {
    super.connectedCallback();

    // stores the previous selected element so when the modal is closed we can move the focus back where it was
    const activeElement = document.activeElement as HTMLElement;

    if (activeElement?.shadowRoot) {
      // this is necessary due to https://github.com/whatwg/html/issues/2071
      this._previouslyFocusedEl = queryFirstFocusableElement(
        activeElement?.shadowRoot
      );
    } else {
      this._previouslyFocusedEl = activeElement;
    }

    // after update and rendering is completed we move focus to the first focusable child element
    await this.updateComplete;

    const firstInnerFocusableEl = queryFirstFocusableElement(this.shadowRoot);

    firstInnerFocusableEl?.focus();
  }

  override async disconnectedCallback() {
    // when the modal closes we need to focus again on the previous focused element to mantain tab order of events
    this._previouslyFocusedEl?.focus();
  }

  override render() {
    return html` <div class="modal-content">
      <button
        @click=${() => this.dispatchEvent(new CustomEvent('toggleDetails'))}
        class="close"
        aria-label="Close details modal"
      ></button>
      <div>Company logo</div>
      <h2>About your payment option</h2>
      <ul>
        <li>Split your payment...</li>
        <li>Now you just pay...</li>
        <li>The rest of the payments...</li>
      </ul>
      <p>
        Additionally, the single monthly fee of
        ${this.agreement?.instalment_fee.string}/month is already included in
        the amount shown, so you will not have any surprises.
      </p>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'installments-details-component': InstallmentsDetailComponent;
  }
}
