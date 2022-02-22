import "./flights.css";
import Flight from "../flight/flight";

export default function Flights() {
  return (
    <>
      <ul className="flights">
        <Flight />
      </ul>
      <button className="flights__button-more" type="button">
        Показать еще
      </button>
    </>
  );
}
