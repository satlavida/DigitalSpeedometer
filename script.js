var ssg = document.getElementById("sevensegment"); 
var ctx = ssg.getContext("2d"); 
ctx.fillRect(0,0,1200,400); 
ctx.fillStyle = "rgba(000,90,255,0.8)"; 
x = 10;
var drawHorizontalBar = function(factorx,factory){
  ctx.beginPath(); 
  ctx.moveTo(2*x+factorx,2*x+factory);
  ctx.lineTo(3*x+factorx,x+factory);
  ctx.lineTo(8*x+factorx,x+factory); 
  ctx.lineTo(9*x+factorx,2*x+factory);
  ctx.lineTo(8*x+factorx, 3*x+factory); 
  ctx.lineTo(3*x+factorx,3*x+factory); 
  ctx.lineTo(2*x+factorx,2*x+factory);
  ctx.closePath();
  ctx.fill();
}

var drawVerticalBar = function(factorx,factory) { 
  ctx.beginPath();
  ctx.moveTo(2*x+factorx, 2*x+factory); 
  ctx.lineTo(x+factorx,3*x+factory);
  ctx.lineTo(x+factorx,8*x+factory); 
  ctx.lineTo(2*x+factorx,9*x+factory);
  ctx.lineTo(3*x+factorx,8*x+factory); 
  ctx.lineTo(3*x+factorx,3*x+factory); 
  ctx.lineTo(2*x+factorx, 2*x+factory);
  ctx.closePath(); 
  ctx.fill(); 
}

var draw7Seg = function(x,pos,num){ //x = scale , pos = position. starts from 0
  var distance = pos*11;  
  //A
  if(num != 1&& num != 4)
  { 
    var factorx = 0+distance*x; 
    var factory = 0; 
    drawHorizontalBar(factorx,factory); 
  }

  //B
  if(num != 5 && num != 6 )
  {
    var factorx = 7.5*x+distance*x; 
    var factory = 0.5*x;
    drawVerticalBar(factorx,factory);
  }


  //C 
  if(num != 2)
  {
    var factorx = 7.5*x+distance*x; 
    var factory = 8*x;
    drawVerticalBar(factorx,factory);
  }
  //D
  if(num != 1 && num != 4 && num != 7 && num != 9)
  {
    var factorx = 0+distance*x; 
    var factory = 15.25*x; 
    drawHorizontalBar(factorx,factory);
  }

  //E 
  if(num != 1 && num != 4 && num != 7 && num != 5 && num != 3&& num != 9)
  {
    var factorx = distance*x-0.5*x; 
    var factory = 8*x;
    drawVerticalBar(factorx,factory);
  }

  //F
  if(num != 1 && num != 2 && num != 7 && num != 3)
  {
    var factorx = distance*x-0.5*x; 
    var factory = 0.5*x;
    drawVerticalBar(factorx,factory);
  }

  // G
  if(num != 0 && num != 1 && num != 7)
  {
    var factorx = 0+distance*x; 
    var factory = 7.75*x; 
    drawHorizontalBar(factorx,factory);
  }
}


var updateUI = function(data) {
  console.log(data.coords.speed);
  console.log("updated");
  if(data.coords.speed != null)
    {
      var calcSpeed = Math.ceil(data.coords.speed*3.6);
      updateColor(calcSpeed); 
    }
  else
    {
    updateColor(0);
    }
};


var updateColor = function(speedD) { 
    var color;   
    if(speedD < 40)
    {
      color = "rgb(0,0,"+ ((200+speedD*1.33-0) & 255)+")";
    }
    else if(speedD >= 40 && speedD <60)
    {
        color = "rgb(0 ,"+ ((200+speedD*1.33-40) & 255)+",0)";
    }
    else
    {
      color = "rgb(" + (240 + speedD) + ",0,0)";
    }
    ctx.fillStyle = "black"; 
    ctx.fillRect(0,0,400,400); 
    ctx.fillStyle = color; 
    for(i = 0; i<=2; i++)
      {
        draw7Seg(10, 2-i, speedD%10); 
        speedD = Math.trunc(speedD/10);
      }
 }

var geo_error = function () {
  alert("Sorry, no position available.");
}

var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 1000, 
  timeout           : 27000
};

var getSpeed = function()
{

  if("geolocation" in navigator)
    {
      navigator.geolocation.watchPosition(updateUI,geo_error,geo_options);
    }
  else
    {
      alert("not supported");
    }
};

getSpeed();
