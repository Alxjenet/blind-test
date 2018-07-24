<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width; initial-scale=1.5; user-scalable=no;">
		<title>Blind Test</title>

		<link rel="stylesheet" href="css/not.the.skin.css">
		<link rel="stylesheet" href="css/circle.player.css">
		<link rel="stylesheet" href="css/style.css">

		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="js/jquery.fullscreen-min.js"></script>
		<script type="text/javascript" src="js/jquery.transform2d.js"></script>
		<script type="text/javascript" src="js/jquery.grab.js"></script>
		<script type="text/javascript" src="js/jquery.jplayer.js"></script>
		<script type="text/javascript" src="js/mod.csstransforms.min.js"></script>
		<script type="text/javascript" src="js/circle.player.js"></script>
		<script type="text/javascript" src="js/script.js"></script>		
	</head>
	<body>

		<span id="btn-fullscreen">Afficher en plein écran ?</span>
		<div id="container">

			<div id="control-theme">
				<div id="prev" class="slide" data-slide="prev">
					<img src="images/prev.png" />
				</div>
				<div id="next" class="slide" data-slide="next">
					<img src="images/next.png" />					
				</div>
				<div id="score">
					<img src="images/score.png" />					
				</div>
			</div>
			<div id="title">Thème</div>
			<div id="theme"></div>
			<div id="expected"></div>
			<div id="answer">Sélectionnez une chanson !</div>
			<div id="team-group">
				<span id="team1" data-team="1"></span>
				<span id="team2" data-team="2"></span>
				<span id="team3" data-team="3"></span>
				<span id="team4" data-team="4"></span>
			</div>
		</div>
		<div id="container-footer-wrapper">
			<div id="container-footer">
				<div id="jquery_jplayer_container"></div>
				<div id="group-players">
					<table class="prototype-wrapper">
						<tr></tr>
					</table>
				</div>
				<div id="footer"></div>
			</div>
		</div>
	</body>
</html>
