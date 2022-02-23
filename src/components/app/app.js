import "./app.css";
import Flights from "../flights/flights";
import Aside from "../aside/aside";

export default function App() {
  return (
    <>
      <Aside />
      <section className="avia-search">
        <Flights />
      </section>
    </>
  );
}
