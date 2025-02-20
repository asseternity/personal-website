import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import bird from '/bird.png';
import cloud from '/cloud.png';

export default function PhaserGame() {
  const gameContainerRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [finalScore, setFinalScore] = useState(0); // new state to hold final score
  const gameStartedRef = useRef(false);

  // Persistent game variables
  let scoreValue = 0;
  let player;
  let score;
  let framesSinceLastObstacle = 0;
  let obstaclesQueue = [];

  // Called when the start/restart button is clicked.
  const handleStart = () => {
    // Reset game state variables
    scoreValue = 0;
    framesSinceLastObstacle = 0;
    obstaclesQueue = [];
    setFinalScore(0);
    gameStartedRef.current = true;
    setGameStarted(true);
  };

  useEffect(() => {
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

      player = this.physics.add.image(50, 50, 'bird').setScale(0.65);
      player.setCollideWorldBounds(true);

      // Create score text
      score = this.add.text(width / 2, 20, 'Score: 0', {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#cccccc',
      });
      score.setOrigin(0.5, 0);

      // Set up keyboard controls
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

      // Add mobile (pointer/touch) controls:
      this.input.on('pointerdown', (pointer) => {
        if (!gameStartedRef.current) return;
        if (pointer.y < player.y) {
          player.setVelocityY(-230);
        } else {
          player.setVelocityY(230);
        }
      });
    }

    function update() {
      // Only update game logic if the game has started
      if (!gameStartedRef.current) return;

      // Handle keyboard controls for player movement
      if (this.wKey.isDown) {
        player.setVelocityY(-230);
      } else if (this.sKey.isDown) {
        player.setVelocityY(230);
      }

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

      // Update score when passing obstacles.
      while (obstaclesQueue.length > 0 && player.x >= obstaclesQueue[0].x) {
        obstaclesQueue.shift();
        scoreValue++;
        score.setText('Score: ' + scoreValue);
      }
    }

    // Clean up the Phaser game when the component unmounts
    return () => {
      game.destroy(true);
    };
  }, []);

  // Function to add a new obstacle (cloud)
  const addObstacle = (scene) => {
    const x = scene.scale.width + 50;
    const y = Phaser.Math.Between(20, scene.scale.height - 20);
    // Use FloatBetween for a floating-point scale
    let obstacle = scene.physics.add
      .sprite(x, y, 'cloud')
      .setScale(Phaser.Math.FloatBetween(0.5, 1.8));
    obstacle.body.setImmovable(true);
    const newWidth = obstacle.width * 0.5;
    const newHeight = obstacle.height * 0.5;
    obstacle.body.setSize(newWidth, newHeight);
    obstacle.setVelocityX(-400);
    scene.physics.add.collider(player, obstacle, () => {
      // On collision (game over), update the final score and toggle the game state.
      setFinalScore(scoreValue);
      gameStartedRef.current = false;
      setGameStarted(false);
    });
    return obstacle;
  };

  return (
    <div
      ref={gameContainerRef}
      style={{
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100vw', // Full viewport width
        height: '200px', // Fixed height
        zIndex: 9999,
        background: 'transparent',
      }}
    >
      {/* Render the start/restart button only if the game hasn't started */}
      {!gameStarted && (
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
      )}
    </div>
  );
}
