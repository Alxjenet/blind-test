$(document).ready(function(){

//localStorage.clear();	
	var fullScreen = false,
		windowloc = window.location.search.substring(1),
		page = windowloc.split("=");
		
	$("#btn-fullscreen").hide();
	
	if (
		document.fullscreenElement ||
		document.webkitFullscreenElement ||
		document.mozFullScreenElement ||
		document.msFullscreenElement) {
			$("#btn-fullscreen").hide();
	}else {
		$("#btn-fullscreen").show();
	}
	$("#btn-fullscreen").on('click', function(){
		fullScreen = true;
		$(document).fullScreen(true);
	});
	
	$(document).bind("fullscreenchange", function(e) {
		if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
			$("#btn-fullscreen").hide();
		}else {
			$("#btn-fullscreen").show();
		}
	});

	if(window.location.hash.split('#')[1] == 'score'){
			$.ajax({
		        type: "GET",
		        url: "score.htm",
		        context: document.body,
		        success: function(s){
		            $(this).html(s);
		            $('#container-score').fadeIn(300);
		        }
		    });
		}  else { 

	if(window.location.hash.split('#')[1] === undefined){
		window.location.hash = 1;
		page[1] = 0;
	} else {
		page[1] = window.location.hash.split('#')[1] - 1;
	}

	$('#container-footer').css({'opacity':'0','margin-top':'100px'});
	$('#container').css({'opacity':'0','margin-left':'+100px'});

    // Changely of theme
    $(".slide").on('click', function(){
        var go,to,
            pageId = Number(window.location.hash.split('#')[1]);

        if($(this).attr('data-slide') == 'next'){
            go = '-';
            to = '+';
           window.location.hash = pageId + 1;
        } else {
            go = '+';
            to = '-';
            window.location.hash = pageId - 1;
        }

        $('#container-footer').animate({'opacity':'0', 'margin-top':'100px'},400);
        $('#container').animate({'opacity':'0', 'margin-left': go + '100px'},300, function(){        
        $.ajax({
            type: "GET",
            url: "index.htm",
            context: document.body,
            success: function(s){
                $(this).html(s);
                $('#container-footer').css({'margin-top':'300px'}).animate({'opacity':'1', 'margin-top':'0px'},300);
                $('#container').css({'margin-left': to +'300px'}).animate({'opacity':'1','margin-left':'0px'},300);
            }
        });
        });
    });

	$.getJSON('config.json', function (data) {
		$('#container-footer').animate({'opacity':'1', 'margin-top':'0px'},400);
		$('#container').animate({'opacity':'1','margin-left':'0px'},300);
	
		if(Object.keys(data).length <= window.location.hash.split('#')[1]){
			$("#next").hide();
			$("#score").show();
		}
		if(1 == window.location.hash.split('#')[1]){
			$("#prev").hide();
		}
		
		var dataTheme = data[page[1]],
			nbr = Object.keys(dataTheme['music']).length;
			
		$('#theme').html(dataTheme['theme']);
		$('#expected').html('Donnez <strong>' + dataTheme['expected'] + '</strong>');
		
		// Store
		if(localStorage.getItem("theme-" + (page[1] + 1)) == null){
			localStorage.setItem("theme-" + (page[1] + 1), JSON.stringify({}));
		}
		
		var objectTrack = JSON.parse(localStorage.getItem("theme-" + (page[1] + 1)));
		
		for(var i = 1; i <= nbr; i++){
			if(objectTrack[i] == null){
				objectTrack[i] = {'1': 0, '2': 0, '3': 0, '4': 0 };
			}
			$('#jquery_jplayer_container').append('<div id="jquery_jplayer_'+i+'" class="cp-jplayer"></div>');	
			$('.prototype-wrapper tr').append('<td align="center" id="cp_container_'+i+'" class="cp-container" data-index="'+i+'" style="margin:0 0;">' +
				'<h1 style="z-index:1;color: rgb(255, 255, 255); font-weight: 500; font-size: 29px; text-align: center; position: absolute; width: 50px; margin-top: 45px; left:34px;">'+i+'</h1>' +
				'<div class="cp-buffer-holder">' +
					'<div class="cp-buffer-1"></div>' +
					'<div class="cp-buffer-2"></div>' +
				'</div>' +
				'<div class="cp-progress-holder">' +
					'<div class="cp-progress-1"></div>' +
					'<div class="cp-progress-2"></div>' +
				'</div>' +
				'<div class="cp-circle-control"></div>' +
				'<ul class="cp-controls">' +
					'<li><a class="cp-play" tabindex="1">play</a></li>' +
					'<li><a class="cp-pause" style="display:none;" tabindex="1">pause</a></li>' +				
				'</ul>' +
			'</td>');
											
			var player = new CirclePlayer("#jquery_jplayer_" + i,
			{
			    mp3: dataTheme['music'][i],
			}, {
				cssSelectorAncestor: '#cp_container_' + i
			});
			
		}
		
		// Create localStorage for this theme
		localStorage.setItem("theme-" + (page[1] + 1), JSON.stringify(objectTrack));

        $('#expected').on('click', function(){
            $(this).css('display','none');
            $('#answer').css('display','inline-block');
            var countTeam = 4; // Number of team
            for(var i = 0; i <= countTeam; i++){
                $('#team-group span#team'+i).delay(i*100).animate({'top':'20px','opacity':'1'},200);
            }
        });

		$('#answer').on('click', function(){
			$(this).css('display','none');
			$('#expected').css('display','inline-block');
			$('#team-group span').animate({'top':'0px','opacity':'0'},200);
		});
		
		$('#team-group span').on('click', function(){
			var checkActive = $(this).hasClass('active'),
				checkBonus = $(this).hasClass('bonus'),
				score = JSON.parse(localStorage.getItem("theme-" + (page[1] + 1))),
				teamNbr = Number($(this).attr('data-team')),
				trackNbr = Number($(this).attr('data-track'));

			if(checkActive){
                $(this).addClass('bonus');
				$(this).removeClass('active');
                score[trackNbr][teamNbr] = 2;
			} else if(checkBonus){
                $(this).removeClass('active');
                $(this).removeClass('bonus');
                score[trackNbr][teamNbr] = 0;
            }
            else {
				$(this).addClass('active');
				$(this).removeClass('bonus');
                score[trackNbr][teamNbr] = 1;
			}			
			localStorage.setItem("theme-" + (page[1] + 1), JSON.stringify(score));


		});
		
		// hide buffer
		$('.prototype-wrapper').find('.cp-buffer-holder').hide();

        function manageTracks(index) {
            $('#expected').css('display','inline-block');
            $('#answer').css('display','none');
            $('#answer').html(dataTheme['answer'][index]);
            $('.cp-jplayer').not('#jquery_jplayer_' + index).jPlayer('stop');
            $('.prototype-wrapper').find('.cp-buffer-holder').hide();
            $('#cp_container_' + index).find('.cp-buffer-holder').show();
            $('#cp_container_' + index).removeClass('past');
            $('#cp_container_' + index).nextAll().removeClass('past');
            $('#cp_container_' + index).prevAll().addClass('past');
            $('#team-group span').attr('data-track',index).animate({'top':'0px','opacity':'0'},200, function(){
                $(this).removeClass('active');
                $(this).removeClass('bonus');
                var obje = JSON.parse(localStorage.getItem("theme-" + (page[1] + 1)));
                switch(obje[index][$(this).attr('data-team')]){
                	case 1: 
	                	$(this).addClass('active');
	                	break;
                	case 2: 
	                	$(this).addClass('bonus');
	                	break;
                }
            });
        }

		$('.cp-play').on('click', function(){
			var ancestor = $(this).closest('.cp-container'),
			    index = ancestor.attr('data-index');
            manageTracks(index);
		});
		
		$('.cp-container .cp-circle-control').on('click',function(){
			var index = $(this).closest('.cp-container').attr('data-index');
            manageTracks(index);
		}); 
	});
	
	$('#score').on('click', function(){
		window.location.hash = 'score';
		$.ajax({
	        type: "GET",
	        url: "score.htm",
	        context: document.body,
	        success: function(s){
	            $(this).html(s);
	            $('#container-score').fadeIn(300);
	        }
	    });
	});
	}
	
});
