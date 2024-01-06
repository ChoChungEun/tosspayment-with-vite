# Deploy

github actions
```
develop -> master
```

cli
```
npm run deploy
```

# Site
https://chochungeun.github.io/tosspayment-with-vite/


# Description
1. 초기 결제위젯 렌더링
```
- loadPaymentWidget()을 호출해서 인스턴스를 생성하고,
- renderPaymentMethods()로 결제위젯을 렌더링하고,
- useRef를 사용해서 인스턴스를 저장

useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        price
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);
```

해당 div 하위로 위젯 마크업이 생성됨 (id가 인스턴스가 식별하는 key가 됨)
```
return (
  <div id="payment-widget" />
)

```

2. 할인 금액 업데이트
```
- 변경된 price 상태값 업데이트 updateAmount
useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    
    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]);
```

3. 결제 요청
```
- 결제요청 정보담아서 요청 requestPayment
const handlePayment = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
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
```   





