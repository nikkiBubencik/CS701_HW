(function() {

    window.onload = init;

    var senators = [];
    const senators_key = "senators_bubencik";
    var xhr;
    var message;
    var members;
    var republicanTarget, democratTarget;

    function init() {
        members = document.getElementById("members");
        message = document.getElementById("msg");

        republicanTarget = document.getElementById("republicans");
        democratTarget = document.getElementById("democrats");

        democratTarget.ondragenter = dragEnterDemocratsHandler;
        democratTarget.ondrop = dropDemocratsHandler;
        democratTarget.ondragleave = dragLeave;
        democratTarget.ondragover = dragOver;

        republicanTarget.ondragenter = dragEnterRepublicansHandler;
        republicanTarget.ondrop = dropRepublicansHandler;
        republicanTarget.ondragover = dragOver;
        republicanTarget.ondragleave = dragLeave;

        // get from local storage or ajax
        var storageValue = window.localStorage.getItem(senators_key)
        if(storageValue != undefined){
            senators = JSON.parse(storageValue);
            message.innerHTML = "From Local Storage loaded " + senators.length + " senators";
            renderSenators();
        }
        else{
            senators = new Array();
            makeRequest("partyList.xml");
        }
    }

    function makeRequest(url){
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest;
        }
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if(xhr){
            xhr.onreadystatechange = loadSenatorsFromXML;
            xhr.open("GET", url, true);
            xhr.send(null);
        }
    }

    function loadSenatorsFromXML() {
        if(xhr.readyState == 4){
            if (xhr.status === 200) {
                // add xml data into array
                var allSenators = xhr.responseXML.getElementsByTagName("senator");
                for(var i = 0; i < allSenators.length; i++){
                    var name = allSenators[i].getElementsByTagName("name")[0].textContent;
                    var party = allSenators[i].getElementsByTagName("party")[0].textContent;
                    
                    var newSenator = {
                        name: name,
                        party: party,
                        voted: false
                    };
                    senators.push(newSenator);
                }
                message.innerHTML = "From AJAX loaded " + senators.length + " senators";
                // add to local storage 
                window.localStorage.setItem(senators_key, JSON.stringify(senators));
                renderSenators();
            }
        }
    }

    function renderSenators(){
        
        members.innerHTML = "";
        
        //for each unvoted senator add to main list otherwise add to party drop zone
        senators.forEach((senator, index) => {
            if(senator.voted == false){
                addToMainList(senator);
            }
            else{
                addToPartyList(senator);
            }
        });
    }

    function addToMainList(senator){
        // create new element for unvoted senator
        var newElement = document.createElement('li');
        newElement.innerHTML = senator.name;
        newElement.classList.add(senator.party);
        newElement.draggable = true;
        // drag events
        newElement.ondragstart = dragStartHandler;
        newElement.onDrag = dragHandler;
        newElement.ondragend = dragEndHandler;
        
        newElement.id = senator.name;
        newElement.data = senator.party;
        newElement.name = senator.name;
        // add to DOM
        members.appendChild(newElement);
    }

    function addToPartyList(senator){
        // create new voted senator
        var newElement = document.createElement('li');
        newElement.innerHTML = senator.name;
        newElement.id = senator.name;
        // add to their party's drop zone
        if(senator.party === "Democrat"){
            document.getElementById("democrats").appendChild(newElement);
        }
        else{
            document.getElementById("republicans").appendChild(newElement);
        }
    }

    function dragStartHandler(e) {
        // set drag data
        e.dataTransfer.setData("Text", e.target.id);
        e.dataTransfer.setData("Party", e.target.data);

        message.innerHTML = "Drop over the respective target";
        e.target.classList.add("dragged");
    }

    function dragEndHandler(e) {
        var elems = document.getElementsByClassName("dragged");
        for(var i = 0; i < elems.length; i++){
            elems[i].classList.remove("dragged");
        }
        
    }

    function dragHandler(e) {
        message.innerHTML = "Dragging " + e.target.innerHTML;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnterDemocratsHandler(e) {
        e.preventDefault();
    }

    function dropDemocratsHandler(e) {
        e.preventDefault();
        // get sentaor's party
        var sourceParty = e.dataTransfer.getData("Party");
        // if democrat add to drop zone
        if(sourceParty ==  "Democrat"){
            var sourceID = e.dataTransfer.getData("Text");
            var sourceElement = document.getElementById(sourceID);
            var newElement = sourceElement.cloneNode(true);
            newElement.classList = [];
            democratTarget.appendChild(newElement);
            members.removeChild(sourceElement);
            updateLocalStorage(sourceID);
        }
        else{ // otherwise don't accept
            message.innerHTML = "Wrong Party";
            console.log("wrong party");
        }
    }
    function updateLocalStorage(senatorName){
        // add to local storage that a senator has voted
        senators.forEach((senator) => {
            if(senatorName === senator.name){
                senator.voted = true;
            }
        });
        window.localStorage.setItem(senators_key, JSON.stringify(senators));
    }

    function dragEnterRepublicansHandler(e) {
        e.preventDefault();
    }
    


    function dropRepublicansHandler(e) {
        e.preventDefault();
        // get senator's party
        var sourceParty = e.dataTransfer.getData("Party");
        // if republican add to drop zone
        if(sourceParty ==  "Republican"){
            var sourceID = e.dataTransfer.getData("Text");
            var sourceElement = document.getElementById(sourceID);
            var newElement = sourceElement.cloneNode(true);
            newElement.classList = [];
            republicanTarget.appendChild(newElement);
            members.removeChild(sourceElement);
            updateLocalStorage(sourceID);
        }
        else{ // otherwise don't accept it
            message.innerHTML = "Wrong Party";
            console.log("wrong party");
        }
    }

    function dragLeave(e) {
        e.preventDefault();
        message.innerHTML = "Drop over the respective target";
    }
   

})();

   