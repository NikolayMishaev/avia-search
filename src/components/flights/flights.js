import "./flights.css";
import Flight from "../flight/flight";
import { useSelector, useDispatch } from "react-redux";
import { sortFlights } from "../../utils/utils";
import { addFlightsPerPage } from "../../store/paginationSlice";
import Spinner from "../spinner/spinner";

export default function Flights() {
  const { flights, loading, totalFlightsFound } = useSelector(
    (state) => state.flights
  );
  const sort = useSelector((state) => state.sort.sortingCriteria);
  const pagination = useSelector((state) => state.pagination.flightsPerPage);
  const dispatch = useDispatch();
  function handleClickButton(value) {
    dispatch(addFlightsPerPage(value));
  }
  return (
    <>
      <ul className="flights">
        {!loading && flights.length ? (
          <div className="flights__total-number-flights">
            Найдено рейсов: {totalFlightsFound}
          </div>
        ) : null}
        {loading ? (
          <Spinner searchWord="Поиск рейсов..." />
        ) : flights.length ? (
          flights
            .map((i) => <Flight key={i.flightToken} flight={i.flight} />)
            .sort(sortFlights(sort))
            .slice(0, pagination)
        ) : (
          <p className="flights__message">
            По указанным параметрам рейсов нет!
          </p>
        )}
      </ul>
      {loading ? null : pagination < flights.length ? (
        <button
          className="flights__button-more"
          type="button"
          onClick={() => handleClickButton(2)}
        >
          Показать еще{" "}
          <span className="flights__button-more flights__button-more_accent">
            2
          </span>
        </button>
      ) : null}
      <div className="flights__button-more-details">
        <span
          className="flights__button-more-number-cards"
          onClick={() => handleClickButton(5)}
        >
          5
        </span>
        <span
          className="flights__button-more-number-cards"
          onClick={() => handleClickButton(10)}
        >
          10
        </span>
        <span
          className="flights__button-more-number-cards"
          onClick={() => handleClickButton(25)}
        >
          25
        </span>
      </div>
    </>
  );
}
