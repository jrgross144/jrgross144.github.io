var data;

function execSearch(){
  
  var search = document.getElementById("search").value;
  if(search){
	
    var url = "https://api.twitch.tv/kraken/search/streams?q="+search;
	ajaxCall(url);
  }else{
    document.getElementById("test").innerHTML += "Not A Valid Search";
  }
}

function ajaxCall(url){
	if(data){
	  clean(document.getElementById("results"));
	  clean(document.getElementById("navigation"));
	  clean(document.getElementById("count"));
	}
	$.ajax({
      dataType: "json",
      url: url,
      success: display,
      fail: error
    });
}

//displays the results of the search
function display(result){
  data = result;
  document.getElementById("count").innerHTML += "Total Results: "+data._total;
  setUpNav(data._links);
  for(var i=0; i<data.streams.length; i++){
	var stream = data.streams[i];
	var row = document.createElement("tr");
	var elem = document.createElement("td");
	elem.innerHTML += "<br><br><h2>"+stream.channel.game+"</h2>"
	
	var img = document.createElement("img");
	img.src = stream.preview.medium;
	elem.appendChild(img);
	
	elem.innerHTML += "<br>"+stream.channel.status+"<br>";
	
	var link = document.createElement("a");
	link.href = stream.channel.url;
	link.text = stream.channel.display_name;
	elem.appendChild(link);
	
	elem.innerHTML += "<br>Views: "+stream.channel.views+"<br>Followers: "+stream.channel.followers;
	row.appendChild(elem);
    document.getElementById("results").appendChild(row);
  }
}

//sets up the buttons to go to the next or previous set of 10
function setUpNav(links){
  if(links.prev){
	var prev = document.createElement("button");
	var text = document.createTextNode("Prev");
	prev.appendChild(text);
	prev.onclick = function(){ajaxCall(links.prev);};
	document.getElementById("navigation").appendChild(prev);
  }
  if(links.next){
	var next = document.createElement("button");
	var text = document.createTextNode("Next");
	next.appendChild(text);
	next.onclick = function(){ajaxCall(links.next)};
	document.getElementById("navigation").appendChild(next);
  }
}

//gets called if the api call does not work
function error(result){
  document.getElementById("test").innerHTML += "failed";
}

//cleans out child elements
function clean(elem){
	var temp = elem;
	  while (temp.firstChild) {
        temp.removeChild(temp.firstChild);
	  }
}
