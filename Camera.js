javascript:(function(){
  const constraints = { video: true };

  navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      const video = document.createElement('video');
      document.body.appendChild(video);
      video.srcObject = stream;
      video.play();

      const peerConnection = new RTCPeerConnection();
      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

      peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer))
        .then(() => {
          const offerDescription = peerConnection.localDescription.sdp;
          console.log(offerDescription);
        })
        .catch(error => console.error('Error creating offer: ', error));
    })
    .catch(function(err) {
      console.error('Error accessing camera: ', err);
    });
})();
