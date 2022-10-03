function initialize(e){if(window.rush=1,window.lastTime=Date.now(),window.iframHasLoaded=!1,window.colors=["#e74c3c","#f1c40f","#3498db","#2ecc71"],window.hexColorsToTintedColors={"#e74c3c":"rgb(241,163,155)","#f1c40f":"rgb(246,223,133)","#3498db":"rgb(151,201,235)","#2ecc71":"rgb(150,227,183)"},window.rgbToHex={"rgb(231,76,60)":"#e74c3c","rgb(241,196,15)":"#f1c40f","rgb(52,152,219)":"#3498db","rgb(46,204,113)":"#2ecc71"},window.rgbColorsToTintedColors={"rgb(231,76,60)":"rgb(241,163,155)","rgb(241,196,15)":"rgb(246,223,133)","rgb(52,152,219)":"rgb(151,201,235)","rgb(46,204,113)":"rgb(150,227,183)"},window.hexagonBackgroundColor="rgb(236, 240, 241)",window.hexagonBackgroundColorClear="rgba(236, 240, 241, 0.5)",window.centerBlue="rgb(44,62,80)",window.angularVelocityConst=4,window.scoreOpacity=0,window.textOpacity=0,window.prevGameState=void 0,window.op=0,window.saveState=localStorage.getItem("saveState")||"{}","{}"!==saveState&&(op=1),window.textShown=!1,window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/framerate)},$("#clickToExit").bind("click",toggleDevTools),window.settings,/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?($(".rrssb-email").remove(),settings={os:"other",platform:"mobile",startDist:227,creationDt:60,baseScale:1.4,scale:1,prevScale:1,baseHexWidth:87,hexWidth:87,baseBlockHeight:20,blockHeight:20,rows:7,speedModifier:.73,speedUpKeyHeld:!1,creationSpeedModifier:.73,comboTime:310,continueGame:!0,timer:null}):settings={os:"other",platform:"nonmobile",baseScale:1,startDist:340,creationDt:9,scale:1,prevScale:1,hexWidth:65,baseHexWidth:87,baseBlockHeight:20,blockHeight:15,rows:8,speedModifier:.65,speedUpKeyHeld:!1,creationSpeedModifier:.65,comboTime:310,continueGame:!0},/Android/i.test(navigator.userAgent)&&(settings.os="android"),(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i))&&(settings.os="ios"),window.canvas=document.getElementById("canvas"),window.ctx=canvas.getContext("2d"),window.trueCanvas={width:canvas.width,height:canvas.height},scaleCanvas(),window.framerate=60,window.history={},window.score=0,window.scoreAdditionCoeff=1,window.prevScore=0,window.numHighScores=3,highscores=[],localStorage.getItem("highscores"))try{highscores=JSON.parse(localStorage.getItem("highscores"))}catch(e){highscores=[]}window.blocks=[],window.MainHex,window.gdx=0,window.gdy=0,window.devMode=0,window.lastGen=void 0,window.prevTimeScored=void 0,window.nextGen=void 0,window.spawnLane=0,window.importing=0,window.importedHistory=void 0,window.startTime=void 0,window.gameState,setStartScreen(),1!=e&&(window.canRestart=1,window.onblur=function(e){1==gameState&&pause()},$("#startBtn").off(),"mobile"==settings.platform?$("#startBtn").on("touchstart",startBtnHandler):$("#startBtn").on("mousedown",startBtnHandler),document.addEventListener("touchmove",(function(e){e.preventDefault()}),!1),$(window).resize(scaleCanvas),$(window).unload((function(){1==gameState||-1==gameState||0===gameState?localStorage.setItem("saveState",exportSaveState()):localStorage.setItem("saveState","{}")})),addKeyListeners(),document.addEventListener("pause",handlePause,!1),document.addEventListener("backbutton",handlePause,!1),document.addEventListener("menubutton",handlePause,!1),setTimeout((function(){if("mobile"==settings.platform){try{document.body.removeEventListener("touchstart",handleTapBefore,!1)}catch(e){}try{document.body.removeEventListener("touchstart",handleTap,!1)}catch(e){}document.body.addEventListener("touchstart",handleTapBefore,!1)}else{try{document.body.removeEventListener("mousedown",handleClickBefore,!1)}catch(e){}try{document.body.removeEventListener("mousedown",handleClick,!1)}catch(e){}document.body.addEventListener("mousedown",handleClickBefore,!1)}}),1))}function startBtnHandler(){if(tgames.gameStarted(),setTimeout((function(){if("mobile"==settings.platform){try{document.body.removeEventListener("touchstart",handleTapBefore,!1)}catch(e){}try{document.body.removeEventListener("touchstart",handleTap,!1)}catch(e){}document.body.addEventListener("touchstart",handleTap,!1)}else{try{document.body.removeEventListener("mousedown",handleClickBefore,!1)}catch(e){}try{document.body.removeEventListener("mousedown",handleClick,!1)}catch(e){}document.body.addEventListener("mousedown",handleClick,!1)}}),5),!canRestart)return!1;$("#openSideBar").is(":visible")&&$("#openSideBar").fadeOut(150,"linear"),1==importing?(init(1),checkVisualElements(0)):resumeGame()}function handlePause(){1!=gameState&&2!=gameState||pause()}function handleTap(e){handleClickTap(e.changedTouches[0].clientX,e.changedTouches[0].clientY)}function handleClick(e){handleClickTap(e.clientX,e.clientY)}function handleTapBefore(e){var t=e.changedTouches[0].clientX,o=e.changedTouches[0].clientY;t<120&&o<83&&$(".helpText").is(":visible")&&showHelp()}function handleClickBefore(e){var t=e.clientX,o=e.clientY;t<120&&o<83&&$(".helpText").is(":visible")&&showHelp()}$(document).ready((function(){initialize()}));