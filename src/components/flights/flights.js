import "./flights.css";
import Flight from "../flight/flight";
import { useSelector } from "react-redux";

export default function Flights() {
  const flights = useSelector((state) => state.flights.flights);
  console.log(flights);
  return (
    <>
      <ul className="flights">
        {flights.map((i) => (
          <Flight key={i.flightToken} flight={i.flight} />
        ))}
      </ul>
      <button className="flights__button-more" type="button">
        Показать еще
      </button>
    </>
  );
}
