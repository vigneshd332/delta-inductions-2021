keys=document.querySelectorAll(".key")
set=0
keypress=['KeyA','KeyW','KeyS','KeyE','KeyD','KeyF','KeyT','KeyG','KeyY','KeyH','KeyU','KeyJ']
keysets=[
    ['C','Cs','D','Ds','E','F','Fs','G','Gs','A','As','B'],
    ['C1','Cs1','D1','Ds1','E1','F1','Fs1','G1','Gs1','A1','As1','B1'],
    ['C2','Cs2','D2','Ds2','E2']
]
activekeyset=keysets[set]
markers=[keys[0],keys[12],keys[24]]
markers[0].classList.add('marker')

keys.forEach(element => {
    element.addEventListener("click",function(e){
        note = new Audio(`assets/${e.target.id}.mp3`)
        note.play()
    })   
});

document.addEventListener("keydown",function(e){
    if(e.code=='ArrowLeft' && set>0){
        markers[set].classList.remove('marker')
        set=set-1
        markers[set].classList.add('marker')
        activekeyset=keysets[set]
    }
    else if(e.code=='ArrowRight' && set<2){
        markers[set].classList.remove('marker')
        set=set+1
        markers[set].classList.add('marker')
        activekeyset=keysets[set]
    }
    else if(keypress.includes(e.code)){
        noteid = activekeyset[keypress.indexOf(e.code)]
        if (noteid==null || document.querySelector(`#${noteid}`).classList.contains('playing')) return;
        note = new Audio(`assets/${noteid}.mp3`)
        note.play()
        document.querySelector(`#${noteid}`).classList.add("playing")
    }
})

document.addEventListener("keyup",function(e){
    if(keypress.includes(e.code)){
        noteid = activekeyset[keypress.indexOf(e.code)]
        if(noteid==null) return;
        document.querySelector(`#${noteid}`).classList.remove("playing")
    }
})
alert('Use W, E, T, Y, U for the black keys and A, S, D, F, G, H, J for the white keys. Use the Right and Left Arrows to jump up and down octaves.')