class Monologue extends AdventureScene {
    constructor(){
        super("monologue", "");
    }

    preload() {
        this.load.image('AllieScared', 'assets/AllieScared.png');
        this.load.video('Glitch', 'assets/Glitch.mp4', 'loadeddata', false, true);
        this.load.audio('MysteriousMusic', 'assets/Epic Dark Mysterious Music (Copyright and Royalty Free) Black Fingerprint.mp3');
        this.load.audio('GlitchSound', 'assets/Glitch Sound Effect 4.mp3');
    }

    create() {
        //--Monologue Phase1--//
        let mysteriousMusic = this.sound.add('MysteriousMusic');
        mysteriousMusic.play({ loop: false });
        mysteriousMusic.volume = 0;
        this.tweens.add({
            targets: mysteriousMusic,
            volume: 1,
            duration: 10000,
        });

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

        this.add.image(1795, 960, 'FullscreenIcon')
            .setDepth(11)
            .setScale(0.25)
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
        this.time.delayedCall(21200, () => {
            this.cameras.main.flash(500, 255, 255, 255);
            mysteriousMusic.stop({ loop: false });
            let glitchSound = this.sound.add('GlitchSound');
            glitchSound.play({ loop: false });
        });
        //--End Monologue Phase3--//
        this.time.delayedCall(24000, () => {
            this.sound.stopAll();
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
        this.load.image('AllieWalkingDown', 'assets/AllieWalkingDown.gif');
        this.load.video('FollowButterfly', 'assets/mariposa-Picsart-BackgroundRemover.mp4');
        this.load.audio('ChillAdventureMusic', 'assets/ChillAdventureMusic.mp3');
    }

    onEnter() {
        //--Player Character--//
        this.sound.play('ChillAdventureMusic', { loop: true });
        this.sound.volume = 0.3;

        console.log("Entered park1");

        this.add.image(720, 540, 'ParkBackground1').setScale(2.25);

        let Allie = this.add.image(400, 745, 'AllieWalkingDown')
            .setScale(3)
            .setInteractive()
            .on('pointerover', () => this.showMessage("That's you, Allie!"))
            .on('pointerout', () => {
            if(this.x == 1) {
                this.fadeMessage("Curious and determined as ever...")
                this.x = 0;
            } else {
                this.fadeMessage("That's you, Allie!");
            }  
            })
            .on('pointerdown', () => {
                this.showMessage("Curious and determined as ever...");
                this.x = 1
                this.tweens.add({
                    targets: Allie,
                    scale: 3.35,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });
        //--End Player Character--//

        //--Player Dialogue--//
        let playerDialogue1 = this.add.text(700, 400, "Oh nice, this is my home park!\nSo cool, I wanna explore!", { fontSize: '40px Georgia'})
            .setColor('#ffffff')
            .setBackgroundColor('#000000')
            .setAlpha(0);
        let playerDialogue2 = this.add.text(800, 600, "My head still feels funny though...", { fontSize: '40px Georgia'})
            .setColor('#ffffff')
            .setBackgroundColor('#000000')
            .setAlpha(0);
        //--End Player Dialogue--//

        //--Interactable Objects--//
        this.add.rectangle(1040, 800, 800, 160, 0x201010)
            .setAlpha(0.01)
            .setInteractive()
            .on('pointerover', () => {
                if(Allie.x == 600) {
                    this.showMessage("It smells kinda funny, I don't wanna go closer...");
                } else {
                    this.showMessage("A pretty and calm looking river.");
                }
            })
            .on('pointerout', () => {
                if(this.x1 == 1) {
                    this.fadeMessage("It smells kinda funny, I don't wanna go closer...");
                    this.x1 = 0;
                } else {
                    this.fadeMessage("A pretty and calm looking river.");
                }
            })
            .on('pointerdown', () => {
                this.showMessage("It smells kinda funny, I don't wanna go closer...");
                this.x1 = 1;
                this.tweens.add({
                    targets: Allie,
                    x: 600,
                    duration: 1000,
                    ease: 'Sine.inOut'
                });
            });

        this.add.rectangle(690, 350, 1500, 500, 0x201010)
            .setAlpha(0.01)
            .setInteractive()
            .on('pointerover', () => {
                if(Allie.x == 425) {
                    this.showMessage("The sun is so warm and nice...");
                } else {
                    this.showMessage("The sky is so pretty today...");
                }
            })
            .on('pointerout', () => {
                if(this.x1 == 1) {
                    this.fadeMessage("The sun is so warm and nice...");
                    this.x1 = 0;
                } else {
                    this.fadeMessage("The sky is so pretty today...");
                }
            })
            .on('pointerdown', () => {
                this.showMessage("The sun is so warm and nice...");
                this.x1 = 1;
                this.tweens.add({
                    targets: Allie,
                    x: 425,
                    y: 810,
                    scale: 3.1,
                    duration: 1000,
                    ease: 'Sine.inOut'
                });
            });

        let followButterfly = this.add.video(200, 825, 'FollowButterfly')
            .setScale(0.15)
            .setAlpha(0.01)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Follow the butterflies?");
            })
            .on('pointerout', () => {
                this.fadeMessage("Follow the butterflies?");  
            })
            .on('pointerdown', () => {
                this.showMessage("Let's go!");
                this.tweens.add({
                    targets: Allie,
                    x: 1700,
                    y: 1200,
                    duration: 5000,
                    ease: 'Sine.inOut'
                });
                this.tweens.add({
                    targets: followButterfly,
                    x: 1700,
                    y: 1200,
                    duration: 3000,
                    ease: 'linear'
                });
                this.cameras.main.fade(5000, 0,0,0);
                this.time.delayedCall(5500, () => this.scene.start('park2'));
            });
        
        followButterfly.play(true);

        this.tweens.chain({
            tweens: [
                {
                    targets: playerDialogue1,
                    alpha: 1,
                    duration: 2000,
                    delay: 2000
                },
                {
                    targets: playerDialogue2,
                    alpha: 1,
                    duration: 2000
                },
                {
                    targets: followButterfly,
                    alpha: 1,
                    duration: 500,
                    delay: 5000
                },
                {
                    targets: followButterfly,
                    y: 850,
                    repeat: -1,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 500,
                }
            ]
        });

        this.tweens.add({
            targets: [playerDialogue1, playerDialogue2],
            y: 1080,
            duration: 200000
        });
        //--End Interactable Objects--//

        
/*
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

*/

    }
}

class Park2 extends AdventureScene {
    constructor() {
        super("park2", "A Nice Park");
    }

    preload() {
        this.load.image('ParkBackground2', 'assets/bancada-de-parque-pixelada-com-vista-do-horizonte-da-cidade_1282444-204053.png');
        this.load.image('AllieWalkingDown', 'assets/AllieWalkingDown.gif');
        this.load.video('FollowButterfly', 'assets/mariposa-Picsart-BackgroundRemover.mp4');
    }
    onEnter() {

        this.add.image(720, 540, 'ParkBackground2').setScale(1.25);
        //--Allie Moving Across--//
        let Allie = this.add.image(-50, 820, 'AllieWalkingDown')
            .setScale(3)
            .setInteractive()
            .on('pointerover', () => this.showMessage("That's you, Allie!"))
            .on('pointerout', () => {
            if(this.x == 1) {
                this.fadeMessage("Curious and determined as ever...")
                this.x = 0;
            } else {
                this.fadeMessage("That's you, Allie!");
            }  
            })
            .on('pointerdown', () => {
                this.showMessage("Curious and determined as ever...");
                this.x = 1
                this.tweens.add({
                    targets: Allie,
                    scale: 3.35,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        this.tweens.add({
            targets: Allie, 
            x: 1500,
            duration: 15000,
            delay: 500,
            ease: 'linear'
        });
        //--End Allie Moving Across--//

        //--Butterflies Moving Across--//
        let followButterfly = this.add.video(-50, 700, 'FollowButterfly')
            .setScale(0.15);
        followButterfly.play(true);
        this.tweens.add({
            targets: followButterfly,
            x: 1500,
            duration: 12000,
            ease: 'linear'
        });
        //--End Butterflies Moving Across--//

        let playerDialogue1 = this.add.text(400, 300, "It's so peaceful here, I love it…", { fontSize: '40px Georgia'})
            .setColor('#ffffff')
            .setBackgroundColor('#000000')
            .setAlpha(0);
        let playerDialogue2 = this.add.text(500, 430, "There are some weird cracks in the structures though,\nI guess it was made a really long time ago?", { fontSize: '40px Georgia'})
            .setColor('#ffffff')
            .setBackgroundColor('#000000')
            .setAlpha(0);

        this.tweens.chain({
            tweens: [
                {
                    targets: playerDialogue1,
                    alpha: 1,
                    duration: 2000,
                    delay: 2000
                },
                {
                    targets: playerDialogue2,
                    alpha: 1,
                    duration: 2000
                }
            ]
        });

        this.tweens.add({
            targets: [playerDialogue1, playerDialogue2],
            y: 1080,
            duration: 200000
        });

        this.time.delayedCall(15500, () => {
            this.cameras.main.fade(9000, 0,0,0),
            this.scene.start('park3');
        }, [], this);
/*
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
            */
    }
            
}

class Park3 extends AdventureScene {
    constructor() {
        super("park3", "A Nice Park");
    }

    preload() {
        this.load.image('ParkBackground3', 'assets/pixel-art-illustration-park-background-pixelated-park-background-outside-park-background-pixelated-for-the-pixel-art-game-and-icon-for-website-and-game-old-school-retro-vector (1).jpg');
        this.load.image('BonnieWalkingDown', 'assets/BonnieWalkingDown.gif');
        this.load.image('AllieWalkingDown', 'assets/AllieWalkingDown.gif');
        this.load.video('FollowButterfly', 'assets/mariposa-Picsart-BackgroundRemover.mp4');
    }

    onEnter() {
        this.add.image(720, 533, "ParkBackground3")
            .setScale(.92);

        let Allie = this.add.image(-50, 900, 'AllieWalkingDown')
            .setScale(3)
            .setInteractive()
            .on('pointerover', () => this.showMessage("That's you, Allie!"))
            .on('pointerout', () => {
            if(this.x == 1) {
                this.fadeMessage("Curious and determined as ever...")
                this.x = 0;
            } else {
                this.fadeMessage("That's you, Allie!");
            }  
            })
            .on('pointerdown', () => {
                this.showMessage("Curious and determined as ever...");
                this.x = 1
                this.tweens.add({
                    targets: Allie,
                    scale: 3.35,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });
        
        this.tweens.add({
            targets: Allie, 
            x: 400,
            y: 820,
            duration: 4000
        });

        let Bonnie = this.add.image(940, 675, 'BonnieWalkingDown')
            .setScale(3)
            .setInteractive()
            .on('pointerover', () => {
                if(Allie.x == 840) {
                this.showMessage("Talk to Bonnie?");
                } else {
                    this.showMessage("Who could that be?");
                }
            })
            .on('pointerout', () => {
                if(Allie.x == 840) {
                    this.fadeMessage("Talk to Bonnie?");
                    this.x = 0;
                } else {
                    this.fadeMessage("Who could that be?");
                }  
            })
            .on('pointerdown', () => {
                if(Allie.x == 840) {
                    this.cameras.main.fade(5000, 0,0,0);
                    this.time.delayedCall(5500, () => this.scene.start('bonnieDialogue'));
                } else {
                    this.showMessage("Let's find out I guess...");
                    this.x = 1
                    this.tweens.add({
                        targets: Allie,
                        x: 840,
                        y: 780,
                        scale: 2.9,
                        duration: 3000
                    });
                }
            });

        let followButterfly = this.add.video(-50, 800, 'FollowButterfly')
            .setScale(0.15);
        followButterfly.play(true);

        this.tweens.chain({
                tweens: [
                    {
                        targets: followButterfly,
                        x: 940,
                        y: 575,
                        duration: 3500
                    },
                    {
                        targets: followButterfly,
                        y: 600,
                        repeat: -1,
                        yoyo: true,
                        ease: 'Sine.inOut',
                        duration: 500,
                    }
                ]
        });
        //--Interactable River--//
        this.add.rectangle(400, 700, 800, 80, 0x201010)
            .setAlpha(0.01)
            .setInteractive()
            .on('pointerover', () => {
                if(Allie.x == 300) {
                    this.showMessage("Inspect the river?");
                } else {
                    this.showMessage("It's the same river as before.");
                }
            })
            .on('pointerout', () => {
                if(Allie.x == 300) {
                    this.fadeMessage("Inspect the river?");
                    this.x1 = 0;
                } else {
                    this.fadeMessage("It's the same river as before.");
                }
            })
            .on('pointerdown', () => {
                if(Allie.x == 300) {
                    this.cameras.main.fade(5000, 0,0,0);
                    this.time.delayedCall(5500, () => this.scene.start('riverInspect'));  
                    return;
                } else {
                    this.showMessage("There's that funky smell again...");
                    this.x1 = 1;
                    this.tweens.add({
                        targets: Allie,
                        y: 750,
                        x: 300,
                        scale: 2.5,
                        duration: 1000,
                        ease: 'Sine.inOut'
                    });
                }
 
            });
    }
}

class ParkAfterRod extends AdventureScene {
    constructor() {
        super("parkAfterRod", "A Nice Park");
    }

    preload() {
        this.load.image('ParkBackground3', 'assets/pixel-art-illustration-park-background-pixelated-park-background-outside-park-background-pixelated-for-the-pixel-art-game-and-icon-for-website-and-game-old-school-retro-vector (1).jpg');
        this.load.image('BonnieWalkingDown', 'assets/BonnieWalkingDown.gif');
        this.load.image('AllieWalkingDown', 'assets/AllieWalkingDown.gif');
        this.load.video('FollowButterfly', 'assets/mariposa-Picsart-BackgroundRemover.mp4');
    }

    onEnter() {
        this.add.image(720, 533, "ParkBackground3")
            .setScale(.92);

        let Allie = this.add.image(400, 820, 'AllieWalkingDown')
            .setScale(3)
            .setInteractive()
            .on('pointerover', () => this.showMessage("That's you, Allie!"))
            .on('pointerout', () => {
            if(this.x == 1) {
                this.fadeMessage("Curious and determined as ever...")
                this.x = 0;
            } else {
                this.fadeMessage("That's you, Allie!");
            }  
            })
            .on('pointerdown', () => {
                this.showMessage("Curious and determined as ever...");
                this.x = 1
                this.tweens.add({
                    targets: Allie,
                    scale: 3.35,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let Bonnie = this.add.image(940, 675, 'BonnieWalkingDown')
            .setScale(3)
            .setInteractive()
            .on('pointerover', () => {
                if(Allie.x == 840) {
                this.showMessage("Talk to Bonnie?");
                } else {
                    this.showMessage("Who could that be?");
                }
            })
            .on('pointerout', () => {
                if(Allie.x == 840) {
                    this.fadeMessage("Talk to Bonnie?");
                    this.x = 0;
                } else {
                    this.fadeMessage("Who could that be?");
                }  
            })
            .on('pointerdown', () => {
                if(Allie.x == 840) {
                    this.cameras.main.fade(5000, 0,0,0);
                    this.time.delayedCall(5500, () => this.scene.start('bonnieDialogue'));
                } else {
                    this.showMessage("Let's find out I guess...");
                    this.x = 1
                    this.tweens.add({
                        targets: Allie,
                        x: 840,
                        y: 780,
                        scale: 2.9,
                        duration: 3000
                    });
                }
            });

        let followButterfly = this.add.video(940, 575, 'FollowButterfly')
            .setScale(0.15);
        followButterfly.play(true);

        this.tweens.chain({
                tweens: [
                    {
                        targets: followButterfly,
                        y: 600,
                        repeat: -1,
                        yoyo: true,
                        ease: 'Sine.inOut',
                        duration: 500,
                    }
                ]
        });
        //--Interactable River--//
        this.add.rectangle(400, 700, 800, 80, 0x201010)
            .setAlpha(0.01)
            .setInteractive()
            .on('pointerover', () => {
                if(this.x1 ==1) {
                    this.showMessage("There's that funky smell again...");
                } else {
                    this.showMessage("It's the same river as before.");
                }
            })
            .on('pointerout', () => {
                if(this.x1 == 1) {
                    this.fadeMessage("There's that funky smell again...");
                    this.x1 = 0;
                } else {
                    this.fadeMessage("It's the same river as before.");
                }
            })
            .on('pointerdown', () => {
                    this.showMessage("There's that funky smell again...");
                    this.x1 = 1;
                    this.tweens.add({
                        targets: Allie,
                        y: 750,
                        x: 300,
                        scale: 2.5,
                        duration: 1000,
                        ease: 'Sine.inOut'
                    });
 
            });
    }
}

class BonnieDialogue extends AdventureScene {
    constructor() {
        super("bonnieDialogue", "A Conversation with Bonnie");
    }

    preload() {
        this.load.image('BonnieWalkingDown', 'assets/BonnieWalkingDown.gif');
        this.load.image('AllieWalkingDown', 'assets/AllieWalkingDown.gif');
    }

    onEnter() {
        let Bonnie = this.add.image(1040, 575, 'BonnieWalkingDown')
            .setScale(10)
            .setAlpha(.7);
        let Allie = this.add.image(300, 720, 'AllieWalkingDown')
            .setScale(10)
            .setAlpha(.7);

        let bonnieDialogue1 = this.add.text(400, 100, "Allie: Hi what's your name?", { fontSize: '35px Georgia'}).setAlpha(0);
        let bonnieDialogue2 = this.add.text(400, 200, "Bonnie: My name’s Bonnie! I know about you Allie,\nI can’t imagine how confused you must be.", { fontSize: '35px Georgia'}).setAlpha(0);
        let bonnieDialogue3 = this.add.text(400, 320, "Allie: Yea...", { fontSize: '35px Georgia'}).setAlpha(0);
        let bonnieDialogue4 = this.add.text(400, 400, "Bonnie: That's a nice fishing rod you got!", { fontSize: '35px Georgia'}).setAlpha(0);
        let bonnieDialogue5 = this.add.text(400, 500, "Allie: Oh thanks! You're so nice!", { fontSize: '35px Georgia'}).setAlpha(0);
        let bonnieDialogue6 = this.add.text(400, 600, "Bonnie: Of course! Litsen, I want to help you! Can I come along?", { fontSize: '35px Georgia'}).setAlpha(0);
        let bonnieDialogue7 = this.add.text(400, 800, "Let Bonnie Join?", { fontSize: '40px Georgia'}).setColor('#ffffff')
            .setAlpha(0)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                bonnieDialogue7.setFill('#3538d3');
            })
            .on('pointerout', () => {
                bonnieDialogue7.setFill('white');
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('outro'));
            })
        
        this.tweens.add({
            targets: [bonnieDialogue1, bonnieDialogue2, bonnieDialogue3, bonnieDialogue4, bonnieDialogue5, bonnieDialogue6],
            y: 1080,
            duration: 200000
        });

        this.tweens.add({
            targets: [Bonnie, Allie],
            scale: 14,
            duration: 200000
        });

        if (this.registry.get('score') === 1) {
            this.tweens.chain({ 
                tweens: [
                    {
                        targets: bonnieDialogue1,
                        alpha: 1,
                        duration: 2000,
                        delay: 1000
                    },
                    {
                        targets: bonnieDialogue2,
                        alpha: 1,
                        duration: 2000  
                    },
                    {
                        targets: bonnieDialogue3,
                        alpha: 1,
                        duration: 2000
                    },
                    {
                        targets: bonnieDialogue4,
                        alpha: 1,
                        duration: 2000
                    },
                    {
                        targets: bonnieDialogue5,
                        alpha: 1,
                        duration: 2000
                    },
                    {
                        targets: bonnieDialogue6,
                        alpha: 1,
                        duration: 2000
                    }, 
                    {
                        targets: bonnieDialogue7,
                        alpha: 1,
                        duration: 2000
                    }
                ]            
            });

        } else {
            this.tweens.chain({ 
                tweens: [
                    {
                        targets: bonnieDialogue1,
                        alpha: 1,
                        duration: 2000,
                        delay: 1000
                    },
                    {
                        targets: bonnieDialogue2,
                        alpha: 1,
                        duration: 2000  
                    },
                    {
                        targets: bonnieDialogue3,
                        alpha: 1,
                        duration: 2000
                    },
                    {
                        targets: bonnieDialogue6,
                        alpha: 1,
                        duration: 2000
                    }, 
                    {
                        targets: bonnieDialogue7,
                        alpha: 1,
                        duration: 2000
                    }
                ]            
            });
        }
    }
}

class RiverInspect extends AdventureScene {
    constructor() {
        super("riverInspect", "A Smelly River");
    }
    
    preload() {
        this.load.image('RiverBackground', 'assets/pixel-art-illustration-park-background-pixelated-park-background-outside-park-background-pixelated-for-the-pixel-art-game-and-icon-for-website-and-game-old-school-retro-vector (1).jpg');  
        this.load.image('AllieWalkingDown', 'assets/AllieWalkingDown.gif');
        this.load.image('FishingRod', 'assets/a-retro-styled-pixel-art-illustration-of-a-fishing-rod-free-png.png');
    }
    
    onEnter() {
        this.add.image(1490, 540, 'RiverBackground').setScale(1.9);

        let fishingRod = this.add.image(400, 980, 'FishingRod')
            .setScale(0.15)
            .setAngle(20)
            .setInteractive()
            .on('pointerover', () => this.showMessage("You found a weak fishing rod! (+1 Dmg, Can be used to fish [click item to aquire]"))
            .on('pointerout', () => this.fadeMessage("You found a weak fishing rod! (+1 Dmg, Can be used to fish [click item to aquire]"))
            .on('pointerdown', () => {
                this.registry.set('score', 1); 
                this.showMessage("Item aquired: Fishing Rod!");
                this.gainItem('Weak Fishing Rod');
                this.tweens.add({
                   targets: fishingRod,
                   y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => fishingRod.destroy()
                });
                this.time.delayedCall(3000, () => this.cameras.main.fade(2000, 0,0,0));
                this.time.delayedCall(3000, () => this.scene.start('parkAfterRod'));
            });

        this.tweens.add({
            targets: fishingRod,
            scale: .16,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inOut',
            duration: 500
        });
        let Allie = this.add.image(900, 1240, 'AllieWalkingDown').setScale(15);
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    preload() {
        this.load.image('FullscreenIcon', 'assets/FullscreenIcon.png');
        this.load.image('TitleAllie', 'assets/TitleAllie.png');

    }
    create() {
        let backgroundAllie = this.add.image(960, 540, 'TitleAllie').setScale(4.1).setAlpha(0.02);
        let backgroundText = this.add.text(-600, -40, "So Close Yet So Far", { fontSize: '200px Georgia'}).setColor('#202168').setAlpha(0.5);
        this.tweens.add({
            targets: backgroundText,
            scale: 1.5,
            x: -950,
            duration: 80000,
        });
        let introText1 = this.add.text(0, 0, "A Game for Ru", { fontSize: '70px Georgia'}).setColor('#ffffff');
        let introText2 = this.add.text(65, 90, "Click here to begin.", { fontSize: '40px Georgia'}).setColor('#ffffff')
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                introText2.setFill('#3538d3');
            })
            .on('pointerout', () => {
                introText2.setFill('white');
            })
            .on('pointerdown', () => {
                this.tweens.add({
                    targets: backgroundText,
                    alpha: 0,
                    scale: 2,
                    y: -150,
                    x: -1300,
                    duration: 1000,
                });
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('monologue'));
            })
        this.add.container(755, 475, [backgroundText, introText1, introText2]);

        this.add.image(1840, 1000, 'FullscreenIcon')
            .setDepth(11)
            .setScale(0.25)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                if (this.scale.isFullscreen) {
                    this.showMessage('Exit Fullscreen?');
                } else {
                    this.showMessage('Enter Fullscreen?');
                }
            })
            .on('pointerout', () => {
                if (this.scale.isFullscreen) {
                    this.fadeMessage('Exit Fullscreen?');
                } else {
                    this.fadeMessage('Enter Fullscreen?');
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
        this.sound.stopAll();
        this.add.text(50, 50, "Thats if for now..." ).setFontSize(50);
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
        pixelArt: true
    },
    scene: [Intro, Monologue, Park1, Park2, Park3, RiverInspect, ParkAfterRod, BonnieDialogue, Outro],
    title: "Adventure Game",
});