export default function ProgressBar({ currentStep, totalSteps }) {
  // A simple calculation to fill the bar. 
  // Wait until user answers at least the first to fill. We'll add 1 to make it look like we are on step 1.
  const percentage = Math.min(((currentStep + 1) / totalSteps) * 100, 100);
  
  return (
    <div className="progress-container">
      <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
    </div>
  );
}
