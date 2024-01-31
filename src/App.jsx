import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import currencyData from './currensy.json';

import './index.scss';

function App() {
  // "https://api.currencyapi.com/v3/latest?apikey=cur_live_NCFBSP7QvLYjzk1WF2RPwb2rrLz0HGoLB3e09mTC"

  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("UAH")
  const [fromPrice, setFromPrice] = useState(1)
  const [toPrice, setToPrice] = useState(1)
  // const [rates, setRates] = useState(currencyData["data"]);
  const ratesRef = useRef({})

  useEffect(() => {
    // setRates(currencyData["data"]);
    ratesRef.current = currencyData["data"]
  }, [])

  const onChangeFromPrice = (value1) => {
    const price = value1 / ratesRef.current[fromCurrency]["value"].toFixed(5);
    const result = price * ratesRef.current[toCurrency]["value"].toFixed(5);
    setToPrice(result.toFixed(5));
    setFromPrice(value1);
  }

  const onChangeToPrice = (value) => {
    const price = value / ratesRef.current[toCurrency]["value"].toFixed(5);
    const result = price * ratesRef.current[fromCurrency]["value"].toFixed(5);
    setFromPrice(result.toFixed(5));
    setToPrice(value);
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency])

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeValue={onChangeFromPrice}
        onChangeCurrency={setFromCurrency}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeValue={onChangeToPrice}
        onChangeCurrency={setToCurrency}
      />
    </div>
  );
}

export default App;