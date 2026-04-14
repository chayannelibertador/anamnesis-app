import { useState, useEffect } from 'react';

export default function QuestionCard({ question, motivation, type = 'options', options, onAnswer, selectedAnswer }) {
  const [textValue, setTextValue] = useState(selectedAnswer || '');
  const [selectedOption, setSelectedOption] = useState(null);
  const [otherText, setOtherText] = useState('');

  useEffect(() => {
    setTextValue(selectedAnswer || '');
    setSelectedOption(null);
    setOtherText('');
  }, [question, selectedAnswer]);

  const handleNextClick = () => {
    if (textValue.trim() !== '') {
      onAnswer(textValue);
    }
  };

  return (
    <div className="glass-panel" style={{ animation: 'slideInUp 0.4s ease forwards' }}>
      <h2 className="question-title">{question}</h2>
      {motivation && <p className="motivation-text">"{motivation}"</p>}
      
      <div className="options-container">
        {type === 'options' && options && options.map((opt, idx) => (
          <button 
            key={idx} 
            className={`option-btn ${selectedAnswer === opt ? 'selected' : ''}`}
            onClick={() => onAnswer(opt)}
          >
            {opt}
          </button>
        ))}

        {type === 'options-with-other' && options && (
          <>
            {options.map((opt, idx) => (
              <button
                key={idx}
                className={`option-btn ${selectedOption === opt ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedOption(opt);
                  if (opt !== 'Otras') {
                    onAnswer(opt);
                  }
                }}
              >
                {opt}
              </button>
            ))}
            {selectedOption === 'Otras' && (
              <div style={{ width: '100%', marginTop: '10px' }}>
                <input
                  type="text"
                  className="option-btn text-input"
                  style={{ textAlign: 'left', cursor: 'text' }}
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder="Contame más detalles..."
                  onKeyDown={(e) => e.key === 'Enter' && otherText.trim() !== '' && onAnswer(`Otras: ${otherText.trim()}`)}
                  autoFocus
                />
                <button
                  className="option-btn"
                  style={{ marginTop: '12px', background: 'var(--neon-color)', color: '#000', border: 'none', fontWeight: 'bold' }}
                  onClick={() => onAnswer(`Otras: ${otherText.trim()}`)}
                  disabled={otherText.trim() === ''}
                >
                  Siguiente ✓
                </button>
              </div>
            )}
          </>
        )}

        {type === 'text' && (
          <div style={{width: '100%'}}>
            <input 
              type="text" 
              className="option-btn text-input" 
              style={{ textAlign: 'left', cursor: 'text' }}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              onKeyDown={(e) => e.key === 'Enter' && handleNextClick()}
            />
            <button 
              className="option-btn" 
              style={{ marginTop: '15px', background: 'var(--neon-color)', color: '#000', border: 'none', fontWeight: 'bold' }}
              onClick={handleNextClick}
              disabled={textValue.trim() === ''}
            >
              Siguiente ✓
            </button>
          </div>
        )}

        {type === 'textarea' && (
          <div style={{width: '100%'}}>
            <textarea 
              className="option-btn text-input" 
              style={{ textAlign: 'left', cursor: 'text', minHeight: '120px', resize: 'vertical' }}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
            />
            <button 
              className="option-btn" 
              style={{ marginTop: '15px', background: 'var(--neon-color)', color: '#000', border: 'none', fontWeight: 'bold' }}
              onClick={handleNextClick}
              disabled={textValue.trim() === ''}
            >
              Siguiente ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
