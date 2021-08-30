//PLS forgive me this code is so bad

const ansCanvas = document.getElementById('ans-tile')
const ansCanvas2 = document.getElementById('ans-tile2')
const playerCanvas = document.querySelector('div.player-tile')
const playerCanvas2 = document.querySelector('div#player-tile2')
const tilespace2 = document.getElementById('container-2')
var screen = window.matchMedia("(max-width: 400px)")
audio = new Audio('assets/calm music.mp3')
click = new Audio('assets/assets_Music_Click.mp3')
play=false
timerStarted=false
actx=ansCanvas.getContext('2d')
bctx=ansCanvas2.getContext('2d')
doRender=true
last=false
x=0
y=0
ansmap=[]
row=[]
scale=1.35
diff=2
blockid=1
colorconstraint=7
blacktile=0
moves=0
moves2=0
playercount=1
colorarray=['#f08080','#0000cd','#ffffe0','#228b22','#ffa500', '#ba55d3']
//Light Coral, Medium Blue, Light Yellow, Forest Green, Orange, Medium Orchid


function renderAnswerGrid(){
    while(doRender==true){
        actx.beginPath()
        actx.strokeStyle="#000000"
        actx.rect(scale*x,scale*y,scale*50,scale*50)
        if(playercount==2){
            bctx.beginPath()
            bctx.strokeStyle="#000000"
            bctx.rect(scale*x,scale*y,scale*50,scale*50)
        }
        colorid = Math.floor(Math.random() * 6)
        color = colorarray[colorid]
        actx.fillStyle =color
        actx.fill()
        actx.stroke()  
        if(playercount==2){
            bctx.fillStyle = color
            bctx.fill()
            bctx.stroke()
        }
        row.push(colorid)
        if(last==true){
            doRender=false
            ansmap.push(row)
        }
        if(x!=diff*50 && y<=diff*50){
            x+=50
        }
        else if(x==diff*50 && y!=diff*50){
            y+=50
            x=0
            ansmap.push(row)
            row=[]
        }
        if(x==diff*50 && y==diff*50){
            last=true
        }
        actx.closePath()
    }
}

function renderPlayerGrid(){
    n=(diff+3)*5
    AnsElements = ansmap.flat() //Squash array 2D --> 1D
    while(n>0){
        const tile = document.createElement('tile')
        if(AnsElements.length>0){
            index= Math.floor(Math.random() * AnsElements.length)
            tilecolornum = AnsElements[index]
            AnsElements.splice(index,1)
        }
        else{
            tilecolornum = Math.floor(Math.random() * colorconstraint)
        }
        if (tilecolornum==0){
            tilecolor = "#F08080"//Light Coral
        }
        else if(tilecolornum==1){
            tilecolor = "#0000CD"//Medium Blue
        }
        else if(tilecolornum==2){
            tilecolor = "#FFFFE0"//Light Yellow
        }
        else if(tilecolornum==3){
            tilecolor = "#228B22"//Forest Green
        }
        else if(tilecolornum==4){
            tilecolor = "#FFA500"//Orange
        }
        else if(tilecolornum==5){
            tilecolor = "#BA55D3"//Medium Orchid
        }
        else if(tilecolornum==6){
            tilecolor = '#000000'//Black
            colorconstraint=6
            blacktile=blockid
            blacktile2=blockid+25
        }
        tile.style.background=tilecolor
        tile.style.display='inline-block'
        if(blockid==25 && blacktile==0 ){
            tile.style.background='#000000'
            blacktile=blockid
            blacktile2=blockid+25
        }
        if(blockid==7 || blockid==8 || blockid==9 || blockid==12 || blockid==13 || blockid==14 || blockid==17 || blockid==18 || blockid==19 ){
            if(screen.matches){
                tile.style.border = '2.5px solid black'
            }
            else {
                tile.style.border='3px solid black'
            }
        }
        else{
            tile.style.border='1.4px solid black'
        }
        tile.setAttribute('id',`${blockid}`)
        tile.setAttribute('class','tile')
        playerCanvas.appendChild(tile)
        if (playercount==2){
            let newtile = tile.cloneNode()
            newtile.setAttribute('id',`${blockid + 25}`)
            playerCanvas2.appendChild(newtile)
        }
        n-=1
        blockid+=1
    }

}

function RCArraygenerator(){
    row1=[1,2,3,4,5]
    row2=[6,7,8,9,10]
    row3=[11,12,13,14,15]
    row4=[16,17,18,19,20]
    row5=[21,22,23,24,25]
    row6=[26,27,28,29,30]
    row7=[31,32,33,34,35]
    row8=[36,37,38,39,40]
    row9=[41,42,43,44,45]
    row10=[46,47,48,49,50]
    column1=[1,6,11,16,21]
    column2=[2,7,12,17,22]
    column3=[3,8,13,18,23]
    column4=[4,9,14,19,24]
    column5=[5,10,15,20,25]
    column6=[26,31,36,41,46]
    column7=[27,32,37,42,47]
    column8=[28,33,38,43,48]
    column9=[29,34,39,44,49]
    column10=[30,35,40,45,50]
}

