import "./aside.css";
import data from "../../flights.json";
import { useSelector, useDispatch } from "react-redux";
import { toggleSortingCriteria } from "../../store/sortSlice";
import {
  toggleOneTransfer,
  togglewithoutTransfers,
  toggleAirlines,
  addPriceFrom,
  addPriceUpTo,
} from "../../store/filterSlice";
import { resetFlightsPerPage } from "../../store/paginationSlice";
import {
  addAirline,
  resetAirline,
  setLoadingStatus,
} from "../../store/flightsSlice";
import { addFlight } from "../../store/flightsSlice";
import { useEffect, useState, useCallback } from "react";
import debounce from "debounce";

export default function Aside() {
  const sort = useSelector((state) => state.sort.sortingCriteria);
  const filter = useSelector((state) => state.filter);
  const airlinesList = useSelector((state) => state.flights.airlines);
  const loading = useSelector((state) => state.flights.loading);
  const dispatch = useDispatch();

  const [priceFrom, setPriceFrom] = useState("");
  const [priceUpTo, setPriceUpTo] = useState("");

  console.log(filter.priceFrom);

  function handleOnChangeRadio(e) {
    dispatch(toggleSortingCriteria(e.target.value));
  }

  function handleOnChangeOneTransfer() {
    dispatch(toggleOneTransfer());
  }

  function handleOnChangewithOutTransfer() {
    dispatch(togglewithoutTransfers());
  }

  function handleOnChangeAirlines(e) {
    dispatch(toggleAirlines(e.target.value));
  }

  function handleInputValue({ name, value }) {
    name === "priceFrom"
      ? dispatch(addPriceFrom(Number(value || 0)))
      : dispatch(addPriceUpTo(Number(value || 0)));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(handleInputValue, 1000), []);

  function handleChangePrice(e) {
    switch (e.target.name) {
      case "priceFrom":
        setPriceFrom(e.target.value);
        debounceFn({ name: e.target.name, value: e.target.value });
        break;
      case "priceUpTo":
        setPriceUpTo(e.target.value);
        debounceFn({ name: e.target.name, value: e.target.value });
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

  // useEffect(() => {
  //   console.log("filter");
  //   dispatch(setLoadingStatus(true));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filter]);

  useEffect(() => {
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
    const flights = data.result.flights.filter((i) => {
      if (
        checkFilterNumberTransfers(i.flight.legs) &&
        checkFilterPrice(i.flight.price.total.amount) &&
        checkFilterAirlines(i.flight.carrier.airlineCode)
      ) {
        dispatch(addAirline(i.flight.carrier.airlineCode));
        return true;
      }
      return false;
    });
    console.log(flights.length);
    dispatch(addFlight(flights));
    // dispatch(setLoadingStatus(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <aside className="aside">
      <div className="aside__fixed">
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
              value={priceUpTo || ""}
              onChange={handleChangePrice}
            />
          </label>
        </div>
        <div className="aside__group">
          <p className="aside__title">Авиакомпании</p>
          <ul className="aside__airlines-list">
            <li className="aside__airlines-item">
              <label
                className="aside__label"
                title="Air Baltic Corporation A/S"
              >
                <input
                  className="aside__checkbox"
                  name="BT"
                  type="checkbox"
                  value="BT"
                  checked={filter.airlines.includes("BT")}
                  onChange={handleOnChangeAirlines}
                  disabled={!airlinesList.includes("BT")}
                />
                <span className="aside__checkbox-visible"></span>
                <span
                  className={`aside__checkbox-text ${
                    !airlinesList.includes("BT")
                      ? "aside__checkbox-text_disabled"
                      : ""
                  }`}
                >
                  {" "}
                  - Air Baltic Corporation A/S
                </span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label className="aside__label" title="Air France">
                <input
                  className="aside__checkbox"
                  name="AF"
                  type="checkbox"
                  value="AF"
                  checked={filter.airlines.includes("AF")}
                  onChange={handleOnChangeAirlines}
                  disabled={!airlinesList.includes("AF")}
                />
                <span className="aside__checkbox-visible"></span>
                <span
                  className={`aside__checkbox-text ${
                    !airlinesList.includes("AF")
                      ? "aside__checkbox-text_disabled"
                      : ""
                  }`}
                >
                  {" "}
                  - Air France
                </span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label
                className="aside__label"
                title="Alitalia Societa Aerea Italiana"
              >
                <input
                  className="aside__checkbox"
                  name="AZ"
                  type="checkbox"
                  value="AZ"
                  checked={filter.airlines.includes("AZ")}
                  onChange={handleOnChangeAirlines}
                  disabled={!airlinesList.includes("AZ")}
                />
                <span className="aside__checkbox-visible"></span>
                <span
                  className={`aside__checkbox-text ${
                    !airlinesList.includes("AZ")
                      ? "aside__checkbox-text_disabled"
                      : ""
                  }`}
                >
                  {" "}
                  - Alitalia Societa Aerea Italiana
                </span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label className="aside__label" title="Brussels Airlines">
                <input
                  className="aside__checkbox"
                  name="SN"
                  type="checkbox"
                  value="SN"
                  checked={filter.airlines.includes("SN")}
                  onChange={handleOnChangeAirlines}
                  disabled={!airlinesList.includes("SN")}
                />
                <span className="aside__checkbox-visible"></span>
                <span
                  className={`aside__checkbox-text ${
                    !airlinesList.includes("SN")
                      ? "aside__checkbox-text_disabled"
                      : ""
                  }`}
                >
                  {" "}
                  - Brussels Airlines
                </span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label className="aside__label" title="Finnair Oyj">
                <input
                  className="aside__checkbox"
                  name="AY"
                  type="checkbox"
                  value="AY"
                  checked={filter.airlines.includes("AY")}
                  onChange={handleOnChangeAirlines}
                  disabled={!airlinesList.includes("AY")}
                />
                <span className="aside__checkbox-visible"></span>
                <span
                  className={`aside__checkbox-text ${
                    !airlinesList.includes("AY")
                      ? "aside__checkbox-text_disabled"
                      : ""
                  }`}
                >
                  {" "}
                  - Finnair Oyj
                </span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label className="aside__label" title="KLM">
                <input
                  className="aside__checkbox"
                  name="KL"
                  type="checkbox"
                  value="KL"
                  checked={filter.airlines.includes("KL")}
                  onChange={handleOnChangeAirlines}
                  disabled={!airlinesList.includes("KL")}
                />
                <span className="aside__checkbox-visible"></span>
                <span
                  className={`aside__checkbox-text ${
                    !airlinesList.includes("KL")
                      ? "aside__checkbox-text_disabled"
                      : ""
                  }`}
                >
                  {" "}
                  - KLM
                </span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label className="aside__label" title="LOT Polish Airlines">
                <input
                  className="aside__checkbox"
                  name="LO"
                  type="checkbox"
                  value="LO"
                  checked={filter.airlines.includes("LO")}
                  onChange={handleOnChangeAirlines}
                  disabled={!airlinesList.includes("LO")}
                />
                <span className="aside__checkbox-visible"></span>
                <span
                  className={`aside__checkbox-text ${
                    !airlinesList.includes("LO")
                      ? "aside__checkbox-text_disabled"
                      : ""
                  }`}
                >
                  {" "}
                  - LOT Polish Airlines
                </span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label
                className="aside__label"
                title="Pegasus Hava Tasimaciligi A.S."
              >
                <input
                  className="aside__checkbox"
                  name="PC"
                  type="checkbox"
                  value="PC"
                  checked={filter.airlines.includes("PC")}
                  onChange={handleOnChangeAirlines}
                  disabled={!airlinesList.includes("PC")}
                />
                <span className="aside__checkbox-visible"></span>
                <span
                  className={`aside__checkbox-text ${
                    !airlinesList.includes("PC")
                      ? "aside__checkbox-text_disabled"
                      : ""
                  }`}
                >
                  {" "}
                  - Pegasus Hava Tasimaciligi A.S.
                </span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label className="aside__label" title="TURK HAVA YOLLARI A.O.">
                <input
                  className="aside__checkbox"
                  name="TK"
                  type="checkbox"
                  value="TK"
                  checked={filter.airlines.includes("TK")}
                  onChange={handleOnChangeAirlines}
                  disabled={!airlinesList.includes("TK")}
                />
                <span className="aside__checkbox-visible"></span>
                <span
                  className={`aside__checkbox-text ${
                    !airlinesList.includes("TK")
                      ? "aside__checkbox-text_disabled"
                      : ""
                  }`}
                >
                  {" "}
                  - TURK HAVA YOLLARI A.O.
                </span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label
                className="aside__label"
                title="Аэрофлот - российские авиалинии"
              >
                <input
                  className="aside__checkbox"
                  name="SU"
                  type="checkbox"
                  value="SU"
                  checked={filter.airlines.includes("SU")}
                  onChange={handleOnChangeAirlines}
                  disabled={!airlinesList.includes("SU")}
                />
                <span className="aside__checkbox-visible"></span>
                <span
                  className={`aside__checkbox-text ${
                    !airlinesList.includes("SU")
                      ? "aside__checkbox-text_disabled"
                      : ""
                  }`}
                >
                  {" "}
                  - Аэрофлот - российские авиалинии
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
