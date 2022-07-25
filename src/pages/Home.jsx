import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

import { fetchPizzas } from "../redux/slices/pizzasSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { items: pizzas, status } = useSelector((state) => state.pizzas);

  const activePage = Number(searchParams.get("page")) || 1;
  const activeCategory = Number(searchParams.get("category"));
  const activeSort = searchParams.get("sortBy") || "rating";
  const activeOrder = searchParams.get("order") || "desc";

  const page = `page=${activePage}`;
  const category = activeCategory ? `&category=${activeCategory}` : "";
  const sort = `&sortBy=${activeSort}`;
  const order = `&order=${activeOrder}`;

  const skeletonsList = [...Array(4)].map((_, index) => {
    return <Skeleton className="pizza-block" key={index} />;
  });
  const pizzasList =
    pizzas &&
    pizzas.map((pizza) => {
      return <PizzaBlock key={pizza.id} {...pizza} />;
    });

  const handlePageClick = (event) => {
    const page = event.selected;
    const isNotFirstPage = page + 1 !== 1;

    if (isNotFirstPage && activeCategory && activeSort !== "rating") {
      setSearchParams({
        page: page + 1,
        category: activeCategory,
        sortBy: activeSort,
        order: activeOrder,
      });
    } else if (isNotFirstPage && activeCategory) {
      setSearchParams({
        page: page + 1,
        category: activeCategory,
      });
    } else if (isNotFirstPage && activeSort !== "rating") {
      setSearchParams({
        page: page + 1,
        sortBy: activeSort,
        order: activeOrder,
      });
    } else if (activeCategory && activeSort !== "rating") {
      setSearchParams({
        category: activeCategory,
        sortBy: activeSort,
        order: activeOrder,
      });
    } else if (isNotFirstPage) {
      setSearchParams({
        page: page + 1,
      });
    } else if (activeSort !== "rating") {
      setSearchParams({
        sortBy: activeSort,
        order: activeOrder,
      });
    } else if (activeCategory) {
      setSearchParams({
        category: activeCategory,
      });
    } else {
      setSearchParams();
    }
  };

  const getPizzas = useCallback(() => {
    dispatch(
      fetchPizzas({
        page,
        category,
        sort,
        order,
      })
    );
    window.scrollTo(0, 0);
  }, [category, dispatch, page, sort, order]);

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
