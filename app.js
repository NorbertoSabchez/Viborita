///vr glbl///
var velocidad = 80;
var tamano = 10;

class objeto {
	constructor(){
		this.tamano = tamano;
	}
	choque(obj){
		var difx = Math.abs(this.x - obj.x);
		var dify = Math.abs(this.y - obj.y);
		if (difx >= 0 && difx < tamano && dify >= 0 && dify < tamano) {
			return true;
		} else {
			return false;
		}
	}
}

class cola extends objeto{
	constructor(x, y){
		super();
		this.x = x;
		this.y = y;
		this.siguiente = null;
	}
	dibujar(ctx){
		if (this.siguiente != null) {
			this.siguiente.dibujar(ctx);
		}
		ctx.fillStyle = "#0000ff";
		ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
	}
	setxy(x,y){
		if (this.siguiente != null) {
			this.siguiente.setxy(this.x, this.y);
		}
		this.x = x;
		this.y = y;
	}
	meter(){
		if (this.siguiente == null) {
			this.siguiente = new cola(this.y, this.x);
		} else {
			this.siguiente.meter();
		}
	}
	verSiguiente(){
		return this.siguiente;
	}
}

class comida extends objeto{
	constructor(){
		super();
		this.x = this.generar();
		this.y = this.generar();
	}
	generar(){
		var num = (Math.floor(Math.random() * 59)) * 10;
		return num;
	}
	colocar(){
		this.x = this.generar();
		this.y = this.generar();
	}
	dibujar(ctx){
		ctx.fillStyle = "#ff0000";
		ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
	}
}
///objetos del juego///
var cabeza = new cola(20, 20);
var comi = new comida();
var ejex = true;
var ejey = true;
var xdir = 0;
var ydir = 0;
function movimiento(){
	var nx = cabeza.x+xdir;
	var ny = cabeza.y+ydir;
	cabeza.setxy(nx, ny);
}

function control(event){
	var code = event.keyCode;
	if (ejex) {
		if (code == 38) {
			ydir = -tamano;
			xdir = 0;
			ejex = false;
			ejey = true;
		}
		if (code == 40) {
			ydir = +tamano;
			xdir = 0;
			ejex = false;
			ejey = true;
		}
	}
	if (ejey) {
		if (code == 37) {
			xdir = -tamano;
			ydir = 0;
			ejey = false;
			ejex = true;
		}
		if (code == 39) {
			xdir = +tamano;
			ydir = 0;
			ejey = false;
			ejex = true;
		}
	}
}
function finDeJuego() {
	xdir = 0;
	ydir = 0;
	ejey = true;
	ejex = true;
	cabeza = new cola (20, 20);
	comi = new comida();
	alert("Perdiste :(")
}
function choquePared(){
	if (cabeza.x < 0 || cabeza.x > 590 || cabeza.y < 0 || cabeza.y > 590) {
		finDeJuego();
	}
}
function choquecuerpo(){
	var temp = null;
	try{
		temp = cabeza.verSiguiente().verSiguiente();
	}catch(err){
		temp = null;
	}
	while(temp != null){
		if (cabeza.choque(temp)) {
			finDeJuego();

		}else{
			temp = temp.verSiguiente();
		}
	}
}
///render///
function dibujar() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0, canvas.width, canvas.height);
  cabeza.dibujar(ctx);
  comi.dibujar(ctx);
}

///anmr///
function main() {
  choquecuerpo();
  choquePared();
  dibujar();
  movimiento();
  if (cabeza.choque(comi)) {
  	comi.colocar();
  	cabeza.meter();
  }
}
setInterval("main()", velocidad);
