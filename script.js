//when user click to the more function button, the advance (super) buttons will show up, there  is a class .hidden that has display:none. When clicked, if the more-function-button has the text "more function" then remove the .hidden class to show the superbuttons, white at the same time change the text to "less function", if not , that means the butotn is saying less function then when clicked make it say more function while add the .hidden to remove the thing

const superbutton = document.getElementById('superbutton');
const moreFunctionButton=document.getElementById('more-function-button');
moreFunctionButton.addEventListener('click',function(){
	if(
		this.textContent=='more function'
	){ 
		superbutton.classList.add('show');
		this.textContent='less function';
	} else {
		superbutton.classList.remove('show');
		this.textContent='more function'
	}
});


// Alert boxes
document.getElementById('ptb2').addEventListener('click',function(){
	alert('Phương trình bậc 2 một ẩn có dạng ax²+bx+c=0. Nhập a,b,c rồi đóng ngoặc. Cuối cùng nhấn dấu bằng để xem nghiệm');
})




//line1 is the operation and line1 is the result
let line1 = document.getElementById('line1');
let line2 = document.getElementById('line2');




// buttons whose name is also what should be displayed on screen

//create a array of elements with the class "straightforward"
const straightforward = document.getElementsByClassName('straightforward');
//loop through the array and add event listener to each item
for (let x of straightforward){
	x.addEventListener('click',function(){
		//each time someone click to the button the line1 display the content of the button
	  	line1.textContent += x.textContent;
  });
}


//buttons whose name isnt what should be displayed on screen

const trigonometric = document.getElementsByClassName('trigonometric');
for (let x of trigonometric){
		x.addEventListener('click',function(){
			line1.textContent += x.textContent+'(';
		});
}

//the product button
document.getElementById('buttonx').addEventListener('click',product);
function product(){
	line1.textContent+='*';
}
//delete button
document.getElementById("buttondel").addEventListener('click',del);
function del(){
	line1.textContent = line1.textContent.slice(0,-1);
}
// AC button
document.getElementById('buttonac').addEventListener('click',ac);
function ac(){
	line1.textContent='';
	line2.textContent='0';
}

// some special functions that isnt available in Math object so we have to write it by ourselves
// generate random number
function ran(){
	return Math.floor(Math.random()*1000);
};
// factorial
function factorial(x){
	if (x>=0){ 
	let theFact=1;
	for (let i=x;i>0;i--){
		theFact*=i;
	}
	return theFact;
	}
	else {
		return "non-negative required";
	}
}

// function Giải phương trình bậc 2 một ẩn
function ptb2(a,b,c){
	let delta = b*b - 4*a*c;
	if (	
		delta<0
	){
		return "vo nghiem";
	}else if(
		delta==0
	){
		let nghiem = (0-b)/(2*a) ;
		return nghiem;
	}else if(
		delta >0
	){
		let nghiem1 = ((0-b)+Math.sqrt(delta))/(2*a);
		let nghiem2 = ((0-b)-Math.sqrt(delta))/(2*a);
		
		return nghiem1 +' va '+nghiem2;
	}
	
}

// a variable to store what there is in line 1 (the math expression that user types) 
let y;


//when user click the equal button
document.getElementById('buttonequal').addEventListener('click',compute);
function compute(){
	// save the content of line1 to y, this cant be done outside of the scope. If so, y will always be blank
	y= line1.textContent;
	
	// test if the string contains anything that need converted then convert it to javascript language

	if( 
		/√/.test(y)			
	){ 
		y=y.replace(/√([0-9.\(\)]+)/g,'Math.sqrt($1)');
	}
	
	if(
		/^/.test(y) 
	){
		y=y.replace(/\^/g,'**');
	}

	if(
		/π/.test(y)
	){
		y=y.replace(/\π/g,"Math.PI");
	}

	if(
		/(cos|sin|tan|log)/g.test(y)
	){
		y=y.replace(/(sin|cos|tan|log)/g,"Math.$1");
	}
	if(
		/\%/g.test(y)
	){
		y=y.replace(/\%/g,"/100");
	}
	if(
		/E/g.test(y)
	){
		y=y.replace(/E/g,"Math.E");
	}
	if(
		/\!/g.test(y)
	){
		y=y.replace(/\!([0-9\-]+)/g, 'factorial($1)');
	}
	if(
		/ran/.test(y)
	){
		y=y.replace(/ran/g,'ran()');
	}
	/* if (
		/(?<![\.\d])0+/.test(y)
	){
		y=y.replace(/(?<![\.\d])0+/g,'');
	} */
	//return the result onto the line2
	//use try catch to display an error notification
	try{ 	
		if (
			typeof eval(y) === 'number' || eval(y)=='non-negative required' || /va/.test(eval(y)) 
		   ){
			line2.textContent = eval(y);
		} else {
			line2.textContent = 'syntax error';
			} 		
		
	}catch(err){
		line2.textContent='syntax error';
	}

}


