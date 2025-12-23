import { TitleSm } from "./Title";
import { HiOutlineArrowRight } from "react-icons/hi";

export const Card = ({ data, caption, show, path }) => {
  return (
    <>
      <div className="card">
        <div className="card-img">
          <img src={data.cover} alt={data.title} />
        </div>
        <div className="card-details">
          {/* For Showcase, check for external link */}
          {data.link ? (
            <a href={data.link} target="_blank" rel="noreferrer" className="title-link">
              <TitleSm title={data.title} />
            </a>
          ) : path ? (
            <a href="#" className="title-link">
              <TitleSm title={data.title} />
            </a>
          ) : (
            <TitleSm title={data.title} />
          )}

          {/* Learn More Link (Only for Services, not for Showcase) */}
          {caption && path && (
            <a href="#">
              {caption} <HiOutlineArrowRight className="link-icon" />
            </a>
          )}

          {/* Category & Date (Handles Both Services & Showcase Data) */}
          <div className="flex">
            <span>{data.category || data.catgeory}</span>
            {data.date && <span> / {data.date}</span>}
          </div>

          {/* Description (Only for Services, not Showcase) */}
          {show && data.desc && Array.isArray(data.desc) && (
            <ul>
              {data.desc.map((text, i) => (
                <li key={i}>- {text.text}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
