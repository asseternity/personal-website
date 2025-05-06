import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import bird from '/bird.png';
import cloud from '/cloud.png';

export default function PhaserGame() {
  const [gameHidden, setGameHidden] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const gameContainerRef = useRef(null);
  const gameStartedRef = useRef(false);
  const phaserSceneRef = useRef(null);

  // Persistent game state
  let scoreValue = 0;
  let player;
  let scoreText;
  let framesSinceLastObstacle = 0;
  let obstaclesQueue = [];

  const handleStart = () => {
    if (phaserSceneRef.current) {
      phaserSceneRef.current.scene.restart();
    }
    // reset the Phaser closure state
    scoreValue = 0;
    framesSinceLastObstacle = 0;
    obstaclesQueue = [];
    setFinalScore(0);
    gameStartedRef.current = true;
    setGameStarted(true);
  };

  useEffect(() => {
    let firstGameStart = true;

    const config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.RESIZE,
        parent: gameContainerRef.current,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: { transparent: true },
      backgroundColor: 'transparent',
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false },
      },
      scene: { preload, create, update },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('cloud', cloud);
      this.load.image('bird', bird);
    }

    function create() {
      // store scene ref
      phaserSceneRef.current = this;

      // initial resize to match container dimensions
      const rect = gameContainerRef.current.getBoundingClientRect();
      this.scale.resize(rect.width, rect.height);
      this.physics.world.setBounds(0, 0, rect.width, rect.height);

      // update on scroll to keep Phaser's input mapping in sync
      const onScroll = () => {
        const r = gameContainerRef.current.getBoundingClientRect();
        this.scale.resize(r.width, r.height);
        this.physics.world.setBounds(0, 0, r.width, r.height);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      this.events.once('shutdown', () => {
        window.removeEventListener('scroll', onScroll);
      });

      // world bounds
      const width = this.scale.width;
      const height = this.scale.height;
      this.physics.world.setBounds(0, 0, width, height);

      // player setup
      player = this.physics.add.image(50, 50, 'bird').setScale(0.65);
      player.setCollideWorldBounds(true);

      // score text
      scoreText = this.add
        .text(width / 2, 20, 'Score: 0', {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#cccccc',
        })
        .setOrigin(0.5, 0);
      if (firstGameStart) scoreText.setAlpha(0);

      // keyboard controls
      this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

      // first-time tooltips
      if (firstGameStart && gameStartedRef.current) {
        const style = {
          fontFamily: 'Arial',
          fontSize: '12px',
          fontStyle: 'italic',
          color: '#fff',
          stroke: '#000',
          strokeThickness: 2,
        };
        const t1 = this.add
          .text(player.x + 60, player.y - 20, 'Press W/S to fly up/down', style)
          .setOrigin(0, 0.5);
        const t2 = this.add
          .text(
            player.x + 60,
            player.y + 5,
            'Tap above or below the bird to glide',
            style
          )
          .setOrigin(0, 0.5);
        this.tweens.add({
          targets: [t1, t2],
          alpha: 0,
          y: '-=10',
          ease: 'Cubic.easeOut',
          delay: 4000,
          duration: 1000,
          onComplete: () => {
            t1.destroy();
            t2.destroy();
            this.tweens.add({ targets: scoreText, alpha: 1, duration: 1000 });
          },
        });
        firstGameStart = false;
      }

      // pointer controls
      this.input.on('pointerdown', (pointer) => {
        if (!gameStartedRef.current) return;
        if (pointer.y < player.y) player.setVelocityY(-230);
        else player.setVelocityY(230);
      });
    }

    function update() {
      // obstacle spawning
      if (framesSinceLastObstacle++ >= 180) {
        obstaclesQueue.push(addObstacle(this));
        framesSinceLastObstacle = 0;
      }

      // cleanup off-screen
      obstaclesQueue = obstaclesQueue.filter((obs) => {
        if (obs.x + obs.displayWidth < 0) {
          obs.destroy();
          return false;
        }
        return true;
      });

      if (!gameStartedRef.current) return;

      // keyboard movement
      if (this.wKey.isDown) player.setVelocityY(-230);
      else if (this.sKey.isDown) player.setVelocityY(230);

      // update score when passing obstacles
      while (obstaclesQueue.length && player.x >= obstaclesQueue[0].x) {
        obstaclesQueue.shift();
        scoreValue++;
        scoreText.setText(`Score: ${scoreValue}`);
      }
    }

    function addObstacle(scene) {
      const x = scene.scale.width + 50;
      const y = Phaser.Math.Between(20, scene.scale.height - 20);
      const obs = scene.physics.add
        .sprite(x, y, 'cloud')
        .setScale(Phaser.Math.FloatBetween(0.5, 1.8));
      obs.body.setImmovable(true);
      obs.body.setSize(obs.width * 0.5, obs.height * 0.5);
      obs.setVelocityX(-400);
      if (gameStartedRef.current) {
        scene.physics.add.collider(player, obs, () => {
          setFinalScore(scoreValue);
          gameStartedRef.current = false;
          setGameStarted(false);
        });
      }
      return obs;
    }

    return () => game.destroy(true);
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(
          'https://personal-website-backend-production-c5a6.up.railway.app/api/scores',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score: finalScore, username: 'test' }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setHighScores(data?.scores || []);
        } else {
          console.error('Failed to fetch scores:', response.statusText);
        }
      } catch (err) {
        console.error('Error fetching scores:', err);
      }
    };
    if (gameContainerRef.current) {
      fetchScores();
    }
  }, [finalScore]);

  return (
    !gameHidden && (
      <div
        ref={gameContainerRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100vw',
          height: '200px',
          zIndex: 9999,
          background: 'transparent',
        }}
      >
        {!gameStarted && (
          <>
            <div className="high_scores">
              <ul className="high_scores_list">
                {highScores.map((score) => {
                  return (
                    <li key={score.id} className="high_scores_item">
                      {score.score} by {score.username}
                    </li>
                  );
                })}
              </ul>
            </div>
            <button
              className="start_game_button"
              onClick={handleStart}
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
              {finalScore > 0
                ? `Your score = ${finalScore}. Restart`
                : 'Start Game'}
            </button>
            <button
              className="hide_game_button"
              onClick={() => setGameHidden(true)}
              style={{
                position: 'absolute',
                top: '73%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10000,
                cursor: 'pointer',
              }}
            >
              Hide game
            </button>
          </>
        )}
      </div>
    )
  );
}
