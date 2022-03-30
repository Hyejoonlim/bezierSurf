let pointArray = [];
let checkboxCtrlPoints;
let checkboxCtrlPolygon;

let q = [];
let r = [];

let divX;
let divY;
let divZ;
let value = 0;

let thetaX = thetaY = thetaZ = 0.0; // initialize rotation to zero
let transX = transY = transZ = 0.0; // initialize translation to zero
let d = 0; // initialize shear 0
let resetButton;
let cnv;
let myFont;
    
function setup() {
  
  cnv = createCanvas(720, 480, WEBGL);
  setupGUI(); // set up buttons and all
  
  let n = ctrlpts.length;
  for(let i = 0; i < n; i++) {
      
      for (let j = 0; j < n-3; j++) {
        
          let pt = ctrlpts[i][j]
          let ptX = pt[0];
          let ptY = pt[1];
          let ptZ = pt[2];
          newPt = new Point3D(ptX, ptY, ptZ);
          pointArray.push(newPt);
      }
      
    }
  

}

function draw() {
  
 background(value);
  
  rotateX(thetaX);
  rotateY(thetaY);
  rotateZ(thetaZ);
  translate(transX, transY, transZ);
  
  divX = divisX.value();
  divY = divisY.value();
  divZ = divisZ.value();
     
  if (checkboxCtrlPoints.checked())
      drawControlPoints();
  
  if (checkboxCtrlPolygon.checked())
      drawControlPolygon();  
  
  if (checkboxBezierSurf.checked())
      drawSurf();
    
}

function drawControlPoints()
{
    stroke(255,0,255,200); // Change the color
    strokeWeight(10); // Make the points 10 pixels in size
    for (let i=0; i< pointArray.length; i++) {
        point(pointArray[i].x, pointArray[i].y, pointArray[i].z);
    }
}


function drawControlPolygon()
{
  noFill();
  stroke('grey');
  strokeWeight(3);
  
  beginShape();
  for (let i=0; i< pointArray.length; i++) {
    vertex(pointArray[i].x, pointArray[i].y, pointArray[i].z);}
  endShape();
}

function setupGUI()
{

  resetButton = createButton('Clear Canvas');
  resetButton.mousePressed(reset); // call reset function when pressed 
  P1 = createP('General');
  P1.position(750, 0)
  checkboxCtrlPoints = createCheckbox('Control Points', true);
  checkboxCtrlPoints.position(750, 40)
  checkboxCtrlPolygon = createCheckbox('Control Polygon', true);
  checkboxCtrlPolygon.position(750, 70)
  checkboxBezierSurf = createCheckbox('Bezier Surface (Yellow)', false);
  checkboxBezierSurf.position(750, 100)

  P2 = createP('Divison X');
  divisX = createSlider(0, 100, 10);
  P2.position(750, 150);
  divisX.position(750, 180);
  P3 = createP('Divison Y');
  P3.position(750, 210);
  divisY = createSlider(0, 100, 10);
  divisY.position(750, 240);
  P4 = createP('Divison Z');
  P4.position(750, 280);
  divisZ = createSlider(0, 100, 10);
  divisZ.position(750, 310);
  
}

function init()
{
  background(0);
  angleMode(DEGREES);  
}

function drawSurf(){
  
  noFill();
  stroke('yellow');
  strokeWeight(1); 
  
  let tx = 0;
  let ty = 0;
  let tz = 0;
  
  let spx = 1/(divX -1);
  let spy = 1/(divY -1);
  let spz = 1/(divZ -1);
  
  beginShape();
  while(tx <= 1 || ty <= 1 || tz <= 1) {
    
    let j1 = 0;
    
    for (let i =0; i < pointArray.length-3; i+=3) {
    
      let p1 = pointArray[i];
      let p2 = pointArray[i+1];
      let p3 = pointArray[i+2];
      let p4 = pointArray[i+3];
    
      q[j1] = compBezSurf(p1, p2, p3, p4, tx, ty, tz);  
      vertex(q[j1].x, q[j1].y, q[j1].z);
      
      j1 = j1+1;
     }
    
    let j2 = 0;
    for(let k = 0; k < q.length-3; k+=3) {
    
      let q1 = q[k];
      let q2 = q[k+1];
      let q3 = q[k+2];
      let q4 = q[k+3];
    
      r[j2] = compBezSurf(q1, q2, q3, q4, tx, ty, tz);   
      vertex(r[j2].x, r[j2].y, r[j2].z); 
      j2 = j2+1;
    }
  
  tx = tx + spx;
  ty = ty + spy;
  tz = tz + spz; 
}
  endShape();
}

function mouseDragged() 
{
  let dx = mouseX - pmouseX; 
  let dy = mouseY - pmouseY;

  if (mouseButton === LEFT)
    {
      thetaX += dx/2.0;
      thetaY += dy/2.0;
    }
 
  if (mouseButton === RIGHT)
    {
      transX += dx/2.0;
      transY += dy/2.0;
    }
  
  if (mouseButton === CENTER)
    {
      transZ += dy/2.0;
    }
	
}


function reset()
{
  pointArray = [];
  WhichPointMove = -1;  
  thetaX = thetaY = thetaZ = 0.0; 
  transX = transY = transZ = 0.0;
  sx = sy = sz = 1.0;
  d = 0;
}

//following is defined to ensure that the right click context menu does not open on canvas when using right mouse button
document.oncontextmenu = function() 
{
  return false;
}