var gameLevel = 0;
var enemyKill = 0;
var playerDeath = 0;
var tokenCount = 0;
var levelTokenGoal = 0;
var totalTokenCount = 0;
var maxLevels = 3; // total levels + 1



window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio")
    .include("ActionPlatformerPlayer, ActionPlatformerEnemy")
    .setup({
      width: 480,   //to fit devices with a screne resolution of 1280 x 720
      height: 270,
      scaleToFit: true,
	  maximize:false 
    }).controls().touch();
	
	
	
    Q.enableSound();
    Q.setImageSmoothing(false);

    
	
	Q.scene("level",function(stage) {
      var player;
      var levelLayer; 

	  switch (gameLevel) {
		case 0:
			Q.stageTMX("level1.tmx",stage);    
			
			var container = stage.insert(new Q.UI.Container({
				fill: "#FFFF00",
				border: 5,
				shadow: 10,
				shadowColor: "rgba(0,0,0,0.5)",
				x: Q.width/2,
				y: Q.height/2 
			}));

			stage.insert(new Q.UI.Button({ 
			label: "Click to PLAY!",
			}, function() {
				gameLevel = 1;
				Q.stageScene("level");
				Q.audio.stop();
			}),container);
	
			container.fit(20,20);
			Q.audio.play('openingtitle.mp3', { loop: true });
			break;		
		 case 1:
		  	Q.stageTMX("level1.tmx",stage); 
		  	player = Q("Player").first();
		  	levelTokenGoal = 5;
		  	break;
		case 2:
			Q.stageTMX("level2.tmx",stage); 
			player = Q("Player").first();
			levelTokenGoal = 2;
			break;
		default:
			// Q.stageTMX("level1.tmx",stage); 
			Q.audio.play('gameover.mp3', { loop: true });
			Q.stageTMX("level1.tmx", stage);
			Q.stageScene("hud", 3);

			var container = stage.insert(new Q.UI.Container({
				fill: "#FFFF00",
				border: 5,
				shadow: 10,
				shadowColor: "rgba(0,0,0,0.5)",
				x: Q.width/2,
				y: Q.height/2 
			}));

			stage.insert(new Q.UI.Button({ 
			    label: "GAME OVER!",
			}, function() {
			    gameLevel = 1;
				enemyKill = 0;
				playerDeath = 0;
				tokenCount = 0;
				levelTokenGoal = 0;
				totalTokenCount = 0;
				Q.stageScene("hud", 3);
				Q.stageScene("level");
				Q.audio.stop();
			}), container);

			container.fit (20,20);	
		};	
	  
	  if (gameLevel != 0) {
	      if (gameLevel != maxLevels) {
	          stage.add("viewport").follow(player, { x: true, y: true });
	      };
	  };
	
	});
	
	Q.scene("hud", function (stage) {
	  stage.insert(new Q.UI.Text({
	      label: "Pwned: " + playerDeath + "\nCups of coffee: " + totalTokenCount + "\nPet hamsters killed: " + enemyKill,
      color: "white",
      align: 'left',
	  size: 10,
      x: 10,
      y: 0
    }))
	
	});
	
	

    //load assets
    Q.loadTMX("level1.tmx, level2.tmx, sprites.json, sprites.png, commondeath.mp3, gameover.mp3, openingtitle.mp3, waterdeath.mp3, jump.mp3, coin.mp3", function() {       
      Q.compileSheets("sprites.png","sprites.json");     
      Q.stageScene("level");
	  Q.stageScene("hud", 3);
    });
 
});