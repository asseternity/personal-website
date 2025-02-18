import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import bird from '/bird.png';
import cloud from '/cloud.png';

export default function PhaserGame() {
  const gameContainerRef = useRef(null);

  let player;
  let score;
  let framesSinceLastObstacle = 0;
  let obstaclesQueue = [];
  let pastObstacles = [];

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.RESIZE, // The canvas will automatically resize to fill its container
        parent: gameContainerRef.current,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: {
        transparent: true, // Ensures the canvas background is transparent
      },
      backgroundColor: 'transparent', // Also set the background color to transparent
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
      // Use the actual canvas dimensions instead of hardcoding 300x300
      const width = this.scale.width;
      const height = this.scale.height;
      // Set the physics world bounds to match the current canvas size
      this.physics.world.setBounds(0, 0, width, height);

      player = this.physics.add.image(50, 50, 'bird').setScale(0.6, 0.6);
      player.setCollideWorldBounds(true);

      score = this.add.text(20, 20, `Score: 0`, {
        fontFamily: 'Arial',
        fontSize: 24,
        color: '#ffffff',
      });
      // controls
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    function update() {
      // controls
      if (this.wKey.isDown) {
        player.setVelocityY(-230);
      }
      if (this.sKey.isDown) {
        player.setVelocityY(230);
      }
      // spawn obstacles
      if (framesSinceLastObstacle == 180) {
        obstaclesQueue.push(addObstacle(this));
        framesSinceLastObstacle = 0;
      } else {
        framesSinceLastObstacle += 1;
      }
      // update text
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

  const addObstacle = (scene) => {
    // Spawn the cloud just off the right edge of the canvas
    const x = scene.scale.width + 50;
    // Random y position within the canvas height, adjusting for margins if needed
    const y = Phaser.Math.Between(20, scene.scale.height - 20);
    let obstacle = scene.physics.add.sprite(x, y, 'cloud');
    obstacle.body.setImmovable(true);
    // Adjust the hitbox size (e.g., 80% of the sprite's width and height)
    const newWidth = obstacle.width * 0.8;
    const newHeight = obstacle.height * 0.8;
    obstacle.body.setSize(newWidth, newHeight);
    obstacle.setVelocityX(-300);
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
        height: '200px', // Fixed height of 200px
        zIndex: 9999,
        background: 'transparent', // Transparent container background
        pointerEvents: 'none',
      }}
    />
  );
}
