import { useState } from 'react';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const questions = [
  {
    id: '01_Nombre',
    question: '¿Cuál es tu nombre completo?',
    motivation: 'Empecemos por conocernos.',
    type: 'text'
  },
  {
    id: '02_Edad',
    question: '¿Qué edad tienes?',
    motivation: 'La edad biológica importa menos que tus ganas.',
    type: 'options',
    options: ['15 a 25 años', '26 a 35 años', '36 a 45 años', 'Más de 45 años']
  },
  {
    id: '03_Altura',
    question: '¿Cuánto mides?',
    motivation: 'En centímetros o metros (Ej. 175 o 1.75)',
    type: 'text'
  },
  {
    id: '04_Peso_Actual',
    question: '¿Cuál es tu peso actual aproximado?',
    motivation: 'No te obsesiones con el número, es solo un punto de partida. (Ej. 80)',
    type: 'text'
  },
  {
    id: '05_Genero',
    question: '¿Con qué género te identificas?',
    motivation: 'Saber esto me permite ajustar algunos detalles y cálculos metabólicos del plan.',
    type: 'options',
    options: ['Hombre', 'Mujer']
  },
  {
    id: '06_WhatsApp',
    question: '¿Cuál es tu número de teléfono / WhatsApp?',
    motivation: 'Para estar siempre en contacto.',
    type: 'text'
  },
  {
    id: '07_Ocupacion',
    question: '¿Cómo es el desgaste físico en tu rutina o trabajo diario?',
    motivation: 'Adaptaremos el plan a tu ritmo de vida para que la energía te acompañe todo el día.',
    type: 'options-with-other',
    options: ['Oficina / Escritorio', 'Comercio / Docencia', 'Trabajo físico / Activo', 'Otras']
  },
  {
    id: '08_Objetivo',
    question: '¿Qué buscas lograr específicamente?',
    motivation: 'Metas claras traen resultados claros.',
    type: 'options',
    options: ['Pérdida de grasa', 'Ganar masa muscular / Fuerza', 'Salud general', 'Estética']
  },
  {
    id: '09_Plazo',
    question: '¿En qué plazo te gustaría ver resultados notables?',
    motivation: 'Para ajustar la intensidad de forma sensata.',
    type: 'options',
    options: ['1 a 3 meses (Acelerado)', '3 a 6 meses (Progresivo)', 'A largo plazo (Estilo de vida)']
  },
  {
    id: '10_Tiempo_Inactivo',
    question: '¿Cuánto tiempo hace que no entrenas de forma regular?',
    motivation: 'No importa cuánto tiempo pasó, lo importante es que hoy decidiste volver. Cada gran transformación empieza con este mismo paso.',
    type: 'options',
    options: ['Menos de 1 mes', 'De 1 a 6 meses', 'Más de 6 meses', 'Nunca entrené', 'Entreno actualmente']
  },
  {
    id: '11_Enfermedades_Medicacion',
    question: '¿Padeces alguna enfermedad crónica o tomas medicación?',
    motivation: 'Es importante para adaptar el plan a tu situación real.',
    type: 'options-with-other',
    options: ['Ninguna', 'Enfermedad cardíaca', 'Problemas respiratorios', 'Diabetes', 'Presión alta o baja', 'Otras']
  },
  {
    id: '12_Lesiones',
    question: '¿Tienes alguna lesión actual o pasada?',
    motivation: 'Es clave para protegerte y diseñar un plan seguro.',
    type: 'options-with-other',
    options: ['Ninguna', 'Rodilla', 'Hombro', 'Columna', 'Tobillo', 'Otras']
  },
  {
    id: '13_Dolores',
    question: '¿Sientes molestias recurrentes en alguna articulación?',
    motivation: 'Al realizar algún esfuerzo...',
    type: 'options',
    options: ['Espalda', 'Hombro', 'Rodilla', 'Otras', 'Ninguna molestia']
  },
  {
    id: '14_Horas_Sueno',
    question: '¿Cuántas horas duermes en promedio?',
    motivation: 'El sueño profundo es donde tus músculos se recuperan.',
    type: 'options',
    options: ['Menos de 5 horas', 'Entre 5 y 7 horas', 'Entre 7 y 8 horas', 'Más de 8 horas']
  },
  {
    id: '15_Comidas_Dia',
    question: '¿Cuántas comidas realizas al día en promedio?',
    motivation: 'La alimentación es el 70% de tu resultado. Entrenamos fuerte, pero comemos más inteligente.',
    type: 'options',
    options: ['1 a 2 comidas', '3 comidas', '4 comidas', 'Más de 4 comidas']
  },
  {
    id: '16_Agua',
    question: 'Hablando sinceramente, ¿cómo vienes con tu consumo de agua?',
    motivation: 'El cuerpo necesita estar hidratado para que la magia suceda. 💧',
    type: 'options',
    options: ['Tomo una excelente cantidad', 'Lo normal, intento cumplir', 'Me cuesta bastante tomar agua', 'Casi no tomo agua pura']
  },
  {
    id: '17_Habitos',
    question: '¿Tienes hábitos que puedan afectar el rendimiento?',
    motivation: 'Cigarrillo, alcohol excesivo, mal descanso, etc.',
    type: 'options',
    options: ['Ninguno', 'Fumo', 'Alcohol frecuente', 'Mucho sedentarismo', 'Varios juntos']
  },
  {
    id: '18_Dias_Entrenamiento',
    question: '¿Cuántos días por semana puedes comprometerte a entrenar?',
    motivation: 'Cualquier número es mejor que cero.',
    type: 'options',
    options: ['2 días', '3 días', '4 días', '5 o más días']
  },
  {
    id: '19_Tiempo_Sesion',
    question: '¿Cuánto tiempo aproximado tienes por sesión?',
    motivation: 'Se logran maravillas con poco pero enfocado tiempo.',
    type: 'options',
    options: ['30 a 45 min', '1 hora', 'Más de 1 hora']
  },
  {
    id: '20_Motivacion',
    question: 'Por último, ¿qué te motivó a empezar a entrenar hoy?',
    motivation: 'Cuéntame qué hizo el "click" en tu cabeza.',
    type: 'textarea'
  }
];

