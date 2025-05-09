import { useState, useEffect } from 'react';

export default function PhaserButtonContent({
  scoreToDisplay,
  highScoresArray,
  startGameCallback,
  hideGameCallback,
  nameWriting,
}) {
  const [showHighScoresTab, setShowHighScoresTab] = useState(false);
  const [username, setUsername] = useState('');
  const [localHighScores, setLocalHighScores] = useState(highScoresArray);
  const [localNameWriting, setLocalNameWriting] = useState(nameWriting);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // sync prop updates
    setLocalHighScores(highScoresArray);
  }, [highScoresArray]);

  useEffect(() => {
    setLocalNameWriting(nameWriting);
  }, [nameWriting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return;
    setLocalNameWriting(false);
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(
        'https://personal-website-backend-production-c5a6.up.railway.app/api/scores/new',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, score: scoreToDisplay }),
        }
      );
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      // backend returns { scores: [...] }
      setLocalHighScores(data.scores);
      setShowHighScoresTab(true);
    } catch (err) {
      console.error('Submit failed:', err);
      setError('Failed to submit score.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {showHighScoresTab ? (
        <div className="pbc_container">
          {localNameWriting ? (
            <div className="pbc_nw_container">
              <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                <label
                  htmlFor="username"
                  style={{
                    fontSize: '10px',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Enter your name:
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    fontSize: '12px',
                    padding: '4px',
                  }}
                  disabled={submitting}
                />
                <button
                  type="submit"
                  style={{ fontSize: '12px' }}
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : 'Submit'}
                </button>
                {error && (
                  <p style={{ color: 'red', fontSize: '11px' }}>{error}</p>
                )}
              </form>
              <button
                className="start_game_button no_margin_button"
                onClick={() => setShowHighScoresTab(false)}
                style={{
                  fontSize: '11px',
                  marginRight: '0px',
                  marginTop: '5px',
                }}
              >
                Back
              </button>
            </div>
          ) : (
            <div className="pbc_hs_container">
              <p style={{ fontSize: '11px' }}>Top 5 scores:</p>
              <ul
                style={{
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {localHighScores.map(({ id, score, username }) => (
                  <li
                    key={id}
                    className="high_scores_item"
                    style={{
                      display: 'inline-block',
                      margin: '0 10px',
                      fontSize: '11px',
                    }}
                  >
                    {score} by {username}
                  </li>
                ))}
              </ul>
              <button
                className="start_game_button no_margin_button"
                onClick={() => setShowHighScoresTab(false)}
                style={{
                  fontSize: '11px',
                  marginRight: '0px',
                  marginTop: '5px',
                }}
              >
                Back
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="pbc_buttons_container">
          <button
            className="start_game_button"
            onClick={startGameCallback}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10000,
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            {scoreToDisplay >= 0 ? (
              <div>Your score = {scoreToDisplay}. Restart</div>
            ) : (
              'Start Game'
            )}
          </button>
          <div
            className="secondary_buttons_container"
            style={{
              position: 'absolute',
              top: '73%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'row',
              gap: '5px',
            }}
          >
            <button
              className="hide_game_button"
              onClick={hideGameCallback}
              style={{ cursor: 'pointer' }}
            >
              Hide game
            </button>
            <button
              className="hide_game_button"
              onClick={() => setShowHighScoresTab(true)}
              style={{ cursor: 'pointer' }}
            >
              Top 5 ever
              {localNameWriting && (
                <span className="small_yellow_text"> Add your score!</span>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
