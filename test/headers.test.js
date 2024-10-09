import { html, fixture, expect } from '@open-wc/testing';
import { localize } from '@lion/localize'; // Import the localize function
import sinon from 'sinon';
import '../src/header/Header.js';

describe('Header Component', () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`<loan-header></loan-header>`);
  });

  it('should set the locale to en-GB and update button classes correctly', async () => {
    // Simulate clicking the English button
    const enButton = el.shadowRoot.getElementById('en-GB');
    enButton.click();

    await el.updateComplete;

    // Check if the locale has been set correctly
    expect(localize.locale).to.equal('en-GB');

    expect(enButton.classList.contains('bg-btn-color')).to.be.true;
    expect(el.shadowRoot.getElementById('nl-NL').classList.contains('bg-btn-color')).to.be.false;
    expect(el.shadowRoot.getElementById('nl-NL').classList.contains('btn-cursor')).to.be.true;
    expect(enButton.classList.contains('btn-cursor')).to.be.false;
  });

  it('should set the locale to nl-NL and update button classes correctly', async () => {
    // Simulate clicking the Dutch button
    const nlButton = el.shadowRoot.getElementById('nl-NL');
    nlButton.click();

    await el.updateComplete;

    expect(localize.locale).to.equal('nl-NL');

    expect(nlButton.classList.contains('bg-btn-color')).to.be.true;
    expect(el.shadowRoot.getElementById('en-GB').classList.contains('bg-btn-color')).to.be.false;
    expect(el.shadowRoot.getElementById('en-GB').classList.contains('btn-cursor')).to.be.true;
    expect(nlButton.classList.contains('btn-cursor')).to.be.false;
  });

  it('should not change locale if the button is already selected', async () => {
    const enButton = el.shadowRoot.getElementById('en-GB');
    enButton.click();

    await el.updateComplete;

    expect(localize.locale).to.equal('nl-NL'); // Should still be en-GB
  });

  it('should not change locale if the button is already selected', async () => {
    // Simulate clicking the already selected Dutch button
    const nlButton = el.shadowRoot.getElementById('nl-NL');
    nlButton.click();

    await el.updateComplete;

    // Check if the locale remains the same
    expect(localize.locale).to.equal('nl-NL'); // Should still be nl-NL
  });
});
