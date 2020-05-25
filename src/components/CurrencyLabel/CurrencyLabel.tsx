import React from 'react';
import { CurrencyLabelProps } from './CurrencyLabel.lazy';

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
})

function formatCurrency(num: Number): string {
  return currencyFormatter.format(num.toFixed(2) as unknown as number);
}

const CurrencyLabel: React.FC<CurrencyLabelProps> = (props) => {
  let content;

  if(props.price) {
    content = formatCurrency(props.price/100);
  }
  if(props.children) {
    content = props.children;
  }

  return (
    <span className={props.className}>{content || '-'}</span>
  )
};

export default React.memo(CurrencyLabel);
