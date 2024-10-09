import { html, fixture, expect } from '@open-wc/testing';
import '../loan-application.js';

describe('LoanApplication', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<loan-application></loan-application>`);
  });

  it('renders with default properties', async () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
    expect(element.title).to.equal('Hey there');
    expect(element.counter).to.equal(5);
  });

  it('renders a dash-board element', async () => {
    const dashboard = element.shadowRoot.querySelector('dash-board');
    expect(dashboard).to.exist;
  });

  it('increments counter on __increment method call', async () => {
    const initialCounter = element.counter;
    element.__increment();
    expect(element.counter).to.equal(initialCounter + 1);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
