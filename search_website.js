var data;

function execSearch(){
  
  var search = document.getElementById("search").value;
  if(search){
	if(data){
	  var temp = document.getElementById("results");
	  while (temp.firstChild) {
        temp.removeChild(temp.firstChild);
	  }
	}
	$.ajax({
      dataType: "json",
      url: "https://api.twitch.tv/kraken/search/streams?q="+search,
      success: display,
      fail: error
    });
  }else{
    document.getElementById("test").innerHTML += "Not A Valid Search";
  }
}
function display(result){
  data = result;
  document.getElementById("count").innerHTML += data._total;
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
function error(result){
  document.getElementById("test").innerHTML += "failed";
}

