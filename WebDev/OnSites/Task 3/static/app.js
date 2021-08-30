startbtn = document.getElementById('start');
stopbtn = document.getElementById('stop');
video = document.getElementById('video');
vidmessage = document.getElementById('video-init');
statusmsg = document.getElementById('status-msg');
downloadbtn = document.getElementById('download-btn');
downlink = document.getElementById('downlink');
bits=[]
let stream, recorder, blob, url

var displayMediaOptions = {
    video: {
      cursor: "always"
    },
    audio: false
};
var recordOptions = {
    mimeType: 'video/webm'
}

async function startRecord() {
    try{
        stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        recorder = new MediaRecorder(stream, recordOptions);
        statusmsg.style.display = 'block';
        statusmsg.innerHTML = 'Current Preview : Live Screen';
        video.srcObject = stream;
    } catch(e) {
        console.log(e);
    }
    recorder.start();
    recorder.ondataavailable = (e) => {
        console.log(e.data);
        bits.push(e.data);
    }
    
    recorder.onstop = () => {
        blob = new Blob(bits, {type: bits[0].type});
        url = URL.createObjectURL(blob);
        statusmsg.innerHTML = 'Current Preview : Last Recording';
        video.src = url;
        downlink.href = url;
        downlink.download = 'Screen Recording.webm';
        downloadbtn.style.display = 'block';
    }
}
function stopRecord() {
    video.srcObject = null;
    recorder.stop();
    startbtn.disabled = false;
    stopbtn.disabled = true;
}
startbtn.addEventListener('click', () =>{
    blob = null
    url=null
    bits=[]
    startRecord();
    vidmessage.style.display = 'none';
    startbtn.disabled = true;
    stopbtn.disabled = false;
});
stopbtn.addEventListener('click', stopRecord);