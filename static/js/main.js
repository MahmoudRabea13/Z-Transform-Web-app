let stage = 0 ;
let layer = 0;
let zeros = [] ;
let poles = [] ;
let flag = 0 ;
let pole_index = -1 ;
let zero_index = -1 ;

const realInputBtn = document.getElementById ("real-input");
const customeBtn = document.getElementById ("custome_button");
const customText = document.getElementById ("custom-text");
pad =document.getElementById('pad')
signal = []
x_s = [0]
x_val = 0
import1 = []
import2 = []
custome_button.addEventListener("click", function(){
    realInputBtn.click();
})

realInputBtn.addEventListener("change", function(){
    if (realInputBtn.value){
        customText.innerHTML=realInputBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    }
    else{
        customText.innerHTML="No file chosen"
    }
})

document.getElementById('btn_3').addEventListener("click", function(){
    location.href = "/catalog";
})

        

const gen = document.getElementById('pad');
gen.addEventListener("mousemove", (event) => {
    event.preventDefault();
    update_graph(event.clientX);
    var xhr = new XMLHttpRequest();
    var JSON_sent = {signal};
    xhr.open('POST', '/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(JSON_sent['signal'])
            console.log(JSON.parse(xhr.response))
            Plotly.newPlot('output-plot', [{
                x: x_s,
                y: JSON.parse(xhr.response),
               type: 'scatter'
            }]);
            
        } else {
            console.log(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(JSON_sent));
  });
function update_graph(x) {
    signal.push(x);
    x_val ++;
    x_s.push(x_val);
    if (x_s.length > 100) {
        x_s.shift();
        signal.shift();
    }
    Plotly.newPlot('live-plot', [{
        x: x_s,
        y: signal,
        type: 'scatter'
    }]);

}


document.getElementById('generate-sig').addEventListener('click',function(){
    /* document.getElementById('generate-sig').disabled = true; */
    document.getElementById('import-sig').disabled = false;

    document.getElementById('container').style.display = "flex";
})

document.getElementById('import-sig').addEventListener('click',function(){
    document.getElementById('generate-sig').disabled = false;
    document.getElementById ("import-signal").click();

})
document.getElementById ("import-signal").addEventListener("change", function(){
    if (document.getElementById ("import-signal").value){
        document.getElementById('custom-text2').innerHTML=document.getElementById ("import-signal").value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        document.getElementById('container').style.display = "none"   ;
        var xhr = new XMLHttpRequest();
        const formData = new FormData();
        const files = document.getElementById("import-signal");
        formData.append("imported-signal", files.files[0] );
        xhr.open('POST', '/importsignal', true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                     Plotly.newPlot('live-plot', [{
                        x: JSON.parse(xhr.response)['x'],
                        y: JSON.parse(xhr.response)['y'],
                        type: 'scatter'
                    }]);
                    Plotly.newPlot('output-plot', [{
                        x: JSON.parse(xhr.response)['x'],
                        y: JSON.parse(xhr.response)['y_new'],
                        type: 'scatter'
                    }]); 
            } else {
                console.log(xhr.response);
            }
        };
        xhr.send(formData);
    }
    else{
        document.getElementById('custom-text2').style.display= 'hidden';
    }
})

/* function honksh(){
    down=document.getElementById('pad');
    container = document.getElementById('container');
    divAbove = document.createElement("div");
    divAbove.id = "up";
    divAbove.style.backgroundColor  = "white";
    divAbove.style.width = "83%"
    divAbove.style.height = "300px"
    divAbove.innerHTML = "hehe"

    container.insertBefore(divAbove, down);
} */
//////////////////////////////////////////////////////////////////////

// Create the stage and a layer to draw on.
//konvaInit('canvas-container');
konvaInit('magplot');

//stageArray[0].on("click", function() { click(0); } );
stage.on("mousedown", function() { mousedownHandler(); });
stage.on("mouseup", function() { mouseupHandler(); });

function click(x)
{
    if(flag === 0)
    {
        createZero();
    }
    else if (flag === 1)
    {
        createPole();
    }
    draw();
}

function mousedownHandler()
{
    xOld = stage.getPointerPosition().x;

    yOld = stage.getPointerPosition().y;

    if (flag === 1)
    {
        poles.map((element, index) => {
            if ( (Math.abs(element.x - xOld) < 6) && (Math.abs(element.y - yOld) < 6 ) )
            {
                pole_index = index;
            }
        }
        )
    }
    else
    {
        zeros.map((element, index) => {
            if ( (Math.abs(element.x - xOld) < 4) && (Math.abs(element.y - yOld) < 4 ) )
            {
                zero_index = index;
            }
        }
        )
    }
}

