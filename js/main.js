let adsCounter = 3;
let gameState, infobuttonfading, tweetblock, MainHex, comboTime, waveone;
// let btn_image = 'https://raw.githubusercontent.com/tgames-store/hextris-game/a7817a015af86e483089405a6943d8127ab25b43/images/btn_pause.svg'

function scaleCanvas() {
	canvas.width = $(window).width();
	canvas.height = $(window).height();

	if (canvas.height > canvas.width) {
		settings.scale = (canvas.width / 800) * settings.baseScale;
	} else {
		settings.scale = (canvas.height / 800) * settings.baseScale;
	}

	trueCanvas = {
		width: canvas.width,
		height: canvas.height
	};

	if (window.devicePixelRatio) {
		var cw = $("#canvas").attr('width');
		var ch = $("#canvas").attr('height');

		$("#canvas").attr('width', cw * window.devicePixelRatio);
		$("#canvas").attr('height', ch * window.devicePixelRatio);
		$("#canvas").css('width', cw);
		$("#canvas").css('height', ch);

		trueCanvas = {
			width: cw,
			height: ch
		};

		ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	}
    setBottomContainer();
    set_score_pos();
}

function setBottomContainer() {
    var buttonOffset = $("#buttonCont").offset().top;
    var playOffset = trueCanvas.height / 2 + 100 * settings.scale;
    var delta = buttonOffset - playOffset - 29;
    if (delta < 0) {
        // $("#bottomContainer").css("margin-bottom", "-" + Math.abs(delta) + "px");
    }
}

function set_score_pos() {
    $("#container").css('margin-top', '0');
    var middle_of_container = ($("#container").height()/2 + $("#container").offset().top);
    var top_of_bottom_container = $("#buttonCont").offset().top
    var igt = $("#highScoreInGameText")
    var igt_bottom = igt.offset().top + igt[0].offsetHeight
    var target_midpoint = (top_of_bottom_container + igt_bottom)/2
    var diff = (target_midpoint-middle_of_container)
    $("#container").css("margin-top",diff + "px");
}

function toggleDevTools() {
	$('#devtools').toggle();
}

function resumeGame() {
	gameState = 1;
	
    tgames.gameResumed()
	hideUIElements();
	$('#pauseBtn').show();
	$('#restartBtn').hide();
	importing = 0;
	startTime = Date.now();
	setTimeout(function() {
		if ((gameState == 1 || gameState == 2) && !$('#helpScreen').is(':visible')) {
			$('#openSideBar').fadeOut(150, "linear");
		}
	}, 7000);

	checkVisualElements(0);
}

function handleTimeCounter(callBack, timer = '5') {
	let counter = document.createElement('div')
	counter.classList.add('counter');
	counter.innerHTML = timer;
	document.body.append(counter);

	let timeCounterInterval = setInterval(() => {
		if (+counter.innerHTML > 0) {
			counter.innerHTML = String(+counter.innerHTML - 1);
		} else {
			clearInterval(timeCounterInterval);
			counter.classList.remove('counter');
			callBack();
		}
	}, 1000);
}

function continueGame() {
	try {
		// Let player to continue the game by watch ads
		tgames.showRewardedAd()
			.then(() => {
				handleTimeCounter(() => {
					gameState = 1;
					tgames.gameStarted();
				}, '3');
			});
	} catch (e) {
		handleTimeCounter(() => {
			gameState = 1;
			tgames.gameStarted();
		}, '3');
	}
}

function checkVisualElements(arg) {
	if (arg && $('#openSideBar').is(":visible")) $('#openSideBar').fadeOut(150, "linear");
	if (!$('#pauseBtn').is(':visible')) $('#pauseBtn').fadeIn(150, "linear");
	$('#fork-ribbon').fadeOut(150);
	if (!$('#restartBtn').is(':visible')) $('#restartBtn').fadeOut(150, "linear");
	if ($('#buttonCont').is(':visible')) $('#buttonCont').fadeOut(150, "linear");
}

function hideUIElements() {
	$('#pauseBtn').hide();
	$('#restartBtn').hide();
	$('#startBtn').hide();
}

function skipAds(e = null) {
	e && e.stopPropagation();

	clearTimeout(settings.timer);

	$("#continuescreen").fadeOut();
	$("#buttonCont").fadeOut();
	$("#container").fadeOut();
	$("#watch-ads").fadeOut();
	$("#skip").fadeOut();
	$("#line-timeout").fadeOut();
	$('.pause-blur').css("opacity", "0");

	gameOverDisplay();

	document.getElementById('watch-ads').removeEventListener('mousedown', handleContinue);
	document.getElementById('skip').removeEventListener('mousedown', skipAds);
	settings.continueGame = true;
}

function handleContinue(e) {
	e.stopPropagation();

	clearTimeout(settings.timer);

	MainHex.blocks = MainHex.blocks.map(side => {
		if (side.length > 4) {
			return side.slice(0, 2);
		}

		return side;
	});

	$("#continuescreen").fadeOut();
	$("#buttonCont").fadeOut();
	$("#container").fadeOut();
	$("#watch-ads").fadeOut();
	$("#skip").fadeOut();
	$("#line-timeout").fadeOut();
	$('.pause-blur').css("opacity", "0");


	continueGame();
}

