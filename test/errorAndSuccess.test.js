import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import { Router } from '@vaadin/router';
import { localize } from '@lion/localize';
import '../src/SuccessAndError/Success.js';
import '../src/SuccessAndError/Error.js';

describe('Success screen ', () => {
  let element;
  let routerStub;

  beforeEach(async () => {
    routerStub = sinon.stub(Router, 'go');
    
    element = await fixture(html`<loan-success></loan-success>`);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('renders with all expected elements', async () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
    
    const heading = element.shadowRoot.querySelector('h2');
    const paragraph = element.shadowRoot.querySelector('p');
    const button = element.shadowRoot.querySelector('lion-button');
    
    expect(heading).to.exist;
    expect(heading.textContent).to.include('!!!'); // Check for the hardcoded exclamation marks
    expect(paragraph).to.exist;
    expect(button).to.exist;
    expect(button.classList.contains('home-btn')).to.be.true;
  });

  it('uses correct localization keys', async () => {
    expect(localize.msg).to.have.been.calledWith('change-language:congo');
    expect(localize.msg).to.have.been.calledWith('change-language:scsDesc');
    expect(localize.msg).to.have.been.calledWith('change-language:home');
  });

  it('navigates to home when button is clicked', async () => {
    const button = element.shadowRoot.querySelector('.home-btn');
    button.click();
    
    expect(routerStub.calledOnce).to.be.true;
    expect(routerStub.calledWith('/')).to.be.true;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('error screen', () => {
  let element;
  let routerStub;

  beforeEach(async () => {
    routerStub = sinon.stub(Router, 'go');

    element = await fixture(html`<loan-error></loan-error>`);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('renders component with all expected elements', async () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;

    const heading = element.shadowRoot.querySelector('h2');
    const paragraph = element.shadowRoot.querySelector('p');
    const button = element.shadowRoot.querySelector('lion-button');

    expect(heading).to.exist;
    expect(paragraph).to.exist;
    expect(button).to.exist;
  });

  it('navigates to home when button is clicked', async () => {
    const button = element.shadowRoot.querySelector('.home-btn');
    button.click();

    expect(routerStub.calledOnce).to.be.true;
    expect(routerStub.calledWith('/')).to.be.true;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
