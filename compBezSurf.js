function compBezSurf(p0, p1, p2, p3, tx, ty, tz) {
  
    let p0x = p0.x;
    let p0y = p0.y;
    let p0z = p0.z;
  
    let p1x = p1.x;
    let p1y = p1.y;
    let p1z = p1.z;

    let p2x = p2.x;
    let p2y = p2.y;
    let p2z = p2.z;

    let p3x = p3.x;
    let p3y = p3.y;
    let p3z = p3.z;
  
    let deCasx0;
    let deCasx1;
    let deCasx2;  
      
    let deCasy0;
    let deCasy1;
    let deCasy2; 
  
    let deCasz0;
    let deCasz1;
    let deCasz2; 
       
    deCasx0 = (1-tx)*p0x + tx*p1x;
    deCasx1 = (1-tx)*deCasx0 +tx*((1-tx)*p1x + tx*p2x); 
    deCasx2 = (1-tx)*deCasx1 + tx*((1-tx)*((1-tx)*p1x + tx*p2x) +tx*((1-tx)*p2x + tx*p3x));
  
    deCasy0 = (1-ty)*p0y + ty*p1y;
    deCasy1 = (1-ty)*deCasy0 +ty*((1-ty)*p1y + ty*p2y); 
    deCasy2 = (1-ty)*deCasy1 + ty*((1-ty)*((1-ty)*p1y + ty*p2y) +ty*((1-ty)*p2y + ty*p3y));
  
    deCasz0 = (1-tz)*p0z + tz*p1z;
    deCasz1 = (1-tz)*deCasz0 +tz*((1-tz)*p1z + tz*p2z); 
    deCasz2 = (1-tz)*deCasz1 + tz*((1-tz)*((1-tz)*p1z + tz*p2z) +tz*((1-tz)*p2z + tz*p3z));
  
    let deCas;
    deCas = new Point3D(deCasx2, deCasy2, deCasz2);
    return deCas; 
}

