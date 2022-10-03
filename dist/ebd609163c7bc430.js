function Hex(t){this.playThrough=0,this.fillColor=[44,62,80],this.tempColor=[44,62,80],this.angularVelocity=0,this.position=0,this.dy=0,this.dt=1,this.sides=6,this.blocks=[],this.angle=180/this.sides,this.targetAngle=this.angle,this.shakes=[],this.sideLength=t,this.strokeColor="blue",this.x=trueCanvas.width/2,this.y=trueCanvas.height/2,this.ct=0,this.lastCombo=this.ct-settings.comboTime,this.lastColorScored="#000",this.comboTime=1,this.texts=[],this.lastRotate=Date.now();for(var i=0;i<this.sides;i++)this.blocks.push([]);this.shake=function(t){var i=30+60*t.lane;i*=Math.PI/180;var s=Math.cos(i)*t.magnitude,e=Math.sin(i)*t.magnitude;if(gdx-=s,gdy+=e,t.magnitude/=2*(this.dt+.5),t.magnitude<1)for(var h=0;h<this.shakes.length;h++)this.shakes[h]==t&&this.shakes.splice(h,1)},this.addBlock=function(t){if(1==gameState||0===gameState){t.settled=1,t.tint=.6;var i=this.sides-t.fallingLane;this.shakes.push({lane:t.fallingLane,magnitude:4.5*(window.devicePixelRatio?window.devicePixelRatio:1)*settings.scale}),i=((i+=this.position)+this.sides)%this.sides,t.distFromHex=MainHex.sideLength/2*Math.sqrt(3)+t.height*this.blocks[i].length,this.blocks[i].push(t),t.attachedLane=i,t.checked=1}},this.doesBlockCollide=function(t,i,s){if(!t.settled)if(void 0!==i)h=s,i<=0?t.distFromHex-t.iter*this.dt*settings.scale-this.sideLength/2*Math.sqrt(3)<=0?(t.distFromHex=this.sideLength/2*Math.sqrt(3),t.settled=1,t.checked=1):(t.settled=0,t.iter=1.5+waveone.difficulty/15*3):h[i-1].settled&&t.distFromHex-t.iter*this.dt*settings.scale-h[i-1].distFromHex-h[i-1].height<=0?(t.distFromHex=h[i-1].distFromHex+h[i-1].height,t.settled=1,t.checked=1):(t.settled=0,t.iter=1.5+waveone.difficulty/15*3);else{var e=this.sides-t.fallingLane;e=((e+=this.position)+this.sides)%this.sides;var h=this.blocks[e];h.length>0?t.distFromHex+t.iter*this.dt*settings.scale-h[h.length-1].distFromHex-h[h.length-1].height<=0&&(t.distFromHex=h[h.length-1].distFromHex+h[h.length-1].height,this.addBlock(t)):t.distFromHex+t.iter*this.dt*settings.scale-this.sideLength/2*Math.sqrt(3)<=0&&(t.distFromHex=this.sideLength/2*Math.sqrt(3),this.addBlock(t))}},this.rotate=function(t){if((!(Date.now()-this.lastRotate<75)||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))&&(1===gameState||0===gameState)){for(this.position+=t,history[this.ct]||(history[this.ct]={}),history[this.ct].rotate?history[this.ct].rotate+=t:history[this.ct].rotate=t;this.position<0;)this.position+=6;this.position=this.position%this.sides,this.blocks.forEach((function(i){i.forEach((function(i){i.targetAngle=i.targetAngle-60*t}))})),this.targetAngle=this.targetAngle-60*t,this.lastRotate=Date.now()}},this.draw=function(){this.x=trueCanvas.width/2,-2!=gameState&&(this.y=trueCanvas.height/2),this.sideLength=settings.hexWidth,gdx=0,gdy=0;for(var t=0;t<this.shakes.length;t++)this.shake(this.shakes[t]);this.angle>this.targetAngle?this.angularVelocity-=angularVelocityConst*this.dt:this.angle<this.targetAngle&&(this.angularVelocity+=angularVelocityConst*this.dt),Math.abs(this.angle-this.targetAngle+this.angularVelocity)<=Math.abs(this.angularVelocity)?(this.angle=this.targetAngle,this.angularVelocity=0):this.angle+=this.angularVelocity,drawPolygon(this.x+gdx,this.y+gdy+this.dy,this.sides,this.sideLength,this.angle,arrayToColor(this.fillColor),0,"rgba(0,0,0,0)")}}function arrayToColor(t){return"rgb("+t[0]+","+t[1]+","+t[2]+")"}