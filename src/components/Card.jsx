const Card = ({ title, items }) => {
  return (
    <div className="card">
      <h3>{title}</h3>

      {items.map((item, index) => (
        <div className="card-item" key={index}>
          <span>{item.label}</span>
          <b>{item.value}</b>
        </div>
      ))}
    </div>
  );
};

export default Card;
