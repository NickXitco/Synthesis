let osc1;
let osc2;
let playing = false;

let maxY = 0;
let minY = 10000;

let fft;

let SAMPLE_RATE = 2 ** 14;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(250, 170, 0);

    osc1 = new p5.Oscillator();
    osc1.setType('sine');
    osc1.freq(440);
    osc1.amp(0);
    osc1.start();

    osc2 = new p5.Oscillator();
    osc2.setType('sine');
    osc2.freq(220);
    osc2.amp(0);
    osc2.start();

    fft = new p5.FFT(1, SAMPLE_RATE / 1024);

    slider1 = createSlider(20, 1760, 440,  10);
    slider2 = createSlider(20, 1760, 220,  10);
    slider1.position(50, 10);
    slider2.position(50, 50);
}

function draw() {
    osc1.freq(slider1.value());
    osc2.freq(slider2.value());
    if(!playing) {
		playing = true;
        osc1.amp(0.1, 1);
        osc2.amp(0.1, 1);
    } else {
		background(250, 170, 0);
        let waveform = fft.waveform(SAMPLE_RATE, "precise");

        noFill();
        beginShape();
        stroke(255,255,255);
        strokeWeight(3);
        for (var i = 0; i< waveform.length; i++){
            let x = map(i, 0, waveform.length, width/2 - 400, width/2 + 400);
            let y = map( waveform[i], -1, 1, 0, height);
            vertex(x, y);
        }
        endShape();
	}

    fill(255);
    strokeWeight(0);
    textFont('futura-pt', 50);
    textAlign(CENTER);
    text('this is a sine wave', windowWidth / 2, (windowHeight / 2)+200);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

//This function is needed for Chrome and other browsers that don't allow autoplay
function mousePressed() { getAudioContext().resume() }

