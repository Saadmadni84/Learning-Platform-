export default function TestPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '1rem',
          color: '#333',
          fontWeight: 'bold'
        }}>
          ✅ Test Page Working!
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666',
          marginBottom: '2rem'
        }}>
          If you can see this page, the routing is working correctly.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => window.location.href = '/student/challenges/math-sprint'}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🎯 Go to Math Quiz
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              background: 'transparent',
              color: '#667eea',
              border: '2px solid #667eea',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🏠 Back to Home
          </button>
        </div>
        
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f0f9ff',
          borderRadius: '0.5rem',
          border: '1px solid #0ea5e9'
        }}>
          <p style={{ color: '#0369a1', margin: 0 }}>
            <strong>Status:</strong> All systems working! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
