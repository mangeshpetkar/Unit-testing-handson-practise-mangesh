import { html, fixture, expect } from '@open-wc/testing';
import { LocalizeMixin } from '@lion/localize';
import { Router } from '@vaadin/router';
import sinon from 'sinon';
import '../src/LoanBasicDetails/BasicDetails.js';

describe('BasicDetails', () => {
  let element;
  let routerStub;
  let localStorageStub;

  beforeEach(async () => {

    // clock = sinon.useFakeTimers();
    // Mock localStorage
    localStorageStub = {
      getItem: sinon.stub().returns('Personal Loan'),
      setItem: sinon.stub(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageStub,
      writable: true,
    });

    // Mock Router
    routerStub = sinon.stub(Router, 'go');

    // Mock fetch
    window.fetch = sinon.stub().resolves({
      json: () => Promise.resolve({ emi: 1000 }),
    });

    element = await fixture(html`<basic-details></basic-details>`);
  });

  afterEach(() => {
    sinon.restore(); // This restores all stubs
  });

  it('renders with default properties', () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
    expect(element.amount).to.equal(10000);
    expect(element.range).to.equal(2);
    expect(element.type).to.equal('Personal Loan');
  });

  it('displays loan type from localStorage', async () => {
    const typeInput = element.shadowRoot.querySelector('#type');
    expect(typeInput.value).to.equal('Personal Loan');
  });

  it('prevents submission when amount is below minimum', async () => {
    const amountInput = element.shadowRoot.querySelector('#amount');
    amountInput.value = '5000';
    
    const nextButton = element.shadowRoot.querySelector('.btn-next');
    nextButton.click();

    await element.updateComplete;
    
    // Verify that fetch wasn't called
    expect(window.fetch.called).to.be.false;
    // Verify that we didn't navigate
    expect(routerStub.called).to.be.false;
  });
  
  it('converts amount to words', async () => {
    const amountInput = element.shadowRoot.querySelector('.amount');
    amountInput.value = '15000';

    // Trigger keyup event
    const keyupEvent = new KeyboardEvent('keyup');
    amountInput.dispatchEvent(keyupEvent);

    await element.updateComplete;

    const wordDiv = element.shadowRoot.querySelector('#word');
    expect(wordDiv.innerHTML).to.not.be.empty;
    console.log(wordDiv.innerHTML);
  });

  it('navigates to dashboard on previous button click', async () => {
    const prevButton = element.shadowRoot.querySelector('.btn-previous');
    prevButton.click();

    expect(routerStub.calledWith('/')).to.be.true;
  });

  it('submits form data and navigates to EMI details', async () => {
    element.shadowRoot.querySelector('.amount').value = '20000';
    element.shadowRoot.querySelector('.period').value = '5';

    const nextButton = element.shadowRoot.querySelector('.btn-next');
    nextButton.click();

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(window.fetch.called).to.be.true;
    expect(localStorageStub.setItem.calledWith('emi', sinon.match.string)).to.be
      .true;
    expect(routerStub.calledWith('/emidetails')).to.be.true;
  });
});
