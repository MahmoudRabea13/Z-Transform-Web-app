document.getElementById('btn_4').addEventListener("click", function(){
    location.href = "/";
});
document.getElementById('submit-all-pass').addEventListener('click', function(e){
    e.preventDefault();
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
            node.appendChild(document.createTextNode(JSON.parse(xhr.response)));
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
    var xhr = new XMLHttpRequest();
    var JSON_sent = document.getElementById('all-pass').value;
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
            }]) 
        }};  
    xhr.send(JSON.stringify(JSON_sent));
});
