import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

export default function PhaserGame() {
  const gameContainerRef = useRef(null);

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
      // Create a red circle texture to use as a ball
      const graphics = this.make.graphics({ x: 0, y: 0, add: false });
      graphics.fillStyle(0xff0000, 1);
      graphics.fillCircle(15, 15, 15);
      graphics.generateTexture('ball', 30, 30);
    }

    function create() {
      // Use the actual canvas dimensions instead of hardcoding 300x300
      const width = this.scale.width;
      const height = this.scale.height;

      // Set the physics world bounds to match the current canvas size
      this.physics.world.setBounds(0, 0, width, height);

      // Create the ball at the center of the canvas
      const ball = this.physics.add.sprite(width / 2, height / 2, 'ball');

      // Make the ball bounce off the walls
      ball.setCollideWorldBounds(true);
      ball.setBounce(1);

      // Set an initial velocity so the ball starts moving
      ball.setVelocity(500, 550);
    }

    function update() {
      // No additional update logic needed for now
    }

    // Clean up the Phaser game when the component unmounts
    return () => {
      game.destroy(true);
    };
  }, []);

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
