import * as React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory } from "../redux/slices/categorySlice";

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
  const dispatch = useDispatch();
  const { activeCategory } = useSelector((state) => state.category);

  const onCategoryClick = (id) => () => {
    dispatch(setActiveCategory(categories[id]));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map(({ id, name }) => {
          return (
            <li
              key={id}
              className={classNames({
                active: id === activeCategory.id,
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
