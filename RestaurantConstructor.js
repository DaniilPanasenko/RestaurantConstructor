//цвета
class Color{
    static FrameObject = '#000000';
    static BackgroundMaker='#EDE7CD';
    static BackgroundLinesMaker ='#EDC983';
    static FrameMaker = '#EDBB7E';
    static FrameTable = '#644F3A';
    static MainTable = '#B6A275'
    static MainChair = '#845F4A';
    static BackChair = '#442F1A';
    static BackgroundPresentation = '#FFFFFF';
    static FramePresentation = '#EDBB7E';

}

//обобщенные классы
class Point{
    constructor(x, y){
        this.X=x;
        this.Y=y;
    }
    turn(center, angle){
        let point = new Point(this.X,this.Y);
        point.X = center.X + (this.X - center.X) * Math.cos(angle) - (this.Y - center.Y) * Math.sin(angle);
        point.Y = center.Y + (this.X - center.X) * Math.sin(angle) + (this.Y - center.Y) * Math.cos(angle);
        return point;
    }
}

class Subject {
    constructor(context,p,w,h){
        this.ctx=context;
        this.P1=new Point(p.X-2, p.Y-2);
        this.width=w;
        this.height=h;
        this.P2=new Point(this.P1.X+4+this.width,this.P1.Y);
        this.P4=new Point(this.P1.X,this.P1.Y+this.height+4);
        this.P3=new Point(this.P1.X+this.width+4,this.P1.Y+this.height+4);
        this.P12 = new Point((this.P1.X+this.P2.X)/2,(this.P1.Y+this.P2.Y)/2);
        this.P23 = new Point((this.P3.X+this.P2.X)/2,(this.P3.Y+this.P2.Y)/2);
        this.P34 = new Point((this.P3.X+this.P4.X)/2,(this.P3.Y+this.P4.Y)/2);
        this.P41 = new Point((this.P1.X+this.P4.X)/2,(this.P1.Y+this.P4.Y)/2);
        this.PTurn = new Point(this.P12.X,this.P12.Y-18);
        this.ang=0;
        this.choosen = true;
        this.center = new Point(this.P1.X+this.width/2,this.P1.Y+this.height/2);
        this.startP1=new Point(this.P1.X,this.P1.Y);
        this.startP2=new Point(this.P2.X,this.P2.Y);
        this.startP3=new Point(this.P3.X,this.P3.Y);
        this.startP4=new Point(this.P4.X,this.P4.Y);
        this.startP12=new Point(this.P12.X,this.P12.Y);
        this.startP23=new Point(this.P23.X,this.P23.Y);
        this.startP34=new Point(this.P34.X,this.P34.Y);
        this.startP41=new Point(this.P41.X,this.P41.Y);
        this.startPTurn=new Point(this.PTurn.X,this.PTurn.Y);
        this.minH=0;
        this.minW=0;
        this.isSquareForm = false;
    }
    turn(newangl){

        this.P1 = this.startP1.turn(this.center,newangl);
        this.P2 = this.startP2.turn(this.center,newangl);
        this.P3 = this.startP3.turn(this.center,newangl);
        this.P4 = this.startP4.turn(this.center,newangl);
        this.P12 = this.startP12.turn(this.center,newangl);
        this.P23 = this.startP23.turn(this.center,newangl);
        this.P34 = this.startP34.turn(this.center,newangl);
        this.P41 = this.startP41.turn(this.center,newangl);
        this.PTurn = this.startPTurn.turn(this.center,newangl);
        this.ang=newangl;
    }
    drawTurnPoint(){
        this.ctx.setLineDash([5,2]);
        this.ctx.beginPath();
        this.ctx.moveTo(this.P12.X, this.P12.Y);
        let p = new Point(this.PTurn.X, this.PTurn.Y);
        p = p.turn(this.center, Math.PI*2-this.ang);
        p.Y+=6;
        p = p.turn(this.center, this.ang);
        this.ctx.lineTo(p.X, p.Y);
        this.ctx.stroke();
        this.ctx.setLineDash([5,0]);
        this.ctx.strokeStyle= Color.FrameObject;
        this.ctx.lineWidth= 2;
        this.ctx.beginPath();
        this.ctx.arc(this.PTurn.X,this.PTurn.Y,6,Math.PI*1.5,0,true);
        this.ctx.stroke();
        this.ctx.fillStyle= Color.FrameObject;
        this.ctx.beginPath();
        this.ctx.moveTo(this.PTurn.X,this.PTurn.Y-9.5);
        this.ctx.lineTo(this.PTurn.X+4,this.PTurn.Y-5.5);
        this.ctx.lineTo(this.PTurn.X,this.PTurn.Y-1.5);
        this.ctx.lineTo(this.PTurn.X,this.PTurn.Y-9.5);
        this.ctx.fill();
    }
    drawRect(){
        this.ctx.setLineDash([5,2]);
        this.ctx.strokeStyle= Color.FrameObject;
        this.ctx.lineWidth= 1;
        this.ctx.beginPath();
        this.ctx.moveTo(this.P1.X,this.P1.Y);
        this.ctx.lineTo(this.P2.X,this.P2.Y);
        this.ctx.lineTo(this.P3.X,this.P3.Y);
        this.ctx.lineTo(this.P4.X,this.P4.Y);
        this.ctx.lineTo(this.P1.X,this.P1.Y);
        this.ctx.stroke();
        this.ctx.fillStyle= Color.FrameObject;
        this.ctx.beginPath();
        this.ctx.arc(this.P1.X,this.P1.Y,3,0,Math.PI*2,true);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.P2.X,this.P2.Y,3,0,Math.PI*2,true);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.P3.X,this.P3.Y,3,0,Math.PI*2,true);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.P4.X,this.P4.Y,3,0,Math.PI*2,true);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.P12.X,this.P12.Y,3,0,Math.PI*2,true);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.P23.X,this.P23.Y,3,0,Math.PI*2,true);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.P34.X,this.P34.Y,3,0,Math.PI*2,true);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.P41.X,this.P41.Y,3,0,Math.PI*2,true);
        this.ctx.fill();
    }
    draw(){
        if(this.choosen){
            this.drawRect();
            this.drawTurnPoint();
        }
    }
    getState(event) {
        if (cursorOnPoint(this.P1, 2, event)) {
            return "LEFT-TOP";
        } else if (cursorOnPoint(this.P2, 2, event)) {
            return "RIGHT-TOP";
        } else if (cursorOnPoint(this.P3, 2, event)) {
            return "RIGHT-DOWN";
        } else if (cursorOnPoint(this.P4, 2, event)) {
            return "LEFT-DOWN";
        } else if (cursorOnPoint(this.P12, 2, event)) {
            return "TOP";
        } else if (cursorOnPoint(this.P23, 2, event)) {
            return "RIGHT";
        } else if (cursorOnPoint(this.P34, 2, event)) {
            return "DOWN";
        } else if (cursorOnPoint(this.P41, 2, event)) {
            return "LEFT";
        } else if (cursorOnPoint(this.PTurn, 5, event)) {
            return "TURN";
        } else if (cursorOnArea(this, event)) {
            return "ON-AREA";
        }
    }
    resize(p1, p2, p3, p4){
        this.center = new Point((p1.X+p3.X)/2,(p1.Y+p3.Y)/2);
        this.startP1=p1;
        this.startP2=p2;
        this.startP3=p3;
        this.startP4=p4;
        this.startP12=new Point((this.startP1.X+this.startP2.X)/2,(this.startP1.Y+this.startP2.Y)/2);
        this.startP23=new Point((this.startP3.X+this.startP2.X)/2,(this.startP3.Y+this.startP2.Y)/2);
        this.startP34=new Point((this.startP3.X+this.startP4.X)/2,(this.startP3.Y+this.startP4.Y)/2);
        this.startP41=new Point((this.startP1.X+this.startP4.X)/2,(this.startP1.Y+this.startP4.Y)/2);
        this.startPTurn=new Point(this.startP12.X,this.startP12.Y-18);
        this.width = this.startP2.X-this.startP1.X-4;
        this.height = this.startP4.Y-this.startP1.Y-4;
        this.turn(this.ang);
    }

}

