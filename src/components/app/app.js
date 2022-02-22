import "./app.css";
// import data from "../../db.json";
import data from "../../flights.json";
import { useState, useEffect } from "react";

function App() {
  const [ticket, setTicket] = useState([]);
  const [but, setBut] = useState(false);

  function value() {
    return but ? 1 : 2;
  }

  useEffect(() => {
    const test = data.result.flights.filter((i) =>
      i.flight.legs[0].segments.length === value() ? i : ""
    );
    setTicket(test);
  }, [but]);

  return (
    <>
      <button onClick={() => setBut((state) => !state)} type="button">
        click here
      </button>
      <div
        style={{ display: "flex", flexDirection: "column", marginBottom: 20 }}
      >
        Сортировать
        <label>
          <input name="one" type="radio" />
          <span>по возрастанию цены</span>
        </label>
        <label>
          <input name="one" type="radio" />
          <span>по убыванию цены</span>
        </label>
        <label>
          <input name="one" type="radio" />
          <span>по времени в пути</span>
        </label>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", marginBottom: 20 }}
      >
        Фильтровать
        <label>
          <input name="one" type="checkbox" />
          <span>1 пересадка</span>
        </label>
        <label>
          <input name="two" type="checkbox" />
          <span>без пересадок</span>
        </label>
      </div>
      <div
        style={{ display: "flex", marginBottom: 20, flexDirection: "column" }}
      >
        {" "}
        Цена
        <div>
          <span>От</span>
          <input type="text" />
        </div>
        <div>
          <span>До</span>
          <input type="text" />
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", marginBottom: 20 }}
      >
        Авиакомпании
        <label>
          <input name="LOT" type="checkbox" />
          <span>LOT Polish Airlines</span>
        </label>
        <label>
          <input name="AIR" type="checkbox" />
          <span>Аэрофлот</span>
        </label>
      </div>
    </>
  );
}

export default App;
