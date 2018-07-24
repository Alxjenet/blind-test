$(document).ready(function(){	


	$.getJSON('config.json', function (data) {
	
		// Score
		var team1 = 0,
			team2 = 0,
			team3 = 0,
			team4 = 0,
			nbrrtheme = 7;
			
		for(var o = 0; o < data.length; o++){ 
			var theme = JSON.parse(localStorage.getItem("theme-" + (o + 1)));
			for(var e = 0; e < Object.keys(data[o]['music']).length; e++){
				team1 += theme[e + 1]['1'];
				team2 += theme[e + 1]['2'];
				team3 += theme[e + 1]['3'];
				team4 += theme[e + 1]['4'];						
			}
		}
		$('#score-team1').siblings('.score-result').html(team1 + 'pts');
		$('#score-team2').siblings('.score-result').html(team2 + 'pts');
		$('#score-team3').siblings('.score-result').html(team3 + 'pts');
		$('#score-team4').siblings('.score-result').html(team4 + 'pts');	
	});		
});
