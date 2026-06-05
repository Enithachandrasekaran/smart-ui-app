import "./SkeletonLoaders.css";

const SkeletonBlock = ({ className = "" }) => (
  <span className={`skeleton-block ${className}`} aria-hidden="true" />
);

export const PageSkeleton = ({ message = "Loading page" }) => {
  return (
    <div className="skeleton-page" role="status" aria-label={message}>
      <div className="simple-page-loader" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
};

export const TableSkeleton = ({ rows = 6, columns = 7 }) => {
  return (
    <div className="skeleton-table-wrap" role="status" aria-label="Loading table">
      <div className="skeleton-table-header">
        {Array.from({ length: columns }).map((_, index) => (
          <SkeletonBlock key={`head-${index}`} className="skeleton-table-head" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div className="skeleton-table-row" key={`row-${rowIndex}`}>
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <SkeletonBlock
              key={`row-${rowIndex}-column-${columnIndex}`}
              className={columnIndex === 0 ? "skeleton-cell skeleton-cell-wide" : "skeleton-cell"}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const ButtonSkeleton = ({ label = "Loading" }) => {
  return (
    <span className="skeleton-button-content">
      <SkeletonBlock className="skeleton-button-dot" />
      {label}
    </span>
  );
};
