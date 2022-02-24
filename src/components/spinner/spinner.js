import "./spinner.css";

export default function Spinner({ searchWord }) {
  return (
    <div className="positioning-container">
      <p className="loading-text">{searchWord}</p>
      <div className="spinning-container">
        <div className="airplane-container">
          <span className="fa fa-plane"></span>
        </div>
      </div>
    </div>
  );
}
