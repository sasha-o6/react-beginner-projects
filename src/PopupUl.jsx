import { useEffect, useRef, useState } from "react";

export default function PopupUl({ onChangeCurrency, isOpen, setIsOpen, currencyList, currency }) {
    const [searchValue, setSearchValue] = useState('');
    const popupRef = useRef();
    const searchRef = useRef();

    const popupHeight = () => {
        let { current: popup } = popupRef;
        const getBoundingClientRect = popup.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const popupHeightToTop = Math.round(windowHeight - getBoundingClientRect.y - 50);
        const popupHeightToBottom = getBoundingClientRect.y - 50;

        if (popupHeightToTop > popupHeightToBottom)
            popup.style.cssText += `height: ${popupHeightToTop}px;`;

        if (popupHeightToTop < popupHeightToBottom)
            popup.style.cssText += `top: unset; bottom: 0; height: ${popupHeightToBottom}px;`;
    }

    useEffect(() => {
        const eventListenerFunc = ({ target }) => {
            if (!target.closest(".popup") && !target.closest(".currencies-arrow"))
                setIsOpen(false)
        }

        document.addEventListener("click", eventListenerFunc);
        document.addEventListener("resize", popupHeight);
        popupHeight();

        return () => {
            document.removeEventListener("click", eventListenerFunc);
            document.removeEventListener("resize", popupHeight);
        }
    }, [isOpen, setIsOpen]);

    const onChangeInput = (event) => {
        let value = event.target.value;
        setSearchValue(value);
    }

    const onClickClear = () => {
        setSearchValue("");
        searchRef.current.focus();
    }

    return (
        <div className="popup" ref={popupRef}>
            <ul>
                {/* 
            зробити ще один врапер для попапа і його вже стилізувати, щоб здавалось, 
            що висота блока всередині змінюється
            */}
                <li className='popup-search-li'>
                    <input onChange={onChangeInput} ref={searchRef} value={searchValue} type="search" name="popup-search" id="popup-search" placeholder='Search...' />
                    <button onClick={onClickClear} type="button">
                        <svg version="1.1" id="fi_748122" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512.001 512.001">
                            <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717 L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859 c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287 l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285 L284.286,256.002z"></path>
                        </svg>
                    </button>
                </li>
                {
                    currencyList.current
                        .filter(el =>
                            searchValue != ""
                                ? el.toLowerCase().includes(searchValue.toLowerCase())
                                : el
                        )
                        .map((item, index) => {
                            return (
                                <li
                                    key={item + index}
                                    className={"popup-li " + (currency === item ? "current" : "")}
                                    onClick={() => {
                                        onChangeCurrency(item)
                                        setIsOpen(false)
                                    }}>
                                    {item}
                                </li>
                            )
                        })
                }
            </ul>
        </div>
    )
}