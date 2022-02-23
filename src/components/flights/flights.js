import "./flights.css";
import Flight from "../flight/flight";
import { useSelector, useDispatch } from "react-redux";
import { sortFlights } from "../../utils/utils";
import { addFlightsPerPage } from "../../store/paginationSlice";

export default function Flights() {
  const flights = useSelector((state) => state.flights.flights);
  const sort = useSelector((state) => state.sort.sortingCriteria);
  const pagination = useSelector((state) => state.pagination.flightsPerPage);
  const dispatch = useDispatch();
  console.log(flights);

  function handleClickButton() {
    dispatch(addFlightsPerPage());
  }

  return (
    <>
      <ul className="flights">
        {flights
          .map((i) => <Flight key={i.flightToken} flight={i.flight} />)
          .sort(sortFlights(sort))
          .slice(0, pagination)}
      </ul>
      {pagination < flights.length ? (
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
