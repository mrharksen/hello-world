//Defining variables 
let ctx = document.getElementById("Plotter").getContext("2d");
var Xmax = null;
var Ymax = null;
var Xmin = null;
var Ymin = null;
var xValues = [];
var yValues = [];
var xErrors = [];
var yErrors = [];
var canvas = document.getElementById('Plotter');
var width = canvas.width;
var height = canvas.height;


// Drawing the y axis
ctx.beginPath();
ctx.moveTo(width/10, height);
ctx.lineTo(width/10, 0);
ctx.lineTo(width/10-width/100, height*0.02);
ctx.moveTo(width/10, 0);
ctx.lineTo(width/10+width/100, height*0.02);
ctx.stroke();


//Drawing the x axis
ctx.beginPath();
ctx.moveTo(0, height - height/10);
ctx.lineTo(width, height - height/10);
ctx.lineTo(width-0.01*width, height - height/10 - height*0.02);
ctx.moveTo(width, height - height/10);
ctx.lineTo(width-0.01*width, height - height/10 + height*0.02);
ctx.stroke();



function HideConstants(){
    element = document.getElementById("FirstConstant");
    element.classList.add("hide");
    element = document.getElementById("SecondConstant");
    element.classList.add("hide");
    element = document.getElementById("ThirdConstant");
    element.classList.add("hide");
    element = document.getElementById("FourthConstant");
    element.classList.add("hide");
}
//Reading the input values, scaling the graph and drawing the points
function PlotPoints() {

HideConstants();
//Initializing variables
xValues = [];
yValues = [];
xErrors = [];
yErrors = [];
Xmax = null;
Ymax = null;
Xmin = null;
Ymin = null;
var counter = 0;

// Creating the coordinates
for(var i = 1; i<=15; i++){
if(document.getElementById("X"+ i).value !== "" && document.getElementById("Y"+ i).value !== ""){
xValues.push(parseFloat(document.getElementById("X" + i).value));
yValues.push(parseFloat(document.getElementById("Y" + i).value));
if(document.getElementById("ErrorX"+i).value !== ""){
	xErrors.push(parseFloat(document.getElementById("ErrorX" + i).value));
}else{xErrors.push(0);}
if(document.getElementById("ErrorY"+i).value !== ""){
	yErrors.push(parseFloat(document.getElementById("ErrorY" + i).value));
}else{yErrors.push(0);}
}
}


//Finding the maxium and minimum x,y values to create the axes
for(var i = 0; i<xValues.length; i++){
if(counter<1){
Xmax = xValues[i];
Ymax = yValues[i];
Xmin = xValues[i];
Ymin = yValues[i];
counter++;
}
if(counter>=1 && xValues[i]>Xmax){
Xmax = xValues[i];
}
if(counter>=1 && xValues[i]<Xmin){
Xmin = xValues[i];
}
if(counter>=1 && yValues[i]>Ymax){
Ymax = yValues[i];
}
if(counter>=1 && yValues[i]<Ymin){
Ymin = yValues[i];
}
}
RedrawCanvas();

}

// Pause function for animations
function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}



