  var startAngle = 0;
  var arc = 2*Math.PI / 15;
  var spinTimeout = null;
  var spinsize = 320;
  
  var spinArcStart = 10;
  var spinTime = 0;
  var spinTimeTotal = 0;
  
  var ctx;
  
  
  window.addEventListener("keydown", checkKeyPressed, false);
 
  function checkKeyPressed(e) {
    if (e.keyCode == "32") {
        spin();
    }
  }
  
  function draw() {
    drawRouletteWheel();
  }
  
  function isEven(n) {
     return (n % 2 == 0);
  }

  function isOdd(n) {
     return (Math.abs(n) % 2 == 1);
  }
  
  function getText(i) {
	var num;
    var text;
	if(i<=18){
	if (i === 37||i === 18){
      text = "0";
	  num=0;
    }else if (isEven(i)){
      text = (i+1).toString();
	  num=i+1;
    }else if (isOdd(i)){
      text = (i+1).toString();
	  num=i+1;
    }return text;
	}else{
		if (i === 37||i === 18){
			text = "0";
			num=0;
		}else if (isEven(i)){
			text = (i).toString();
			num=i;
		}else if (isOdd(i)){
			text = (i).toString();
			num=i;
		}return text;
	}
    
  }
  function getnum(i) {
	var num;
	if(i<=18){
		if (i === 37||i === 18){
			num=0;
		}else{
			num=i+1;
		}return num;
	}else{
		if (i === 37||i === 18){
			num=0;
		}else{
			num=i;
		}return num;
	}
    
}

  function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
      var outsideRadius = 200 //200;
      var textRadius = 160 //160;
      var insideRadius = 125 //125;
      
      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,1000,1000); // ctx.clearRect(0,0,spinsize,spinsize);
      
      
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      
      ctx.font = 'bold 21px Avenir Next, sans-serif';
      
      for(var i = 0; i < 38; i++) {
        var angle = startAngle + i * arc;
		if(i<=18){
			if (i === 37||i === 18)
				ctx.fillStyle = "green";
			else if (isOdd(i+1))
				ctx.fillStyle = "red";
			else if (isEven(i+1))
				ctx.fillStyle = "black";
        }else{
			if (i === 37||i === 18)
				ctx.fillStyle = "green";
			else if (isOdd(i))
				ctx.fillStyle = "red";
			else if (isEven(i))
				ctx.fillStyle = "black";
		}
        ctx.beginPath();
        ctx.arc(spinsize, spinsize, outsideRadius, angle, angle + arc, false);
        ctx.arc(spinsize, spinsize, insideRadius, angle + arc, angle, true);
        //ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
        //ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();
        
        ctx.save();
        //ctx.shadowOffsetX = -1;
        //ctx.shadowOffsetY = -1;
        //ctx.shadowBlur    = 0;
        //ctx.shadowColor   = "rgb(220,220,220)";
		if(i<=18){
			if (i === 18)
				ctx.fillStyle = "white";
			else if (isOdd(i+1))
				ctx.fillStyle = "black";
			else if (isEven(i+1))
				ctx.fillStyle = "white";
		}else{
			if (i === 37)
				ctx.fillStyle = "white";
			else if (isOdd(i))
				ctx.fillStyle = "black";
			else if (isEven(i))
				ctx.fillStyle = "white";
		}
        
        ctx.translate(spinsize + Math.cos(angle + arc / 2) * textRadius, spinsize + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        var text = getText(i);
		var num2 = getnum(i);
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      } 
      
      //Arrow
      ctx.fillStyle = "gold";
      ctx.beginPath();
      ctx.moveTo(spinsize - 8, spinsize - (outsideRadius + 10));
      ctx.lineTo(spinsize + 8, spinsize - (outsideRadius + 10));
      ctx.lineTo(spinsize + 8, spinsize - (outsideRadius - 10));
      ctx.lineTo(spinsize + 18, spinsize - (outsideRadius - 10));
      ctx.lineTo(spinsize + 0, spinsize - (outsideRadius - 26));
      ctx.lineTo(spinsize - 18, spinsize - (outsideRadius - 10));
      ctx.lineTo(spinsize - 8, spinsize - (outsideRadius - 10));
      ctx.lineTo(spinsize - 8, spinsize - (outsideRadius + 10));
      ctx.fill();
    }
  }
  
  function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1618;
    rotateWheel();
	
  }
  
  function rotateWheel() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
	
  }
  
  function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
	if(index<=18){
		if (index === 18) {
			ctx.fillStyle = "green";
			ctx.shadowColor   = "grey";
		}
		else if (isEven(index+1)) {
			ctx.fillStyle = "black";
			ctx.shadowColor   = "white";
		}
		else if (isOdd(index+1)) {
			ctx.fillStyle = "red";
			ctx.shadowColor   = "white";
		}
	}else{
		if (index === 37) {
			ctx.fillStyle = "green";
			ctx.shadowColor   = "grey";
		}
		else if (isEven(index)) {
			ctx.fillStyle = "black";
			ctx.shadowColor   = "white";
		}
		else if (isOdd(index)) {
			ctx.fillStyle = "red";
			ctx.shadowColor   = "white";
		}
	}
    
    ctx.font = 'bold 100px sans-serif';
    ctx.shadowOffsetX = -2;
    ctx.shadowOffsetY = -2;
    ctx.shadowBlur    = 1;

    var text = getText(index);
    ctx.fillText(text, spinsize - ctx.measureText(text).width / 2, spinsize + 20);
    ctx.restore();
	var num2 = getnum(index);
	
	checkwin(num2);
  }
  
  function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }
  
  draw();
  
