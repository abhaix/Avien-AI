import { useState } from "react";
import { TitleSm } from "./Title";
import { HiOutlineArrowRight } from "react-icons/hi";

export const Card = ({ data, caption, show }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card">
      <div className="card-img">
        <img src={data.cover} alt={data.title} />
      </div>
      <div className="card-details">
        {/* ✅ Clicking the title now expands/collapses details instead of opening a page */}
        <h3 className="title-clickable" onClick={() => setExpanded(!expanded)}>
          <TitleSm title={data.title} />
        </h3>

        {/* ✅ Prevented navigation on Learn More button */}
        {caption && (
          <button className="learn-more-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show Less" : caption} <HiOutlineArrowRight className="link-icon" />
          </button>
        )}

        <div className="flex">
          <span>{data.category}</span> {data.date && <span>/ {data.date}</span>}
        </div>

        {/* ✅ Safe check to prevent errors when mapping `data.desc` */}
        {expanded && show && data.desc && Array.isArray(data.desc) && (
          <ul>
            {data.desc.map((text, i) => (
              <li key={i}>- {text.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
