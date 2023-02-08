const shapes = {
    I:[
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]    
    ],
    O:[
        [1,1,0,0],
        [1,1,0,0],
        [0,0,0,0],
        [0,0,0,0]    
    ],
    T: [
        [1,1,1,0],
        [0,1,0,0],
        [0,0,0,0],
        [0,0,0,0]    
    ],
    L: [
        [1,1,1,0],
        [1,0,0,0],
        [0,0,0,0],
        [0,0,0,0]    
    ],
    J: [
        [1,1,1,0],
        [0,0,1,0],
        [0,0,0,0],
        [0,0,0,0]    
    ],
    Z: [
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0],
        [0,0,0,0]    
    ],
    S: [
        [0,1,1,0],
        [1,1,0,0],
        [0,0,0,0],
        [0,0,0,0]    
    ],
};
const color = {
    1:"#274DCF",
    2:"#E7E73C",
    3:"#E7493C",
    4:"#4EE73C",
};

const getColumn = (array, column) => array.map(row => row[column]);


//classe peça 
class Peca{

    constructor(shape, color) {
       this.posX = 4;
       this.posY = 0;
        this.shape = shape;
        this.color = color;
        //document.addEventListener('keydown', this.logKey);
        //if(document.addEventListener('keydown', this.logkey)===1){
         //   console.log(1);
        //}
    }
    
    moveLeft(estat) {
        for(var i = 0;i<estat.length;i++){
            for(var e = 0;e<estat[i].length;e++){
                if(e!==0){
                if(estat[i][e]===1 && estat[i][e-1]===2){
                    return false;
                }
                }
            }
        }

        if (this.posX !== 0) {
            this.posX--;
            
        }
        
        
    }
    
    moveRight(estat) {
        //comp colisio
        for(var i = 0;i<estat.length;i++){
            for(var e = 0;e<estat[i].length;e++){
                //if(e!==9 && this.estat[i][e]===1){
                if(estat[i][e]===1 && estat[i][e+1]===2){
                    return false;
                }else if(estat[i][e]===1 && e===9 ){
                    return false;
                }
                
                //}
            }
        }
        this.posX++;
        return true;
        //ferran
      
        console.log(this.ultDr());
        /*
            if(this.posX > 9-this.ultDr()){  
                this.posX++;
                return true;
            }else{
                return false;
            }*/
        //cris
          /*  
        if (this.posX === (10 - 1)) return false;
        else if (this.posX <= (10 - 1) - 4) {
            this.posX++;
            return true;
        } else {
            let col = getColumn(this.shape, (10 -1) - this.posX);
            if (col.includes(1)) return false;
            else {
                this.posX++;
                return true;
            }
        }*/
}
    moveDown(estat){
        //comp colisio
        for(var i = 0;i<estat.length;i++){
            for(var e = 0;e<estat[i].length;e++){
                if(i!==24){
                if(estat[i][e]===1 && estat[i+1][e]===2){
                    return false;
                }
                }
            }
        }


        //baixa
        if (this.posY !== 25-this.ult()){
            this.posY++;
            
            return true; 

        //baixa
        }else{
            return false;
        }
        
        
    }
    ult(){
        console.log(this.shape);
        for(var i = 3; i>=0;i--){
            for(var e = 0;e<=3;e++){
                
                if(this.shape[i][e]===1){
                    return i+1;
                }
            }
        }
    }
    ultDr(){
        //3,0
        //3,1
        //3,2
        //3,3
        //2,0
        
        var ul = 0;
        for(var i = 3;i>-1;i--){
            for(var e = 0; e>this.shape[i].length;e++){
            
                
                if(this.shape[i][e] === 1){
                    return e;
                  
                }
            }
        }
        
    }
    

    rotarHor(){
        
        let result = new Array(4);
        for (let i = 0; i < 4; i++) result[i] = new Array(4).fill(0);
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result[j][(2 - i).mod(4)] = this.shape[i][j];
            }
        }
        
        this.shape = result;

    }
    rotarAnhor(){
        
        var newar = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        for(var i = 4; i>0;i--){
            for(var e = 4; e>0;e--){
             newar[i][e]= this.shape[e][i];
            }
        }
        this.shape=newar;
    }

    getForma(){
        
    }
   
}



//classe Joc
class Joc{
    
