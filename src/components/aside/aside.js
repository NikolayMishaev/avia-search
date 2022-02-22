import "./aside.css";

export default function Aside() {
  return (
    <aside className="aside">
      <div className="aside__fixed">
        <div className="aside__group">
          <p className="aside__title">Сортировать</p>
          <label className="aside__label">
            <input className="aside__radio" name="one" type="radio" />
            <span className="aside__radio-visible"></span>
            <span> - по возрастанию цены</span>
          </label>
          <label className="aside__label">
            <input className="aside__radio" name="one" type="radio" />
            <span className="aside__radio-visible"></span>
            <span> - по убыванию цены</span>
          </label>
          <label className="aside__label">
            <input className="aside__radio" name="one" type="radio" />
            <span className="aside__radio-visible"></span>
            <span> - по времени в пути</span>
          </label>
        </div>
        <div className="aside__group">
          <p className="aside__title">Фильтровать</p>
          <label className="aside__label">
            <input className="aside__checkbox" name="one" type="checkbox" />
            <span className="aside__checkbox-visible"></span>
            <span> - 1 пересадка</span>
          </label>
          <label className="aside__label">
            <input className="aside__checkbox" name="two" type="checkbox" />
            <span className="aside__checkbox-visible"></span>
            <span> - без пересадок</span>
          </label>
        </div>
        <div className="aside__group">
          <p className="aside__title">Цена</p>
          <label className="aside__label-price">
            <span>От</span>
            <input className="aside__input-price" type="number" min="0" />
          </label>
          <label className="aside__label-price">
            <span>До</span>
            <input className="aside__input-price" type="number" min="0" />
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
                <input className="aside__checkbox" name="LOT" type="checkbox" />
                <span className="aside__checkbox-visible"></span>
                <span> - Air Baltic Corporation A/S</span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label className="aside__label" title="Air France">
                <input className="aside__checkbox" name="AIR" type="checkbox" />
                <span className="aside__checkbox-visible"></span>
                <span> - Air France</span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label
                className="aside__label"
                title="Alitalia Societa Aerea Italiana"
              >
                <input className="aside__checkbox" name="AIR" type="checkbox" />
                <span className="aside__checkbox-visible"></span>
                <span> - Alitalia Societa Aerea Italiana</span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label className="aside__label" title="Brussels Airlines">
                <input className="aside__checkbox" name="AIR" type="checkbox" />
                <span className="aside__checkbox-visible"></span>
                <span> - Brussels Airlines</span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label className="aside__label" title="Finnair Oyj">
                <input className="aside__checkbox" name="AIR" type="checkbox" />
                <span className="aside__checkbox-visible"></span>
                <span> - Finnair Oyj</span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label className="aside__label" title="KLM">
                <input className="aside__checkbox" name="AIR" type="checkbox" />
                <span className="aside__checkbox-visible"></span>
                <span> - KLM</span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label className="aside__label" title="LOT Polish Airlines">
                <input className="aside__checkbox" name="AIR" type="checkbox" />
                <span className="aside__checkbox-visible"></span>
                <span> - LOT Polish Airlines</span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label
                className="aside__label"
                title="Pegasus Hava Tasimaciligi A.S."
              >
                <input className="aside__checkbox" name="AIR" type="checkbox" />
                <span className="aside__checkbox-visible"></span>
                <span> - Pegasus Hava Tasimaciligi A.S.</span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label className="aside__label" title="TURK HAVA YOLLARI A.O.">
                <input className="aside__checkbox" name="AIR" type="checkbox" />
                <span className="aside__checkbox-visible"></span>
                <span> - TURK HAVA YOLLARI A.O.</span>
              </label>
            </li>
            <li className="aside__airlines-item">
              <label
                className="aside__label"
                title="Аэрофлот - российские авиалинии"
              >
                <input className="aside__checkbox" name="AIR" type="checkbox" />
                <span className="aside__checkbox-visible"></span>
                <span> - Аэрофлот - российские авиалинии</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
