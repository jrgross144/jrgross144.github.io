var data;
$(document).ready(function(){
	//checks if the enter key is pressed in the text box to execute search
	$("#search").keyup(function(event){
	  if(event.keyCode==13){
		  $("#srchbtn").click();
	  }
  }
  );
});
  

//formats the url for the ajax call based on the search parameters provided by the user
function execSearch(){
  
  var search = $("#search").val();
  if(search){
	
    var url = "https://api.twitch.tv/kraken/search/streams?q="+search;
	ajaxCall(url);
  }else{
    document.getElementById("test").innerHTML += "Not A Valid Search";
  }
}

//calls the API and asks for streams using the search keywords
function ajaxCall(url){
	if(data){
		//cleans out the previous results, navigation buttons and the count of results
	  clean($("#results"));
	  clean($("#navigation"));
	  clean($("#count"));
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
  $("#count").innerHTML += "Total Results: "+data._total;
  setUpNav(data._links);
  for(var i=0; i<data.streams.length; i++){
	//creates the box for the result information to be held in
	var stream = data.streams[i];
	var row = document.createElement("tr");
	var elem = document.createElement("td");
	elem.innerHTML += "<br><br><h2>"+stream.channel.game+"</h2>"
	
	//adds the image of the stream and makes it a link to the stream
	var imgLink = document.createElement("a");
	imgLink.href = stream.channel.url;
	var img = document.createElement("img");
	img.src = stream.preview.medium;
	imgLink.appendChild(img);
	elem.appendChild(imgLink);
	
	elem.innerHTML += "<br>"+stream.channel.status+"<br>";
	
	//makes the streamer's name the link to the stream
	var link = document.createElement("a");
	link.href = stream.channel.url;
	link.text = stream.channel.display_name;
	elem.appendChild(link);
	
	elem.innerHTML += "<br>Views: "+stream.channel.views+"<br>Followers: "+stream.channel.followers;
	row.appendChild(elem);
    $("#results").append(row);
  }
}

//sets up the buttons to go to the next or previous set of 10
function setUpNav(links){
  if(links.prev){
	var prev = document.createElement("button");
	var text = document.createTextNode("Prev");
	prev.appendChild(text);
	prev.onclick = function(){ajaxCall(links.prev);};
	$("#navigation").append(prev);
  }
  if(links.next){
	var next = document.createElement("button");
	var text = document.createTextNode("Next");
	next.appendChild(text);
	next.onclick = function(){ajaxCall(links.next)};
	$("#navigation").append(next);
  }
}

//gets called if the api call does not work
function error(result){
  $("#test").innerHTML += "failed";
}

//cleans out child elements
function clean(elem){
	var temp = elem;
	  while (temp.firstChild) {
        temp.removeChild(temp.firstChild);
	  }
}

function formatNumbers(num){
	//will format the number provided with , for easy reading of large numbers
	return format;
}
