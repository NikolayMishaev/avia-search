import "./flight.css";
import Route from "../route/route";

export default function Flight({ flight }) {
  return (
    <li className="flight">
      <div className="flight__title">
        <div
          className={`flight__carrier-logo flight__carrier-logo_type_${flight.carrier.airlineCode}`}
        ></div>
        <p className="flight__price">{flight.price.total.amount} &#8381;</p>
        <p className="flight__price-description">
          Стоимость для одного взрослого пассажира
        </p>
      </div>
      <ul className="routes">
        {flight.legs.map((i, c) => (
          <Route key={c} legs={i} carrier={flight.carrier.caption} />
        ))}
      </ul>
      <button className="flight__button" type="button">
        выбрать
      </button>
    </li>
  );
}