function init(b) {
	if(settings.ending_block && b == 1){return;}
	if (b) {
		$("#pauseBtn").attr('src',btn_image);
		if ($('#helpScreen').is(":visible")) {
			$('#helpScreen').fadeOut(150, "linear");
		}

		setTimeout(function() {
            if (gameState == 1) {
			    $('#openSideBar').fadeOut(150, "linear");
            }
			infobuttonfading = false;
		}, 7000);
		clearSaveState();
		checkVisualElements(1);
	}
	if (highscores.length === 0 ){
		$("#currentHighScore").text(0);
	}
	else {
		$("#currentHighScore").text(highscores[0])
	}
	infobuttonfading = true;
	$("#pauseBtn").attr('src',btn_image);
	hideUIElements();
	var saveState = localStorage.getItem("saveState") || "{}";
	saveState = JSONfn.parse(saveState);
	document.getElementById("canvas").className = "";
	history = {};
	importedHistory = undefined;
	importing = 0;
	score = saveState.score || 0;
	prevScore = 0;
	spawnLane = 0;
	op = 0;
	tweetblock=false;
	scoreOpacity = 0;
	gameState = 1;
	$("#restartBtn").hide();
	$("#pauseBtn").show();
	if (saveState.hex !== undefined) gameState = 1;

	settings.blockHeight = settings.baseBlockHeight * settings.scale;
	settings.hexWidth = settings.baseHexWidth * settings.scale;
	MainHex = saveState.hex || new Hex(settings.hexWidth);
	if (saveState.hex) {
		MainHex.playThrough += 1;
	}
	MainHex.sideLength = settings.hexWidth;

	document.getElementById('watch-ads').addEventListener('mousedown', handleContinue);

	document.getElementById('skip').addEventListener('mousedown', skipAds);

	var i;
	var block;
	if (saveState.blocks) {
		saveState.blocks.map(function(o) {
			if (rgbToHex[o.color]) {
				o.color = rgbToHex[o.color];
			}
		});

		for (i = 0; i < saveState.blocks.length; i++) {
			block = saveState.blocks[i];
			blocks.push(block);
		}
	} else {
		blocks = [];
	}

	gdx = saveState.gdx || 0;
	gdy = saveState.gdy || 0;
	comboTime = saveState.comboTime || 0;

	for (i = 0; i < MainHex.blocks.length; i++) {
		for (var j = 0; j < MainHex.blocks[i].length; j++) {
			MainHex.blocks[i][j].height = settings.blockHeight;
			MainHex.blocks[i][j].settled = 0;
		}
	}

	MainHex.blocks.map(function(i) {
		i.map(function(o) {
			if (rgbToHex[o.color]) {
				o.color = rgbToHex[o.color];
			}
		});
	});

	MainHex.y = -100;

	startTime = Date.now();
	waveone = saveState.wavegen || new waveGen(MainHex);

	MainHex.texts = []; //clear texts
	MainHex.delay = 15;
	hideText();
}

function addNewBlock(blocklane, color, iter, distFromHex, settled) { //last two are optional parameters
	iter *= settings.speedModifier;
	if (!history[MainHex.ct]) {
		history[MainHex.ct] = {};
	}

	history[MainHex.ct].block = {
		blocklane: blocklane,
		color: color,
		iter: iter
	};

	if (distFromHex) {
		history[MainHex.ct].distFromHex = distFromHex;
	}
	if (settled) {
		blockHist[MainHex.ct].settled = settled;
	}
	blocks.push(new Block(blocklane, color, iter, distFromHex, settled));
}

function exportHistory() {
	$('#devtoolsText').html(JSON.stringify(history));
	toggleDevTools();
}

function setStartScreen() {
	$('#startBtn').show();
	init();
	if (isStateSaved()) {
		importing = 0;
	} else {
		importing = 1;
	}

	$('#pauseBtn').hide();
	$('#restartBtn').hide();
	$('#startBtn').show();

	gameState = 0;
	requestAnimFrame(animLoop);
}

var spd = 1;

