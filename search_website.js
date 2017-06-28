var data;
$(document).ready(function(){  
  //attempts to make the initial page of featured streams on twitch
  //does not work with the current infrastructure
  var featured = "https://api.twitch.tv/kraken/streams/featured"
  document.getElementById("resultTitle").innerHTML = "Featured Streams";
  ajaxCall(featured, initialView);

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
	document.getElementById("resultTitle").innerHTML = "Search: "+search;
	ajaxCall(url, display);
  }else{
    document.getElementById("test").innerHTML += "Not A Valid Search";
  }
}

//calls the API and asks for streams using the search keywords
function ajaxCall(url, Smethod){
	if(data){
		//cleans out the previous results, navigation buttons and the count of results
	  clean(document.getElementById("results"));
	  clean(document.getElementById("navigation"));
	  clean(document.getElementById("count"));
	}
	$.ajax({
      dataType: "json",
      url: url,
      headers: {
        'Client-ID': 'jepst37dcox2l4wdxyyjcinjup9ods'
      },
      success: Smethod,
      fail: error
    });
}

//diplays the view at initial loading of webpage
function initialView(result){
	data = result;
  for(var i=0; i<data.featured.length; i++){
	var stream = data.featured[i].stream;
	var row = dataPrep(stream);
    document.getElementById("results").appendChild(row);
  }
}

//displays the results of the search
function display(result){
  data = result;
  $("#count").innerHTML += "Total Results: "+data._total;
  setUpNav(data._links);
  for(var i=0; i<data.streams.length; i++){
	//creates the box for the result information to be held in
	var stream = data.streams[i];
	var row = dataPrep(stream);
    document.getElementById("results").appendChild(row);
  }
}

//sets up the buttons to go to the next or previous set of 10
function setUpNav(links){
  //links to previous set of results
  if(links.prev){
	var prev = document.createElement("button");
	var text = document.createTextNode("Prev");
	prev.appendChild(text);
	prev.onclick = function(){ajaxCall(links.prev, display);};
	document.getElementById("navigation").appendChild(prev);
  }
  //links to next set of results
  if(links.next){
	var next = document.createElement("button");
	var text = document.createTextNode("Next");
	next.appendChild(text);
	next.onclick = function(){ajaxCall(links.next, display)};
	document.getElementById("navigation").appendChild(next);
  }
}

//adds all of the data to a row element
function dataPrep(stream){
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
	return row;
    $("#results").append(row);
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

//TODO: will format numbers
function formatNumbers(num){
	//will format the number provided with , for easy reading of large numbers
	return format;
}
