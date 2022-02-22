import "./app.css";
// import data from "../../test.json";
import data from "../../flights.json";
import Flights from "../flights/flights";
import Aside from "../aside/aside";

export default function App() {
  console.log(data.result);
  return (
    <>
      <Aside />
      <section className="avia-search">
        <Flights />
      </section>
    </>
  );
}
