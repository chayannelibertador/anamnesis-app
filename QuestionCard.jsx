import { useState, useEffect } from 'react';

export default function QuestionCard({ question, motivation, type = 'options', options, allowMultiple = false, onAnswer, onBack, selectedAnswer }) {
  const [textValue, setTextValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [otherText, setOtherText] = useState('');

  useEffect(() => {
    if (type === 'text' || type === 'textarea') {
      setTextValue(selectedAnswer || '');
      return;
    }
    
    if (selectedAnswer) {
      let answers = Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer];
      let opts = [];
      let oText = '';
      answers.forEach(ans => {
        if (typeof ans === 'string' && ans.startsWith('Otras: ')) {
          opts.push('Otras');
          oText = ans.replace('Otras: ', '');
        } else {
          opts.push(ans);
        }
      });
      setSelectedOptions(opts);
      setOtherText(oText);
    } else {
      setSelectedOptions([]);
      setOtherText('');
    }
  }, [question, selectedAnswer, type]);

  const handleNextClick = () => {
    if (type === 'text' || type === 'textarea') {
      if (textValue.trim() !== '') onAnswer(textValue);
    } else {
      // Build final answer for options
      let finalAnswers = [];
      selectedOptions.forEach(opt => {
        if (opt === 'Otras') {
          if (otherText.trim() !== '') finalAnswers.push(`Otras: ${otherText.trim()}`);
        } else {
          finalAnswers.push(opt);
        }
      });

      if (finalAnswers.length > 0) {
        onAnswer(allowMultiple ? finalAnswers : finalAnswers[0]);
      }
    }
  };

  const handleOptionClick = (opt) => {
    if (allowMultiple) {
      // Handle mutually exclusive options like 'Ninguna' or 'Ninguno' or 'Ninguna molestia'
      const isNone = ['Ninguna', 'Ninguno', 'Ninguna molestia'].includes(opt);
      
      if (isNone) {
        if (selectedOptions.includes(opt)) {
          setSelectedOptions([]);
        } else {
          setSelectedOptions([opt]);
        }
      } else {
        let newOpts = selectedOptions.filter(o => !['Ninguna', 'Ninguno', 'Ninguna molestia'].includes(o));
        if (newOpts.includes(opt)) {
          newOpts = newOpts.filter(o => o !== opt);
        } else {
          newOpts.push(opt);
        }
        setSelectedOptions(newOpts);
      }
    } else {
      setSelectedOptions([opt]);
      if (opt !== 'Otras') {
        onAnswer(opt);
      }
    }
  };

  const isNextDisabled = () => {
    if (type === 'text' || type === 'textarea') return textValue.trim() === '';
    if (selectedOptions.length === 0) return true;
    if (selectedOptions.includes('Otras') && otherText.trim() === '') return true;
    return false;
  };

  return (
    <div className="glass-panel" style={{ animation: 'slideInUp 0.4s ease forwards' }}>
      <h2 className="question-title">{question}</h2>
      {motivation && <p className="motivation-text">"{motivation}"</p>}
      
      <div className="options-container">
        {(type === 'options' || type === 'options-with-other') && options && options.map((opt, idx) => (
          <button 
            key={idx} 
            className={`option-btn ${selectedOptions.includes(opt) ? 'selected' : ''}`}
            onClick={() => handleOptionClick(opt)}
          >
            {opt}
          </button>
        ))}

        {selectedOptions.includes('Otras') && (
          <div style={{ width: '100%', marginTop: '10px' }}>
            <input
              type="text"
              className="option-btn text-input"
              style={{ textAlign: 'left', cursor: 'text' }}
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Contame más detalles..."
              onKeyDown={(e) => e.key === 'Enter' && !isNextDisabled() && handleNextClick()}
              autoFocus
            />
          </div>
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
              onKeyDown={(e) => e.key === 'Enter' && !isNextDisabled() && handleNextClick()}
              autoFocus
            />
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
              autoFocus
            />
          </div>
        )}

        <div style={{ display: 'flex', width: '100%', gap: '10px', marginTop: '15px' }}>
          {onBack && (
            <button 
              className="option-btn" 
              style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 'bold' }}
              onClick={onBack}
            >
              ← Volver
            </button>
          )}
          
          {(allowMultiple || type === 'text' || type === 'textarea' || selectedOptions.includes('Otras')) && (
            <button 
              className="option-btn" 
              style={{ flex: 2, background: 'var(--neon-color)', color: '#000', border: 'none', fontWeight: 'bold', opacity: isNextDisabled() ? 0.5 : 1, cursor: isNextDisabled() ? 'not-allowed' : 'pointer' }}
              onClick={handleNextClick}
              disabled={isNextDisabled()}
            >
              Siguiente ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
