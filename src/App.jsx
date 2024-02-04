import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import currencyData from './currensy.json';

import './scss/index.scss';

export default function App() {
  console.clear();
  // "https://api.currencyapi.com/v3/latest?apikey=cur_live_NCFBSP7QvLYjzk1WF2RPwb2rrLz0HGoLB3e09mTC"

  const [darkTheme, setDarkTheme] = useState(true);

  // const darkTheme = useRef(true);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");
  const [fromPrice, setFromPrice] = useState(1);
  const [toPrice, setToPrice] = useState(1);
  const currencyList = useRef([]);
  // const [rates, setRates] = useState(currencyData["data"]);
  const ratesRef = useRef({})

  useEffect(() => {
    ratesRef.current = currencyData["data"];
    Object.keys(currencyData["data"]).forEach(key =>
      currencyList.current.push(key)
    );

    if (localStorage.getItem("isDarkTheme") && localStorage.getItem("isDarkTheme") != darkTheme)
      setDarkTheme(localStorage.getItem("isDarkTheme"))
  }, [])

  const onSetDarkTheme = () => {
    setDarkTheme(prev => {
      localStorage.setItem("isDarkTheme", !prev);
      return !prev;
    });
  }

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

  const reverseCurrency = () => {
    let prevFromCurrency = fromCurrency;
    let prevToCurrency = toCurrency;
    // let prevFromPrice = fromPrice;
    // let prevToPrice = toPrice;

    setFromCurrency(prevToCurrency);
    setToCurrency(prevFromCurrency);
    // onChangeFromPrice(prevToPrice);
    // onChangeToPrice(prevFromPrice);
  }

  return (
    <div className={"root" + (darkTheme === true ? " theme-dark" : " theme-white")}>
      <div className="App">
        <div className="App-header">
          <p className='color-second'>Currency Converter</p>

          {
            darkTheme === true
              ? <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M26.7722 11.0221C26.7039 10.6534 26.386 10.3834 26.0111 10.3754C25.6365 10.369 25.3073 10.6239 25.2235 10.9894C24.4188 14.4961 21.34 16.9452 17.7364 16.9452C13.5007 16.9452 10.0547 13.4993 10.0547 9.26364C10.0547 5.66003 12.5038 2.58124 16.0106 1.77662C16.3761 1.69277 16.6324 1.36392 16.6246 0.989086C16.6168 0.61425 16.3467 0.296368 15.9781 0.227919C15.1636 0.0766754 14.3298 0 13.5 0C9.89404 0 6.50391 1.40426 3.95404 3.95408C1.40424 6.50389 0 9.89402 0 13.5C0 17.106 1.40424 20.4961 3.95404 23.0459C6.50391 25.5957 9.89404 27 13.5 27C17.106 27 20.4961 25.5957 23.046 23.0459C25.5958 20.4961 27 17.106 27 13.5C27 12.6709 26.9233 11.8372 26.7722 11.0221Z" fill="#0F0F10" fillOpacity="1.000000" fillRule="nonzero" />
              </svg>
              : <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M13.4998 6.73744C9.771 6.73744 6.7373 9.77165 6.7373 13.5006C6.7373 17.2295 9.771 20.2638 13.4998 20.2638C17.2283 20.2638 20.2625 17.2301 20.2625 13.5006C20.2625 9.77106 17.2283 6.73744 13.4998 6.73744Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero" />
                <path id="Vector" d="M13.5 4.74951C12.7712 4.74951 12.1804 4.15881 12.1804 3.4306L12.1804 1.31951C12.1804 0.5907 12.7712 0 13.5 0C14.2288 0 14.8193 0.5907 14.8193 1.31951L14.8193 3.4306C14.8193 4.15881 14.228 4.74951 13.5 4.74951Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero" />
                <path id="Vector" d="M13.5 22.2499C12.7712 22.2499 12.1804 22.8406 12.1804 23.5694L12.1804 25.6799C12.1804 26.4093 12.7712 27 13.5 27C14.2288 27 14.8193 26.4093 14.8193 25.6799L14.8193 23.5694C14.8193 22.8406 14.228 22.2499 13.5 22.2499Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero" />
                <path id="Vector" d="M19.6868 7.31259C19.1721 6.79722 19.1721 5.96199 19.6868 5.44663L21.1797 3.95374C21.6946 3.43896 22.5303 3.43896 23.0457 3.95374C23.561 4.4691 23.561 5.30493 23.0457 5.8197L21.5527 7.31259C21.0381 7.82796 20.2029 7.82796 19.6868 7.31259Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero" />
                <path id="Vector" d="M7.3125 19.688C6.79712 19.172 5.96191 19.172 5.44653 19.688L3.95361 21.1803C3.43896 21.6951 3.43823 22.5315 3.95361 23.0463C4.46899 23.561 5.30493 23.561 5.81958 23.0463L7.3125 21.5528C7.82788 21.038 7.82788 20.2022 7.3125 19.688Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero" />
                <path id="Vector" d="M22.25 13.5C22.25 12.7712 22.8408 12.1805 23.5696 12.1805L25.6807 12.1805C26.4094 12.1805 27 12.7712 27 13.5C27 14.2288 26.4094 14.8189 25.6807 14.8189L23.5696 14.8189C22.8408 14.8189 22.25 14.2288 22.25 13.5Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero" />
                <path id="Vector" d="M4.74951 13.5C4.74951 12.7712 4.15869 12.1805 3.42993 12.1805L1.31958 12.1805C0.59082 12.1805 0 12.7712 0 13.5C0 14.2288 0.59082 14.8189 1.31958 14.8189L3.43066 14.8189C4.15869 14.8189 4.74951 14.2288 4.74951 13.5Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero" />
                <path id="Vector" d="M19.6868 19.688C20.2021 19.1732 21.0381 19.1732 21.5527 19.688L23.0457 21.1809C23.561 21.6951 23.561 22.5315 23.0457 23.0463C22.5303 23.561 21.6951 23.561 21.1797 23.0463L19.6868 21.5534C19.1714 21.038 19.1714 20.2028 19.6868 19.688Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero" />
                <path id="Vector" d="M7.3125 7.3126C7.82788 6.79723 7.82788 5.962 7.3125 5.44663L5.81958 3.95434C5.3042 3.43897 4.46899 3.43897 3.95361 3.95434C3.43823 4.4691 3.43823 5.30493 3.95361 5.8197L5.44653 7.3126C5.96191 7.82856 6.79712 7.82856 7.3125 7.3126Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero" />
              </svg>
          }

          <button
            onClick={onSetDarkTheme}
            // onClick={() => darkTheme.current = !darkTheme.current}
            className={"theme-switcher " + (darkTheme === true ? "theme-dark" : "theme-white")}
            type="button">
            <div className="theme-switcher-circle"></div>
          </button>
        </div>

        <div className="App-main">
          <Block
            defaultCurrencies={fromCurrency}
            currencyList={currencyList}
            value={fromPrice}
            currency={fromCurrency}
            onChangeValue={onChangeFromPrice}
            onChangeCurrency={setFromCurrency}
          />

          <button
            onClick={reverseCurrency}
            className='reverse-button'
            type="button"
            title='Reverse currency button'>
            <svg width="20.902893" height="20.833160" viewBox="0 0 20.9029 20.8332" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs />
              <path id="path9345" d="M20.9024 5.18881C20.8944 4.9182 20.7812 4.66135 20.587 4.47267L16.4184 0.306C16.3216 0.209 16.2067 0.13205 16.0802 0.0795441C15.9536 0.0270233 15.8179 0 15.6809 0C15.5439 0 15.4082 0.0270233 15.2817 0.0795441C15.1551 0.13205 15.0402 0.209 14.9435 0.306L10.7747 4.47267C10.675 4.56894 10.5955 4.68413 10.5409 4.81149C10.4862 4.93886 10.4576 5.07584 10.4565 5.21443C10.4555 5.35301 10.4821 5.49042 10.5349 5.61858C10.5876 5.74673 10.6655 5.86308 10.7638 5.96082C10.862 6.05853 10.9787 6.13568 11.1071 6.1877C11.2356 6.23973 11.3732 6.26561 11.5118 6.26382C11.6504 6.26202 11.7872 6.2326 11.9143 6.17728C12.0414 6.12193 12.1561 6.04181 12.2518 5.94157L14.6422 3.55511L14.6422 19.7905C14.6422 20.067 14.7521 20.3322 14.9477 20.5278C15.1432 20.7233 15.4085 20.8332 15.685 20.8332C15.9615 20.8332 16.2267 20.7233 16.4222 20.5278C16.6178 20.3322 16.7277 20.067 16.7277 19.7905L16.7277 3.56529L19.1101 5.94157C19.2559 6.09328 19.4443 6.19727 19.6504 6.23984C19.8564 6.28242 20.0706 6.26161 20.2646 6.18013C20.4586 6.09865 20.6234 5.96033 20.7372 5.78339C20.8511 5.60643 20.9087 5.39914 20.9024 5.18881ZM10.4838 15.6156C10.4821 15.4096 10.4194 15.2087 10.3036 15.0383C10.1877 14.868 10.024 14.7357 9.83298 14.6584C9.64197 14.5811 9.43228 14.5622 9.23053 14.604C9.02881 14.6458 8.84399 14.7466 8.69949 14.8934L6.30698 17.284L6.30698 1.04453C6.30103 0.772202 6.18857 0.513062 5.99387 0.322571C5.79916 0.132095 5.53769 0.0254211 5.26529 0.0254211C4.99292 0.0254211 4.73129 0.132095 4.53662 0.322571C4.34192 0.513062 4.22958 0.772202 4.22363 1.04453L4.22363 17.2778L1.83304 14.8934C1.73965 14.7844 1.62479 14.6958 1.49554 14.6333C1.3663 14.5708 1.22546 14.5356 1.082 14.5301C0.938538 14.5245 0.795502 14.5487 0.661835 14.6011C0.528137 14.6535 0.406647 14.7329 0.305115 14.8344C0.203583 14.936 0.124146 15.0574 0.0717773 15.191C0.0194092 15.3247 -0.00476074 15.4678 0.000793457 15.6113C0.00631714 15.7547 0.0414734 15.8955 0.103973 16.0247C0.166504 16.154 0.255066 16.2689 0.364105 16.3623L4.53082 20.529C4.72601 20.723 4.99008 20.8319 5.26529 20.8319C5.54053 20.8319 5.80457 20.723 5.99976 20.529L10.1684 16.3623C10.2682 16.2652 10.3476 16.1492 10.4017 16.0209C10.4559 15.8927 10.4838 15.7549 10.4838 15.6156Z" fill="#5D5D5D" fillOpacity="1.000000" fillRule="nonzero" />
            </svg>
          </button>

          <Block
            defaultCurrencies={toCurrency}
            currencyList={currencyList}
            value={toPrice}
            currency={toCurrency}
            onChangeValue={onChangeToPrice}
            onChangeCurrency={setToCurrency}
          />
        </div>
      </div>
    </div>
  );
}

// export default App;