(function() {

    window.onload = init;

    var startButton;
    var ranges = [];
    var numWorkers;
    let key = "workerResult";

    function init() {
    	startButton = document.getElementById("startButton");
    	startButton.onclick = sendDataToWorkers;
        window.localStorage.clear();
    }

    // Complete the following code

    // Handle messages received from the Web Worker
    function handleReceipt(event) {
        // find range index and add it to data
        var idx = ranges.indexOf(event.data.start);
        var newData = {index: idx, ...event.data};
        // get ul to put recieved data to
        var items = document.getElementById("items");
        var newElement = document.createElement("li");
        newElement.innerHTML = JSON.stringify(newData);
        items.appendChild(newElement);
        // update result data
        var currentResult = parseInt(document.getElementById("sum").textContent);
        currentResult += event.data.result;
        document.getElementById("sum").textContent = currentResult;
        let result = JSON.parse(window.localStorage.getItem(key));

        if(result){
            result.push(newData);
        }
        else{
            result = [newData];
        }
        window.localStorage.setItem(key, JSON.stringify(result));
        addLocalStorageToDOM();
    }

    // Complete the following code

    // send messages to the Web Workers
    function sendDataToWorkers(e) {
        startButton.disabled = true;
        // get number of workers and range of data
        numWorkers = document.getElementById("numWorkers").value;
        var size = document.getElementById("range").value / numWorkers;
        var start, end;
        // create new workers and send them their range
        for(var i = 0; i < numWorkers; i++){
            start = i * size + 1;
            end = (i + 1) * size;
            ranges.push(start);

            var worker = new Worker("computeWorker.js");
            var data = {
                start: start,
                end: end
            }
            worker.postMessage(data);
            worker.addEventListener("message", handleReceipt, false);
        }
        

    }

    // Feel free to add any helper methods
    function addLocalStorageToDOM(){
        var storageItems = document.getElementById("storageItems");
        var newElement = document.createElement("li");
        // array to hold local storage values
        let worker_results = JSON.parse(window.localStorage.getItem(key));
        var localVals = new Array(worker_results.length).fill("");
        for(let result of worker_results){
            // if in local storage update localVals 
            localVals[result.index] = result;
        }
        
        // get correct ouptu form
        var localPrint = ""
        for( var j = 0; j < numWorkers; j++){
            if(localVals[j] == "" || localVals[j] == undefined){
                if(j < numWorkers - 1){
                    localPrint += ","
                }
            }
            else{
                localPrint += JSON.stringify(localVals[j]);
                if(j < numWorkers - 1){
                    localPrint += ","
                }
            }
        }

        newElement.innerHTML = localPrint;
        // add to DOM
        storageItems.appendChild(newElement);
    }

    

    

})();

























