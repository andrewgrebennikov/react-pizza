import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { setActiveSort } from "../redux/slices/sortSlice";

export const sortList = [
  {
    id: 0,
    name: "популярности",
    sortBy: "rating",
    order: "desc",
  },
  {
    id: 1,
    name: "цене",
    sortBy: "price",
    order: "desc",
  },
  {
    id: 2,
    name: "алфавиту",
    sortBy: "name",
    order: "asc",
  },
];

const Sort = () => {
  const dispatch = useDispatch();

  const { activeSort } = useSelector((state) => state.sort);
  const sortPopupRef = useRef(null);

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { name: activeSortName } = activeSort;

  const handlePopupToggle = () => {
    setIsOpenPopup(!isOpenPopup);
  };

  const handleSortClick = (id) => () => {
    dispatch(setActiveSort(sortList[id]));
    handlePopupToggle();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.path.includes(sortPopupRef.current)) {
        setIsOpenPopup(false);
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={sortPopupRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={handlePopupToggle}>{activeSortName}</span>
      </div>
      {isOpenPopup && (
        <div className="sort__popup">
          <ul>
            {sortList.map(({ id, name }) => {
              return (
                <li
                  key={id}
                  className={classNames({
                    active: activeSort.id === id,
                  })}
                  onClick={handleSortClick(id)}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
