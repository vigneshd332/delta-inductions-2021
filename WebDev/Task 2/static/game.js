//Ah shit, Here we go again
canvas=document.getElementById('game-canvas')
ucanvas=document.getElementById('upper-canvas')
lcanvas=document.getElementById('lower-canvas')
scores=document.getElementById('score')
invTimer=document.getElementById('invTime')
multiField=document.getElementById('multiplier')
playpausebutton=document.getElementById('playpause')
audiobutton=document.getElementById('audio')
ctx=canvas.getContext('2d')
uctx=ucanvas.getContext('2d')
lctx=lcanvas.getContext('2d')
music = new Audio('assets/Tobu-Hope.mp3')
gomusic = new Audio('assets/gameover.mp3')
downState=false
goUp=false
goDown=false
potholes=[]
balls=[]
powerups=[]
play=true
score=0
invTime=0
multiplier=1
multiTimer=0
enableAudio=false

function Player(x,y,height,width){
    this.x = x
    this.y = y
    this.height = height
    this.width = width
    
    this.render = function() {
        ctx.beginPath()
        playersprite = new Image()
        if(this.y<(ctx.canvas.height/2) && downState==false){
            playersprite.src='assets/player_ground_flipped.png'
        }
        else if(this.y<(ctx.canvas.height/2)){
            playersprite.src='assets/player_flipped.png'
        }
        else if(this.y>(ctx.canvas.height/2) && downState){
            playersprite.src='assets/player_ground.png'
        }
        else{
            playersprite.src='assets/player.png'
        }
        ctx.drawImage(playersprite,this.x,this.y,this.height,this.width)
        ctx.closePath()
    }

    this.update = function(){
        if(goDown){
            if(this.y<ctx.canvas.height-this.height){
                this.y+=2.8*multiplier
            }
            else{
                goDown=false
                downState=true
            }
        }
        else if(goUp){
            if(this.y>0){
                this.y-=2.8*multiplier
            }
            else{
                goUp=false
                downState=false
            }
        }
        this.render()
    }
}
function PotHole(x,y,height,width,position){
    this.x=x
    this.y=y
    this.height=height
    this.width=width
    this.position=position

    this.render = function (){
        if(this.position){
            lctx.rect(this.x,this.y,this.height,this.width)
            lctx.fillStyle = '#2a2a2a'
            lctx.fill()
        }
        else{
            uctx.rect(this.x,this.y+2,this.height,this.width)
            uctx.fillStyle = '#2a2a2a'
            uctx.fill()
        }
    }

    this.update = function(){
        this.x-=1*multiplier
        this.render()
    }
}
function Invincible(x,y,edge,downRender,speed){
    this.x=x
    this.y=y
    this.edge=edge
    this.downRender=downRender
    this.speed=speed

    this.render = function(){
        ctx.beginPath()
        star = new Image()
        star.src='assets/star.png'
        ctx.drawImage(star,this.x,this.y,this.edge,this.edge)
        ctx.closePath()
    }

    this.update = function(){
        this.x-=0.8
        this.render()
        if(this.downRender){
            if(this.y<ctx.canvas.height-1.5*this.edge){
                this.y+=this.speed*multiplier
            }
            else{
                this.downRender=false
            }            
        }
        else if(!this.downRender){
            if(this.y>1.5*this.edge){
                this.y-=this.speed*multiplier
            }
            else{
                this.downRender=true
            }
        }
    }
}
function Ball(x,y,radius,downRender,speed){
    this.x=x
    this.y=y
    this.radius=radius
    this.downRender=downRender
    this.speed=speed

    this.render = function(){
        ctx.beginPath()
        ghost = new Image()
        ghost.src='assets/ghost.png'
        ctx.drawImage(ghost,this.x,this.y,this.radius*2,this.radius*2)
        ctx.closePath()
    }

    this.update = function(){
        this.x-=0.8
        this.render()
        if(this.downRender){
            if(this.y<ctx.canvas.height-1.5*radius){
                this.y+=this.speed*multiplier
            }
            else{
                this.downRender=false
            }            
        }
        else if(!this.downRender){
            if(this.y>1.5*radius){
                this.y-=this.speed*multiplier
            }
            else{
                this.downRender=true
            }
        }
    }
}
function startAudio(){
    if(enableAudio==false){
        enableAudio=true
        if(play==true){
            music.play()
        }
        audiobutton.innerHTML="<img id=\"buttons\" src=\"assets/music.png\" width=\"25px\" height=\"25px\">"
    }
    else{
        enableAudio=false
        music.pause()
        audiobutton.innerHTML="<img id=\"buttons\" src=\"assets/nomusic.png\" width=\"25px\" height=\"25px\">"
    }
}
function playPause(){
    if(play==true){
        play=false
        if(enableAudio) music.pause()
        playpausebutton.innerHTML="<img id=\"buttons\" src=\"assets/play.png\" width=\"25px\" height=\"25px\">"
    }
    else{
        play=true
        if(enableAudio) music.play()
        playpausebutton.innerHTML="<img id=\"buttons\" src=\"assets/pause.png\" width=\"25px\" height=\"25px\">"
        potHoleGenerator()
    }
}
function togglePopupOn(id){
    document.getElementById(`${id}`).classList.toggle("active");
}
function stopGame(){
    if(enableAudio==true){
        gomusic.play()
        music.pause()
    }
    highestScore = JSON.parse(localStorage.getItem("highestScore"))
    if((!highestScore) || (highestScore<score)){
        highestName = localStorage.setItem("highestName", JSON.stringify(playerName))
        highestScore = localStorage.setItem("highestScore",JSON.stringify(Math.round(score)))
    }
    togglePopupOn('popup-2')
    document.getElementById('scorex').innerHTML=Math.round(score)
    document.getElementById('highestName').innerHTML=JSON.parse(localStorage.getItem("highestName"))
    document.getElementById('highestScore').innerHTML=Math.round(JSON.parse(localStorage.getItem('highestScore')))
}
function activatePowerup(i){
    invincible=true
    powerups.splice(i,1)
    invTime=10
    invTimer.innerHTML=invTime
}
async function potHoleGenerator(){
    while(play==true){
        doGenerate=Math.random()-0.5
        ballGenerate=Math.random()-0.5
        powerGenerate=Math.random()-0.5
        canvasDecide=Math.random()-0.5
        if(doGenerate>=-0.1){
            if(canvasDecide>=0){
                potholes.push(new PotHole(Math.round((window.innerWidth*7/10)),0,Math.round((window.innerHeight)*1/10)+(Math.random()*40)-20,80,true))
            }
            else{
                potholes.push(new PotHole(Math.round((window.innerWidth*7/10)),0,Math.round((window.innerHeight)*1/10)+(Math.random()*40)-20,80,false))
            }
        }
        for(i=0;i<potholes.length;i++){
            if(potholes[i].x<=-100){
                potholes.splice(i,1)
            }
        }
        if(ballGenerate>=0.05){
            ballGenerate=Math.random()-0.5
            if (ballGenerate<0){
                ballDown=true
            }
            else{
                ballDown=false
            }
            balls.push(new Ball(Math.round((window.innerWidth*7/10))+100,ctx.canvas.height/2+((Math.random()-0.5)*100),30,ballDown,0.6+Math.random()))
        }
        if(powerGenerate>=0.3){
            powerups.push(new Invincible(Math.round((window.innerWidth*7/10))+100,ctx.canvas.height/2+((Math.random()-0.5)*100),40,true,0.6+Math.random()))
        }
        for(i=0;i<balls.length;i++){
            if(balls[i].x<=-100){
                balls.splice(i,1)
            }
        }
        for(i=0;i<powerups.length;i++){
            if(powerups[i].x<=-100){
                powerups.splice(i,1)
            }
        }
        if(invTime==0){
            invincible=false
        }
        if(invincible){
            invTime-=2
            invTimer.innerHTML=invTime
        }
        if(invTime==0){
            invincible=false
        }
        if(multiTimer>15){
            multiplier+=0.05
            multiTimer=0
            multiField.innerHTML=Math.round(multiplier*100)/100
        }
        else{
            multiTimer+=2
        }
        await sleep(2000)
    }
}
function animate(){
    requestAnimationFrame(animate)

    if(play==true){
        uctx.canvas.width  = window.innerWidth*7/10;
        lctx.canvas.width  = window.innerWidth*7/10;    //These 6 lines clear the canvas
        uctx.canvas.height = (window.innerHeight)*1/10; //aka Sir Canvasus Yeetus Deletus
        lctx.canvas.height = (window.innerHeight)*1/10;
        ctx.canvas.width  = window.innerWidth*7/10;
        ctx.canvas.height = (window.innerHeight)*7/10;

        for(i=0;i<potholes.length;i++){
            potholes[i].update()
            if((player.x+player.width>=potholes[i].x)&&(player.x<=potholes[i].x+potholes[i].width)&&(downState==potholes[i].position)){
                if(!invincible){
                    play=false
                    stopGame()
                }
            }
        }
        for(i=0;i<balls.length;i++){
            balls[i].update()
            if(Math.pow(balls[i].x-(player.x+(player.width/2)),2)+Math.pow(balls[i].y-(player.y+(player.height/2)),2)<=Math.pow(balls[i].radius+(player.width/2),2)){
                if(!invincible){
                    play=false
                    stopGame()
                }
            }
        }
        for(i=0;i<powerups.length;i++){
            powerups[i].update()
            if(Math.pow(powerups[i].x-(player.x+(player.width/2)),2)+Math.pow(powerups[i].y-(player.y+(player.height/2)),2)<=Math.pow(powerups[i].edge+(player.width/2),2)){
                activatePowerup(i)
            }
        }
        score+=0.25
        scores.innerHTML=Math.round(score)
        player.update()
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
document.addEventListener('keyup',(e)=>{
    if ((e.code=='Space' && downState==true) || (e.code=="Space" && downState==null && goDown==true)){
        goDown=false
        goUp=true
        downState=null
        player.update()
    }
    else if ((e.code=='Space' && downState==false) || (e.code=="Space" && downState==null && goUp==true)){
        goDown=true
        goUp=false
        downState=null
        player.update()
    }
})
document.addEventListener('click',(e)=>{
    if(e.target.id=='buttons') return;
    if ((downState==true) || (downState==null && goDown==true)){
        goDown=false
        goUp=true
        downState=null
        player.update()
    }
    else if ((downState==false) || (downState==null && goUp==true)){
        goDown=true
        goUp=false
        downState=null
        player.update()
    }
})
playpausebutton.addEventListener('click',()=>{
    playPause()
})
audiobutton.addEventListener('click',()=>{
    startAudio()
})
playerName = prompt('Enter name ples, ty')
alert('Use the Space key or Click/Touch on the screen to change direction of movement of the player')
potHoleGenerator()
playpausebutton.innerHTML="<img id=\"buttons\" src=\"assets/pause.png\" width=\"25px\" height=\"25px\">"
audiobutton.innerHTML="<img id=\"buttons\" src=\"assets/nomusic.png\" width=\"25px\" height=\"25px\">"
player = new Player(Math.round((ctx.canvas.width)*1/6),0,50,50)
player.render()
multiField.innerHTML=multiplier
animate()