// Redraws the canvas : 
function RedrawCanvas() {
	ctx.fillStyle = "black";
	ctx.clearRect(0 , 0, width, height);
	// Drawing the y axis
	ctx.beginPath();
	ctx.moveTo(width/10, height);
	ctx.lineTo(width/10, 0);
	ctx.lineTo(width/10-width/100, height*0.02);
	ctx.moveTo(width/10, 0);
	ctx.lineTo(width/10+width/100, height*0.02);
	ctx.stroke();


	//Drawing the x axis
	ctx.beginPath();
	ctx.moveTo(0, height - height/10);
	ctx.lineTo(width, height - height/10);
	ctx.lineTo(width-0.01*width, height - height/10 - height*0.02);
	ctx.moveTo(width, height - height/10);
	ctx.lineTo(width-0.01*width, height - height/10 + height*0.02);
	ctx.stroke();

	//Coordinates for the axes 
	ctx.font = "20px Arial";

	// Y
	for(var i = 0; i<10; i++){
	ctx.beginPath();
	ctx.moveTo(0.08*width, (0.05+i/10)*height);
	ctx.lineTo(0.12*width, (0.05+i/10)*height);
	ctx.stroke();
	ctx.fillText((Ymax-((Ymax-Ymin)/9)*i).toFixed(2), 0.01*width, (0.06+i/10)*height);}

	// X 
	for(var i = 0; i<9; i++){
	ctx.beginPath();
	ctx.moveTo((0.15+i/10)*width, 0.88*height);
	ctx.lineTo((0.15+i/10)*width, 0.92*height);
	ctx.stroke();
	ctx.fillText((Xmin+((Xmax-Xmin)/8)*i).toFixed(2), (0.13+i/10)*width, 0.98*height);}



	//Drawing the points 
	ctx.fillStyle = "red";
	for(var i = 0; i<xValues.length; i++){
    ctx.beginPath();
    ctx.arc(((xValues[i]-Xmin)/(Xmax-Xmin)*0.8+0.15)*width, height - height*(0.05+((yValues[i]-Ymin)/(Ymax-Ymin)*0.9)), 4, 0, Math.PI * 2, true);
    ctx.fill();}
	ctx.fillStyle = "black";


	//Drawing the x - errors
	for(var i = 0; i<xValues.length; i++){
    if(xErrors[i] !== 0){


    ctx.beginPath();
    ctx.moveTo(((xValues[i]-xErrors[i]-Xmin)/(Xmax-Xmin)*0.8+0.15)*width, height - height*(0.05+((yValues[i]-Ymin)/(Ymax-Ymin)*0.9)));
    ctx.lineTo(((xValues[i]+xErrors[i]-Xmin)/(Xmax-Xmin)*0.8+0.15)*width, height - height*(0.05+((yValues[i]-Ymin)/(Ymax-Ymin)*0.9)));
  
    ctx.moveTo(((xValues[i]-xErrors[i]-Xmin)/(Xmax-Xmin)*0.8+0.15)*width, height - height*(0.049 - (xErrors[i])/(Xmax-Xmin)*0.2 +((yValues[i]-Ymin)/(Ymax-Ymin)*0.9)));
    ctx.lineTo(((xValues[i]-xErrors[i]-Xmin)/(Xmax-Xmin)*0.8+0.15)*width, height - height*(0.051 + (xErrors[i])/(Xmax-Xmin)*0.2 +((yValues[i]-Ymin)/(Ymax-Ymin)*0.9)));

    ctx.moveTo(((xValues[i]+xErrors[i]-Xmin)/(Xmax-Xmin)*0.8+0.15)*width, height - height*(0.049 - (xErrors[i])/(Xmax-Xmin)*0.2 +((yValues[i]-Ymin)/(Ymax-Ymin)*0.9)));
    ctx.lineTo(((xValues[i]+xErrors[i]-Xmin)/(Xmax-Xmin)*0.8+0.15)*width, height - height*(0.051 + (xErrors[i])/(Xmax-Xmin)*0.2 +((yValues[i]-Ymin)/(Ymax-Ymin)*0.9)));
    ctx.stroke();

}
}
	ctx.fillStyle = "black";

	//Drawing the y - errors
	for(var i = 0; i<xValues.length; i++){
    if(yErrors[i] !== 0){




    ctx.beginPath();
    ctx.moveTo(((xValues[i]-Xmin)/(Xmax-Xmin)*0.8+0.15)*width, height - height*(0.05+((yValues[i]-yErrors[i]-Ymin)/(Ymax-Ymin)*0.9)));
    ctx.lineTo(((xValues[i]-Xmin)/(Xmax-Xmin)*0.8+0.15)*width, height - height*(0.05+((yValues[i]+yErrors[i]-Ymin)/(Ymax-Ymin)*0.9)));

    ctx.moveTo(((xValues[i]-Xmin)/(Xmax-Xmin)*0.8+0.149 - 0.2*((yErrors[i])/(Ymax-Ymin)))*width, height - height*(0.05+((yValues[i]-yErrors[i]-Ymin)/(Ymax-Ymin)*0.9)));
    ctx.lineTo(((xValues[i]-Xmin)/(Xmax-Xmin)*0.8+0.151 + 0.2*((yErrors[i])/(Ymax-Ymin)))*width, height - height*(0.05+((yValues[i]-yErrors[i]-Ymin)/(Ymax-Ymin)*0.9)));

    ctx.moveTo(((xValues[i]-Xmin)/(Xmax-Xmin)*0.8+0.149 - 0.2*((yErrors[i])/(Ymax-Ymin)))*width, height - height*(0.05+((yValues[i]+yErrors[i]-Ymin)/(Ymax-Ymin)*0.9)));
    ctx.lineTo(((xValues[i]-Xmin)/(Xmax-Xmin)*0.8+0.151 + 0.2*((yErrors[i])/(Ymax-Ymin)))*width, height - height*(0.05+((yValues[i]+yErrors[i]-Ymin)/(Ymax-Ymin)*0.9)));
    ctx.stroke();



}
}
	ctx.fillStyle = "black";
}

