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
      animation: 'fadeInWelcome 0.8s ease forwards',
    }}>
      <style>{`
        @keyframes fadeInWelcome {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
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
        .start-btn {
          margin-top: 48px;
          padding: 18px 56px;
          background: transparent;
          border: 2px solid #39ff14;
          color: #39ff14;
          font-family: 'Outfit', sans-serif;
          font-size: 1.15rem;
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
      `}</style>

      {/* Imagen de identidad */}
      <img
        src="/welcome_bg.png"
        alt="SebaGym"
        style={{
          width: 'min(420px, 80vw)',
          height: 'min(420px, 80vw)',
          objectFit: 'cover',
          borderRadius: '12px',
          display: 'block',
        }}
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
