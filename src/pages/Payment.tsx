import { useEffect, useRef, useState } from "react";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { PaymentButton } from "./PaymentButton";
import { PriceChangeCheckbox } from "./PriceChangeCheckbox";

// clientKey는 위젯을 렌더링하는 상점을 식별
const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

// customerKey는 결제 고객을 식별해요
const customerKey = "YbX2HuSlsC9uVJW6NMRMj";

export const PaymentPage = () => {
  const [price, setPrice] = useState(50_000);
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  // 초기 위젯 렌더링
  // loadPaymentWidget()을 호출해서 인스턴스를 생성하고,
  // renderPaymentMethods()로 결제위젯을 렌더링하고,
  // useRef를 사용해서 인스턴스를 저장해요.
  useEffect(() => {
    (async () => {
      // loadPaymentWidget()을 호출해서 인스턴스 생성
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      // 결제 UI를 렌더링하는 메서드 renderPaymentMethods
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        price
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  // 할인 가격 적용
  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // 변경된 결제 금액을 UI에 업데이트하는 메서드 updateAmount
    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]);

  return (
    <>
      <h1>결제</h1>
      {/* 위젯 UI 가 되는 div */}
      <div id="payment-widget" />
      <PriceChangeCheckbox price={price} onPrice={setPrice}>
        5,000원 할인 쿠폰 적용
      </PriceChangeCheckbox>
      <PaymentButton paymentWidgetRef={paymentWidgetRef}>
        결제하기
      </PaymentButton>
    </>
  );
};