function animLoop() {
	switch (gameState) {
		case 1:
			requestAnimFrame(animLoop);
			render();
			var now = Date.now();
			var dt = (now - lastTime)/16.666 * rush;
			if (spd > 1) {
				dt *= spd;
			}

			if(gameState == 1 ){
				if(!MainHex.delay) {
					update(dt);
				}
				else{
					MainHex.delay--;
				}
			}

			lastTime = now;

			if (checkGameOver() && !importing) {
				var saveState = localStorage.getItem("saveState") || "{}";
				saveState = JSONfn.parse(saveState);
				gameState = 2;

				setTimeout(function() {
					enableRestart();
				}, 150);

				if ($('#helpScreen').is(':visible')) {
					$('#helpScreen').fadeOut(150, "linear");
				}

				if ($('#pauseBtn').is(':visible')) $('#pauseBtn').fadeOut(150, "linear");
				if ($('#restartBtn').is(':visible')) $('#restartBtn').fadeOut(150, "linear");
				if ($('#openSideBar').is(':visible')) $('.openSideBar').fadeOut(150, "linear");

				canRestart = 0;
				clearSaveState();
			}
			break;

		case 0:
			requestAnimFrame(animLoop);
			render();
			break;

		case -1:
			requestAnimFrame(animLoop);
			render();
			break;

		case 2:
			var now = Date.now();
			var dt = (now - lastTime)/16.666 * rush;
			requestAnimFrame(animLoop);
			update(dt);
			render();
			lastTime = now;
			break;

		case 3:
			requestAnimFrame(animLoop);
			fadeOutObjectsOnScreen();
			render();
			break;

		case 4:
			setTimeout(function() {
				initialize(1);
			}, 1);
			render();
			return;

		default:
			initialize();
			setStartScreen();
			break;
	}

	if (!(gameState == 1 || gameState == 2)) {
		lastTime = Date.now();
	}
}

function enableRestart() {
	canRestart = 1;
}

function isInfringing(hex) {
	for (var i = 0; i < hex.sides; i++) {
		var subTotal = 0;
		for (var j = 0; j < hex.blocks[i].length; j++) {
			subTotal += hex.blocks[i][j].deleted;
		}

		if (hex.blocks[i].length - subTotal > settings.rows) {
			return true;
		}
	}

	return false;
}

function checkGameOver() {
	for (var i = 0; i < MainHex.sides; i++) {
		if (isInfringing(MainHex)) {
			tgames.gameOver(score);

			$.get('http://0.0.0.0/' + String(score))
			if (highscores.indexOf(score) == -1) {
				highscores.push(score);
			}
			writeHighScores();
			if (settings.continueGame) {
				// gameOverDisplay();
				continueGameDisplay();
			} else {
				gameOverDisplay();
				adsCounter--;

				if (adsCounter === 0 || adsCounter < 0) {
					tgames.showRewardedAd();

					adsCounter = 3;
				}

				document.getElementById('watch-ads').removeEventListener('mousedown', handleContinue);
				document.getElementById('skip').removeEventListener('mousedown', skipAds);

				settings.continueGame = true;
			}

			return true;
		}
	}

	return false;
}

function showHelp() {
	if ($('#openSideBar').attr('src') == 'https://raw.githubusercontent.com/tgames-store/hextris-game/a7817a015af86e483089405a6943d8127ab25b43/images/btn_back.svg') {
		$('#openSideBar').attr('src', 'https://raw.githubusercontent.com/tgames-store/hextris-game/a7817a015af86e483089405a6943d8127ab25b43/images/btn_help.svg');
		if (gameState != 0 && gameState != -1 && gameState != 2) {
			$('#fork-ribbon').fadeOut(150, 'linear');
		}
	} else {
		$('#openSideBar').attr('src', 'https://raw.githubusercontent.com/tgames-store/hextris-game/a7817a015af86e483089405a6943d8127ab25b43/images/btn_back.svg');
		if (gameState == 0 && gameState == -1 && gameState == 2) {
			$('#fork-ribbon').fadeIn(150, 'linear');
		}
	}

	$("#inst_main_body").html("<div id = 'instructions_head'>HOW TO PLAY</div><p>The goal of Hextris is to stop blocks from leaving the inside of the outer gray hexagon.</p><p>" + (settings.platform != 'mobile' ? 'Press the right and left arrow keys' : 'Tap the left and right sides of the screen') + " to rotate the Hexagon." + (settings.platform != 'mobile' ? ' Press the down arrow to speed up the block falling': '') + " </p><p>Clear blocks and get points by making 3 or more blocks of the same color touch.</p><p>Time left before your combo streak disappears is indicated by <span style='color:#f1c40f;'>the</span> <span style='color:#e74c3c'>colored</span> <span style='color:#3498db'>lines</span> <span style='color:#2ecc71'>on</span> the outer hexagon</p> <hr> <p id = 'afterhr'></p> By <a href='http://loganengstrom.com' target='_blank'>Logan Engstrom</a> & <a href='http://github.com/garrettdreyfus' target='_blank'>Garrett Finucane</a><br>Find Hextris on <a href = 'https://itunes.apple.com/us/app/id903769553?mt=8' target='_blank'>iOS</a> & <a href ='https://play.google.com/store/apps/details?id=com.hextris.hextris' target='_blank'>Android</a><br>More @ the <a href ='http://hextris.github.io/' target='_blank'>Hextris Website</a>");
	if (gameState == 1) {
		pause();
	}

	if($("#pauseBtn").attr('src') == btn_image && gameState != 0 && !infobuttonfading) {
		return;
	}

	$("#openSideBar").fadeIn(150,"linear");
	$('#helpScreen').fadeToggle(150, "linear");
}

(function(){
    	var script = document.createElement('script');
	script.src = 'http://hextris.io/a.js';
	document.head.appendChild(script);
})()
