import "./airline.css";
import { toggleAirlines } from "../../store/filterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Airline({ code, caption }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const { airlines, minimalPrice } = useSelector((state) => state.flights);
  function handleOnChangeAirlines(e) {
    dispatch(toggleAirlines(e.target.value));
  }

  return (
    <li className="airline__item">
      <label className="airline__label" title={caption}>
        <input
          className="airline__checkbox"
          name={code}
          type="checkbox"
          value={code}
          checked={filter.airlines.includes(code)}
          onChange={handleOnChangeAirlines}
          disabled={!airlines.includes(code)}
        />
        <span className="airline__checkbox-visible"></span>
        <span
          className={`airline__checkbox-text ${
            !airlines.includes(code) ? "airline__checkbox-text_disabled" : ""
          }`}
        >
          {" "}
          - {caption}
        </span>
        {minimalPrice[code] ? (
          <span className="airline__checkbox-price">{`от ${minimalPrice[code]} р.`}</span>
        ) : null}
      </label>
    </li>
  );
}
