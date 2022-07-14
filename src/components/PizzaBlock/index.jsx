import { useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/slices/cartSlice";

const typeNames = [
  {
    id: 0,
    name: "тонкое",
  },
  {
    id: 1,
    name: "традиционное",
  },
];

const PizzaBlock = (props) => {
  const { id, imageUrl, name, price, sizes, types } = props;
  const [activeType, setActiveType] = useState(typeNames[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const dispatch = useDispatch();

  const arrayPizzasById = useSelector((state) =>
    state.cart.items.filter((item) => item.id === id)
  );
  const quantity = arrayPizzasById.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleTypeClick = (id) => () => {
    setActiveType(typeNames[id]);
  };

  const handleSizeClick = (id) => () => {
    setActiveSize(sizes[id]);
  };

  const handleAddPizzaClick = () => {
    dispatch(
      addProduct({
        id,
        imageUrl,
        name,
        price,
        size: activeSize,
        type: activeType.name,
      })
    );
  };

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        width="260"
        height="260"
        src={imageUrl}
        alt={name}
        loading="lazy"
      />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => {
            return (
              <li
                key={type}
                className={classNames({
                  active: activeType.id === type,
                })}
                onClick={handleTypeClick(type)}
              >
                {typeNames[type].name}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                key={size}
                className={classNames({
                  active: activeSize === sizes[index],
                })}
                onClick={handleSizeClick(index)}
              >
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div
          className="button button--outline button--add"
          onClick={handleAddPizzaClick}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {quantity > 0 && <i>{quantity}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
