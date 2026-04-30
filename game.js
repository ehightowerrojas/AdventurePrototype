class Monologue extends AdventureScene {
    constructor(){
        super("monologue", "");
    }

    preload() {
        this.load.image('AllieScared', 'assets/AllieScared.png');
        this.load.video('Glitch', 'assets/Glitch.mp4', 'loadeddata', false, true);
    }

    create() {
        //--Monologue Phase1--//
        let monologueText1 = this.add.text(200, -200, "...", { fontSize: '50px Georgia'}).setAlpha(0);
        let monologueText2 = this.add.text(130, 0, "H-Hello?", { fontSize: '50px Georgia'}).setAlpha(0);
        let monologueText3 = this.add.text(-290, 200, "What the heck… why is the voice in my head so loud?", { fontSize: '50px Georgia'}).setAlpha(0);
        let monologueText4 = this.add.text(-70, 400, "Where did all my friends go?", { fontSize: '50px Georgia'}).setAlpha(0);
        this.add.container(745, 375, [monologueText1, monologueText2, monologueText3, monologueText4]);
        
        this.tweens.chain({
            tweens: [
                {
                    targets: monologueText1,
                    alpha: 1,
                    duration: 2000,
                    delay: 500
                },
                {
                    targets: monologueText2,
                    alpha: 1,
                    duration: 2000
                },
                {
                    targets: monologueText3,
                    alpha: 1,
                    duration: 3000
                },
                {
                    targets: monologueText4,
                    alpha: 1,
                    duration: 2500
                },
                {
                    targets: [monologueText1, monologueText2, monologueText3, monologueText4],
                    alpha: 0,
                    duration: 2200
                }
            ]
        });
        //--End Monologue Phase1--//
        
        //--Monologue Phase2--//
        this.allieScared = this.add.image(960, 540, 'AllieScared').setAlpha(0).setScale(1.5);
        let monologue2Text1 = this.add.text(780, 225, "What's going on?", { fontSize: '50px Georgia'}).setAlpha(0);
        let monologue2Text2 = this.add.text(475, 800, "What’s happening to my head, this doesn’t feel real–", { fontSize: '50px Georgia'}).setAlpha(0);

        this.tweens.chain({
            tweens:[
                {
                    targets: monologue2Text1,
                    alpha: 1,
                    duration: 2000,
                    delay: 13500
                },
                {
                    targets: this.allieScared,
                    alpha: 1, 
                    duration: 2000,
                    delay: 1000
                },
                {
                    targets: monologue2Text2,
                    alpha: 1,
                    duration: 2000
                }       
            ]
        })

        this.add.text(1765, 960, "📺", {fontSize: '60px'})
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                if (this.scale.isFullscreen) {
                    this.showMessage('Exit Fullscreen?');
                } else {
                    this.showMessage('Enter Fullscreen?');
                }
            })
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });
        //--End Monologue Phase2--//
        //Add glitch effect and then jump to scene 1
        //--Monologue Phase3--//
        this.time.delayedCall(21000, () => {
            let glitch = this.add.video(960, 540, 'Glitch').setScale(1.7);
            glitch.play(true);
            glitch.setLoop(false);
        });
        //--End Monologue Phase3--//
        this.time.delayedCall(24000, () => {
            this.scene.start('park1');
            this.gotoScene('park1');
        });
    }
}

class Park1 extends AdventureScene {
    constructor() {
        super("park1", "A Nice Park");
    }

    preload() {
        this.load.image('ParkBackground1', 'assets/ParkBackground1.png');
    }

    onEnter() {

        console.log("Entered park1");

        this.add.image(700, 540, 'ParkBackground1').setScale(2);

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('park2');
                }
            })

    }
}

class Park2 extends AdventureScene {
    constructor() {
        super("park2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('park1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        let introText1 = this.add.text(0, 0, "A Game for Ru", { fontSize: '70px Georgia'}).setColor('#202168');
        let introText2 = this.add.text(65, 90, "Click here to begin.", { fontSize: '40px Georgia'}).setColor('#202168')
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                introText2.setFill('white');
            })
            .on('pointerout', () => {
                introText2.setFill('#202168');
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('monologue'));
            })
        this.add.container(755, 475, [introText1, introText2]);

        this.add.text(1765, 960, "📺", {fontSize: '60px'})
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                if (this.scale.isFullscreen) {
                    this.showMessage('Exit Fullscreen?');
                } else {
                    this.showMessage('Enter Fullscreen?');
                }
            })
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        //this.input.on('pointerdown', () => {
        //    if ()
        //    this.cameras.main.fade(1000, 0,0,0);
        //    this.time.delayedCall(1000, () => this.scene.start('monologue'));
        //});
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    render: {
        piselArt: true
    },
    scene: [Intro, Monologue, Park1, Park2, Outro],
    title: "Adventure Game",
});

