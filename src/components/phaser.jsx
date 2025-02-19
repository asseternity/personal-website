import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import bird from '/bird.png';
import cloud from '/cloud.png';

export default function PhaserGame() {
  const gameContainerRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  // A ref to allow the Phaser scene to check the game start state
  const gameStartedRef = useRef(false);

  let player;
  let score;
  let framesSinceLastObstacle = 0;
  let obstaclesQueue = [];
  let pastObstacles = [];

  // Called when the start button is clicked.
  const handleStart = () => {
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
      // Set the physics world bounds to match the canvas size
      this.physics.world.setBounds(0, 0, width, height);

      player = this.physics.add.image(50, 50, 'bird').setScale(0.65);
      player.setCollideWorldBounds(true);

      // Center the score text at the top and set a soft grey color
      score = this.add.text(width / 2, 20, 'Score: 0', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#cccccc',
      });
      score.setOrigin(0.5, 0);

      // Set up controls
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    function update() {
      // Only update game logic after the start button is pressed
      if (!gameStartedRef.current) return;

      // Handle player controls
      if (this.wKey.isDown) {
        player.setVelocityY(-230);
      } else if (this.sKey.isDown) {
        player.setVelocityY(230);
      }
      // Spawn obstacles (clouds) every 180 frames
      if (framesSinceLastObstacle === 180) {
        obstaclesQueue.push(addObstacle(this));
        framesSinceLastObstacle = 0;
      } else {
        framesSinceLastObstacle += 1;
      }

      // Update score text when passing an obstacle
      if (obstaclesQueue.length !== 0) {
        if (player.x >= obstaclesQueue[0].x) {
          score.setText('Score: ' + pastObstacles.length);
          pastObstacles.push(obstaclesQueue.splice(0, 1));
        }
      }
    }

    // Clean up the Phaser game when the component unmounts
    return () => {
      game.destroy(true);
    };
  }, []);

  // Function to add a new obstacle (cloud)
  const addObstacle = (scene) => {
    // Spawn the cloud just off the right edge of the canvas
    const x = scene.scale.width + 50;
    // Random y position within the canvas height (with some margin)
    const y = Phaser.Math.Between(20, scene.scale.height - 20);
    let obstacle = scene.physics.add
      .sprite(x, y, 'cloud')
      .setScale(Phaser.Math.Between(0.5, 1.8));
    obstacle.body.setImmovable(true);
    // Adjust the hitbox (e.g., 80% of the sprite's dimensions)
    const newWidth = obstacle.width * 0.5;
    const newHeight = obstacle.height * 0.5;
    obstacle.body.setSize(newWidth, newHeight);
    obstacle.setVelocityX(-400);
    scene.physics.add.collider(player, obstacle, () => {
      alert('Game Over!');
      location.reload(true);
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
      {/* Render the start button only if the game hasn't started */}
      {!gameStarted && (
        <button
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
          Start Game
        </button>
      )}
    </div>
  );
}