export default function AnamnesisForm({ theme, setTheme }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formspree Endpoint 
  const FORMSPREE_URL = 'https://formspree.io/f/xbdqlqjb';
  
  // BMI Result state
  const [showBmiResult, setShowBmiResult] = useState(false);
  const [bmiData, setBmiData] = useState(null);

  const calculateBMI = (heightInput, weightInput, gender) => {
    if (!heightInput || !weightInput) return null;
    let h = parseFloat(heightInput.toString().replace(',', '.').replace(/[^0-9.]/g, ''));
    if (isNaN(h)) return null;
    if (h > 3) h = h / 100; // cm to m
    
    let w = parseFloat(weightInput.toString().replace(',', '.').replace(/[^0-9.]/g, ''));
    if (isNaN(w) || h <= 0 || w <= 0) return null;

    const bmi = w / (h * h);
    let category = '';
    let message = '';

    if (bmi < 18.5) {
      category = 'Posible déficit de peso';
      message = '¡No te preocupes! Según tu IMC estimado, podrías estar por debajo de tu peso óptimo. Vamos a enfocar el plan en nutrir tu cuerpo, ganar masa muscular progresivamente y devolverte la energía que te mereces.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = 'Peso en rango saludable';
      message = '¡Excelente punto de partida! Según tu IMC estimado, tu relación peso-talla es óptima. Nos enfocaremos en tonificar, construir fuerza, moldear y mejorar tu agilidad general.';
    } else if (bmi > 24.9 && bmi < 30) {
      category = 'Posible leve sobrepeso';
      message = '¡Es el momento perfecto para arrancar! Según tu IMC estimado, podrías tener un leve sobrepeso, aunque si tienes buena masa muscular esto es completamente normal. Con unos pequeños ajustes guiados vas a cambiar tu composición corporal, sintiéndote cada vez más ágil.';
    } else {
      category = 'Posible sobrepeso';
      message = 'Has dado el paso más importante: decidirte a cambiar. Según tu IMC estimado, podrías tener sobrepeso, aunque recordá que el IMC no distingue músculo de grasa. Sea cual sea tu caso, vamos a trabajar cuidándote, priorizando tu salud y con un plan que te cambiará la vida.';
    }

    // No gender specific wording required; messaging is strictly the same for both.

    return { bmi: bmi.toFixed(1), category, message };
  };

  const submitForm = async (finalAnswers) => {
    setIsSubmitting(true);
    
    try {
      // 1. Guardar en Firebase (Firestore)
      try {
        const firestoreData = {
          nombre: finalAnswers['01_Nombre'] || '',
          edad: finalAnswers['02_Edad'] || '',
          altura: finalAnswers['03_Altura'] || '',
          peso: finalAnswers['04_Peso_Actual'] || '',
          genero: finalAnswers['05_Genero'] || '',
          whatsapp: finalAnswers['06_WhatsApp'] || '',
          ocupacion: finalAnswers['07_Ocupacion'] || '',
          objetivo: finalAnswers['08_Objetivo'] || '',
          plazo: finalAnswers['09_Plazo'] || '',
          tiempo_inactivo: finalAnswers['10_Tiempo_Inactivo'] || '',
          enfermedades: finalAnswers['11_Enfermedades_Medicacion'] || '',
          lesiones: finalAnswers['12_Lesiones'] || '',
          dolores: finalAnswers['13_Dolores'] || '',
          horas_sueno: finalAnswers['14_Horas_Sueno'] || '',
          comidas_dia: finalAnswers['15_Comidas_Dia'] || '',
          agua: finalAnswers['16_Agua'] || '',
          habitos: finalAnswers['17_Habitos'] || '',
          dias_entrenamiento: finalAnswers['18_Dias_Entrenamiento'] || '',
          tiempo_sesion: finalAnswers['19_Tiempo_Sesion'] || '',
          motivacion: finalAnswers['20_Motivacion'] || '',
          estado: 'nuevo',
          createdAt: serverTimestamp()
        };
        await addDoc(collection(db, 'anamnesis'), firestoreData);
      } catch (err) {
        console.error("Error saving to Firebase:", err);
      }

      // 2. Enviar email vía Formspree
      await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalAnswers)
      });
      
      setIsFinished(true);
    } catch (error) {
      console.error("Formspree Fetch Error:", error);
      setIsFinished(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswer = (answer) => {
    const currentQ = questions[currentStep];
    const newAnswers = { ...answers, [currentQ.id]: answer };
    setAnswers(newAnswers);

    if (currentQ.id === '05_Genero') {
      if (answer === 'Hombre') setTheme('blue');
      else if (answer === 'Mujer') setTheme('magenta');
      else setTheme('green');
    }

    setTimeout(() => {
      // Trigger BMI Check after obtaining Gender (since we now ask Height, Weight, then Gender)
      if (currentQ.id === '05_Genero') {
        const h = newAnswers['03_Altura'];
        const w = newAnswers['04_Peso_Actual'];
        const g = answer;
        const calc = calculateBMI(h, w, g);
        if (calc) {
          setBmiData(calc);
          setShowBmiResult(true);
          return;
        }
      }

      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        submitForm(newAnswers);
      }
    }, 400); 
  };

  if (isSubmitting) {
    return (
      <div className="form-area">
        <div style={{ width: '100%', maxWidth: '100%' }}>
          <ProgressBar currentStep={questions.length} totalSteps={questions.length} />
          
          <div className="glass-panel" style={{ animation: 'fade-enter-active 0.4s ease forwards', textAlign: 'center' }}>
            <h2 className="question-title" style={{ fontSize: '2rem', color: 'var(--neon-color)' }}>Procesando tu perfil...</h2>
            <p style={{ fontSize: '1.2rem', marginTop: '20px', color: 'var(--text-secondary)' }}>
              Enviando tus respuestas de forma segura.
            </p>
            <div style={{ marginTop: '40px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
               <div style={{ width: '50px', height: '50px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid var(--neon-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
            <style>{`
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const isMujer = answers['05_Genero'] === 'Mujer';
    const welcomeText = isMujer ? '¡Bienvenida al equipo!' : '¡Bienvenido al equipo!';

    return (
      <div className="form-area">
        <div className="glass-panel" style={{ animation: 'slideInUp 0.5s ease', textAlign: 'center' }}>
          <h2 className="question-title" style={{ fontSize: '2.5rem', color: 'var(--neon-color)' }}>{welcomeText}</h2>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: '500' }}>Has dado un paso importante para tu salud.</h3>
          
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '30px' }}>
             <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
               Tu perfil ha sido registrado con éxito. Estaré evaluando tus respuestas detenidamente para diseñar el enfoque que mejor se adapte a ti.
               <br/><br/>
               Muy pronto me pondré en contacto contigo con tu plan de acción.
             </p>
          </div>

          <button 
            className="option-btn" 
            style={{ 
              background: 'var(--neon-color)', 
              color: '#000', 
              border: 'none', 
              fontWeight: 'bold', 
              width: '100%', 
              fontSize: '1.2rem'
            }}
            onClick={() => window.location.reload()}
          >
            Finalizar
          </button>
        </div>
      </div>
    );
  }

  // Intermediary view for BMI
  if (showBmiResult && bmiData) {
    return (
      <div className="form-area">
        <div style={{ width: '100%', maxWidth: '100%' }}>
          <ProgressBar currentStep={currentStep} totalSteps={questions.length} />
          
          <div className="glass-panel" style={{ animation: 'slideInUp 0.4s ease forwards', textAlign: 'center' }}>
            <h2 className="question-title" style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Tu análisis inicial</h2>
            
            <div style={{ margin: '30px 0', padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
               <h3 style={{ fontSize: '1.8rem', color: 'var(--neon-color)', marginBottom: '10px' }}>{bmiData.category}</h3>
               <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>IMC Estimado: <span style={{ fontWeight: 600, color: 'white' }}>{bmiData.bmi}</span></p>
            </div>

            <p className="motivation-text" style={{ borderLeft: 'none', textAlign: 'center', fontSize: '1.15rem', padding: 0, marginBottom: '30px', lineHeight: 1.6 }}>
              {bmiData.message}
            </p>

            <button 
              className="option-btn" 
              style={{ background: 'var(--neon-color)', color: '#000', border: 'none', fontWeight: 'bold', width: '100%', fontSize: '1.2rem' }}
              onClick={() => {
                setShowBmiResult(false);
                if (currentStep < questions.length - 1) {
                  setCurrentStep(prev => prev + 1);
                } else {
                  submitForm(answers); // Technically won't happen here but safe
                }
              }}
            >
              Continuar con el plan ✓
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentStep];

  return (
    <div className="form-area">
      <div style={{ width: '100%', maxWidth: '100%' }}>
        <ProgressBar currentStep={currentStep} totalSteps={questions.length} />
        
        <div key={currentStep}>
          <QuestionCard 
            question={currentQ.question}
            motivation={currentQ.motivation}
            type={currentQ.type}
            options={currentQ.options}
            onAnswer={handleAnswer}
            selectedAnswer={answers[currentQ.id]}
          />
        </div>
      </div>
      
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