function findRow(key){
    if(key>=1 && key<=5){
        row = row1
    }
    else if(key>=6 && key<=10){
        row=row2
    }
    else if(key>=11 && key<=15){
        row=row3
    }
    else if(key>=16 && key<=20){
        row=row4
    }
    else if(key>=21 && key<=25){
        row=row5
    }
    else if(key>=26 && key<=30){
        row=row6
    }
    else if(key>=31 && key<=35){
        row=row7
    }
    else if(key>=36 && key<=40){
        row=row8
    }
    else if(key>=41 && key<=45){
        row=row9
    }
    else if(key>=46 && key<=50){
        row=row10
    }
    return(row)
}

function findColumn(key){
    if(key==1 || key==6 || key==11 || key==16 || key==21){
        column=column1
    }
    else if(key==2 || key==7 || key==12 || key==17 || key==22){
        column=column2
    }
    else if(key==3 || key==8 || key==13 || key==18 || key==23){
        column=column3
    }
    else if(key==4 || key==9 || key==14 || key==19 || key==24){
        column=column4
    }
    else if(key==5 || key==10 || key==15 || key==20 || key==25){
        column=column5
    }
    else if(key==26 || key==31 || key==36 || key==41 || key==46){
        column=column6
    }
    else if(key==27 || key==32 || key==37 || key==42 || key==47){
        column=column7
    }
    else if(key==28 || key==33 || key==38 || key==43 || key==48){
        column=column8
    }
    else if(key==29 || key==34 || key==39 || key==44 || key==49){
        column=column9
    }
    else if(key==30 || key==35 || key==40 || key==45 || key==50){
        column=column10
    }
    return(column)
}

function swapTiles(e){
    
    if(!e.code){
        row = findRow(e.target.id)
        column = findColumn(e.target.id)
        if((row.includes(parseInt(blacktile)) && Math.abs((e.target.id-blacktile))==1) || (column.includes(parseInt(blacktile)) && Math.abs((e.target.id-blacktile))==5) || (row.includes(parseInt(blacktile2)) && Math.abs((e.target.id-blacktile2))==1) || (column.includes(parseInt(blacktile2)) && Math.abs((e.target.id-blacktile2))==5)){
            if(e.target.id<=25){
            space = document.getElementById(`${blacktile}`)
            tempColor = e.target.style.backgroundColor
            space.style.backgroundColor = tempColor
            e.target.style.backgroundColor = '#000000'
            click.play()
            blacktile = e.target.id
            moves+=1
            }
            else if(e.target.id>=25){
            space = document.getElementById(`${blacktile2}`)
            tempColor = e.target.style.backgroundColor
            space.style.backgroundColor = tempColor
            e.target.style.backgroundColor = '#000000'
            click.play()
            blacktile2 = e.target.id
            moves2+=1
            }
        }
    }
    else{
        if(e.code=='KeyW' || e.code=='KeyA' || e.code=='KeyS' || e.code=='KeyD'){
            row=findRow(blacktile)
            column=findColumn(blacktile)
            space=document.getElementById(`${blacktile}`)
            if(e.code=='KeyA' && (row!=row1)){
                changetile=document.getElementById(`${blacktile-5}`)
            }
            else if(e.code=='KeyD' && (row!=row5)){
                changetile=document.getElementById(`${parseInt(blacktile)+5}`)
            }
            else if(e.code=='KeyW' && (column!=column1)){
                changetile=document.getElementById(`${parseInt(blacktile)-1}`)
            }
            else if(e.code=='KeyS' && (column!=column5)){
                changetile=document.getElementById(`${parseInt(blacktile)+1}`)
            }
            tempColor= changetile.style.backgroundColor
            space.style.backgroundColor = tempColor
            changetile.style.backgroundColor = '#000000'
            click.play()
            blacktile=changetile.id
            moves+=1
        }
        else if(playercount==2 && (e.code=='ArrowUp' || e.code=='ArrowLeft' || e.code=='ArrowDown' || e.code=='ArrowRight')){
            row=findRow(blacktile2)
            column=findColumn(blacktile2)
            space=document.getElementById(`${blacktile2}`)
            if(e.code=='ArrowLeft' && (row!=row6)){
                changetile=document.getElementById(`${blacktile2-5}`)
            }
            else if(e.code=='ArrowRight' && (row!=row10)){
                changetile=document.getElementById(`${parseInt(blacktile2)+5}`)
            }
            else if(e.code=='ArrowUp' && (column!=column6)){
                changetile=document.getElementById(`${parseInt(blacktile2)-1}`)
            }
            else if(e.code=='ArrowDown' && (column!=column10)){
                changetile=document.getElementById(`${parseInt(blacktile2)+1}`)
            }
            tempColor= changetile.style.backgroundColor
            space.style.backgroundColor = tempColor
            changetile.style.backgroundColor = '#000000'
            click.play()
            blacktile2=changetile.id
            moves2+=1            
        }
    }
    checkwin()
}

