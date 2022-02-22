import "./flight.css";
import Route from "../route/route";

export default function Flight() {
  return (
    <li className="flight">
      <div className="flight__title">
        <div
          className={`flight__carrier-logo flight__carrier-logo_type_LO`}
        ></div>
        <p className="flight__price">21049 &#8381;</p>
        <p className="flight__price-description">
          Стоимость для одного взрослого пассажира
        </p>
      </div>
      <ul className="routes">
        <Route />
        <Route />
      </ul>
      <button className="flight__button" type="button">
        выбрать
      </button>
    </li>
  );
}