function ReadLT(lossfunction, tries){

	   if(document.getElementById("LossFunction").value !== ""){
        var L = parseFloat(document.getElementById("LossFunction").value);
        console.log("Loss function: "+L);
    }
        if(document.getElementById("LossFunction").value == ""){
        var L = lossfunction;
        console.log("Loss function: "+L);
    }

        if(document.getElementById("Tries").value !== ""){
        var Tries = parseFloat(document.getElementById("Tries").value);
        console.log("Tries: " + Tries);
    }
        if(document.getElementById("Tries").value == ""){
        var Tries = tries;
        console.log("Tries: " + Tries);
    }
    LT = [L, Tries];
    return(LT);
}

var element;
// Draws a Quadratic Equation : 
function QuadradicEquation() {
    HideConstants();

	RedrawCanvas();

	var LT = ReadLT(0.0003, 2000000);
	var L = LT[0];
	var Tries = LT[1];
	
        var YPred = 0;
        var A = 0;
        var B = 0;
        var C = 0;
        var Da = 0;
        var Db = 0;
        var Dc = 0;
        var Maximum = (17*Xmax/16 - Xmin/16);
        var Minimum = (19*Xmin/16 - 3*Xmax/16);
        for (var i = 0; i < Tries; i++) {

           	Da = 0;
            Db = 0;
            Dc = 0;
            for (var z = 0; z < xValues.length; z++) {
                YPred = A * xValues[z] * xValues[z] + B * xValues[z] + C;
                Da = Da + (yValues[z] - YPred) * xValues[z] * xValues[z];
                Db = Db + (yValues[z] - YPred) * xValues[z];
                Dc = Dc + (yValues[z] - YPred);
            }
            Da = Da * (-2.0 / xValues.length);
            Db = Db * (-2.0 / xValues.length);
            Dc = Dc * (-2.0 / xValues.length);
            A = A - L * Da;
            B = B - L * Db;
            C = C - L * Dc;

     
    }
    console.log("Successfully calculated the best quadratic equation for these coordinates: ");
	console.log("A = "+A);
	console.log("B = "+B);
	console.log("C = "+C);
    element = document.getElementById("FirstConstant");
    element.classList.remove("hide");
    element = document.getElementById("SecondConstant");
    element.classList.remove("hide");
    element = document.getElementById("ThirdConstant");
    element.classList.remove("hide");


    document.getElementById("FirstConstant").innerHTML = "A = " + A.toFixed(3);
    document.getElementById("SecondConstant").innerHTML = "B = " + B.toFixed(3);
    document.getElementById("ThirdConstant").innerHTML = "C = " + C.toFixed(3);


    // Drawing the function

    ctx.beginPath();
    ctx.moveTo(0, height*(0.95 - ((A*Minimum*Minimum+B*Minimum+C-Ymin)*0.9)/(Ymax-Ymin)));
    for(var e = Minimum; e <= Maximum; e = e + 0.001){
	ctx.lineTo(width*(0.15+0.8*((e-Xmin)/(Xmax-Xmin))), height*(0.95-0.9*((A*e*e+B*e+C-Ymin)/(Ymax-Ymin))));}
	ctx.stroke();
}



