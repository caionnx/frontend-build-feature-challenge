var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let SequraInstallmentsDetailComponent = class SequraInstallmentsDetailComponent extends LitElement {
    constructor() {
        super(...arguments);
        this.agreement = null;
    }
    render() {
        return html ` <div class="modal-content">
      <button
        @click=${() => this.dispatchEvent(new CustomEvent('toggleDetails'))}
        class="close"
      >
        X
      </button>
      <div>seQura logo</div>
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
};
SequraInstallmentsDetailComponent.styles = css `
    :host {
      display: block;
      position: fixed;
      z-index: 1;
      padding-top: 100px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
      background-color: #fefefe;
      margin: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
    }

    .close {
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }
  `;
__decorate([
    property({ type: Object })
], SequraInstallmentsDetailComponent.prototype, "agreement", void 0);
SequraInstallmentsDetailComponent = __decorate([
    customElement('sequra-installments-details-component')
], SequraInstallmentsDetailComponent);
export { SequraInstallmentsDetailComponent };
//# sourceMappingURL=sequra-installments-details-component.js.map