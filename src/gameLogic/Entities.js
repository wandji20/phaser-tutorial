class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    // console.log(this)

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }

}


class Player extends Entity {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key, "Player");

    this.setData("speed", 160);
    this.play("sprPlayer");

    this.setData("isShooting", false);
    this.setData("timerShootDelay", 10);
    this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData("speed");
    // this.body.y -= 2;
  }
  
  moveDown() {
    // this.body.velocity.y = this.getData("speed");
    this.body.y += 2
  }
  
  moveLeft() {
    // this.body.velocity.x = -this.getData("speed");
    this.body.x -= 2
  }
  
  moveRight() {
    // this.body.velocity.x = this.getData("speed");
    this.body.x += 2
  }

  update(){
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData("isShooting")) {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
        this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      }
      else { // when the "manual timer" is triggered:
        var laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);
      
        // this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData("timerShootTick", 0);
      }
    }
  }
}

class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprLaserPlayer");
    this.body.velocity.y = -200;
  }
}


class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy1", "ChaserShip");

    this.states = {
      MOVE_DOWN: "MOVE_DOWN",
      CHASE: "CHASE"
    };
    this.state = this.states.MOVE_DOWN;
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }

  update(){
    if (!this.getData("isDead") && this.scene.player) {
      
      if (Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.scene.player.x,
        this.scene.player.y
      ) < 320) {

        this.state = this.states.CHASE;
      }

      if (this.state == this.states.CHASE) {
        if (this.x < this.scene.player.x) {
          this.angle -= 5;
        }
        else {
          this.angle += 5;
        } 
        var dx = this.scene.player.x - this.x;
        var dy = this.scene.player.y - this.y;

        var angle = Math.atan2(dy, dx);

        var speed = 100;
        this.body.setVelocity(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed
        );
      }
    }
  }
}

class GunShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy0", "GunShip");
    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        var laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true
    })
    this.play("sprEnemy0");
  }
  onDestroy(){
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}

class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy2", "CarrierShip");
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.play("sprEnemy2");
  }
}

class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprLaserEnemy0");
    this.body.velocity.y = 200;

  }
}

export {Player, CarrierShip, GunShip, ChaserShip, EnemyLaser}