// Animated QuadraticEquation :
var myVar;
function QuadradicEquationAnimated() {
    clearInterval(myVar);
    HideConstants();
	RedrawCanvas();
	var LT = ReadLT(0.0003, 2000000);
	var L = LT[0];
	var Tries = LT[1];
    A = 0;
    B = 0; 
    C = 0;
    myVar = window.setInterval(performGradientQE, 4);
    r = 0;
}
HideConstants();
var A = 0;
var B = 0;
var C = 0;
var r = 0;
function myStopFunction() {
    clearInterval(myVar);
}
function performGradientQE(){
    r++;
    if(r>=1500){
    myStopFunction();
    RedrawCanvas();
    ctx.beginPath();
    ctx.moveTo(0, height*(0.95 - ((A*Minimum*Minimum+B*Minimum+C-Ymin)*0.9)/(Ymax-Ymin)));
    for(var e = Minimum; e <= Maximum; e = e + 0.001){
    ctx.lineTo(width*(0.15+0.8*((e-Xmin)/(Xmax-Xmin))), height*(0.95-0.9*((A*e*e+B*e+C-Ymin)/(Ymax-Ymin))));}
    ctx.stroke();
    }
    console.log(r);
    var L = 0.0003;
    var Tries = 1000;
    var YPred = 0;
    var Da = 0;
    var Db = 0;
    var Dc = 0;
    var Maximum = (17*Xmax/16 - Xmin/16);
    var Minimum = (19*Xmin/16 - 3*Xmax/16);
    for (var i = 0; i < Tries; i++) {

           	Da = 0;
            Db = 0;
            Dc = 0;
            for (var z = 0; z < xValues.length; z++) {
                YPred = A * xValues[z] * xValues[z] + B * xValues[z] + C;
                Da = Da + (yValues[z] - YPred) * xValues[z] * xValues[z];
                Db = Db + (yValues[z] - YPred) * xValues[z];
                Dc = Dc + (yValues[z] - YPred);
            }
            Da = Da * (-2.0 / xValues.length);
            Db = Db * (-2.0 / xValues.length);
            Dc = Dc * (-2.0 / xValues.length);
            A = A - L * Da;
            B = B - L * Db;
            C = C - L * Dc;

    }
    element = document.getElementById("FirstConstant");
    element.classList.remove("hide");
    element = document.getElementById("SecondConstant");
    element.classList.remove("hide");
    element = document.getElementById("ThirdConstant");
    element.classList.remove("hide");


    document.getElementById("FirstConstant").innerHTML = "A = " + A.toFixed(3);
    document.getElementById("SecondConstant").innerHTML = "B = " + B.toFixed(3);
    document.getElementById("ThirdConstant").innerHTML = "C = " + C.toFixed(3);

   /* RedrawCanvas(); */
    ctx.beginPath();
    ctx.moveTo(0, height*(0.95 - ((A*Minimum*Minimum+B*Minimum+C-Ymin)*0.9)/(Ymax-Ymin)));
    for(var e = Minimum; e <= Maximum; e = e + 0.001){
	ctx.lineTo(width*(0.15+0.8*((e-Xmin)/(Xmax-Xmin))), height*(0.95-0.9*((A*e*e+B*e+C-Ymin)/(Ymax-Ymin))));}
	ctx.stroke();
}



