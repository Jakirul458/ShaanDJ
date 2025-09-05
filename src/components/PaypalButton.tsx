import { useEffect, useRef } from "react";

interface PaypalButtonProps {
  orderId: string;
  onApprove: (data: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
}

declare global {
  interface Window {
    paypal: any;
  }
}

const PaypalButton = ({ orderId, onApprove, onError, onCancel }: PaypalButtonProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load PayPal SDK script
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;

    script.onload = () => {
      if (window.paypal && paypalRef.current) {
        window.paypal
          .Buttons({
            createOrder: () => orderId,
            onApprove: (data: any) => {
              onApprove(data);
            },
            onError: (err: any) => {
              console.error("PayPal error:", err);
              if (onError) onError(err);
            },
            onCancel: () => {
              console.log("PayPal payment cancelled");
              if (onCancel) onCancel();
            },
            style: {
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "paypal"
            }
          })
          .render(paypalRef.current);
      }
    };

    script.onerror = () => {
      console.error("Failed to load PayPal SDK");
      if (onError) onError(new Error("Failed to load PayPal SDK"));
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
    };
  }, [orderId, onApprove, onError, onCancel]);

  return <div ref={paypalRef} className="w-full" />;
};

export default PaypalButton;