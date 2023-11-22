import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import PaymentModal from './paymentModal';

describe('PaymentModal', () => {
  test('renders the payment modal when isOpen is true', () => {
    const { } = render(
      <PaymentModal isOpen={true} togglePay={() => {}} total={100} />
    );

    expect(screen.getByText("Payment Confirmation")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test('calls handleSubmit when the continue button is clicked', async () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(
      <PaymentModal isOpen={true} togglePay={() => {}} total={100}  />
    );

    const continueButton = screen.getByText("Continue");
    fireEvent.click(continueButton);

    expect(handleSubmit).toBeCalled();
  });

  

  
});