// Draws a Cubic equation : 
function CubicEquation() {
        HideConstants();
		RedrawCanvas();
		var LT = ReadLT(0.0001, 2000000);
		var L = LT[0];
		var Tries = LT[1];

        var YPred = 0;
        var A = 0;
        var B = 0;
        var C = 0;
        var D = 0;
        var Da = 0;
        var Db = 0;
        var Dc = 0;
        var Dd = 0;
        var Maximum = (17*Xmax/16 - Xmin/16);
        var Minimum = (19*Xmin/16 - 3*Xmax/16);
        for (var i = 0; i < Tries; i++) {
            Da = 0;
            Db = 0;
            Dc = 0;
            Dd = 0;
            for (var z = 0; z < xValues.length; z++) {
                YPred = A * xValues[z] * xValues[z] * xValues[z] + B * xValues[z] * xValues[z] + C * xValues[z] + D;
                Da = Da + (yValues[z] - YPred) * xValues[z] * xValues[z] * xValues[z];
                Db = Db + (yValues[z] - YPred) * xValues[z] * xValues[z];
                Dc = Dc + (yValues[z] - YPred) * xValues[z];
                Dd = Dd + (yValues[z] - YPred);
            }
           
            Da = Da * (-2.0 / xValues.length);
            Db = Db * (-2.0 / xValues.length);
            Dc = Dc * (-2.0 / xValues.length);
            Dd = Dd * (-2.0 / xValues.length);
            

            A = A - L * Da;
            B = B - L * Db;
            C = C - L * Dc;
            D = D - L * Dd;


        }

console.log("Successfully calculated the best cubic equation for these coordinates: ");
console.log("A = "+A);
console.log("B = "+B);
console.log("C = "+C);
console.log("D = "+D);

    element = document.getElementById("FirstConstant");
    element.classList.remove("hide");
    element = document.getElementById("SecondConstant");
    element.classList.remove("hide");
    element = document.getElementById("ThirdConstant");
    element.classList.remove("hide");
    element = document.getElementById("FourthConstant");
    element.classList.remove("hide");



    document.getElementById("FirstConstant").innerHTML = "A = " + A.toFixed(3);
    document.getElementById("SecondConstant").innerHTML = "B = " + B.toFixed(3);
    document.getElementById("ThirdConstant").innerHTML = "C = " + C.toFixed(3);
    document.getElementById("FourthConstant").innerHTML = "D = " + D.toFixed(3);
        // Drawing the function
        ctx.beginPath();
        ctx.moveTo(0, height*(0.95 - ((A*Minimum*Minimum*Minimum+B*Minimum*Minimum+C*Minimum+D-Ymin)*0.9)/(Ymax-Ymin)));
        for(var e = Minimum; e <= Maximum; e = e + 0.001){
		ctx.lineTo(width*(0.15+0.8*((e-Xmin)/(Xmax-Xmin))), height*(0.95-0.9*((A*e*e*e+B*e*e+C*e+D-Ymin)/(Ymax-Ymin))));
}
		ctx.stroke();

}


