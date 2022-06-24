import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {
  const { activeCategory } = useSelector((state) => state.category);
  const { activeSort } = useSelector((state) => state.sort);

  const [pizzas, setPizzas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const category = activeCategory ? `category=${activeCategory}` : "";
  const sort = `sortBy=${activeSort.sortBy}&order=${activeSort.order}`;

  const skeletonsList = [...Array(4)].map((_, index) => {
    return <Skeleton className="pizza-block" key={index} />;
  });
  const pizzasList = pizzas?.map((pizza) => {
    return <PizzaBlock key={pizza.id} {...pizza} />;
  });

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://62ae32f7b735b6d16a40015f.mockapi.io/pizzas?page=${page}&limit=4&${category}&${sort}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sort, page]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletonsList : pizzasList}
      </div>
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
          forcePage={page - 1}
        />
      </div>
    </>
  );
};

export default Home;
