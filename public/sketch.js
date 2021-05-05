let socket
let color = '#000'
let strokeWidth = 4
let cv
let acertou = false;
var pergunta1 = "Quem é lionel Messi?";
var pergunta2 = "Hold ou hodl?"
var respostaDa1 = "TikToker";
var respostaDa11 = "Youtuber";
var respostaDa111 = "Futebolista";
var respostaDa1111 = "O zé?";
let img,img1;
var textField ;
let input, button, greeting;

let respondeu = false;
let preencheuNome = false;
let pergunta = true;
let song;
let col;
let posNome = false;
function preload() {
	//soundFormats('mp3');
	img = loadImage('images/messiDeepWeb.png');
	img1 = loadImage('images/background.png');
	//song = loadSound('mouse.mp3');
  }
function setup() {
	// Creating canvas


	//song.play();
	cv = createCanvas(windowWidth , windowHeight)
	centerCanvas()
	cv.background(255, 255, 255);

	
	// Start the socket connection
	socket = io.connect('http://localhost:3000')
	textField = createInput()
	// Callback function
	socket.on('mouse', data => {
		stroke(data.color)
		strokeWeight(data.strokeWidth)
		line(data.x, data.y, data.px, data.py)
	})
input = createInput();
  input.position(600, 65);
  
  button = createButton('Submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(greet);
  button1 = createButton(respostaDa1);
  button1.position(600, 300);
  button1.mousePressed(greet);
  //button1.style('background-color', col);
  scale(10);
  button2 = createButton(respostaDa11);
  button2.position(600, 400);
  button2.mousePressed(greet);
  scale(10);
  button3 = createButton(respostaDa111);
  button3.position(600, 500);
  button3.mousePressed(greet);
  scale(10);
  button4 = createButton(respostaDa1111);
  button4.position(600, 600);
  button4.mousePressed(greet);~
  scale(10);


button1.mousePressed(() => {
	respondeu = true;
	socket.emit('respondeu', respondeu)
})
  greeting = createElement('h2', 'what is your name?');
  greeting.position(600, 5);

  textAlign(CENTER);
  textSize(10);
	
	const color_btn = select('#color-btn')
	

	const stroke_width_picker = select('#stroke-width-picker')
	const stroke_btn = select('#stroke-btn')

	

	
}
function draw(){
	
	background(img1)
	tentativa()
	
	image(img, 700, 230,300,500);
	if(preencheuNome){
		input.hide();
		button.hide();
	}
	if(posNome){
		greeting.hide();
	}
}


function windowResized() {
	centerCanvas()
	cv.resizeCanvas(windowWidth / 2, windowHeight / 2, false)
}

function tentativa(){
	if(pergunta){
		textSize(50);
	text(pergunta1, 650, 200);

	}else{
		textSize(50);
	text(pergunta2, 100, 100);
	}
}
function greet() {
	const name = input.value();
	greeting.html('hello ' + name + '!');
	input.value('');
	socket.emit('name', name)
	preencheuNome = true;
	posNome = true;
  }

function centerCanvas() {
	const x = (windowWidth - width) / 2
	const y = (windowHeight - height) / 2
	cv.position(x, y)
}


/*function mouseDragged() {
	// Draw
	stroke(color)
	strokeWeight(strokeWidth)
	line(mouseX, mouseY, pmouseX, pmouseY)

	// Send the mouse coordinates
	sendmouse(mouseX, mouseY, pmouseX, pmouseY)
}*/

// Sending data to the socket
function sendmouse(x, y, pX, pY) {
	const data = {
		x: x,
		y: y,
		px: pX,
		py: pY,
		color: acertou,
		strokeWidth: strokeWidth,
	}

	socket.emit('mouse', data)
}