    constructor(estat, puntsJug){
        this.estat=estat;
        
        this.puntsJug=puntsJug;
        
        var se = this.segPeca();
         this.pecaVig= new Peca(this.segPeca(),"r");

        this.pecaSeg= this.segPeca();
        this.rows= 25;
        this.cols= 10;
        this.puntsmax = this.puntsMax();
        
        //this.movAut();
        this.gr();
        
       
    }
    gr(){
        //this.pecaVig.moveDown();
        console.log(this.estat);
       
        if(this.pecaVig.moveDown(this.estat)){
            //this.actuEstat();
            
           
        }else{
            this.guardar();
            
            if(this.final()){
                alert("has perdut");
                window.location.reload();
            }
            this.compFila();
            this.pecaSeg=this.segPeca();
            this.pecaVig=new Peca(this.pecaSeg, this.randomCol());
        }
        this.actuEstat();
        
       setTimeout(()=>{(this.gr())},1000); 
        
    }
    guardar(){
        for(var i = 0; i<this.estat.length;i++){
            for(var e = 0; e<this.estat[i].length;e++){
                if(this.estat[i][e]===1){
                    this.estat[i][e]=2;
                }
            }
        }
    }


    puntsMax(){
        if(localStorage.getItem('puntsMax')=== null){
            localStorage.setItem('puntsMax',0);
          }
          return localStorage.getItem('puntsMax');
    }
    
    //retorna una peca un tipus de peca aleatori
    segPeca(){
        var random = (parseInt((Math.random()*6))+1);
        switch (random) {
            case 1:
                return shapes.I;
                break;
            case 2:
                return shapes.O;
               
                break;
            case 3:
                return shapes.T;
                
                break;
            case 4:
                return shapes.L;
                
                break;
            case 5:
                return shapes.J;
                
                break;
            case 6:
                return shapes.Z;
                
                break;
            case 7:
                return shapes.S;
                break;
            
          }
    }
    actuEstat(){
        //actualitzar
        var cont = 0;
        var cont2=0;
        
        for(var i = 0; i<this.estat.length;i++){
            for(var e = 0; e<this.estat[i].length;e++){
                if(e >= this.pecaVig.posX && e < (this.pecaVig.posX+4) && i >= this.pecaVig.posY && i < (this.pecaVig.posY+4)){
                    
                    if(this.pecaVig.shape[cont2][cont]===1 ){        
                    this.estat[i][e]=this.pecaVig.shape[cont2][cont];
                    }else{
                        if(this.estat[i][e]===1)
                        this.estat[i][e]=0;
                    }
                        if(cont===3 || e===9/*&& cont2!==3*/){
                            cont=0;
                            cont2++;
                        }else{
                            cont++;
                        }
                   
                    
                }else if(this.estat[i][e]===1){
                   
                        this.estat[i][e]=0;

                    
                }

                
                
                
                this.mostrar();
                /*
                if(i!==24){
                if(this.pecaVig.shape[cont2][cont]===1 && this.estat[i+1][e]===2){
                    
                    this.guardar();
                    this.pecaVig=new Peca(this.pecaSeg, "blau");
                    this.pecaSeg=this.segPeca();
                    
                }
            }*/
                
            
            }
    
        }
        
    }