function hexc(colorval) {
    color=''
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
      parts[i] = parseInt(parts[i]).toString(16);
      if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
    return color
}

function checkwin(){
    n=[7,12,17,8,13,18,9,14,19]
    n2=[32,37,42,33,38,43,34,39,44]
    i=0
    ques=[]
    while(i<9){

        select = document.getElementById(`${n[0]}`)
        tilecolor = hexc(select.style.backgroundColor)
        if (tilecolor=="#f08080"){
           tilecolornum = 0 //Light Coral
        }
        else if(tilecolor=="#0000cd"){
            tilecolornum = 1 //Medium Blue
        }
        else if(tilecolor=="#ffffe0"){
            tilecolornum = 2 //Light Yellow
        }
        else if(tilecolor=="#228b22"){
            tilecolornum = 3 //Forest Green
        }
        else if(tilecolor=="#ffa500"){
            tilecolornum = 4 //Orange
        }
        else if(tilecolor=="#ba55d3"){
            tilecolornum = 5 //Medium Orchid
        }
        else if(tilecolor=="#000000"){
            tilecolornum = -1 //black
        }
        ques.push(tilecolornum)
        i+=1
        n.shift()
    }
    if(playercount==2){
        i=0
    ques2=[]
    while(i<9){

        select = document.getElementById(`${n2[0]}`)
        tilecolor = hexc(select.style.backgroundColor)
        if (tilecolor=="#f08080"){
           tilecolornum = 0 //Light Coral
        }
        else if(tilecolor=="#0000cd"){
            tilecolornum = 1 //Medium Blue
        }
        else if(tilecolor=="#ffffe0"){
            tilecolornum = 2 //Light Yellow
        }
        else if(tilecolor=="#228b22"){
            tilecolornum = 3 //Forest Green
        }
        else if(tilecolor=="#ffa500"){
            tilecolornum = 4 //Orange
        }
        else if(tilecolor=="#ba55d3"){
            tilecolornum = 5 //Medium Orchid
        }
        else if(tilecolor=="#000000"){
            tilecolornum = -1 //black
        }
        ques2.push(tilecolornum)
        i+=1
        n2.shift()
    }
    }
    AnsElements = ansmap.flat().map(Number)
    ques = ques.map(Number)
    i=0
    n=0
    n2=0
    while(i<9){
        if(AnsElements[i]==ques[i]){
            n+=1
        }
        if (playercount==2){
            if(AnsElements[i]==ques2[i]){
                n2+=1
            }
        }
        i+=1
    }
    if(n==9){
        end = new Date().getTime()
        togglePopupOn('popup-1',moves,player1)
        console.log('win')
    }
    if(playercount==2){
        if(n2==9){
            end = new Date().getTime()
            togglePopupOn('popup-1',moves2,player2)
            console.log('win2')
        }
    }
}

function togglePopupOn(id,move=0,player){
    document.getElementById(`${id}`).classList.toggle("active");
    if(id=='popup-1' && play==false){
        audio.play()
        play=true
        document.getElementById('playername').innerHTML=player
        document.getElementById('moves').innerHTML = move
        document.getElementById('score').innerHTML = move/2
        document.getElementById('time').innerHTML = Math.floor((end-start)/1000) + 's'
    }
    else if(id=='popup-1' && play==true){
        audio.pause()
        play=false
    }
    if(id=='popup-2'){
        start()
    }
}

function setPlayer(){
    playermode=document.getElementById('player-mode').value
    if(playermode=="Single Player"){
        window.playercount=1
    }
    if(playermode=="Multi Player"){
        window.playercount=2
    }
    console.log(playercount)
}

function prompts(playercount){
    if(playercount==1){
        alert('Click on any tile around the Black Tile to move tiles or use the keys WASD')
        player1 = prompt('Enter your name')
    }
    else if(playercount==2){
        alert('Player 1 should use the keys WASD and Player 2 must use the Arrow keys to move tiles. Mouse click works for both players too.')
        player1=prompt('Enter name of Player 1')
        player2=prompt('Enter name of Player 2')
    }
}

function start(){
    setPlayer()
    prompts(playercount)
    if(playercount==1){
        tilespace2.remove()
    }
    RCArraygenerator()
    renderAnswerGrid()
    renderPlayerGrid()

    document.querySelectorAll('.tile').forEach(item => {
        item.addEventListener('click', (e) => {
            if(!timerStarted){
                start = new Date().getTime()
                timerStarted=true
            }
            swapTiles(e)
        })
      })
    window.addEventListener('keyup', (e) => {
        if(!timerStarted){
            start = new Date().getTime()
            timerStarted=true
        }
        swapTiles(e)
    })
}



