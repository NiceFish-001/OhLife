var mediaRecorder;
var audioogject;
function openmike() {
    navigator.mediaDevices.getUserMedia({
        audio: true,
    })
    .then(stream => {
        const recordedChunks = [];
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.addEventListener('dataavailable', function (e) {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        });

        mediaRecorder.addEventListener('stop', function () {
            console.log("暂停")
            var audio = document.getElementById('audio');
            
            audioogject=new Blob(recordedChunks) 
            console.log(audioogject);
            audio.src = URL.createObjectURL(new Blob(recordedChunks));
            console.log(URL.createObjectURL(new Blob(recordedChunks)));
            //console.log(audioogject)
            
           // function blobToDataURL(audioogject, callback) {
                //let a = new FileReader();
                // a.onload = function (e) {
                //      callback(e.target.result); 
                //      console.log(a.result);
                //     }
               // a.readAsDataURL(blob);

           // }
            audio.play();
        });

        mediaRecorder.addEventListener('start', function () {
            console.log("开始")
        })
    });
}