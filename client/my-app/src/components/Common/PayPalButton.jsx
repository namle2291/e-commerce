import { createOrder } from 'apis/orderApi';

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const paypalScriptOptions = {
  'client-id':
    'Ae5QjzsZyMkHjHt8xjnr0uHf2EvUJGIwE9gBcKvj49IqKXYeP76wggqO0jLJI1qd0-FGBL8gcALhBqRU',
  currency: 'USD',
};

function Button({ total, setIsSuccess, payload }) {
  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((response) => {
      if (response.status === 'COMPLETED') {
        createOrder(payload).then((res) => {
          if (res.success) {
            setIsSuccess(true);
          }
        });
      }
    });
  };

  return (
    <PayPalButtons
      style={{ layout: 'vertical' }}
      disabled={false}
      createOrder={(data, actions) => onCreateOrder(data, actions)}
      onApprove={(data, actions) => onApproveOrder(data, actions)}
    />
  );
}

function PayPalButton({ amount, setIsSuccess, payload }) {
  console.group(amount, payload);
  return (
    <PayPalScriptProvider options={paypalScriptOptions}>
      <Button total={amount} setIsSuccess={setIsSuccess} payload={payload} />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;
