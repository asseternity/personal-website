import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import bird from '/bird.png';
import cloud from '/cloud.png';

export default function PhaserGame() {
  const [gameHidden, setGameHidden] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const gameContainerRef = useRef(null);
  const gameStartedRef = useRef(false);
  const phaserSceneRef = useRef(null);

  // Persistent game variables
  let scoreValue = 0;
  let player;
  let score;
  let framesSinceLastObstacle = 0;
  let obstaclesQueue = [];

  // Called when the start/restart button is clicked.
  const handleStart = () => {
    if (phaserSceneRef.current) {
      // Restart the scene if it's already been initialized
      phaserSceneRef.current.scene.restart();
    }
    scoreValue = 0;
    framesSinceLastObstacle = 0;
    obstaclesQueue = [];
    setFinalScore(0);
    gameStartedRef.current = true;
    setGameStarted(true);
  };

  useEffect(() => {
    // This flag ensures that tooltips (and score fade in) run only on the very first game start.
    let firstGameStart = true;

    const config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.RESIZE, // Automatically resize to fill container
        parent: gameContainerRef.current,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: {
        transparent: true, // Transparent canvas background
      },
      backgroundColor: 'transparent',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload,
        create,
        update,
      },
    };

    // Initialize the Phaser game
    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('cloud', cloud);
      this.load.image('bird', bird);
    }

    function create() {
      const width = this.scale.width;
      const height = this.scale.height;
      this.physics.world.setBounds(0, 0, width, height);

      // Create the player (bird)
      player = this.physics.add.image(50, 50, 'bird').setScale(0.65);
      player.setCollideWorldBounds(true);

      // Create score text.
      // On the very first game load, we start with the score hidden.
      score = this.add.text(width / 2, 20, 'Score: 0', {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#cccccc',
      });
      score.setOrigin(0.5, 0);
      if (firstGameStart) {
        score.setAlpha(0);
      }

      // Set up keyboard controls
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

      // Store the scene reference for restarts
      phaserSceneRef.current = this;

      // Only on the very first start, create stylish tooltips next to the bird.
      if (firstGameStart && gameStartedRef.current) {
        const tooltipStyle = {
          fontFamily: 'Arial',
          fontSize: '12px',
          fontStyle: 'italic',
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 2,
        };

        // Position tooltips near the bird (offset to the right)
        const tooltip1 = this.add.text(
          player.x + 60,
          player.y - 20,
          'Press W/S to fly up/down',
          tooltipStyle
        );
        tooltip1.setOrigin(0, 0.5);
        const tooltip2 = this.add.text(
          player.x + 60,
          player.y + 5,
          'Tap above or below the bird to glide',
          tooltipStyle
        );
        tooltip2.setOrigin(0, 0.5);

        // Animate the tooltips: float upward and fade out after 4 seconds.
        this.tweens.add({
          targets: [tooltip1, tooltip2],
          alpha: 0,
          y: '-=10',
          ease: 'Cubic.easeOut',
          delay: 4000,
          duration: 1000,
          onComplete: () => {
            tooltip1.destroy();
            tooltip2.destroy();
            // Fade in the score text after the tooltips fade out.
            this.tweens.add({
              targets: score,
              alpha: 1,
              duration: 1000,
              ease: 'Linear',
            });
          },
        });

        firstGameStart = false;
      }

      // Add mobile (pointer/touch) controls using pointer.y for proper canvas coordinates.
      this.input.on('pointerdown', (pointer) => {
        if (!gameStartedRef.current) return;

        // Use clientY which is relative to the viewport on both mobile and desktop
        const pointerYRelative = pointer.event.clientY;
        console.log('Viewport Y:', pointerYRelative);

        if (pointerYRelative < player.y) {
          player.setVelocityY(-230);
        } else {
          player.setVelocityY(230);
        }
      });
    }

    function update() {
      // Spawn obstacles (clouds) every 180 frames
      if (framesSinceLastObstacle >= 180) {
        obstaclesQueue.push(addObstacle(this));
        framesSinceLastObstacle = 0;
      } else {
        framesSinceLastObstacle += 1;
      }

      // Remove obstacles that have moved off-screen.
      obstaclesQueue = obstaclesQueue.filter((obstacle) => {
        if (obstacle.x + obstacle.displayWidth < 0) {
          obstacle.destroy();
          return false;
        }
        return true;
      });

      // Enable controls and score if the game has started
      if (!gameStartedRef.current) return;

      // Handle keyboard controls for player movement
      if (this.wKey.isDown) {
        player.setVelocityY(-230);
      } else if (this.sKey.isDown) {
        player.setVelocityY(230);
      }

      // Update score when passing obstacles.
      while (obstaclesQueue.length > 0 && player.x >= obstaclesQueue[0].x) {
        obstaclesQueue.shift();
        scoreValue++;
        score.setText('Score: ' + scoreValue);
      }
    }

    // Function to add a new obstacle (cloud)
    function addObstacle(scene) {
      const x = scene.scale.width + 50;
      const y = Phaser.Math.Between(20, scene.scale.height - 20);
      let obstacle = scene.physics.add
        .sprite(x, y, 'cloud')
        .setScale(Phaser.Math.FloatBetween(0.5, 1.8));
      obstacle.body.setImmovable(true);
      const newWidth = obstacle.width * 0.5;
      const newHeight = obstacle.height * 0.5;
      obstacle.body.setSize(newWidth, newHeight);
      obstacle.setVelocityX(-400);
      if (gameStartedRef.current) {
        scene.physics.add.collider(player, obstacle, () => {
          // On collision (game over), update the final score and toggle the game state.
          setFinalScore(scoreValue);
          gameStartedRef.current = false;
          setGameStarted(false);
        });
      }
      return obstacle;
    }

    // Clean up the Phaser game when the component unmounts
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    !gameHidden && (
      <div
        ref={gameContainerRef}
        style={{
          position: 'fixed',
          left: '0',
          top: '0',
          width: '100vw',
          height: '200px',
          zIndex: 9999,
          background: 'transparent',
        }}
      >
        {/* Render the start/restart button only if the game hasn't started */}
        {!gameStarted && (
          <div>
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
          </div>
        )}
      </div>
    )
  );
}
