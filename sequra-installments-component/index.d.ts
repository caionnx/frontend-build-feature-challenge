import {LitElement} from 'lit';
import './sequra-installments-details-component';
export declare class SequraInstallmentsComponent extends LitElement {
  totalWithTax: string;
  debugMode: boolean;
  _showDetails: boolean;
  private _selectedAgreement;
  private _agreementsTask;
  render(): import('lit-html').TemplateResult<1> | undefined;
  private _toggleDetails;
  private _changeSelectedAgreement;
}
declare global {
  interface HTMLElementTagNameMap {
    'sequra-installments-component': SequraInstallmentsComponent;
  }
}
//# sourceMappingURL=index.d.ts.map
