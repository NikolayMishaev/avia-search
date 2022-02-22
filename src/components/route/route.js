import "./route.css";

export default function Route() {
  return (
    <li className="route">
      <div className="route__row">
        <div className="route__departure">
          <span className="route__departure-city">Москва, </span>
          <span className="route__departure-airport">ШЕРЕМЕТЬЕВО </span>
          <span className="route__departure-uid">(SVO)</span>
        </div>
        <span className="route__arrow-pointer">&#10230;</span>
        <div className="route__arrival">
          <span className="route__arrival-city">ЛОНДОН, </span>
          <span className="route__arrival-airport">Лондон, Хитроу </span>
          <span className="route__arrival-uid">(LHR)</span>
        </div>
      </div>
      <div className="route__row route__row_type_space-between">
        <div className="route__departure">
          <span className="route__departure-time">20:40</span>
          <span className="route__departure-date">18 авг. вт</span>
        </div>
        <div className="route__duration">
          <div className="route__duration-picture"></div>
          <p className="route__duration-time">14 ч 45 мин</p>
        </div>
        <div className="route__arrival">
          <span className="route__arrival-date">20 авг. чт</span>
          <span className="route__arrival-time">09:25</span>
        </div>
      </div>
      {/* <div className="route__divisor"></div> */}
      <div className="route__row">
        <div className="route__divisor route__divisor_type_left"></div>
        <span className="route__transfer">1 пересадка</span>
        <div className="route__divisor route__divisor_type_right"></div>
      </div>
      <p className="route__airline">Рейс выполняет: LOT Polish Airlines</p>
    </li>
  );
}
