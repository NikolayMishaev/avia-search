import "./route.css";
import { convertMinutesToHours, convertDateRUS } from "../../utils/utils";
import { format } from "date-fns";

export default function Route({ legs, carrier }) {
  const segments = legs.segments;
  const routeDetails = {};
  const oneTransfer = segments.length === 2;
  const numberSegments = oneTransfer ? 1 : 0;
  const departureDate = new Date(segments[0].departureDate);
  const arrivalDate = new Date(segments[numberSegments].arrivalDate);

  routeDetails.duration = convertMinutesToHours(legs.duration);
  routeDetails.departureCity = segments[0].departureCity?.caption || "";
  routeDetails.departureAirport = segments[0].departureAirport?.caption || "";
  routeDetails.departureCodeAirport = segments[0].departureAirport?.uid || "";
  routeDetails.departureTime = format(departureDate, "HH:mm");
  routeDetails.departureDate = convertDateRUS(
    format(departureDate, "dd.MM.EEEEEE")
  );

  routeDetails.arrivalCity =
    segments[numberSegments].arrivalCity?.caption || "";
  routeDetails.arrivalAirport =
    segments[numberSegments].arrivalAirport?.caption || "";
  routeDetails.arrivalCodeAirport =
    segments[numberSegments].arrivalAirport?.uid || "";
  routeDetails.arrivalTime = format(arrivalDate, "HH:mm");
  routeDetails.arrivalDate = convertDateRUS(
    format(arrivalDate, "dd.MM.EEEEEE")
  );
  return (
    <li className="route">
      <div className="route__row">
        <div className="route__departure">
          <span className="route__departure-city">
            {routeDetails.departureCity},{" "}
          </span>
          <span className="route__departure-airport">
            {routeDetails.departureAirport}{" "}
          </span>
          <span className="route__departure-uid">
            ({routeDetails.departureCodeAirport})
          </span>
        </div>
        <span className="route__arrow-pointer">&#10230;</span>
        <div className="route__arrival">
          <span className="route__arrival-city">
            {routeDetails.arrivalCity},{" "}
          </span>
          <span className="route__arrival-airport">
            {routeDetails.arrivalAirport}{" "}
          </span>
          <span className="route__arrival-uid">
            ({routeDetails.arrivalCodeAirport})
          </span>
        </div>
      </div>
      <div className="route__row route__row_type_space-between">
        <div className="route__departure">
          <span className="route__departure-time">
            {routeDetails.departureTime}
          </span>
          <span className="route__departure-date">
            {routeDetails.departureDate}
          </span>
        </div>
        <div className="route__duration">
          <div className="route__duration-picture"></div>
          <p className="route__duration-time">{routeDetails.duration}</p>
        </div>
        <div className="route__arrival">
          <span className="route__arrival-date">
            {routeDetails.arrivalDate}
          </span>
          <span className="route__arrival-time">
            {routeDetails.arrivalTime}
          </span>
        </div>
      </div>
      {oneTransfer ? (
        <div className="route__row">
          <div className="route__divisor route__divisor_type_left"></div>
          <span className="route__transfer">1 пересадка</span>
          <div className="route__divisor route__divisor_type_right"></div>
        </div>
      ) : (
        <div className="route__divisor"></div>
      )}
      <p className="route__airline">Рейс выполняет: {carrier}</p>
    </li>
  );
}
