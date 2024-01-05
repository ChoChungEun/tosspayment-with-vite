import { ReactNode } from "react";

interface PriceChangeCheckboxProps {
  price: number;
  onPrice(value: number): void;
  children: ReactNode;
}

export const PriceChangeCheckbox = ({
  price,
  onPrice,
  children,
}: PriceChangeCheckboxProps) => {
  // 가격 변경
  const handlePriceChange = (event: any) => {
    onPrice(event.target.checked ? price - 5_000 : price + 5_000);
  };

  return (
    <div>
      <input type="checkbox" onChange={handlePriceChange} />
      <label>{children}</label>
    </div>
  );
};