function mouseupHandler()
{
    if(flag === 0)
    {
        createZero();
    }
    else if (flag === 1)
    {
        createPole();
    }
    draw();
    var xhr = new XMLHttpRequest();
    var JSON_sent = {zeros,poles};
    xhr.open('POST', '/filter', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('success')
            console.log(JSON_sent['zeros'])
            //console.log(JSON.parse(xhr.response))
              Plotly.newPlot('mag-plot', [{
                x: JSON.parse(xhr.response)['frequency'],
                y: JSON.parse(xhr.response)['magnitude'],
                type: 'scatter',
            }]);  
            Plotly.newPlot('phase-plot', [{
                x: JSON.parse(xhr.response)['frequency'],
                y: JSON.parse(xhr.response)['phase'],
                type: 'scatter'
            }]);   
        } else {
            console.log(xhr.responseText);
        }
        };
        xhr.send(JSON.stringify(JSON_sent));
}

function konvaInit(container)
{
    stage = new Konva.Stage({
        container: container,
        width: 300,
        height: 300,
        background: 'white',
    });
    var Yaxis = new Konva.Line({
        points: [150, 0, 150,300],
        stroke: 'red',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round',
    });
    var Xaxis = new Konva.Line({
        points: [0, 150, 300, 150],
        stroke: 'red',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round',
    });
    var unitCircle = new Konva.Circle({
        x: 150,
        y: 150,
        radius: 140,
        stroke: 'red',
        strokeWidth: 1,
      });
    layer = new Konva.Layer();
    stage.add(layer);
    layer.add(Yaxis);
    layer.add(Xaxis);
    layer.add(unitCircle);
    stage.draw();
}

function createZero()
{
    xstart = stage.getPointerPosition().x;
    ystart = stage.getPointerPosition().y;
    var zero = new Konva.Circle({
        x: xstart,
        y: ystart,
        radius: 4,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 1,
        draggable: true,
      });
    if (zero_index === -1 )
    {
         zeros.push({x : ((xstart-150)/140) , y : ((150-ystart)/140) , zeroo: zero });
    }
   else
   {
       console.log(zeros);
       console.log(xstart);
       console.log(ystart);
       (zeros[zero_index].zeroo).destroy();
       zeros[zero_index] = {x : ((xstart-150)/140) , y : ((150-ystart)/140) , zeroo: zero };
       //zero_index = -1;
   }
}

function createPole()
{
    xstart = stage.getPointerPosition().x;
    ystart = stage.getPointerPosition().y;
    var pole = new Konva.Line({
        points: [xstart , ystart , xstart +6 , ystart +6 , xstart +3 , ystart +3 , xstart , ystart +6 , xstart +6, ystart],
        stroke: 'black',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round',
        draggable: true,
    });
    if ( pole_index === -1)
    {
        poles.push({x : ((xstart-150)/140) , y : ((150-ystart)/140) , pole: pole });
    }
    else
    {
        console.log(xstart);
        console.log(ystart);
        console.log(pole_index);
        (poles[pole_index].pole).destroy();
        poles[pole_index] = {x : ((xstart-150)/140) , y : ((150-ystart)/140) , pole: pole };
        //pole_index = -1;
    }
    //console.log(poles);
}

function draw()
{
    for (let i = 0; i < poles.length; i++){
        layer.add(poles[i].pole);
    }
    for (let m = 0; m < zeros.length; m++){
        layer.add(zeros[m].zeroo);
    }
    layer.draw();
}

function zeroFlag()
{
    flag = 0;
}

function poleFlag()
{
    flag = 1;
}

function Cut()
{
    flag = 2;
    console.log(pole_index)
    console.log(poles)
    console.log(zero_index)
    console.log(zeros)
}

var container = stage.container();
// make it focusable
container.tabIndex = 1;
// focus it
// also stage will be in focus on its click
container.focus();
container.addEventListener('keydown', function (e) {
    if (e.keyCode === 46)
    {
        console.log(pole_index);
        if (pole_index !== -1 )
        {
            (poles[pole_index].pole).destroy();
            poles.splice(pole_index,1);
        }
        if (zero_index !== -1)
        {
            (zeros[zero_index].zeroo).destroy();
            zeros.splice(zero_index,1);
        }
        pole_index = -1;
        zero_index = -1;
    }
    else
    {
        zero_index = -1;
        pole_index = -1;
        return;
    }
    e.preventDefault();
});
