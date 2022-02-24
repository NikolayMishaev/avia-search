import "./flights.css";
import Flight from "../flight/flight";
import { useSelector, useDispatch } from "react-redux";
import { sortFlights } from "../../utils/utils";
import { addFlightsPerPage } from "../../store/paginationSlice";
import Spinner from "../spinner/spinner";

export default function Flights() {
  const flights = useSelector((state) => state.flights.flights);
  const sort = useSelector((state) => state.sort.sortingCriteria);
  const loading = useSelector((state) => state.flights.loading);
  const pagination = useSelector((state) => state.pagination.flightsPerPage);
  const dispatch = useDispatch();
  function handleClickButton() {
    dispatch(addFlightsPerPage());
  }
  return (
    <>
      <ul className="flights">
        {loading ? (
          <Spinner searchWord="Ищем рейсы..." />
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
          onClick={handleClickButton}
        >
          Показать еще
        </button>
      ) : null}
    </>
  );
}
