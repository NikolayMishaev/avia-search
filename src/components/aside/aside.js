import "./aside.css";
import data from "../../flights.json";
import { useSelector, useDispatch } from "react-redux";
import { toggleSortingCriteria } from "../../store/sortSlice";
import {
  toggleOneTransfer,
  togglewithoutTransfers,
  addPriceFrom,
  addPriceUpTo,
} from "../../store/filterSlice";
import { resetFlightsPerPage } from "../../store/paginationSlice";
import {
  addAirline,
  resetAirline,
  setLoadingStatus,
  setMinimalPrice,
  setTotalFlightsFound,
} from "../../store/flightsSlice";
import { addFlight } from "../../store/flightsSlice";
import { useEffect, useState, useCallback } from "react";
import debounce from "debounce";
import { getMinValue } from "../../utils/utils";
import { AIRLINES_LIST } from "../../utils/constants";
import Airline from "../airline/airline";

export default function Aside() {
  const sort = useSelector((state) => state.sort.sortingCriteria);
  const filter = useSelector((state) => state.filter);
  const { loading } = useSelector((state) => state.flights);
  const dispatch = useDispatch();

  const [priceFrom, setPriceFrom] = useState("");
  const [priceUpTo, setPriceUpTo] = useState("");
  const [demoSpinner, setDemoSpinner] = useState(false);

  function handleOnChangeRadio(e) {
    dispatch(toggleSortingCriteria(e.target.value));
  }

  function handleOnChangeOneTransfer() {
    dispatch(toggleOneTransfer());
  }

  function handleOnChangewithOutTransfer() {
    dispatch(togglewithoutTransfers());
  }

  function handleInputValue({ name, value }) {
    name === "priceFrom"
      ? dispatch(addPriceFrom(Number(value || 0)))
      : dispatch(addPriceUpTo(Number(value || 0)));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFnFrom = useCallback(debounce(handleInputValue, 1000), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFnUpTo = useCallback(debounce(handleInputValue, 1000), []);

  function handleChangePrice(e) {
    switch (e.target.name) {
      case "priceFrom":
        setPriceFrom(e.target.value);
        debounceFnFrom({ name: e.target.name, value: e.target.value });
        break;
      case "priceUpTo":
        setPriceUpTo(e.target.value);
        debounceFnUpTo({ name: e.target.name, value: e.target.value });
        break;
      default:
        break;
    }
  }

  function checkFilterNumberTransfers(legs) {
    if (!filter.oneTransfer && !filter.withoutTransfers) {
      return true;
    }
    const oneTransfer = legs.every((i) => i.segments.length === 2);
    const withoutTransfers = legs.every((i) => i.segments.length === 1);
    if (filter.oneTransfer && filter.withoutTransfers) {
      return oneTransfer || withoutTransfers;
    }
    if (filter.oneTransfer) {
      return oneTransfer;
    }
    if (filter.withoutTransfers) {
      return withoutTransfers;
    }
  }

  function checkFilterPrice(amount) {
    if (filter.priceFrom && filter.priceUpTo) {
      return amount >= filter.priceFrom && amount <= filter.priceUpTo;
    }
    if (filter.priceFrom) {
      return amount >= filter.priceFrom;
    }
    if (filter.priceUpTo) {
      return amount <= filter.priceUpTo;
    }
    return true; // если фильтр цены не установлен, не учитывать этот фильтр
  }

  function checkFilterAirlines(airlineCode) {
    if (!filter.airlines.length) {
      return true;
    }
    return filter.airlines.includes(airlineCode);
  }

  useEffect(() => {
    dispatch(setLoadingStatus(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (demoSpinner) {
      return;
    }
    if (loading) {
      setTimeout(() => {
        dispatch(resetFlightsPerPage());
        if (
          filter.oneTransfer ||
          filter.withoutTransfers ||
          filter.priceFrom ||
          filter.priceUpTo
        ) {
          if (!filter.airlines.length) {
            dispatch(resetAirline());
          }
        }
        const priceFrom = {};
        const flights = data.result.flights.filter((i) => {
          if (
            checkFilterNumberTransfers(i.flight.legs) &&
            checkFilterPrice(i.flight.price.total.amount) &&
            checkFilterAirlines(i.flight.carrier.airlineCode)
          ) {
            const airlineCode = i.flight.carrier.airlineCode;
            const amount = i.flight.price.total.amount;
            priceFrom[airlineCode] = getMinValue(
              amount,
              priceFrom[airlineCode]
            );
            dispatch(addAirline(airlineCode));
            return true;
          }
          return false;
        });
        dispatch(setMinimalPrice(priceFrom));
        dispatch(setTotalFlightsFound(flights.length));
        dispatch(addFlight(flights));
        dispatch(setLoadingStatus(false));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  function handleClickButtonDemoSpinner() {
    setDemoSpinner(!demoSpinner);
    dispatch(setLoadingStatus(!loading));
  }

  return (
    <aside className="aside">
      <div className="aside__fixed">
        <div
          className={`aside__overlay ${loading ? "aside__overlay_active" : ""}`}
        ></div>
        <button
          className="aside__demo-spinner"
          onClick={handleClickButtonDemoSpinner}
        >
          {demoSpinner ? "выключить демо" : "демо спиннер"}
        </button>
        <div className="aside__group">
          <p className="aside__title">Сортировать</p>
          <label className="aside__label">
            <input
              className="aside__radio"
              name="price increase"
              type="radio"
              value="price increase"
              checked={sort === "price increase"}
              onChange={handleOnChangeRadio}
            />
            <span className="aside__radio-visible"></span>
            <span> - по возрастанию цены</span>
          </label>
          <label className="aside__label">
            <input
              className="aside__radio"
              name="price decrease"
              type="radio"
              value="price decrease"
              checked={sort === "price decrease"}
              onChange={handleOnChangeRadio}
            />
            <span className="aside__radio-visible"></span>
            <span> - по убыванию цены</span>
          </label>
          <label className="aside__label">
            <input
              className="aside__radio"
              name="travel time"
              type="radio"
              value="travel time"
              checked={sort === "travel time"}
              onChange={handleOnChangeRadio}
            />
            <span className="aside__radio-visible"></span>
            <span> - по времени в пути</span>
          </label>
        </div>
        <div className="aside__group">
          <p className="aside__title">Фильтровать</p>
          <label className="aside__label">
            <input
              className="aside__checkbox"
              name="oneTransfer"
              type="checkbox"
              checked={filter.oneTransfer}
              onChange={handleOnChangeOneTransfer}
            />
            <span className="aside__checkbox-visible"></span>
            <span> - 1 пересадка</span>
          </label>
          <label className="aside__label">
            <input
              className="aside__checkbox"
              name="withOutTransfer"
              type="checkbox"
              checked={filter.withOutTransfer}
              onChange={handleOnChangewithOutTransfer}
            />
            <span className="aside__checkbox-visible"></span>
            <span> - без пересадок</span>
          </label>
        </div>
        <div className="aside__group">
          <p className="aside__title">Цена</p>
          <label className="aside__label-price">
            <span>От</span>
            <input
              className="aside__input-price"
              name="priceFrom"
              type="number"
              min="0"
              step="5000"
              value={priceFrom || ""}
              onChange={handleChangePrice}
            />
          </label>
          <label className="aside__label-price">
            <span>До</span>
            <input
              className="aside__input-price"
              name="priceUpTo"
              type="number"
              min="0"
              step="5000"
              value={priceUpTo || ""}
              onChange={handleChangePrice}
            />
          </label>
        </div>
        <div className="aside__group">
          <p className="aside__title">Авиакомпании</p>
          <ul className="aside__airlines-list">
            {AIRLINES_LIST.map((i, c) => (
              <Airline key={c} code={i.code} caption={i.caption} />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
