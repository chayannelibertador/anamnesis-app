export default function WelcomeScreen({ onStart }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
    }}>
      <style>{`
        @keyframes fadeOutWelcome {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(1.04); }
        }
        .welcome-exit {
          animation: fadeOutWelcome 0.5s ease forwards !important;
        }
        @keyframes floatBtn {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        .welcome-logo {
          width: min(480px, 90vw, 60vh);
          height: min(480px, 90vw, 60vh);
          object-fit: cover;
          border-radius: 12px;
          display: block;
        }
        .start-btn {
          margin-top: 32px;
          padding: 10px 24px;
          background: transparent;
          border: 2px solid #39ff14;
          color: #39ff14;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
          animation: floatBtn 3s ease-in-out infinite;
          box-shadow: 0 0 18px rgba(57, 255, 20, 0.3);
        }
        .start-btn:hover {
          background: #39ff14;
          color: #000;
          box-shadow: 0 0 40px rgba(57, 255, 20, 0.7);
          animation: none;
        }

        @media (min-width: 768px) {
          .welcome-logo {
            width: min(550px, 60vw, 70vh);
            height: min(550px, 60vw, 70vh);
            transform: scale(1.3);
          }
          .start-btn {
            margin-top: -50px;
            padding: 18px 56px;
            font-size: 1.15rem;
            position: relative;
            z-index: 10;
          }
        }
      `}</style>

      {/* Imagen de identidad */}
      <img
        src="/welcome_bg.png"
        alt="SebaGym"
        className="welcome-logo"
      />

      {/* Botón comenzar */}
      <button
        className="start-btn"
        onClick={onStart}
      >
        Comenzar →
      </button>
    </div>
  );
}
