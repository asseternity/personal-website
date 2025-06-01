import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import PhaserButtonContent from './phaser_button_content';
import dragon from '/dragon.png';
import bird from '/bird.png';
import cloud from '/cloud.png';
import bolt1 from '/bolt.png';
import bolt2 from '/bolt2.png';
import bolt3 from '/bolt3.png';
import bolt4 from '/bolt4.png';

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
      this.load.image('bolt1', bolt1);
      this.load.image('bolt2', bolt2);
      this.load.image('bolt3', bolt3);
      this.load.image('bolt4', bolt4);
      this.load.image('bird', bird);
      this.load.spritesheet('dragon', dragon, {
        frameWidth: 191,
        frameHeight: 161,
      });
    }

    function create() {
      phaserSceneRef.current = this;

      // Initialize scene-scoped state
      this.scoreValue = 0;
      this.framesSinceLastObstacle = 0;
      this.obstacleSpeedUpModifier = 0;
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

      // create animation
      this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('dragon', { start: 3, end: 5 }),
        frameRate: 6,
        repeat: -1,
      });

      // Player setup
      this.player = this.physics.add
        .sprite(50, 50, 'dragon')
        .setScale(0.65)
        .play('fly');
      this.player.setCollideWorldBounds(true);

      // now override the body size and offset
      // (the numbers below are in *physics* pixels, before scale)
      this.player.body.setSize(40, 60); // width, height of the hitbox
      this.player.body.setOffset(20, 50); // x‑ and y‑offset from the top‑left of the sprite

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
        // 1) Figure out where the Phaser canvas sits on screen:
        const rect = gameContainerRef.current.getBoundingClientRect();
        // 2) pointer.event.clientY is the mouse/touch Y relative to the viewport.
        //    Subtract rect.top to get Y relative to top of the canvas itself.
        const localY = pointer.event.clientY - rect.top;
        // 3) Now compare “localY inside the canvas” against the dragon’s Y:
        this.player.setVelocityY(localY < this.player.y ? -230 : 230);
      });

      function onScroll() {
        try {
          const r = gameContainerRef.current.getBoundingClientRect();
          this.scale.resize(r.width, r.height);
          this.physics.world.setBounds(0, 0, r.width, r.height);
        } catch (err) {}
      }
    }

    function update() {
      if (!gameStartedRef.current) return;

      // increase speed of obstacles spawning
      let s = this.scoreValue;
      if (s < 5) this.obstacleSpeedUpModifier = 20;
      else if (s >= 5 && s < 10) this.obstacleSpeedUpModifier = 70;
      else if (s >= 10 && s < 15) this.obstacleSpeedUpModifier = 95;
      else if (s >= 15 && s < 25) this.obstacleSpeedUpModifier = 120;
      else /* s >= 25 */ this.obstacleSpeedUpModifier = 150;

      // Spawn obstacles
      this.framesSinceLastObstacle++;
      if (this.framesSinceLastObstacle >= 180 - this.obstacleSpeedUpModifier) {
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

      // choose sprite based on speed
      let s = scene.scoreValue;
      let correctSprite = 'bolt1';
      if (s < 5) correctSprite = 'bolt1';
      else if (s >= 5 && s < 10) correctSprite = 'bolt2';
      else if (s >= 10 && s < 15) correctSprite = 'bolt3';
      else if (s >= 15 && s < 25) correctSprite = 'bolt4';
      else /* s >= 25 */ correctSprite = 'bolt1';

      const obs = scene.physics.add
        .sprite(x, y, correctSprite)
        .setScale(Phaser.Math.FloatBetween(0.05, 0.3));
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

  // temporarily unbind Phaser’s capture of W and S when showing the name‐entry UI
  useEffect(() => {
    const scene = phaserSceneRef.current;
    if (!scene) return;

    if (nameWriting) {
      // stop preventing default on W/S so the input sees them
      scene.input.keyboard.removeCapture([
        Phaser.Input.Keyboard.KeyCodes.W,
        Phaser.Input.Keyboard.KeyCodes.S,
      ]);
    } else {
      // when we go back to gameplay, re-capture W/S for Phaser
      scene.input.keyboard.addCapture([
        Phaser.Input.Keyboard.KeyCodes.W,
        Phaser.Input.Keyboard.KeyCodes.S,
      ]);
    }
  }, [nameWriting]);

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
