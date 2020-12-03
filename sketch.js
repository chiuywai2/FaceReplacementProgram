let img, capture, faceapi, detections =[]; // Decalare variable 'img', 'capture'

// Basic set up
function setup() {
  createCanvas(1280, 480); // Create a display window
  img = loadImage('lk.jpg'); // Load the image
  capture = createCapture(VIDEO); // Get the capture video
  capture.id("video_elemyent"); // Set the video Id
  capture.size(640, 480); // Define video size to 640x480
  capture.hide() // Hide the streaning video
  faceapi = ml5.faceApi(capture, faceReady);
}

function faceReady() {
  faceapi.detect(gotFaces);
}

// Got faces
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  detections = result;
  faceapi.detect(gotFaces);
}

// Draw everything
function draw() {
  image(img, 0, 0, 640, 480); // Display iamge  next to the image in the sie of 640x480
  image(capture, 640, 0, 640, 480) // Display the streaming video at (0, 0) in the sie of 640x480
  noFill();
  stroke(0, 255, 0);
  strokeWeight(2);
  if (detections.length > 0) {    
    for (let i = 0; i < detections.length; i++) {
      const alignedRect = detections[i].alignedRect;
      const {_X, _y, _width, _height} = alignedRect._box;
      rect(_X, _y, _width, _height);
    }
  }

}


