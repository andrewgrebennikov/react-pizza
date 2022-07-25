import * as React from "react";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames";

const categories = [
  {
    id: 0,
    name: "Все",
  },
  {
    id: 1,
    name: "Мясные",
  },
  {
    id: 2,
    name: "Вегетарианская",
  },
  {
    id: 3,
    name: "Гриль",
  },
  {
    id: 4,
    name: "Острые",
  },
  {
    id: 5,
    name: "Закрытые",
  },
];

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = Number(searchParams.get("page"));
  const activeCategory = Number(searchParams.get("category"));
  const activeSort = searchParams.get("sortBy");
  const activeOrder = searchParams.get("order");

  const onCategoryClick = (id) => () => {
    if (activePage && id && activeSort && activeOrder) {
      setSearchParams({
        category: id,
        sortBy: activeSort,
        order: activeOrder,
      });
    } else if (activePage && activeSort && activeOrder) {
      setSearchParams({
        sortBy: activeSort,
        order: activeOrder,
      });
    } else if (id && activeSort && activeOrder) {
      setSearchParams({
        category: id,
        sortBy: activeSort,
        order: activeOrder,
      });
    } else if (activeSort && activeOrder) {
      setSearchParams({
        sortBy: activeSort,
        order: activeOrder,
      });
    } else if (id) {
      setSearchParams({
        category: id,
      });
    } else {
      setSearchParams();
    }
  };

  return (
    <div className="categories">
      <ul>
        {categories.map(({ id, name }) => {
          return (
            <li
              key={id}
              className={classNames({
                active: id === activeCategory,
              })}
              onClick={onCategoryClick(id)}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
