import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

import { fetchPizzas } from "../redux/slices/pizzasSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { items: pizzas, status } = useSelector((state) => state.pizzas);
  const { activeCategory } = useSelector((state) => state.category);
  const { activeSort } = useSelector((state) => state.sort);

  const [activePage, setActivePage] = useState(1);

  const page = `page=${activePage}`;
  const category = activeCategory ? `&category=${activeCategory}` : "";
  const sort = `&sortBy=${activeSort.sortBy}&order=${activeSort.order}`;

  const skeletonsList = [...Array(4)].map((_, index) => {
    return <Skeleton className="pizza-block" key={index} />;
  });
  const pizzasList =
    pizzas &&
    pizzas.map((pizza) => {
      return <PizzaBlock key={pizza.id} {...pizza} />;
    });

  const handlePageClick = (event) => {
    setActivePage(event.selected + 1);
  };

  const getPizzas = useCallback(() => {
    dispatch(
      fetchPizzas({
        page,
        category,
        sort,
      })
    );
    window.scrollTo(0, 0);
  }, [category, dispatch, page, sort]);

  useEffect(() => {
    getPizzas();
  }, [category, sort, page, getPizzas]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <p>Что-то пошло не так!</p>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletonsList : pizzasList}
        </div>
      )}
      {status !== "error" && (
        <div className="pagination">
          <ReactPaginate
            className="pagination__list"
            pageClassName="pagination__item"
            activeClassName="pagination__item_active"
            previousClassName="pagination__item pagination__item_prev"
            nextClassName="pagination__item pagination__item_next"
            disabledClassName="pagination__item_disabled"
            pageLinkClassName="pagination__link"
            previousLinkClassName="pagination__link pagination__link_prev"
            nextLinkClassName="pagination__link pagination__link_next"
            activeLinkClassName="pagination__link_active"
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            forcePage={activePage - 1}
          />
        </div>
      )}
    </>
  );
};

export default Home;
