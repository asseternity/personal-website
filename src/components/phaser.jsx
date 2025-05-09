import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import PhaserButtonContent from './phaser_button_content';
import bird from '/bird.png';
import cloud from '/cloud.png';

export default function PhaserGame() {
  const [gameHidden, setGameHidden] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [finalScore, setFinalScore] = useState(-1);
  const [highScores, setHighScores] = useState([]);
  const [nameWriting, setNameWriting] = useState(false);
  const gameContainerRef = useRef(null);
  const gameStartedRef = useRef(false);
  const phaserSceneRef = useRef(null);

  const handleStart = () => {
    if (phaserSceneRef.current) {
      // Restart the Phaser scene
      phaserSceneRef.current.scene.restart();
    }
    // Reset React state
    setNameWriting(false);
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
      audio: {
        noAudio: true,
      },
      scene: { preload, create, update },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('cloud', cloud);
      this.load.image('bird', bird);
    }

    function create() {
      phaserSceneRef.current = this;

      // Initialize scene-scoped state
      this.scoreValue = 0;
      this.framesSinceLastObstacle = 0;
      this.obstaclesQueue = [];

      // Resize to container
      const rect = gameContainerRef.current.getBoundingClientRect();
      this.scale.resize(rect.width, rect.height);
      this.physics.world.setBounds(0, 0, rect.width, rect.height);
      window.addEventListener('scroll', onScroll, { passive: true });
      this.events.once('shutdown', () =>
        window.removeEventListener('scroll', onScroll)
      );

      // World bounds
      const width = this.scale.width;
      const height = this.scale.height;
      this.physics.world.setBounds(0, 0, width, height);

      // Player setup
      this.player = this.physics.add.image(50, 50, 'bird').setScale(0.65);
      this.player.setCollideWorldBounds(true);

      // Score text
      this.scoreText = this.add
        .text(width / 2, 20, 'Score: 0', {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#cccccc',
        })
        .setOrigin(0.5, 0);
      if (firstGameStart) this.scoreText.setAlpha(0);

      // Keyboard controls
      this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

      // First-time tooltips
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
          .text(
            this.player.x + 60,
            this.player.y - 20,
            'Press W/S to fly up/down',
            style
          )
          .setOrigin(0, 0.5);
        const t2 = this.add
          .text(
            this.player.x + 60,
            this.player.y + 5,
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
            this.tweens.add({
              targets: this.scoreText,
              alpha: 1,
              duration: 1000,
            });
          },
        });
        firstGameStart = false;
      }

      // Pointer controls
      this.input.on('pointerdown', (pointer) => {
        if (!gameStartedRef.current) return;
        this.player.setVelocityY(pointer.y < this.player.y ? -230 : 230);
      });

      function onScroll() {
        const r = gameContainerRef.current.getBoundingClientRect();
        this.scale.resize(r.width, r.height);
        this.physics.world.setBounds(0, 0, r.width, r.height);
      }
    }

    function update() {
      if (!gameStartedRef.current) return;

      // Spawn obstacles
      this.framesSinceLastObstacle++;
      if (this.framesSinceLastObstacle >= 180) {
        this.obstaclesQueue.push(addObstacle(this));
        this.framesSinceLastObstacle = 0;
      }

      // Cleanup off-screen
      this.obstaclesQueue = this.obstaclesQueue.filter((obs) => {
        if (obs.x + obs.displayWidth < 0) {
          obs.destroy();
          return false;
        }
        return true;
      });

      // Keyboard movement
      if (this.wKey.isDown) this.player.setVelocityY(-230);
      else if (this.sKey.isDown) this.player.setVelocityY(230);

      // Update score
      while (
        this.obstaclesQueue.length &&
        this.player.x >= this.obstaclesQueue[0].x
      ) {
        this.obstaclesQueue.shift();
        this.scoreValue++;
        this.scoreText.setText(`Score: ${this.scoreValue}`);
      }
    }

    function addObstacle(scene) {
      const x = scene.scale.width + 50;
      const y = Phaser.Math.Between(20, scene.scale.height - 20);
      const obs = scene.physics.add
        .sprite(x, y, 'cloud')
        .setScale(Phaser.Math.FloatBetween(0.5, 1.8));
      obs.body.setImmovable(true);
      obs.setVelocityX(-400);
      if (gameStartedRef.current) {
        scene.physics.add.collider(scene.player, obs, () => {
          setFinalScore(scene.scoreValue);
          gameStartedRef.current = false;
          setGameStarted(false);
        });
      }
      return obs;
    }

    return () => game.destroy(true);
  }, []);

  // initial Fetch high scores when website loads
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(
          'https://personal-website-backend-production-c5a6.up.railway.app/api/scores',
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
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

    fetchScores();
  }, []);

  // when the game is over, we grab the final score and check if it's top five
  useEffect(() => {
    if (finalScore < 0) return;
    const fetchCheck = async () => {
      const response = await fetch(
        'https://personal-website-backend-production-c5a6.up.railway.app/api/scores/check',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ score: finalScore }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.topFive == true) {
          setNameWriting(true);
        }
      }
    };

    fetchCheck();
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
          <PhaserButtonContent
            scoreToDisplay={finalScore}
            highScoresArray={highScores}
            startGameCallback={handleStart}
            hideGameCallback={() => setGameHidden(true)}
            nameWriting={nameWriting}
          />
        )}
      </div>
    )
  );
}