class Maker {
    constructor(name) {
        this.subjects = [];
        this.canvas = document.getElementById(name);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    drawBackground(){
        //фон
        this.ctx.rect(0,0,this.width, this.height);
        this.ctx.fillStyle= Color.BackgroundMaker;
        this.ctx.fill();
        //вертикальные полосы
        for(let i=100; i<this.width; i+=100){
            for(let j=0; j<this.height; j+=25){
                this.ctx.strokeStyle= Color.BackgroundLinesMaker;
                this.ctx.lineWidth= 1;
                this.ctx.beginPath();
                this.ctx.moveTo(i,j);
                this.ctx.lineTo(i,j+20);
                this.ctx.stroke();
            }
        }
        //горизонтальные полосы
        for(let i=100; i<this.height; i+=100){
            for(let j=0; j<this.width; j+=25){
                this.ctx.strokeStyle= Color.BackgroundLinesMaker;
                this.ctx.lineWidth= 1;
                this.ctx.beginPath();
                this.ctx.moveTo(j,i);
                this.ctx.lineTo(j+20,i);
                this.ctx.stroke();
            }
        }
        //рамка
        this.ctx.beginPath();
        this.ctx.rect(0,0,this.width, this.height);
        this.ctx.strokeStyle= Color.FrameMaker;
        this.ctx.lineWidth= 10;
        this.ctx.stroke();
    }
    redraw(){
        this.drawBackground();
        for(let i=this.subjects.length-1; i>=0; i--){
            this.subjects[this.subjects.length-1-i].draw();
        }
    }
    addSubject(subj){
        this.choosen =subj;
        this.subjects.push(subj);
        for(let i=0; i<this.subjects.length-1; i++){
            this.subjects[i].choosen=false;
        }
        this.redraw();
    }
}

class Presentation{
    constructor(name){
        this.subjects=[];
        this.canvas = document.getElementById(name);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    drawBackground(){
        //фон
        this.ctx.rect(0,0,this.width, this.height);
        this.ctx.fillStyle= Color.BackgroundPresentation;
        this.ctx.fill();
        //рамка
        this.ctx.beginPath();
        this.ctx.rect(0,0,this.width, this.height);
        this.ctx.strokeStyle= Color.FramePresentation;
        this.ctx.lineWidth= 10;
        this.ctx.stroke();
    }
    redraw(){
        this.drawBackground();
        for(let i=this.subjects.length-1; i>=0; i--){
            this.subjects[this.subjects.length-1-i].draw();
        }
    }
    addSubjects(descriptions){
        for(let i=0; i<descriptions.length; i++){

        }
    }
}

//классы предметов
class Table extends Subject{
    constructor(context) {
        let standartWidth = 150;
        let standartHeight = 100;
        let point = new Point((context.canvas.width-standartWidth)/2,(context.canvas.height-standartHeight)/2);
        super(context,point,standartWidth,standartHeight);
        this.minH=20;
        this.minW=20;
        this.fP1=new Point(point.X, point.Y);
        this.fP2=new Point(this.fP1.X+this.width,this.fP1.Y);
        this.fP4=new Point(this.fP1.X,this.fP1.Y+this.height);
        this.fP3=new Point(this.fP1.X+this.width,this.fP1.Y+this.height);
        this.startfP1=new Point(this.fP1.X,this.fP1.Y);
        this.startfP2=new Point(this.fP2.X,this.fP2.Y);
        this.startfP3=new Point(this.fP3.X,this.fP3.Y);
        this.startfP4=new Point(this.fP4.X,this.fP4.Y);
        this.lineW = Math.min(this.width,this.height)*0.05;
        this.fP10=new Point(this.fP1.X+this.lineW,this.fP1.Y+this.lineW);
        this.fP20=new Point(this.fP2.X-this.lineW,this.fP2.Y+this.lineW);
        this.fP30=new Point(this.fP3.X-this.lineW,this.fP3.Y-this.lineW);
        this.fP40=new Point(this.fP4.X+this.lineW,this.fP4.Y-this.lineW);
        this.startfP10=new Point(this.fP10.X,this.fP10.Y);
        this.startfP20=new Point(this.fP20.X,this.fP20.Y);
        this.startfP30=new Point(this.fP30.X,this.fP30.Y);
        this.startfP40=new Point(this.fP40.X,this.fP40.Y);
    }
    turn(newangl){
        super.turn(newangl);
        this.fP1 = this.startfP1.turn(this.center,newangl);
        this.fP2 = this.startfP2.turn(this.center,newangl);
        this.fP3 = this.startfP3.turn(this.center,newangl);
        this.fP4 = this.startfP4.turn(this.center,newangl);
        this.fP10 = this.startfP10.turn(this.center,newangl);
        this.fP20 = this.startfP20.turn(this.center,newangl);
        this.fP30 = this.startfP30.turn(this.center,newangl);
        this.fP40 = this.startfP40.turn(this.center,newangl);
    }
    draw(){
        this.ctx.fillStyle= Color.FrameTable;
        this.ctx.beginPath();
        this.ctx.moveTo((this.fP1.X+this.fP2.X)/2,(this.fP1.Y+this.fP2.Y)/2);
        this.ctx.arcTo((this.fP1.X+this.fP2.X)/2,(this.fP1.Y+this.fP2.Y)/2, this.fP2.X,this.fP2.Y, this.lineW);
        this.ctx.arcTo( this.fP2.X,this.fP2.Y, this.fP3.X,this.fP3.Y,this.lineW);
        this.ctx.arcTo( this.fP3.X,this.fP3.Y, this.fP4.X,this.fP4.Y,this.lineW);
        this.ctx.arcTo( this.fP4.X,this.fP4.Y, this.fP1.X,this.fP1.Y,this.lineW);
        this.ctx.arcTo( this.fP1.X,this.fP1.Y, (this.fP1.X+this.fP2.X)/2,(this.fP1.Y+this.fP2.Y)/2,this.lineW);
        this.ctx.fill();
        this.ctx.fillStyle= Color.MainTable;
        this.ctx.beginPath();
        this.ctx.moveTo((this.fP10.X+this.fP20.X)/2,(this.fP10.Y+this.fP20.Y)/2);
        this.ctx.arcTo((this.fP10.X+this.fP20.X)/2,(this.fP10.Y+this.fP20.Y)/2, this.fP20.X,this.fP20.Y, this.lineW/2);
        this.ctx.arcTo( this.fP20.X,this.fP20.Y, this.fP30.X,this.fP30.Y,this.lineW/2);
        this.ctx.arcTo( this.fP30.X,this.fP30.Y, this.fP40.X,this.fP40.Y,this.lineW/2);
        this.ctx.arcTo( this.fP40.X,this.fP40.Y, this.fP10.X,this.fP10.Y,this.lineW/2);
        this.ctx.arcTo( this.fP10.X,this.fP10.Y, (this.fP10.X+this.fP20.X)/2,(this.fP10.Y+this.fP20.Y)/2,this.lineW/2);
        this.ctx.fill();
        super.draw();
    }
    resize(p1, p2, p3, p4){
        this.startfP1=new Point(p1.X+2,p1.Y+2);
        this.startfP2=new Point(p2.X-2,p2.Y+2);
        this.startfP3=new Point(p3.X-2,p3.Y-2);
        this.startfP4=new Point(p4.X+2,p4.Y-2);
        this.startfP10=new Point(p1.X+2+this.lineW,p1.Y+2+this.lineW);
        this.startfP20=new Point(p2.X-2-this.lineW,p2.Y+2+this.lineW);
        this.startfP30=new Point(p3.X-2-this.lineW,p3.Y-2-this.lineW);
        this.startfP40=new Point(p4.X+2+this.lineW,p4.Y-2-this.lineW);
        super.resize(p1,p2,p3,p4);
        this.lineW = Math.min(this.width,this.height)*0.05;
    }
}

class RoundedTable extends Subject{
    constructor(context) {
        let radius = 50;
        let point = new Point((context.canvas.width-2*radius)/2,(context.canvas.height-2*radius)/2);
        super(context,point,2*radius, 2*radius);
        this.isSquareForm=true;
        this.radius = radius;
        this.lineW = this.radius*0.1;
        this.minH=20;
        this.minW=20;
        this.resize(this.P1,this.P2,this.P3, this.P4);
    }
    draw(){
        this.ctx.fillStyle= Color.FrameTable;
        this.ctx.beginPath();
        this.ctx.arc(this.center.X, this.center.Y, this.radius, 0, 2*Math.PI, false);
        this.ctx.fill();
        this.ctx.fillStyle= Color.MainTable;
        this.ctx.beginPath();
        this.ctx.arc(this.center.X, this.center.Y, this.radius-this.lineW, 0, 2*Math.PI, false);
        this.ctx.fill();
        super.draw();
    }
    resize(p1, p2, p3, p4){
        super.resize(p1,p2,p3,p4);
        this.radius =   Math.min(Math.abs(p1.X-p2.X)/2, Math.abs(p1.Y-p3.Y)/2);
        this.lineW = this.radius*0.1;
    }
}

class Chair extends Subject{
    constructor(context) {
        let standartWidth = 40;
        let standartHeight = 40;
        let point = new Point((context.canvas.width-standartWidth)/2,(context.canvas.height-standartHeight)/2);
        super(context,point,standartWidth,standartHeight);
        this.minH=20;
        this.minW=20;
        this.fP1=new Point(point.X, point.Y);
        this.fP2=new Point(this.fP1.X+this.width,this.fP1.Y);
        this.fP4=new Point(this.fP1.X,this.fP1.Y+this.height);
        this.fP3=new Point(this.fP1.X+this.width,this.fP1.Y+this.height);
        this.startfP1=new Point(this.fP1.X,this.fP1.Y);
        this.startfP2=new Point(this.fP2.X,this.fP2.Y);
        this.startfP3=new Point(this.fP3.X,this.fP3.Y);
        this.startfP4=new Point(this.fP4.X,this.fP4.Y);
        this.fP14=new Point(this.fP1.X,this.fP1.Y+this.height*0.8);
        this.fP23=new Point(this.fP1.X+this.width,this.fP1.Y+this.height*0.8);
        this.startfP23=new Point(this.fP23.X,this.fP23.Y);
        this.startfP14=new Point(this.fP14.X,this.fP14.Y);
        this.lineW = Math.min(this.width,this.height)*0.3;
        this.resize(this.startfP1,this.startfP2,this.startfP3,this.startfP4);

    }
    turn(newangl){
        super.turn(newangl);
        this.fP1 = this.startfP1.turn(this.center,newangl);
        this.fP2 = this.startfP2.turn(this.center,newangl);
        this.fP3 = this.startfP3.turn(this.center,newangl);
        this.fP4 = this.startfP4.turn(this.center,newangl);
        this.fP23 = this.startfP23.turn(this.center,newangl);
        this.fP14 = this.startfP14.turn(this.center,newangl);
    }
    draw(){
        this.ctx.fillStyle= Color.MainChair;
        this.ctx.beginPath();
        this.ctx.moveTo((this.fP1.X+this.fP2.X)/2,(this.fP1.Y+this.fP2.Y)/2);
        this.ctx.arcTo((this.fP1.X+this.fP2.X)/2,(this.fP1.Y+this.fP2.Y)/2, this.fP2.X,this.fP2.Y, this.lineW);
        this.ctx.arcTo( this.fP2.X,this.fP2.Y, this.fP3.X,this.fP3.Y,this.lineW);
        this.ctx.arcTo( this.fP3.X,this.fP3.Y, this.fP4.X,this.fP4.Y,this.lineW);
        this.ctx.arcTo( this.fP4.X,this.fP4.Y, this.fP1.X,this.fP1.Y,this.lineW);
        this.ctx.arcTo( this.fP1.X,this.fP1.Y, (this.fP1.X+this.fP2.X)/2,(this.fP1.Y+this.fP2.Y)/2,this.lineW);
        this.ctx.fill();
        this.ctx.fillStyle= Color.BackChair;
        this.ctx.beginPath();
        this.ctx.moveTo((this.fP14.X+this.fP23.X)/2,(this.fP14.Y+this.fP23.Y)/2);
        this.ctx.arcTo((this.fP14.X+this.fP23.X)/2,(this.fP14.Y+this.fP23.Y)/2, this.fP23.X,this.fP23.Y, this.lineW*0.25);
        this.ctx.arcTo( this.fP23.X,this.fP23.Y, this.fP3.X,this.fP3.Y,this.lineW*0.25);
        this.ctx.arcTo( this.fP3.X,this.fP3.Y, this.fP4.X,this.fP4.Y,this.lineW*0.25);
        this.ctx.arcTo( this.fP4.X,this.fP4.Y, this.fP14.X,this.fP14.Y,this.lineW*0.25);
        this.ctx.arcTo( this.fP14.X,this.fP14.Y, (this.fP14.X+this.fP23.X)/2,(this.fP14.Y+this.fP23.Y)/2,this.lineW*0.25);
        this.ctx.fill();
        super.draw();
    }
    resize(p1, p2, p3, p4){
        this.startfP1=new Point(p1.X+2,p1.Y+2);
        this.startfP2=new Point(p2.X-2,p2.Y+2);
        this.startfP3=new Point(p3.X-2,p3.Y-2);
        this.startfP4=new Point(p4.X+2,p4.Y-2);
        this.startfP23=new Point(p3.X-2,p2.Y-2+(this.startfP4.Y-this.startfP1.Y)*0.8);
        this.startfP14=new Point(p4.X+2,p1.Y-2+(this.startfP4.Y-this.startfP1.Y)*0.8);
        super.resize(p1,p2,p3,p4);
        this.lineW = Math.min(this.width,this.height)*0.3;
    }
}
//вызов класса
let maker = new Maker('maker');
//let presentation = new Presentation([new Table(presentation.ctx)],'presentation');

//доп фунции
function cursorOnPoint(point,radius, event){
    if(Math.abs(getX(event)-point.X)<=radius && Math.abs(getY(event)-point.Y)<=radius){
        return true;
    }
    return false;
}


function cursorOnArea(subject, event){
    let x = getX(event);
    let y = getY(event);
    let point = new Point(x,y);
    point = point.turn(subject.center, Math.PI*2-subject.ang);
    if(point.X>subject.startP1.X && point.X<subject.startP2.X && point.Y>subject.startP1.Y && point.Y<subject.startP3.Y){
        return true;
    }
    return false;
}

function getLogo(subject, w, h){
    subject.resize(new Point(0,0),new Point(w,0),new Point(w,h),new Point(0,h));
    subject.choosen=false;
    subject.draw();
}

function getX(e) {
    var x = e.offsetX==undefined?e.layerX:e.offsetX;
    var y = e.offsetY==undefined?e.layerY:e.offsetY;
    return x;
}

function getY(e) {
    var x = e.offsetX==undefined?e.layerX:e.offsetX;
    var y = e.offsetY==undefined?e.layerY:e.offsetY;
    return y;
}

//фунции событий
function handlerMousemove(event){
    this.style.cursor= "default";
    let state = "NOT_CHOOSEN";
    if(maker.choosen!=null) {
        state = maker.choosen.getState(event);
    }
    switch (state) {
        case "NOT_CHOOSEN":
            this.style.cursor= "default"; break;
        case "LEFT-TOP":
            this.style.cursor = "nwse-resize"; break;
        case "RIGHT-TOP":
            this.style.cursor = "nesw-resize"; break;
        case "RIGHT-DOWN":
            this.style.cursor = "nwse-resize"; break;
        case "LEFT-DOWN":
            this.style.cursor = "nesw-resize"; break;
        case "TOP":
            this.style.cursor = "ns-resize"; break;
        case "RIGHT":
            this.style.cursor = "ew-resize"; break;
        case "DOWN":
            this.style.cursor = "ns-resize"; break;
        case "LEFT":
            this.style.cursor = "ew-resize"; break;
        case "TURN":
            this.style.cursor = "grab"; break;
        case "ON-AREA":
            this.style.cursor = "grab"; break;

    }
}

function handlerMouseup(event){
    this.style.cursor= "default";
    let state = "NOT_CHOOSEN";
    if(maker.choosen!=null) {
        state = maker.choosen.getState(event);
    }
    switch (state) {
        case "NOT_CHOOSEN":
            this.style.cursor= "default"; break;
        case "LEFT-TOP":
            this.style.cursor = "nwse-resize"; break;
        case "RIGHT-TOP":
            this.style.cursor = "nesw-resize"; break;
        case "RIGHT-DOWN":
            this.style.cursor = "nwse-resize"; break;
        case "LEFT-DOWN":
            this.style.cursor = "nesw-resize"; break;
        case "TOP":
            this.style.cursor = "ns-resize"; break;
        case "RIGHT":
            this.style.cursor = "ew-resize"; break;
        case "DOWN":
            this.style.cursor = "ns-resize"; break;
        case "LEFT":
            this.style.cursor = "ew-resize"; break;
        case "TURN":
            this.style.cursor = "grab"; break;
        case "ON-AREA":
            this.style.cursor = "grab"; break;

    }
    maker.canvas.onmousemove=handlerMousemove;
}

function handlerMousedown(event){
    maker.canvas.onmouseup=handlerMouseup;
    let lastPoint = new Point(getX(event), getY(event));
    this.style.cursor= "default";
    let isChoosen=false;
    if(maker.choosen!=null){
        let state = maker.choosen.getState(event);
        switch (state) {
            case "LEFT-TOP":
                this.style.cursor = "nwse-resize";
                maker.canvas.onmousemove =function(event){
                    let x = getX(event);
                    let y = getY(event);
                    let p1 = new Point(x,y);
                    let center =  new Point((p1.X+maker.choosen.P3.X)/2,(p1.Y+maker.choosen.P3.Y)/2);
                    p1 = p1.turn(center,Math.PI*2-maker.choosen.ang);
                    let p3 = new Point(maker.choosen.P3.X, maker.choosen.P3.Y);
                    p3 = p3.turn(center,Math.PI*2-maker.choosen.ang);
                    //if(maker.choosen.isSquareForm){
                    //   let w = p3.X-p1.X;
                    //   let h = p3.Y-p1.Y;
                    //   let s = Math.min(h,w);
                    //   p1 = p1.turn(center,maker.choosen.ang);
                    //  p3 = p3.turn(center,maker.choosen.ang);
                    // }
                    let p2 = new Point(p3.X,p1.Y);
                    let p4 = new Point(p1.X,p3.Y);
                    let width = p2.X-p1.X-4;
                    let height = p4.Y-p1.Y-4;
                    if(width>maker.choosen.minW && height>maker.choosen.minH) {
                        maker.choosen.resize(p1, p2, p3, p4);
                        maker.redraw();
                    }
                };
                isChoosen=true;
                break;
            case "RIGHT-TOP":
                this.style.cursor = "nesw-resize";
                maker.canvas.onmousemove =function(event){
                    let x = getX(event);
                    let y = getY(event);
                    let p2 = new Point(x,y);
                    let center =  new Point((p2.X+maker.choosen.P4.X)/2,(p2.Y+maker.choosen.P4.Y)/2)
                    p2 = p2.turn(center,Math.PI*2-maker.choosen.ang);
                    let p4 = new Point(maker.choosen.P4.X, maker.choosen.P4.Y);
                    p4 = p4.turn(center,Math.PI*2-maker.choosen.ang);
                    let p1 = new Point(p4.X,p2.Y);
                    let p3 = new Point(p2.X,p4.Y);
                    let width = p2.X-p1.X-4;
                    let height = p4.Y-p1.Y-4;
                    if(width>maker.choosen.minW && height>maker.choosen.minH) {
                        maker.choosen.resize(p1, p2, p3, p4);
                        maker.redraw();
                    }
                };
                isChoosen=true;
                break;
            case "RIGHT-DOWN":
                this.style.cursor = "nwse-resize";
                maker.canvas.onmousemove =function(event){
                    let x = getX(event);
                    let y = getY(event);
                    let p3 = new Point(x,y);
                    let center =  new Point((p3.X+maker.choosen.P1.X)/2,(p3.Y+maker.choosen.P1.Y)/2)
                    p3 = p3.turn(center,Math.PI*2-maker.choosen.ang);
                    let p1 = new Point(maker.choosen.P1.X, maker.choosen.P1.Y);
                    p1 = p1.turn(center,Math.PI*2-maker.choosen.ang);
                    let p2 = new Point(p3.X,p1.Y);
                    let p4 = new Point(p1.X,p3.Y);
                    let width = p2.X-p1.X-4;
                    let height = p4.Y-p1.Y-4;
                    if(width>maker.choosen.minW && height>maker.choosen.minH) {
                        maker.choosen.resize(p1, p2, p3, p4);
                        maker.redraw();
                    }
                };
                isChoosen=true;
                break;
            case "LEFT-DOWN":
                this.style.cursor = "nesw-resize";
                maker.canvas.onmousemove =function(event){
                    let x = getX(event);
                    let y = getY(event);
                    let p4 = new Point(x,y);
                    let center =  new Point((p4.X+maker.choosen.P2.X)/2,(p4.Y+maker.choosen.P2.Y)/2)
                    p4 = p4.turn(center,Math.PI*2-maker.choosen.ang);
                    let p2 = new Point(maker.choosen.P2.X, maker.choosen.P2.Y);
                    p2 = p2.turn(center,Math.PI*2-maker.choosen.ang);
                    let p1 = new Point(p4.X,p2.Y);
                    let p3 = new Point(p2.X,p4.Y);
                    let width = p2.X-p1.X-4;
                    let height = p4.Y-p1.Y-4;
                    if(width>maker.choosen.minW && height>maker.choosen.minH) {
                        maker.choosen.resize(p1, p2, p3, p4);
                        maker.redraw();
                    }
                };
                isChoosen=true;
                break;
            case "TOP":
                this.style.cursor = "ns-resize";
                maker.canvas.onmousemove =function(event){
                    let x = getX(event);
                    let y = getY(event);
                    let p0 = new Point(x,y);
                    p0 = p0.turn(maker.choosen.center, Math.PI*2-maker.choosen.ang);
                    let h = maker.choosen.startP3.Y-p0.Y;
                    let p1 = new Point(maker.choosen.P4.X+h*Math.sin(maker.choosen.ang),maker.choosen.P4.Y-h*Math.cos(maker.choosen.ang));
                    let p2 = new Point(maker.choosen.P3.X+h*Math.sin(maker.choosen.ang),maker.choosen.P3.Y-h*Math.cos(maker.choosen.ang));
                    let center =  new Point((maker.choosen.P3.X+p1.X)/2,(maker.choosen.P3.Y+p1.Y)/2);
                    p2 = p2.turn(center, Math.PI*2-maker.choosen.ang);
                    p1 = p1.turn(center, Math.PI*2-maker.choosen.ang);
                    let p3 = maker.choosen.P3.turn(center, Math.PI*2-maker.choosen.ang);
                    let p4 = maker.choosen.P4.turn(center, Math.PI*2-maker.choosen.ang);
                    let width = p2.X-p1.X-4;
                    let height = p4.Y-p1.Y-4;
                    if(width>maker.choosen.minW && height>maker.choosen.minH) {
                        maker.choosen.resize(p1, p2, p3, p4);
                        maker.redraw();
                    }
                };
                isChoosen=true;
                break;
            case "RIGHT":
                this.style.cursor = "ew-resize";
                maker.canvas.onmousemove =function(event){
                    let x = getX(event);
                    let y = getY(event);
                    let p0 = new Point(x,y);
                    p0 = p0.turn(maker.choosen.center, Math.PI*2-maker.choosen.ang);
                    let w = p0.X-maker.choosen.startP1.X;
                    let p2 = new Point(maker.choosen.P1.X+w*Math.cos(maker.choosen.ang),maker.choosen.P1.Y+w*Math.sin(maker.choosen.ang));
                    let p3 = new Point(maker.choosen.P4.X+w*Math.cos(maker.choosen.ang),maker.choosen.P4.Y+w*Math.sin(maker.choosen.ang));
                    let center =  new Point((maker.choosen.P1.X+p3.X)/2,(maker.choosen.P1.Y+p3.Y)/2);
                    p2 = p2.turn(center, Math.PI*2-maker.choosen.ang);
                    p3 = p3.turn(center, Math.PI*2-maker.choosen.ang);
                    let p1 = maker.choosen.P1.turn(center, Math.PI*2-maker.choosen.ang);
                    let p4 = maker.choosen.P4.turn(center, Math.PI*2-maker.choosen.ang);
                    let width = p2.X-p1.X-4;
                    let height = p4.Y-p1.Y-4;
                    if(width>maker.choosen.minW && height>maker.choosen.minH) {
                        maker.choosen.resize(p1, p2, p3, p4);
                        maker.redraw();
                    }
                };
                isChoosen=true;
                break;
            case "DOWN":
                this.style.cursor = "ns-resize";
                maker.canvas.onmousemove =function(event){
                    let x = getX(event);
                    let y = getY(event);
                    let p0 = new Point(x,y);
                    p0 = p0.turn(maker.choosen.center, Math.PI*2-maker.choosen.ang);
                    let h = p0.Y-maker.choosen.startP1.Y;
                    let p4 = new Point(maker.choosen.P1.X-h*Math.sin(maker.choosen.ang),maker.choosen.P1.Y+h*Math.cos(maker.choosen.ang));
                    let p3 = new Point(maker.choosen.P2.X-h*Math.sin(maker.choosen.ang),maker.choosen.P2.Y+h*Math.cos(maker.choosen.ang));
                    let center =  new Point((maker.choosen.P1.X+p3.X)/2,(maker.choosen.P1.Y+p3.Y)/2);
                    p4 = p4.turn(center, Math.PI*2-maker.choosen.ang);
                    p3 = p3.turn(center, Math.PI*2-maker.choosen.ang);
                    let p1 = maker.choosen.P1.turn(center, Math.PI*2-maker.choosen.ang);
                    let p2 = maker.choosen.P2.turn(center, Math.PI*2-maker.choosen.ang);
                    let width = p2.X-p1.X-4;
                    let height = p4.Y-p1.Y-4;
                    if(width>maker.choosen.minW && height>maker.choosen.minH) {
                        maker.choosen.resize(p1, p2, p3, p4);
                        maker.redraw();
                    }
                };
                isChoosen=true;
                break;
            case "LEFT":
                this.style.cursor = "ew-resize";
                maker.canvas.onmousemove =function(event){
                    let x = getX(event);
                    let y = getY(event);
                    let p0 = new Point(x,y);
                    p0 = p0.turn(maker.choosen.center, Math.PI*2-maker.choosen.ang);
                    let w = maker.choosen.startP2.X-p0.X;
                    let p1 = new Point(maker.choosen.P2.X-w*Math.cos(maker.choosen.ang),maker.choosen.P2.Y-w*Math.sin(maker.choosen.ang));
                    let p4 = new Point(maker.choosen.P3.X-w*Math.cos(maker.choosen.ang),maker.choosen.P3.Y-w*Math.sin(maker.choosen.ang));
                    let center =  new Point((maker.choosen.P3.X+p1.X)/2,(maker.choosen.P3.Y+p1.Y)/2);
                    p1 = p1.turn(center, Math.PI*2-maker.choosen.ang);
                    p4 = p4.turn(center, Math.PI*2-maker.choosen.ang);
                    let p2 = maker.choosen.P2.turn(center, Math.PI*2-maker.choosen.ang);
                    let p3 = maker.choosen.P3.turn(center, Math.PI*2-maker.choosen.ang);
                    let width = p2.X-p1.X-4;
                    let height = p4.Y-p1.Y-4;
                    if(width>maker.choosen.minW && height>maker.choosen.minH) {
                        maker.choosen.resize(p1, p2, p3, p4);
                        maker.redraw();
                    }
                };
                isChoosen=true;
                break;
            case "TURN":
                this.style.cursor = "grabbing";
                maker.canvas.onmousemove =function(event){
                    this.style.cursor = "grabbing";
                    let x = getX(event);
                    let y = getY(event);
                    let ang = (maker.choosen.center.Y-y<0?Math.PI:0) + Math.atan((x-maker.choosen.center.X)/((maker.choosen.center.Y-y)));
                    maker.choosen.turn(ang);
                    maker.redraw();
                };
                isChoosen=true;
                break;
            case "ON-AREA":
                this.style.cursor = "grabbing";
                maker.canvas.onmousemove =function(event){
                    this.style.cursor = "grabbing";
                    let x = getX(event);
                    let y = getY(event);
                    let point = new Point(x,y);
                    let p1 = new Point(maker.choosen.P1.X+(point.X-lastPoint.X),maker.choosen.P1.Y+(point.Y-lastPoint.Y));
                    let p2 = new Point(maker.choosen.P2.X+(point.X-lastPoint.X),maker.choosen.P2.Y+(point.Y-lastPoint.Y));
                    let p3 = new Point(maker.choosen.P3.X+(point.X-lastPoint.X),maker.choosen.P3.Y+(point.Y-lastPoint.Y));
                    let p4 = new Point(maker.choosen.P4.X+(point.X-lastPoint.X),maker.choosen.P4.Y+(point.Y-lastPoint.Y));
                    let center = new Point((p1.X+p3.X)/2,(p1.Y+p3.Y)/2);
                    p1 = p1.turn(center, Math.PI*2-maker.choosen.ang);
                    p2 = p2.turn(center, Math.PI*2-maker.choosen.ang);
                    p3 = p3.turn(center, Math.PI*2-maker.choosen.ang);
                    p4 = p4.turn(center, Math.PI*2-maker.choosen.ang);
                    lastPoint =point;
                    maker.choosen.resize(p1,p2,p3,p4);
                    maker.redraw();
                };
                isChoosen=true;
                break;
        }
    }
    if(!isChoosen){
        if(maker.choosen!=null){
            maker.choosen.choosen=false;
        }
        maker.choosen=null;
        for(let i=maker.subjects.length-1; i>=0; i--){
            let state = maker.subjects[i].getState(event);
            if(state=="ON-AREA"){
                maker.choosen=maker.subjects[i];
                maker.subjects[i].choosen=true;
                for(let j=i; j<maker.subjects.length; j++){
                    if(maker.subjects.length-1==j){
                        maker.subjects[j]=maker.choosen;
                    }
                    else{
                        maker.subjects[j]=maker.subjects[j+1];
                    }
                }
                break;
            }
        }
        this.style.cursor = "grabbing";
        maker.canvas.onmousemove =function(event){
            this.style.cursor = "grabbing";
            let x = getX(event);
            let y = getY(event);
            let point = new Point(x,y);
            let p1 = new Point(maker.choosen.P1.X+(point.X-lastPoint.X),maker.choosen.P1.Y+(point.Y-lastPoint.Y));
            let p2 = new Point(maker.choosen.P2.X+(point.X-lastPoint.X),maker.choosen.P2.Y+(point.Y-lastPoint.Y));
            let p3 = new Point(maker.choosen.P3.X+(point.X-lastPoint.X),maker.choosen.P3.Y+(point.Y-lastPoint.Y));
            let p4 = new Point(maker.choosen.P4.X+(point.X-lastPoint.X),maker.choosen.P4.Y+(point.Y-lastPoint.Y));
            let center = new Point((p1.X+p3.X)/2,(p1.Y+p3.Y)/2);
            p1 = p1.turn(center, Math.PI*2-maker.choosen.ang);
            p2 = p2.turn(center, Math.PI*2-maker.choosen.ang);
            p3 = p3.turn(center, Math.PI*2-maker.choosen.ang);
            p4 = p4.turn(center, Math.PI*2-maker.choosen.ang);
            lastPoint =point;
            maker.choosen.resize(p1,p2,p3,p4);
            maker.redraw();
        };
        maker.redraw();
    }

}

function handlerDelete(event){
    if(event.key=='Delete' || event.key=='Backspace'){
        for(let i=0; i<maker.subjects.length; i++){
            if(maker.subjects[i].choosen){
                maker.subjects.splice(i,1);
                break;
            }
        }
        maker.redraw();
    }
}
//код тестирования

maker.redraw();
//presentation.redraw();
// подключение событий
maker.canvas.onmouseleave = handlerMouseup;
maker.canvas.onmousemove = handlerMousemove;
maker.canvas.onmousedown = handlerMousedown;
maker.canvas.onmouseup = handlerMouseup;
addEventListener("keydown", handlerDelete);

//логотипы
getLogo(new Table(document.getElementById('table').getContext('2d')),100,70);
getLogo(new RoundedTable(document.getElementById('roundedtable').getContext('2d')),70,70);
getLogo(new Chair(document.getElementById('chair').getContext('2d')),70,70);
//события меню

document.getElementById('table_item').onclick= function (){maker.addSubject(new Table(maker.ctx));};
document.getElementById('roundedtable_item').onclick= function (){maker.addSubject(new RoundedTable(maker.ctx));};
document.getElementById('chair_item').onclick= function (){maker.addSubject(new Chair(maker.ctx));};