//押注

//選錢
var color = "0";
var total = 1000;
var allin = 0;
var put = 0;
var putmoney =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function choose(a, obj){
    put = a;
    if (a == 10) {
		Color = "gray";
	}
	if (a == 50) {
		Color = "blue";
	}
    if (a == 100) {
		Color = "purple";
	}
	if (a == 1) {
		put = total;
		allin = total;
		Color = "cyan";
	}
}

//放錢

//even put money
function putmoneyeven(obj) {
    if (obj.className != "have") {
		if(total>=put){
			obj.bgColor = Color;
			obj.className = "have";
			total -= put;
			putmoney[obj.id] = put;
			document.getElementById("youhave").innerHTML = "$" + total ;
		}else{
			window.alert("you have not enough money");
		}
	}else {
		total += putmoney[obj.id];
		putmoney[obj.id] = 0;
		obj.bgColor = "black";
		obj.className = "";
		
		document.getElementById("youhave").innerHTML = "$" + total ;
        }
}
	
//odd put money
function putmoneyodd(obj) {
	if (obj.className != "have") {
		if(total>=put){
			obj.bgColor = Color;
			obj.className = "have";
			total -= put;
			putmoney[obj.id] = put;
			document.getElementById("youhave").innerHTML = "$" + total ;
		}else{
			window.alert("you have not enough money");
		}
	}else {
		total += putmoney[obj.id];
		putmoney[obj.id] = 0;
		obj.bgColor = "red";
		obj.className = "";
		
		document.getElementById("youhave").innerHTML = "$" + total ;
	}
	
}

//0 2to1 put money
function putmoneyother(obj) {     
	if (obj.className != "have") {
		if(total>=put){
			obj.bgColor = Color;
			obj.className = "have";
			total -= put;
			putmoney[obj.id] = put;
			document.getElementById("youhave").innerHTML = "$" + total ;
		}else{
			window.alert("you have not enough money");
		}
	}else {
		total += putmoney[obj.id];
		putmoney[obj.id] = 0;
		obj.bgColor = "green";
		obj.className = "";
		
		document.getElementById("youhave").innerHTML = "$" + total ;
	}
}

//other
function putmoneyextra(obj) {
    if (obj.className != "have") {
		if(total>=put){
			obj.bgColor = Color;
			obj.className = "have";
			total -= put;
			putmoney[obj.id] = put;
			
			document.getElementById("youhave").innerHTML = "$" + total ;
		}else{
			window.alert("you have not enough money");
		}
	}else {
		total += putmoney[obj.id];
		putmoney[obj.id] = 0;
		obj.bgColor = "LightSlateGrey";
		obj.className = "";
		
		document.getElementById("youhave").innerHTML = "$" + total ;
	}
}



