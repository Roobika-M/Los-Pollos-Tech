const name1 = "walt jr"
function Button({ onClick }) {
  return (
    <div className = "walt">
    <h3>{name1}</h3>
    <button onClick={onClick}>
      Click Me
    </button>
    </div>
  );
}

export default Button;