const realInputBtn = document.getElementById ("real-input");
const customeBtn = document.getElementById ("custome_button");
const customText = document.getElementById ("custom-text");
pad =document.getElementById('pad')
signal = []
x_s = [0]
x_val = 0
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

document.getElementById('btn_1').addEventListener('click', function(){
    var xhr = new XMLHttpRequest();
    var JSON_sent = 'ana teb3t';
    xhr.open('POST', '/filter', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('success')
            console.log(JSON.parse(xhr.response))
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
                y: JSON.parse(xhr.response).map(function(x) { return x; }),
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
    document.getElementById('generate-sig').disabled = true;
    document.getElementById('import-sig').disabled = false;
})

document.getElementById('import-sig').addEventListener('click',function(){
    //document.getElementById('import-sig').disabled = true;
    document.getElementById('generate-sig').disabled = false;
    document.getElementById ("import-signal").click();

})
document.getElementById ("import-signal").addEventListener("change", function(){
    if (document.getElementById ("import-signal").value){
        document.getElementById('custom-text2').innerHTML=document.getElementById ("import-signal").value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        var xhr = new XMLHttpRequest();
        const formData = new FormData();
        const files = document.getElementById("import-signal");
        formData.append("imported-signal", files.files[0] );
        xhr.open('POST', '/importsignal', true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log('sucess import')
                    console.log(xhr.response)
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
