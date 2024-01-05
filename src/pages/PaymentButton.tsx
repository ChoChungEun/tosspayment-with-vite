import { ReactNode } from "react";
import { nanoid } from "nanoid";

interface PaymentButtonProps {
  children: ReactNode;
  paymentWidgetRef: any;
}

export const PaymentButton = ({
  children,
  paymentWidgetRef,
}: PaymentButtonProps) => {
  // 결제 요청
  const handlePayment = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      // 결제위젯 인스턴스에 있는 결제요청 함수
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: "토스 티셔츠 외 2건",
        customerName: "김토스",
        customerEmail: "customer123@gmail.com",
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return <button onClick={handlePayment}>{children}</button>;
};
