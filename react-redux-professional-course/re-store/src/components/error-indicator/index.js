import './error-indicator.css';

const ErrorIndicator = ({error = 'please reload page'}) => {
  return (
    <div className="error-indicator">
      <span>
        something has gone terribly wrong - {error}
      </span>
    </div>
  );
};

export default ErrorIndicator;