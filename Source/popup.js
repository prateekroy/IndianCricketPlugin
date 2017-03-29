document.addEventListener('DOMContentLoaded', function() {
	
	var cricAPIKey = "";
	var title = "";
	var theUrl = "https://cricapi.com/api/cricket?apikey="  + cricAPIKey;
	
	httpGetAsync(theUrl, function(matchdata){
			matchdata.data.forEach(function(md) {
			console.log(md.description + " - to grab more details, simply use the unique_id " + md.unique_id + " with the cricketScore api!");
			if(md.title.includes("India")){
					title += "<div>" + md.title + "</div>";
					scoreURL = "http://cricapi.com/api/cricketScore?unique_id=" + md.unique_id + "&&apikey=" + cricAPIKey; 
					httpGetAsync(scoreURL, function(scoreData){
							console.log(scoreData.score);
							title += "<div>" + scoreData.score + "</div>";
							document.getElementById('result').innerHTML = title;
					});
			}
		});
		
		if(title == ""){
			title = "Tune in later!";
		}
		
		document.getElementById('result').innerHTML = title;
	});

}, false);

document.addEventListener('click', function() {
		var newURL = "http://www.cricbuzz.com/";
		chrome.tabs.create({ url: newURL });
}, false);

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}