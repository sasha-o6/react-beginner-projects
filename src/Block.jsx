import React, { useState } from 'react';
import PopupUl from './PopupUl';

export function Block(props) {
  const { currencyList, defaultCurrencies, value, currency, onChangeValue, onChangeCurrency } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block">
      <input
        onChange={(e) => onChangeValue(e.target.value * 1)}
        value={value}
        type="number"
        placeholder={0}
        min="0"
      />
      <div className="currencies">
        <button onClick={() => setIsOpen(true)} className='currencies-arrow' type="button">
          {defaultCurrencies}
          <svg width="15.008179" height="9.473686" viewBox="0 0 15.0082 9.47369" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="Vector 1" d="M1.00409 1.00407L7.50409 8.00407L14.0041 1.00407" stroke="#5D5D5D" strokeOpacity="1.000000" strokeWidth="2.000000" strokeLinecap="round" />
          </svg>
        </button>
        {isOpen && (<PopupUl
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currencyList={currencyList}
          currency={currency}
          onChangeCurrency={onChangeCurrency} />)}
      </div>
    </div>
  )
};