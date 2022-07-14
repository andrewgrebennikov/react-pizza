import * as React from "react";
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

const Categories = ({
  activeCategory,
  setActiveCategory,
  setSearchParams,
  setActivePage,
}) => {
  const onCategoryClick = (id) => () => {
    setActiveCategory(id);
    setActivePage(1);
    setSearchParams({ category: id });
  };

  return (
    <div className="categories">
      <ul>
        {categories.map(({ id, name }) => {
          return (
            <li
              key={id}
              className={classNames({
                active: id === Number(activeCategory),
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
