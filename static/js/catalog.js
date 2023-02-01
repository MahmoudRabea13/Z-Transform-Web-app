document.getElementById('btn_4').addEventListener("click", function(){
    //location.href = "/";
    //a =localStorage.getItem('content');
    document.getElementById('cat').style.display = 'none';
    document.getElementById('first-page').style.display = 'block';
    console.log('suceesss')
    
});
document.getElementById('submit-all-pass').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('apply-all-pass').disabled = false;
    console.log(document.getElementById('all-pass').value)
    var xhr = new XMLHttpRequest();
    var JSON_sent = document.getElementById('all-pass').value;
    xhr.open('POST', '/allpass', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('success')
            console.log(JSON.parse(xhr.response))
            var node = document.createElement('li');
            node.appendChild(document.createTextNode(document.getElementById('all-pass').value));
            document.getElementById('list').appendChild(node)
          Plotly.newPlot('submitpassplot', [{
                x:JSON.parse(xhr.response)['frequency'] ,
                y:JSON.parse(xhr.response)['phase']  ,
                type: 'scatter',
            }]) 
        }

        };  
    xhr.send(JSON.stringify(JSON_sent));
});


document.getElementById('apply-all-pass').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('apply-all-pass').disabled = true;
    var xhr = new XMLHttpRequest();
    deletedlist =document.getElementById('list').innerText;
    list =document.getElementById('list').innerText
    values =document.getElementById('all-pass').value
    var JSON_sent = {values,list,deletedlist};
    xhr.open('POST', '/applyallpass', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('success')
            console.log(JSON.parse(xhr.response))
             Plotly.newPlot('applypassplot', [{
                x:JSON.parse(xhr.response)['frequency'] ,
                y:JSON.parse(xhr.response)['phase']  ,
                type: 'scatter',
            }]);
            Plotly.newPlot('mag-plot', [{
            width: 300,
            height: 300,
            x: JSON.parse(xhr.response)['frequency'],
            y: JSON.parse(xhr.response)['magnitude'],
            type: 'scatter',
            }]); 
            Plotly.newPlot('phase-plot', [{
            width: 300,
            height: 300,
            x: JSON.parse(xhr.response)['frequency'],
            y: JSON.parse(xhr.response)['phase'],
            type: 'scatter'
            }]); 
        }};  
    xhr.send(JSON.stringify(JSON_sent));
});

document.getElementById('list').addEventListener('click',function(e){
    list =document.getElementById('list').innerText;
    this.removeChild(e.target);
    var xhr = new XMLHttpRequest();
    deletedlist =document.getElementById('list').innerText;
    document.getElementById('deleted-list').addEventListener('click',function(e){
        e.preventDefault();
        document.getElementById('deleted-list').click();
    })
    console.log('deleted')
    var JSON_sent = {values,list,deletedlist};
    xhr.open('POST', '/applyallpass', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('success')
/*              Plotly.newPlot('applypassplot', [{
                x:JSON.parse(xhr.response)['frequency'] ,
                y:JSON.parse(xhr.response)['phase']  ,
                type: 'scatter',
            }]);
            Plotly.newPlot('mag-plot', [{
            width: 300,
            height: 300,
            x: JSON.parse(xhr.response)['frequency'],
            y: JSON.parse(xhr.response)['magnitude'],
            type: 'scatter',
            }]); 
            Plotly.newPlot('phase-plot', [{
            width: 300,
            height: 300,
            x: JSON.parse(xhr.response)['frequency'],
            y: JSON.parse(xhr.response)['phase'],
            type: 'scatter'
            }]);  */
        }};  
    xhr.send(JSON.stringify(JSON_sent));
    console.log('sent successfully')
})

