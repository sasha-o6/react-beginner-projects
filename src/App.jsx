import React, { useEffect, useState } from 'react';
import './index.scss';
import Collection from './Collection';

export default function App() {


  const [collections, setCollections] = useState("");
  const [categories, setCategories] = useState("");

  // set filters for tabs and search
  const [currentCategories, setCurrentCategories] = useState({ "name": "Все", "category": 0 });
  const [searchValue, setSearchValue] = useState("")

  // fetch from mockapi API, main google account
  useEffect(() => {
    fetch("https://65ecb2e70ddee626c9b0d01a.mockapi.io/photo_collections")
      .then(res => res.json())
      .then(data => {
        setCategories(data[0]["categories"])
        setCollections(data[0]["collections"])
      })
  }, [])

  // filters functions
  const categoryOnClick = (name, category) => setCurrentCategories({ "name": name, "category": category })
  const onSearch = (name) => setSearchValue(name)

  // pagination settings and function
  const itemsPerPage = 3;
  let allItems = collections.length;
  let allItemsArray = []
  const [paginationIndex, setPaginationIndex] = useState(2)

  allItems = Math.ceil(allItems / itemsPerPage);

  let i = 0;
  while (i < allItems) {
    allItemsArray.push(i)
    i++;
  }

  // //
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories && categories.map(({ name }, index) =>
            <li
              key={name + "=" + index}
              onClick={() => categoryOnClick(name, index)}
              className={name == currentCategories["name"] ? "active" : ""}
            >{name}</li>
          )}
        </ul>
        <input onChange={e => onSearch(e.target.value)} className="search-input" placeholder="Поиск по названию" value={searchValue} />
      </div>
      <div className="content">
        {collections &&
          collections.map((item, index) => {
            let isShow = true

            // categories filter
            if (item["category"] != currentCategories["category"] && currentCategories["category"] != 0)
              isShow = false;

            // search filter
            if (!item["name"].toLowerCase().includes(searchValue.toLowerCase()) && searchValue != "")
              isShow = false;

            // визначення чи index у межах нашого пагінації, якщо paginationIndex (карент індекс сторінки пагінації) = 2 і всього айтемів 7, то шукаємо чи index >= 0 і index < 3
            // index >= (Math.ceil(collections.length / itemsPerPage) * (paginationIndex)) = визначення нижньої межі
            // index < (Math.ceil(collections.length / itemsPerPage) * (paginationIndex + 1)) = визначення верхньої межі 
            if (isShow == true &&
              index >= (Math.ceil(collections.length / itemsPerPage) * (paginationIndex)) &&
              index < (Math.ceil(collections.length / itemsPerPage) * (paginationIndex + 1))
            )
              return <Collection
                key={item["category"] + "-" + index + " " + item["name"] + Math.random()}
                name={item["name"]}
                images={item["photos"]}
              />
          })
        }
      </div>
      <ul className="pagination">
        {allItems && allItemsArray.map(el =>
          <li
            key={el}
            onClick={() => setPaginationIndex(el)}
            className={el == paginationIndex ? "active" : ""}
          >{el + 1}</li>
        )}
      </ul>
    </div>
  );
}