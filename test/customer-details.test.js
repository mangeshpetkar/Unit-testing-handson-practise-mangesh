import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/Customer/Customer-details.js';
import { Router } from '@vaadin/router';  // Assuming Router is used for navigation

describe('CustomerDetails Component', () => {
  let el;
  let fetchStub;
  let routerStub;

  beforeEach(async () => {
    fetchStub = sinon.stub(window, 'fetch').resolves({
      status: 200,
      json: () => Promise.resolve({ message: 'Form submitted successfully' }),
    });
    
    routerStub = sinon.stub(Router, 'go');

    el = await fixture(html`<customer-details></customer-details>`);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render the form correctly', () => {
    // Check if the form exists
    const form = el.shadowRoot.querySelector('lion-form');
    expect(form).to.exist;
  });

  it('should have all the necessary form fields', () => {
    // Check the existence of the required form fields
    const firstNameInput = el.shadowRoot.querySelector('#first_name');
    const lastNameInput = el.shadowRoot.querySelector('#last_name');
    const dobInput = el.shadowRoot.querySelector('#dateof_birth');
    const emailInput = el.shadowRoot.querySelector('#email');
    const mobileNumberInput = el.shadowRoot.querySelector('#mobile_number');
    const salaryInput = el.shadowRoot.querySelector('#monthly_salary');
    const emiInput = el.shadowRoot.querySelector('#EMIs_amount');
    const termsCheckbox = el.shadowRoot.querySelector('#terms');

    expect(firstNameInput).to.exist;
    expect(lastNameInput).to.exist;
    expect(dobInput).to.exist;
    expect(emailInput).to.exist;
    expect(mobileNumberInput).to.exist;
    expect(salaryInput).to.exist;
    expect(emiInput).to.exist;
    expect(termsCheckbox).to.exist;
  });

  it('should validate required fields', async () => {
    // Simulate form submission without filling any inputs
    const form = el.shadowRoot.querySelector('lion-form');
    form.submit();

    await form.updateComplete;

    const errors = form.hasFeedbackFor.includes('error');
    expect(errors).to.be.true;

    // Check if a required field shows an error message
    const firstNameInput = el.shadowRoot.querySelector('#first_name');
    const firstNameError = firstNameInput.hasFeedbackFor.includes('error');
    expect(firstNameError).to.be.true;
  });

  it('should submit form data correctly', async () => {
    // Fill out the form with valid data
    el.shadowRoot.querySelector('#first_name').modelValue = 'John';
    el.shadowRoot.querySelector('#last_name').modelValue = 'Doe';
    el.shadowRoot.querySelector('#dateof_birth').modelValue = new Date(1990, 0, 1);
    el.shadowRoot.querySelector('#email').modelValue = 'john.doe@example.com';
    el.shadowRoot.querySelector('#mobile_number').modelValue = '9876543210';
    el.shadowRoot.querySelector('#monthly_salary').modelValue = 5000;
    el.shadowRoot.querySelector('#EMIs_amount').modelValue = 1000;
    el.shadowRoot.querySelector('#terms').checked = true;

    await el.updateComplete;

    const nextButton = el.shadowRoot.querySelector('#nextbtn');
    nextButton.click();

    expect(fetchStub).to.have.been.calledOnce;
    
    const fetchArgs = fetchStub.getCall(0).args[1].body;
    const formData = JSON.parse(fetchArgs);
    expect(formData.first_name).to.equal('John');
    expect(formData.last_name).to.equal('Doe');
    expect(formData.email).to.equal('john.doe@example.com');
  });

  it('should navigate to the success page after form submission', async () => {
    // Fill out and submit the form
    el.shadowRoot.querySelector('#first_name').modelValue = 'John';
    el.shadowRoot.querySelector('#last_name').modelValue = 'Doe';
    el.shadowRoot.querySelector('#dateof_birth').modelValue = new Date(1990, 0, 1);
    el.shadowRoot.querySelector('#email').modelValue = 'john.doe@example.com';
    el.shadowRoot.querySelector('#mobile_number').modelValue = '9876543210';
    el.shadowRoot.querySelector('#monthly_salary').modelValue = 5000;
    el.shadowRoot.querySelector('#EMIs_amount').modelValue = 1000;
    el.shadowRoot.querySelector('#terms').checked = true;

    await el.updateComplete;

    const nextButton = el.shadowRoot.querySelector('#nextbtn');
    nextButton.click();

    expect(routerStub).to.have.been.calledWith('/success');
  });
});
