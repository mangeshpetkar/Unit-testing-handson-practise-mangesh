import { html, fixture, expect } from '@open-wc/testing';
import { localize } from '@lion/localize';
import { Router } from '@vaadin/router';
import sinon from 'sinon';
import '../src/LoanEMIDetails/LoanEMIDetails.js';

describe('LoanEMIDetails Component', () => {
  let el;
  let routerGoSpy;

  beforeEach(async () => {
    localStorage.setItem('emi', JSON.stringify({
      interestRate: 5,
      monthlyEMI: 1000,
      principal: 50000,
      interest: 2000,
      totalAmount: 52000,
    }));

    routerGoSpy = sinon.spy(Router, 'go');

    el = await fixture(html`<loanemi-details></loanemi-details>`);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render EMI details correctly', async () => {
    await el.updateComplete;

    // Check if the rendered text contains the expected EMI details
    expect(el.shadowRoot.querySelector('h2').innerText).to.equal('EMI Details');
    expect(el.shadowRoot.querySelectorAll('p')[0].innerText).to.include('5 %');
    expect(el.shadowRoot.querySelectorAll('p')[1].innerText).to.include('1000');
    expect(el.shadowRoot.querySelectorAll('p')[2].innerText).to.include('50000');
    expect(el.shadowRoot.querySelectorAll('p')[3].innerText).to.include('2000');
    expect(el.shadowRoot.querySelectorAll('p')[4].innerText).to.include('52000');
  });

  it('should navigate to Basic Details when cancel button is clicked', async () => {
    const cancelButton = el.shadowRoot.querySelector('.cancel-btn');
    cancelButton.click();
    await el.updateComplete;
    expect(routerGoSpy.calledWith('/details')).to.be.true;
  });

  it('should navigate to Customer when continue button is clicked', async () => {
    const continueButton = el.shadowRoot.querySelector('.continue-btn');
    continueButton.click();
    await el.updateComplete;
    expect(routerGoSpy.calledWith('/customer')).to.be.true;
  });
});
