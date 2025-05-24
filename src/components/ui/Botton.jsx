const Button = ({ children, className, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