function LinearEquation(){
		HideConstants();
		RedrawCanvas();

		var LT = ReadLT(0.0001, 1000000);
		var L = LT[0];
		var Tries = LT[1];

        var YPred = 0;
        var A = 0;
        var B = 0;
        var Da = 0;
        var Db = 0;
        var Maximum = (17*Xmax/16 - Xmin/16);
        var Minimum = (19*Xmin/16 - 3*Xmax/16);
        for (var i = 0; i < Tries; i++) {
            Da = 0;
            Db = 0;
            for (var z = 0; z < xValues.length; z++) {
                YPred = A * xValues[z] + B;
                Da = Da + (yValues[z] - YPred) * xValues[z];
                Db = Db + (yValues[z] - YPred);
            }
           
            Da = Da * (-2.0 / xValues.length);
            Db = Db * (-2.0 / xValues.length);

            /*if(i%1000 == 0){
            	console.log(YPred);
            }*/

            A = A - L * Da;
            B = B - L * Db;


        }
console.log("Successfully calculated the best linear equation for these coordinates: ");
console.log("A = "+A);
console.log("B = "+B);
    element = document.getElementById("FirstConstant");
    element.classList.remove("hide");
    element = document.getElementById("SecondConstant");
    element.classList.remove("hide");




    document.getElementById("FirstConstant").innerHTML = "A = " + A.toFixed(3);
    document.getElementById("SecondConstant").innerHTML = "B = " + B.toFixed(3);

        // Drawing the function
        ctx.beginPath();
        ctx.moveTo(0, height*(0.95 - ((A*Minimum+B-Ymin)*0.9)/(Ymax-Ymin)));
        for(var e = Minimum; e <= Maximum; e = e + 0.001){
		ctx.lineTo(width*(0.15+0.8*((e-Xmin)/(Xmax-Xmin))), height*(0.95-0.9*((A*e+B-Ymin)/(Ymax-Ymin))));
}
		ctx.stroke();

}

function ExponentialEquation(){
        HideConstants();
		RedrawCanvas();
		var LT = ReadLT(0.00000001, 10000000);
		var L = LT[0];
		var Tries = LT[1];
		
        var YPred = 0;
        var A = 0;
        var B = 0;
        var C = 0;
        var Da = 0;
        var Db = 0;
        var Dc = 0;
        var Maximum = (17*Xmax/16 - Xmin/16);
        var Minimum = (19*Xmin/16 - 3*Xmax/16);
        for (var i = 0; i < Tries; i++) {
            Da = 0;
            Db = 0;
            Dc = 0;
            for (var z = 0; z < xValues.length; z++) {
                YPred = A * Math.exp(xValues[z]*B) + C;
                Da = Da + (yValues[z] - YPred)*Math.exp(xValues[z]*B);
                Db = Db + (yValues[z] - YPred)*A*xValues[z]*Math.exp(xValues[z]*B);
                Dc = Dc + (yValues[z] - YPred);
            }
           
            Da = Da * (-2.0 / xValues.length);
            Db = Db * (-2.0 / xValues.length);
            Dc = Dc * (-2.0 / xValues.length);

            /*if(i%1000 == 0){
            	console.log(YPred);
            }*/

            A = A - L * Da;
            B = B - L * Db;
            C = C - L * Dc;


        }
		console.log("Successfully calculated the best exponential equation for these coordinates: ");
		console.log("A = "+A);
		console.log("B = "+B);
		console.log("C = "+C);
    element = document.getElementById("FirstConstant");
    element.classList.remove("hide");
    element = document.getElementById("SecondConstant");
    element.classList.remove("hide");
    element = document.getElementById("ThirdConstant");
    element.classList.remove("hide");




    document.getElementById("FirstConstant").innerHTML = "A = " + A.toFixed(3);
    document.getElementById("SecondConstant").innerHTML = "B = " + B.toFixed(3);
    document.getElementById("ThirdConstant").innerHTML = "C = " + C.toFixed(3);


        // Drawing the function
        ctx.beginPath();
        ctx.moveTo(0, height*(0.95 - ((A*Math.exp(Minimum*B)+C-Ymin)*0.9)/(Ymax-Ymin)));
        for(var e = Minimum; e <= Maximum; e = e + 0.001){
		ctx.lineTo(width*(0.15+0.8*((e-Xmin)/(Xmax-Xmin))), height*(0.95-0.9*((A*Math.exp(e*B)+C-Ymin)/(Ymax-Ymin))));
}
		ctx.stroke();

}

Tries.oninput = function () {
    if (this.value.length > 9) {
        this.value = this.value.slice(0,9); 
    }
}