//確認中獎
function checkwin(num1) {
	//0~36
	for (var i = 0; i <= 36; i++) {
		if (document.getElementById(i).className == "have") {
			if (num1 == i) {
				total = total + putmoney[i] * 36;
				
			}
		}
	}
	//2to1
	for (var i = 37; i <= 39; i++) {   		
		if (document.getElementById(i).className == "have") {
			if ((num1 % 3)==(i % 3)) {
				total = total + putmoney[i] * 3;
			}
		}
	}
	//1st 2nd 3rd
	for (var i = 40; i <= 42; i++) {
		if (document.getElementById(i).className == "have") {
			if (i == 40) {
				if(num1>0&&num1<13){
					total = total + putmoney[i] * 3;
				}
			}else if (i == 41) {
				if(num1>12&&num1<25){
					total = total + putmoney[i] * 3;
				}
			}else if (i == 42) {
				if(num1>24&&num1<37){
					total = total + putmoney[i] * 3;
				}
			}
		}
	}
	//1~18 19~36
	for (var i = 43; i <= 44; i++) {
		if (document.getElementById(i).className == "have") {
			if (i == 43) {
				if(num1>0&&num1<19){
					total = total + putmoney[i] * 2;
				}
			}else if (i == 44) {
				if(num1>28&&num1<37){
					total = total + putmoney[i] * 2;
				}
			}
		}
	}
	//all even odd
	for (var i = 45; i <= 46; i++) {
		if (document.getElementById(i).className == "have") {
			if (i == 45) {
				if((num1 != 0) && (num1%2==0)){
					total = total + putmoney[i] * 2;
				}
			}else if (i == 46) {
				if((num1 != 0) && (num1%2==1)){
					total = total + putmoney[i] * 2;
				}
			}
		}
	}
	clean2();
}

//清空籌碼
function clean() {
	for (var i = 0; i <= 39; i++) {
		if (document.getElementById(i).className == "have") {
			if (i == 0 || i == 37 || i == 38 || i == 39) {
				if (document.getElementById(i).bgColor != 'green'){
					document.getElementById(i).bgColor = "green";
					total = total + putmoney[i];
					
				} 
			}else if (i % 2 == 0) {
				if (document.getElementById(i).bgColor != 'black'){
					document.getElementById(i).bgColor = "black";
					total = total + putmoney[i];
					
				} 
			}else if (i % 2 == 1) {
				if (document.getElementById(i).bgColor != 'red'){
					document.getElementById(i).bgColor = "red";
					total = total + putmoney[i];
					
				} 
			}
			document.getElementById(i).className = "no";
		}
		putmoney[i]=0;
	}
	for (var i = 40; i <= 46; i++) {
		if (document.getElementById(i).className == "have") {
			if (i == 45) {
				if (document.getElementById(i).bgColor != 'black'){
					document.getElementById(i).bgColor = "black";
					total = total + putmoney[i];
					
				}
			}else if (i == 46) {
				if (document.getElementById(i).bgColor != 'red'){
					document.getElementById(i).bgColor = "red";
					total = total + putmoney[i];
					
				}
			}else {
                if (document.getElementById(i).bgColor != 'LightSlateGrey'){
					document.getElementById(i).bgColor = "LightSlateGrey";
					total = total + putmoney[i];
					
				}
			}
			document.getElementById(i).className = "no";
		}
		putmoney[i]=0;
	}
	document.getElementById("youhave").innerHTML = "$" + total;
}
function clean2() {
	for (var i = 0; i <= 39; i++) {
		if ((document.getElementById(i)).className == "have") {
			if (i == 0 || i == 37 || i == 38 || i == 39) {
				if (document.getElementById(i).bgColor != 'green'){
					document.getElementById(i).bgColor = "green";
				} 
			}else if (i % 2 == 0) {
				if (document.getElementById(i).bgColor != 'black'){
					document.getElementById(i).bgColor = "black";
				} 
			}else if (i % 2 == 1) {
				if (document.getElementById(i).bgColor != 'red'){
					document.getElementById(i).bgColor = "red";
				} 
			}
			document.getElementById(i).className = "no";
		}
		putmoney[i]=0;
	}
	for (var i = 40; i <= 46; i++) {
		if (document.getElementById(i).className == "have") {
			if (i == 45) {
				if (document.getElementById(i).bgColor != 'black'){
					document.getElementById(i).bgColor = "black";
				}
			}else if (i == 46) {
				if (document.getElementById(i).bgColor != 'red'){
					document.getElementById(i).bgColor = "red";
				}
			}else {
                if (document.getElementById(i).bgColor != 'LightSlateGrey'){
					document.getElementById(i).bgColor = "LightSlateGrey";
				}
			}
			document.getElementById(i).className = "no";
		}
		putmoney[i]=0;
	}
	document.getElementById("youhave").innerHTML = "$" + total;
}

function show(){
	for(var i = 0; i <=46;i++){
		document.write(putmoney[i] + "<br>"); 
	}
}