    mostrar(){
        for(var i = 0;i<25;i++){
            for(var e = 0;e<10;e++){
                document.getElementById(i+","+e).setAttribute('class','d');
                if(this.estat[i][e]===1){
                    
                   
                    document.getElementById(i+","+e).setAttribute('class',this.pecaVig.color);
                }else if(this.estat[i][e]===2){
                    document.getElementById(i+","+e).setAttribute('class','gr');
                }
            }
        }
    }
        final(){
            for(var i = 0; i<this.estat[3].length;i++){
                if(this.estat[3][i]===2){
                    return true;
                }
                
            }
            return false;
        }
        compFila(){
            for(var i = this.estat.length-1; i>=0;i--){
                var c = 0;
                for(var e = 0; e<this.estat[i].length;e++){
                    if(this.estat[i][e]===2){
                        c++;
                    }
                    if(c===10){
                        for(var f = i;f>=0;f--){ 
                                if(f !== 0)
                                this.estat[f]=this.estat[f-1];
                                else
                                this.estat[f]=[0,0,0,0,0,0,0,0,0];
                        
                        }
                        return ;
                    }
                } 
            }
            this.estat
        }
    randomCol(){
        var random = (parseInt((Math.random()*4))+1);
        switch (random) {
            case 1:
                return "b";
                break;
            case 2:
                return "r";
               
                break;
            case 3:
                return "y";
                
                break;
            case 4:
                return "g";
            
          }


       
    }
    logKey(e) {
    
        if (e.code === "ArrowDown") {
            document.getElementById('text').textContent = "1";
            //console.log(this.moveDown());
            this.pecaVig.moveDown(this.estat);
            this.actuEstat();
            this.mostrar();
        }
        if (e.code === "ArrowUp") {
            document.getElementById('text').textContent = "2";
            //func ArrowUp
            this.pecaVig.rotarHor();
            this.actuEstat();
            this.mostrar();
        }
        if (e.code === "ArrowLeft") {
            document.getElementById('text').textContent = "3";
            //func ArrowLeft
            //this.pecaVig.moveLeft();
            this.pecaVig.moveLeft(this.estat);
            
            this.actuEstat();
            this.mostrar();
            console.log(this.estat);
        }
        if (e.code === "ArrowRight") {
            document.getElementById('text').textContent = "4";
            //func ArrowRight
            //moveRight();
            this.pecaVig.moveRight(this.estat);
            
            this.actuEstat();
            this.mostrar();
        }

    }
    

    
}
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};


/*
orig
[1,1,1,0]   
[0,0,0,0]   
[0,0,0,0]   
[0,0,0,0] 

rot antihorari
[0,0,0,0]
[1,0,0,0]
[1,0,0,0]
[1,0,0,0]

rot horari
[0,0,0,1]
[0,0,0,1]
[0,0,0,1]
[0,0,0,0]


*/




//start


//crear taula 
var bol = false;
function creaTaula(){
        
    
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var pant = document.getElementById("pant");
    for(var i =0;i<25;i++){
        var fila = document.createElement("tr");
       
    for(var e =0;e<10;e++ ){
        var celas = document.createElement("td");
        celas.id=i+","+e;
        celas.setAttribute("class", "d");
        celas.style.padding = "6px 6px 6px 6px";
        fila.appendChild(celas);
       
    }
        tblBody.appendChild(fila);
    }
    tabla.appendChild(tblBody);
    pant.appendChild(tabla); 
    tabla.setAttribute("border", 2);
    tabla.style.borderCollapse = "collapse";
}   


function start(){

    creaTaula();
    //inicialitza array
    
    var est = new Array(25);
    
    for(var t = 0; t<est.length;t++){
        est[t]= new Array(10);
       
    }
    
    //declarar
    for(var i = 0; i<est.length;i++){
        for(var e = 0; e<est[i].length;e++){
            est[i][e]=0;
        }
    }
   
    
    //crear joc

    var joc = new Joc(est, 0);
    
    var but = document.getElementById("start").className="fin";
    document.addEventListener('keydown',e=> joc.logKey(e),true);
    //document.addEventListener('keydown', logKey);
    
}

/*function actuEstat(joc){
    for(var i = 0; i<joc.length;i++){
        for(var e = 0; e<joc[i].length;e++){
            if(i === pecaVig.posX && e === pecaVig.posY){
                for(var y = 0; y<4;y++){
                    for(var x = 0; x<4;x++){
                        joc[i+y][e+x]=pecaVig.shape[y][x];
                    }
                }
            }
        }

    }
    
}*/

//funcion teclas

function logKey(e) {
    
    if (e.code === "ArrowDown") {
        document.getElementById('text').textContent = "1";
        pecaVig.moveRight();
        //func ArrowDown
    }
    if (e.code === "ArrowUp") {
        document.getElementById('text').textContent = "2";
        //func ArrowUp
    }
    if (e.code === "ArrowLeft") {
        document.getElementById('text').textContent = "3";
        //func ArrowLeft
    }
    if (e.code === "ArrowRight") {
        document.getElementById('text').textContent = "4";
        //func ArrowRight
        pecaVig.moveRight();
    }
}
// Creacio mapa pecas
pecasCount = new Map([
    ["I", 0],
    ["J", 0],
    ["L", 0],
    ["O", 0],
    ["S", 0],
    ["T", 0],
    ["Z", 0]
  ]);


