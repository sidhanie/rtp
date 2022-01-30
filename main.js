$(document).ready(function() {
	
	var $selected_platform = '';	
	function fixplatformBox($platform_parent_class) {
        resetplatformBoxes();
        if ($platform_parent_class.hasClass('platform-1')) {
            $selected_platform = 'Android';
        }
        if ($platform_parent_class.hasClass('platform-2')) {
            $selected_platform = 'iOS';
        }
        $platform_parent_class.addClass('active');
    }	
    function resetplatformBoxes() {
        var $platform_list = $('.platform-1, .platform-2');	
        if ($platform_list.hasClass('active')) {
            $platform_list.removeClass('active');
        }
    }
	$('.platform-item-inner-wrapper').click(function() {
		fixplatformBox($(this));				      
    });
	
	//Resource 1 Progress Bar
	function progressBar(percent, $element) {
		var progressBarWidth = percent * $element.width() / 100;
		$element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
	}
	progressBar(20, $('#progressBar'));
		
	var select = $( "#resource-item-1-amount-wrapper" );
	var slider = $( "<div id='slider-resource-1'></div>" ).insertAfter( select ).slider({
		min: 2000,
		max: 10000,
		value: 2000,
		range: "min",
		change: function(event, ui) { 
			var sliderValue = $( "#slider-resource-1" ).slider( "option", "value" );				
			$('#resource-1-amount').html(sliderValue);
			if(sliderValue == '2000') {
				progressBar(20, $('#progressBar'));
				$('#decrease-resource-1').addClass('btn-disabled');			
			}
			else if (sliderValue == '4000') {
				progressBar(40, $('#progressBar'));
				$('#decrease-resource-1').removeClass('btn-disabled');
				ion.sound.play("button");
			}
			else if (sliderValue == '6000') {
				progressBar(60, $('#progressBar'));
			}
			else if (sliderValue == '8000') {
				progressBar(80, $('#progressBar'));
				$('#increase-resource-1').removeClass('btn-disabled');
				ion.sound.play("button");
			}
			else if (sliderValue == '10000') {
				progressBar(100, $('#progressBar'));
				$('#increase-resource-1').addClass('btn-disabled');
			}
		}        
	});	
	
	$('#blurred-resources').click(function() {
		swal("Error", "Please enter your Username and select your platform.", "error");
	});
	
	$('#increase-resource-1').click(function() {
		var sliderCurrentValue = $( "#slider-resource-1" ).slider( "option", "value" );
		slider.slider( "value", sliderCurrentValue + 2000 );
		ion.sound.play("button");		
	});
	$('#decrease-resource-1').click(function() {
		var sliderCurrentValue = $( "#slider-resource-1" ).slider( "option", "value" );
		slider.slider( "value", sliderCurrentValue - 2000 );
		ion.sound.play("button");		
	});	
	
	//Resource 2 Progress Bar
	function progressBarResource2(percent, $element) {
		var progressBarResource2Width = percent * $element.width() / 100;
		$element.find('div').animate({ width: progressBarResource2Width }, 500).html(percent + "%&nbsp;");
	}
	progressBarResource2(20, $('#progressBarResource2'));
	var selectResource2 = $( "#resource-item-2-amount-wrapper" );
	var sliderResource2 = $( "<div id='slider-resource-2'></div>" ).insertAfter( selectResource2 ).slider({
		min: 20000,
		max: 90000,
		value: 20000,
		range: "min",
		change: function(event, ui) { 
				var sliderValueResource2 = $( "#slider-resource-2" ).slider( "option", "value" );
				$('#resource-2-amount').html(sliderValueResource2);
					if(sliderValueResource2 == '20000') {
						progressBarResource2(20, $('#progressBarResource2'));
						$('#decrease-resource-2').addClass('btn-disabled');
					}
					else if (sliderValueResource2 == '40000') {
						progressBarResource2(40, $('#progressBarResource2'));
						$('#decrease-resource-2').removeClass('btn-disabled');
					}
					else if (sliderValueResource2 == '60000') {
						progressBarResource2(60, $('#progressBarResource2'));
					}
					else if (sliderValueResource2 == '80000') {
						progressBarResource2(80, $('#progressBarResource2'));
						$('#increase-resource-2').removeClass('btn-disabled');
					}
					else if (sliderValueResource2 == '90000') {
						progressBarResource2(100, $('#progressBarResource2'));
						$('#increase-resource-2').addClass('btn-disabled');
					}
				}        
	});
	$('#increase-resource-2').click(function() {
		var sliderCurrentResource2Value = $( "#slider-resource-2" ).slider( "option", "value" );
		sliderResource2.slider( "value", sliderCurrentResource2Value + 20000 );
		ion.sound.play("button");	
	});
	$('#decrease-resource-2').click(function() {
		var sliderCurrentResource2Value = $( "#slider-resource-2" ).slider( "option", "value" );
		sliderResource2.slider( "value", sliderCurrentResource2Value - 20000 );
		ion.sound.play("button");	
	});	
	
	$('#first-step-button').click(function () {
		if($selected_platform != '' && $('#clr-usernametag').val().length > 3){
			$('#account-information-wrapper').fadeOut(500, function() {
				$('#resources-select-wrapper').fadeIn();
				progressBar(20, $('#progressBar'));
				progressBarResource2(20, $('#progressBarResource2'));
			});	
		}
		else {
			sweetAlert("Error", "Mohon isi Username Akun dan Platform.", "error");
		}
	});
	
	function progressBarConsole(percent, $element) {
		var progressBarConsoleWidth = percent * $element.width() / 100;
		$element.find('div').animate({ width: progressBarConsoleWidth }, 500).html(percent + "%&nbsp;");
	}
	progressBarConsole(1, $('#progressBarConsole'));	

	function loading_step() {
		$('#account-information-wrapper').fadeOut(50);
		$('#resources-select-wrapper').fadeOut(500, function() {
			$('#processing-wrapper').fadeIn(500, function() {
				var $console_message_username_msg = $('#clr-usernametag').val();
				var $console_message_platform_msg = $selected_platform;
				var $console_message_resource1_msg = $('#slider-resource-1').slider("option", "value");   
				var $console_message_resource2_msg = $('#slider-resource-2').slider("option", "value");
				var $console_message = $('.console-message');
				var $processing_message = $('.starting-loading-title');
				if ($(window).width() < 600) {
					window.scrollTo(0, $("#processing-wrapper").offset().top);
				}	
				setTimeout(function() {
					$('.starting-loading-wrapper').fadeIn();
					$console_message.text('Loading Files...');	
					$processing_message.text('Loading Files...');	
					progressBarConsole(3, $('#progressBarConsole'));			
				}, 0 );
				setTimeout(function() { 
					$console_message.text('Compressing Data...');	
					$processing_message.text('Compressing Data...');	
					progressBarConsole(15, $('#progressBarConsole'));			
				}, 1000 );
				setTimeout(function() { 
					$console_message.text('Loading...');	
					$processing_message.text('Loading...');	
					progressBarConsole(18, $('#progressBarConsole'));			
				}, 1800 );
				setTimeout(function() {
					$('.overlay-loader').fadeOut(500, function() {
						$('.searching').fadeIn();
					});
					$console_message.html("Mencari Username <span class='console-message-connected-item'>" + $console_message_username_msg + "</span> ...");	
					$processing_message.html("Mencari Username <span class='console-message-connected-item'>" + $console_message_username_msg + "</span> ...");	
					progressBarConsole(22, $('#progressBarConsole'));			
				}, 3000 );
				setTimeout(function() { 
					$console_message.html("Menyambungkan ke Username ke <span class='console-message-connected-item'>" + $console_message_platform_msg + "</span>");	
					$('.starting-loading-wrapper').fadeOut(500, function() {
						$('.console-username-wrapper').fadeIn();
					});	
					$('.searching').fadeOut(500, function() {
						$('.overlay-loader').fadeIn();
					});
					progressBarConsole(26, $('#progressBarConsole'));			
				}, 7000 );
				setTimeout(function() { 
					$console_message.html("Inject Cheat ke Username <span class='console-message-connected-item'>" + $console_message_username_msg + "</span>");
					$('#console-username-value').text($('#clr-usernametag').val());
					$('#console-platform-value').text( $selected_platform );
					$('.console-normal-text').fadeIn();
					$(".console-username-wrapper").addClass('bounce animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass('bounce animated');
					});
					$(".console-message").addClass('pulse animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass('pulse animated');
					});					
					progressBarConsole(30, $('#progressBarConsole'));			
				}, 10000 );
				setTimeout(function() {
					$('.console-username-wrapper').fadeOut();
					setTimeout(function() { $('.starting-loading-wrapper').fadeIn(); }, 500 );					
					$console_message.html("Menyiapkan Code Inject");	
					$processing_message.html("Menyiapkan Code Inject");	
					progressBarConsole(35, $('#progressBarConsole'));			
				}, 12000 );
				setTimeout(function() { 
					$console_message.html("Inject Winrate");	
					$processing_message.html("Inject Winrate");	
					progressBarConsole(38, $('#progressBarConsole'));			
				}, 14000 );
				setTimeout(function() { 
					$console_message.html("Inject Code Cheat  Winrate");
					$('.starting-loading-wrapper').fadeOut();
					setTimeout(function() {	
						$('.console-resourceitem1-wrapper').fadeIn(500, function() {
							var $console_resource1_countto = $('#slider-resource-1').slider("option", "value");
							$('#console-resourceitem1-value').countTo({
								from: 0,
								to: $console_resource1_countto,
								speed: 2000,
								refreshInterval: 10,
								formatter: function (value, options) {
								  return value.toFixed(options.decimals);
								}
							});
						});
					}, 500 );	
					progressBarConsole(42, $('#progressBarConsole'));			
				}, 16000 );
				setTimeout(function() {
					$console_message.html(" <span class='console-message-success'>Winrate Berhasil di Naikan</span>");
					$(".console-resourceitem1-value-inner-wrapper").addClass('bounce animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass('bounce animated');
					});
					$(".console-message").addClass('pulse animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass('pulse animated');
					});
					progressBarConsole(55, $('#progressBarConsole'));			
				}, 20000 );
				setTimeout(function() { 
					$('.console-resourceitem1-wrapper').fadeOut(500, function() {
						$('.starting-loading-wrapper').fadeIn();	
					});
					$console_message.html("Inject Cheat Agar Tidak Terdeteksi");	
					$processing_message.html("Inject Cheat Agar Tidak Terdeteksi");	
					progressBarConsole(58, $('#progressBarConsole'));			
				}, 23000 );
				setTimeout(function() { 
					$('.starting-loading-wrapper').fadeOut(500, function() {
					$console_message.html("Inject Cheat Anti Set Admin");
					$('.console-resourceitem2-wrapper').fadeIn(500, function() {
						var $console_resource2_countto = $('#slider-resource-2').slider("option", "value");
						$('#console-resourceitem2-value').countTo({
							from: 0,
							to: $console_resource2_countto,
							speed: 2000,
							refreshInterval: 10,
							formatter: function (value, options) {
							  return value.toFixed(options.decimals);
							}
						});
					});
					progressBarConsole(62, $('#progressBarConsole'));
					});
				}, 24500 );
				setTimeout(function() { 
					$console_message.html("<span class='console-message-success'>Code Berhasil di Inject</span>");
					$(".console-resourceitem2-value-inner-wrapper").addClass('bounce animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass('bounce animated');
					});
					$(".console-message").addClass('pulse animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass('pulse animated');
					});
					progressBarConsole(74, $('#progressBarConsole'));			
				}, 28000 );
				setTimeout(function() { 
					$('.console-resourceitem2-wrapper').fadeOut(500, function() {
						$('.starting-loading-wrapper').fadeIn();	
					});
					$console_message.html("<span class='console-message-success'>Seluruh Code Berhasil di Inject</span>");	
					$processing_message.html("<span class='console-message-success'>Seluruh Code Berhasil di Inject</span>");	
					progressBarConsole(80, $('#progressBarConsole'));			
				}, 29900 );
				setTimeout(function() { 
					$console_message.html("Mengoptimalkan Data");	
					$processing_message.html("Mengoptimalkan Data");	
					progressBarConsole(84, $('#progressBarConsole'));			
				}, 31900 );
				setTimeout(function() { 
					$console_message.html("Pembersihan Cache Otomatis");	
					$processing_message.html("Pembersihan Cache Otomatis");	
					progressBarConsole(90, $('#progressBarConsole'));			
				}, 33000 );
				setTimeout(function() { 
					$console_message.html("Verifikasi Anda Bukan Robot");	
					$processing_message.html("Verifikasi Anda Bukan Robot");	
					progressBarConsole(93, $('#progressBarConsole'));			
				}, 34000 );
				setTimeout(function() { 
					$console_message.html("<span class='console-message-error'>Menunggu Proses Verifikasi</span>");	
					$processing_message.html("<span class='console-message-error'>Menunggu Proses Verifikasi</span>");	
					progressBarConsole(93, $('#progressBarConsole'));			
				}, 35000 );
				setTimeout(function() { 
					$console_message.html("<span class='console-message-connected-item'>Verifikasi Berhasil</span>");
					$processing_message.html("<span class='console-message-connected-item'>Verifikasi Berhasil</span>");
					$(".console-message").addClass('pulse animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass('pulse animated');
					});
					progressBarConsole(93, $('#progressBarConsole'));			
				}, 38500 );
				setTimeout(function() {
					$('#human-verification').fadeIn();
					$('.starting-loading-wrapper').fadeOut();	
					$console_message.html("Berhasil di Inject");
					$processing_message.html("Berhasil di Inject");
					if ($(window).width() < 600) {
						window.scrollTo(0, $("#human-verification").offset().top);
					}					
				}, 39500 );
				
			});
		});	       	
    }
	
	$('#second-step-button').click(function() {
		if ($('#account-username').val() != '') {
			loading_step()
		}
		else {
			swal("Error", "Please enter your Username.", "error");
		}
	});
	
    $('.popup-tos').magnificPopup({
        type: 'inline',
        preloader: false
    });
    $('.popup-contact').magnificPopup({
        type: 'inline',
        preloader: false
    });
    $('.popup-pp').magnificPopup({
        type: 'inline',
        preloader: false
    });
	$('.human-verification-button').magnificPopup({
        type: 'inline',
        preloader: false
    });
	
});


var ee;
var eenum2 = 334;

function dis_num3() {
    document.getElementById("online2").innerHTML = eenum2;
    var randWay = Math.floor(Math.random() * 10 + 1);
    if (randWay <= 5) {
        eenum2 = eenum2 + Math.floor(Math.random() * 10 + 1);;
    } else {
        eenum2 = eenum2 - Math.floor(Math.random() * 10 + 1);;
    }
    ee = setTimeout("dis_num3()", 1000);
}
dis_num3();

var ChatReplied = false;
var ChatDate = new Date();
var ChatUserName = '';
var ChatUserNames = ["TurtletheCat", "Pobelter", "EugeneJPark", "Doublelift", "C9Sneaky", "lamBjerg", "Popobelterold", "HOGEE", "WizFujiiN", "HotGuy6Pack", "dawoofsclaw", "TiPApollo", "Soeren", "FSNChunkyfresh", "Ariana22ROO", "Waker", "Podu", "C9Hard", "Shiphtur", "HOoZy", "Chapanya", "Dyrus", "Entranced", "WildTurtle", "WildTurtl", "lntense", "Hauntzer", "LiquidFeniX", "THExJOHNxCENA555", "Imaqtpie", "ZionSpartan", "JJackstar", "Ekkocat", "LiquidKEITH", "mldkingking", "Loopercorn", "TiPMa", "Ohhhq", "ninjamaster69xxx", "CaliTrlolz8", "ice", "C9Meteos", "JannaMechanics", "KEITHMCBRIEF", "dunamis", "Quasmire", "scorro", "LiquidQuas", "GVHauntzer", "PengYiliang", "Casely", "wahoolahoola", "godisfeng66666", "Zbuum", "ilovefatdongs", "TransIogic", "LemonBoy", "Link", "Chipotlehunter", "TDKkina", "DJTrance", "Duocek", "Hate", "KonKwon", "Nihillmatic", "Zaryab", "intero", "Biofrost", "LongCat4", "CSTJesiz", "GVKeane", "TiPyoondog", "RedoutabIe", "LiquidXpecial", "JayJ", "GVCop", "iKeNNyu", "C9Hai", "FunFrock", "CLGLourlo", "evertan", "Chaullenger", "Aniratak", "PorpoiseDeluxe", "Isuyu", "CLGDandyLite", "Arcsecond", "BloodWater", "Jynthe", "Sickoscott", "RickyTang", "DaBox", "ALLRekklesvNA", "Hoofspark", "DuBuKiD", "AdrianMa", "GuriAndGunji", "stuntopia", "RyanChoi", "AiShiTeru", "FSNMeMer", "J0kes", "C9Balls", "C9SoIo", "yungmulahBABY", "FeelTheLove", "dawolfsclaw", "BaamSouma", "NMEotter", "stuntopolis", "llRomell", "GoJeongPa", "p0z", "Trisexual", "MarkPassion", "Seeiya", "AAltec", "C9LemonNation", "maplestreet8", "LemAnjing", "MegaZero", "VIPEEEEEEEEEEEER", "Panchie", "fabbbyyy", "halo3madsniper", "iLucent", "1k2o1ko12ko12ko2", "Bokbokimacat", "VANISHINGDRAG0N", "LiquidPiglet", "playmkngsupport", "Gambler", "Gaggiano", "JJayel", "JoopsaKid", "1brayle", "Azingy", "Kebrex", "WahzYan", "willxo", "TailsLoL", "darksnipa47", "Thyak", "JimmyTalon", "vane", "sooyoung", "lalaisland", "Lourlo", "Sunar", "PlayWithAnimals", "scarra", "HUYAGorilIA", "Lock0nStratos", "aphromoo", "KMadClown", "ChaIlengerAhri", "YY90001PiKaChu", "Thefatkidfromup", "ahqwe5tdoor", "Nintenpai", "JustJayce", "toontown", "BasedYoona", "Guakeren", "ExecutionerKen", "nicemoves", "InvertedComposer", "LiquidIWD", "Stan007", "woshishabi", "JukeKing", "xPecake", "BlGHUEVOS", "Plun", "KingCobra", "TDKSmoothie", "TSMLustboy", "C10Meteos", "lllllllllllllIII", "ohdaughter", "PekinWoof", "BrandonFtw8", "m2sticc", "DaiJurJur", "DontMashMe", "CaseOpened", "otte", "wutroletoplay", "Thurtle", "Dodo8", "Frostalicious", "bobqinXD", "MrCarter", "Hellkey", "Chimonaa1", "DaBoxII", "GVVicious", "Jummychu", "PAlNLESS", "LiLBunnyFuFuu", "Lukeeeeeeeeee", "Lattman", "Daserer", "AlliancePatrick", "Lionsexual", "St1xxay", "Kojolika", "CSTCris", "KojotheCat", "StellaLoussier", "Gleebglarbu", "Altrum", "RiotMeyeA", "Rule18", "mandatorycloud", "Tritan", "LiquidDominate", "cidadedecack", "RoA", "BillyBoss", "xPepastel", "TaketheDraw", "ST2g", "Migipooop", "dKiWiKid", "NMEflareszx", "Gundamu", "imp", "DDABONG", "Daydreamin", "Nightlie", "MRHIGHLIGHTREEL", "Shweeb", "JinMori", "Tailsz", "Bischu", "CRBRakin", "Chaox", "Grigne", "LogicalDan", "DAKular", "DifferentSword", "Geranimoo", "InnoX", "CoinsingforUrf", "FluffyKittens206", "ImJinAh", "CloudNguyen", "moonway", "whoishe", "TiensiNoAkuma", "Ethil", "nothinghere", "SuperMetroid", "hiimgosu", "Mammon", "BGJessicaJung", "coBBz", "waitingforu", "LearningToPIay", "YiOwO", "heavenTime", "AnDa", "WakaWaka", "hashinshin", "TDKKez", "MariaCreveling", "Cypress", "YahooDotCom", "Phanimal", "Aror", "RFLegendary", "BenNguyen", "AHHHHHHHHH", "Linsanityy", "Valkrin", "Gate", "Allorim", "Johnp0t", "Superrrman", "Laughing", "AKAPapaChau", "denoshuresK", "Anthony", "Nightblue3", "Aranium", "Pallione", "BamfDotaPlayer", "FakerSama", "xiaolan", "Sweept", "HooManDu", "XiaoWeiXiao", "HctMike", "Revenge", "Apauloh", "latebloomer", "CRBFyre", "MongolWarrior", "Hiphophammer", "CoachLFProTeam", "hiimria", "Jackoo", "Saskio", "DadeFakerPawn", "GVStvicious", "NeonSurge", "NMEBodydrop", "MatLifeTriHard", "PantsareDragon", "GinormousNoob", "IMbz", "miqo", "VoyboyCARRY", "Hakuho", "Hexadecimal", "themassacre8", "Ayr", "SeaHorsee", "F0rtissimo", "GamerXz", "Remie", "Soghp", "Raimazz", "Ultimazero", "bigfatlp", "NMETrashyy", "C9LOD", "Popuh", "SAGASUPVEIGM", "Iamagoodboy", "TrollerDog", "Descraton", "LiquidInoriTV", "MiniMe", "IlIlIIIlIIIIlIII", "Shweebie", "KatLissEverdeen", "PoppersOP", "B1GKr1T", "DGB", "stephyscute2", "TEESEMM", "Cyprincess", "baohando", "urbutts", "maplestreeTT", "jamee", "SawitonReddit", "VeryBitter", "BenignSentinel", "MrJuvel", "Denny", "LeeGuitarStringa", "DKrupt", "LAGEhsher", "eLLinOiSe", "MochiBalls", "Sonnynot6", "ixou", "Taeyawn", "Dezx", "7hThintoN", "BeautifulKorean", "VwSTeesum", "TLIWDominate", "Vsepr", "ktSmurf", "Vultix", "Soredemo", "ROBERTxLEE", "AnnieBot", "aksn1per", "IamFearless", "FrostyLights", "SoYung", "Tuoooor", "Polx", "Agolite", "CloudWater", "Delta", "LAGOrbwalk", "sexycan", "SimonHawkes", "Rohammers", "NMEInnoX", "ChineseJester", "IAmDoughboy", "Cytosine", "Vanxer", "SDiana2", "Araya", "TheItalianOne", "F1Flow", "Kazahana", "Malajukii", "xiaoweiba", "JoshMabrey", "shinymew", "Event", "freelancer18", "ZnipetheDog", "hiitsviper", "HappyBirfdizzay", "BabiHutan", "Anjengzzz", "KiNGNidhogg", "PurpleFloyd", "Rathul", "Kwaku", "BeachedWhaIe", "14h", "Xpecial", "CLGThink", "Aiciel", "oerh", "butttpounder", "TalkPIayLove", "jordank", "TwistyJuker", "MeganFoxisGG", "NiHaoDyLan", "TallerACE", "Doomtrobo", "Wardrium", "TwtchTviLoveSezu", "Westrice", "iMysterious", "BennyHung", "EnmaDaiO", "xTc4", "FallenBandit", "RumbIeMidGG", "deft1", "GochuHunter", "XxRobvanxX", "DuoChiDianShi", "coLBubbadub", "LeBulbe", "TanHat", "Dusty", "Jibberwackey", "Tallwhitebro", "llllllllllllIIII", "LilBuu", "Ahmad", "cesuna", "BigolRon", "xSojin", "Gh3ttoWatermelon", "KingofMemes", "eBocil094Jrh", "bive", "Yammy", "FasScriptor", "Docxm", "GVBunnyFuFuu", "Alphabetical", "Liquidzig", "YouHadNoDream", "TINYHUEVOS", "Sheepx", "GangstaSwerve", "LeBulbetier", "amandagugu", "Rushmore", "AnnieCHastur", "OverlordForte", "Muffintopper66", "Kazura", "zetsuen", "wozhixiangyin", "CaptainNuke", "alextheman", "Seongmin", "Working", "kyaasenpaix3", "gurminder", "VwSKhoachitizer", "TGZ", "KrucifixKricc", "Kevnn", "Academiic", "ArianaLovato", "Elemia", "CLGDeftsu", "XerbeK", "CeIestic", "RedEyeAkame", "Kerpal", "xFSNSaber", "MakNooN", "Hcore", "MrGamer", "zeralf", "Fenixlol", "Indivisible", "SHOWMETHEMONEY", "Adorations", "Niqhtmarex", "RambointheJungle", "Iucid", "iOddOrange", "Uncover", "DD666666", "r0b0cop", "VictoricaDebloiz", "Gleebglarb", "EmperorSteeleye", "SillyAdam", "WWWWWWWWWWWWWWMW", "tempname456543", "FeedOn", "iJesus69", "OmegaB", "Riftcrawl", "Xandertrax", "Krymer", "TwistedSun", "DeTRFShinmori", "RiceFox", "iKoogar", "Mizuji", "White", "zgerman", "FORG1VENliftlift", "sakurafIowers", "xSaury", "PiPiPig", "Pyrr", "TheCptAmerica", "NtzNasty", "SlowlyDriftnAway", "cre4tive", "Ganteng88", "FSNDLuffy", "NintendudeX", "duliniul", "Cybody", "Odete49", "TFBlade", "Platoon", "CopyCat", "BarbecueRibs", "TitanDweevil", "HeroesOfTheStorm", "JRT94", "RedBerrrys", "Rockblood", "YoloOno", "BalmungLFT", "IreliaCarriesU", "LikeAMaws", "PaulDano", "ErzaScarIet", "KiritoKamui", "ProofOfPayment", "DonPorks", "BarronZzZ", "Pikaboo", "aLeo", "MikeytheBully", "7Qing", "BillyBossXD", "DragonRaider", "Haughty", "KMadClowns", "ikORY", "Nikkone", "WeixiaTianshi", "QQ346443922", "FoxDog", "Tahx", "Hawk", "Haruka", "Scrumm", "cackgod", "iAmNotSorry", "coLROBERTO", "GladeGleamBright", "MonkeyDufle", "M1ssBear", "theletter3", "Sandrew", "RongRe", "MrGatsby", "xBlueMoon", "Merryem", "ElkWhisperer", "Enticed", "Draguner", "DeliciousMilkGG", "Patoy", "Lucl3n3Ch4k0", "Smoian", "Piaget", "Xiaomi", "zeflife", "IsDatLohpally", "HatersWantToBeMe", "Blackmill", "PrinceChumpJohn", "NhatNguyen", "Nebulite", "IAmTheIRS", "TedStickles", "LOD", "CallMeExtremity", "kimjeii", "Kappasun", "JJJackstar", "TSMMeNoHaxor", "Zealous", "Normalize", "Topcatz", "KimchimanBegins", "DrawingPalette", "AnarchyofDinh", "hiimxiao", "MikeHct", "Manco", "ChumpJohnsTeemo", "Heejae", "delirous", "Iodus", "WakaWakaWak", "Hawez", "ThaOGTschussi", "TwistedFox", "PureCorruption", "HotshotGG", "Turdelz", "ysohardstylez", "Brainfre3z", "ilyTaylor", "Zaineking", "QualityADC", "LingTong", "DyrudeJstormRMX", "AnObesePanda", "silvermidget", "CornStyle", "LafalgarTaw", "Zeyzal", "Meowwwwwww", "Pokemorph", "JimmyHong", "Hoardedsoviet", "Nematic", "C9Yusui", "BlownbyJanna", "Sojs", "Cerathe", "FairieTail", "Xeralis", "ichibaNNN", "SerenityKitty", "Contractz", "WWvvWvvWvvwWwvww", "BlueHole", "SAGANoPause", "Mookiez", "RiotChun", "ValkrinSenpai", "HeXrisen", "CptJack", "Sleepyz", "HurricaneJanna", "ToxiGood", "ItsYourChoice", "TaintedDucky", "probablycoL", "Ina", "FreeGaming", "Phaxen", "tofumanoftruth", "xHeroofChaos", "Rockllee", "Sunohara", "Ryzer", "SpiritDog", "Kazma", "Sjvir", "Maulface", "SombreroGalaxy", "Bebhead", "ecco", "AurionKratos", "RoseByrne", "Kammgefahr", "VwSSandvich", "TDKLouisXGeeGee", "Picarus", "erwinbooze", "xrawrgasm", "Tangularx", "CSauce", "Back2Nexus", "SepekuAW", "Chuuper", "Airtom", "pro711", "Theifz", "SirhcEezy", "LuckyLone56", "AtomicN", "Splorchicken", "00000000", "UpAIlNight", "k3soju", "MikeyC", "s7efen", "FENOMENO", "XIVJan", "Splorgen", "djpocketchange", "Oasis", "Iggypop", "BallsInYourFace", "dopa7", "MasterDragonKing", "ssforfail", "MissyQing", "Endlesss", "badeed", "SmooshyCake", "Karmix", "Alestz", "svbk", "KissMeRDJ", "TeaMALaoSong", "drallaBnayR", "CHRISTHORMANN", "KnivesMillions", "MahNeega", "Sphinx", "Impasse", "Stefono62", "CLGEasy", "GankedFromAbove", "IslandLager", "MrJuneJune", "BrianTheis", "ShorterACE", "morippe", "Meatmush", "Dusey", "Paperkat", "Submit", "TooPro4u", "Porogami", "iuzi", "Suzikai", "TDKNear", "LiquidInori", "Deleted", "NtzLeopard", "UnKooL", "Desu", "Born4this", "sickening", "AllianceMike", "Dinklebergg", "YouGotFaker", "FusionSin", "IMBAYoungGooby", "Neverlike", "BestGodniviaNA", "FFat20GGWP", "kMSeunG", "AliBracamontes", "rua0311desuyo", "54Bomb99", "jivhust", "Penguinpreacher", "Yashimasta", "Erurikku", "ReeferChiefer420", "WonderfulTea", "Gamely", "OberonDark", "Imunne", "Hoeji", "xTearz", "NicoleKidman", "DonDardanoni", "Wonderfuls", "HentaiKatness69", "Ayai", "EREnko", "Cruzerthebruzer", "Connort", "Anoledoran", "BiggestNoob", "Anangelababy007", "TrojanPanda", "MasterCoach", "Kirmora", "wswgou", "NMEotterr", "DragonxCharl", "uJ3lly", "moosebreeder", "Strompest", "Kurumx", "Protective", "LegacyofHao", "DkBnet", "koreas", "AxelAxis", "NiMaTMSiLe", "Preachy", "WoahItsJoe", "XXRhythmMasterXX", "Lemin", "Destinedwithin", "Afflictive", "Nydukon", "Herald0fDeath", "ChowPingPong", "QuanNguyen", "interest", "Slylittlefox121", "VictimOfTalent", "chadiansile", "iToradorable", "BIackWinter", "Mazrer", "NKSoju", "nhocBym", "Dreemo", "Virus", "CowGoesMooooo", "Masrer", "Michaelcreative", "Emanpop", "Druiddroid", "KevonBurt", "Magicians", "HiImYolo", "LoveSick", "kamonika", "Chunkyfresh", "tongsoojosim", "hiimrogue", "Zookerz", "LiShengShun", "DeTFMYumenoti", "EddieMasao", "AGilletteRazor", "andtheknee", "Hazedlol", "SrsBznsBro", "Spreek", "Toxil", "JustinJoe", "Silverblade12345", "WalterWhiteOG", "SwiftyNyce", "Volt", "DoctorElo", "Connie", "DELLZOR", "aiopqwe", "MidnightBoba", "Sikeylol", "Warmogger", "Melhsa", "OmekoMushi", "Life", "SleepyDinosaur", "Leonard", "CatVomit", "Likang45", "PSiloveyou", "xtsetse", "ClydeBotNA", "Cpense", "Arakune", "shadowshifte", "LeeBai", "SexualSavant", "CornChowder", "DeTRFEsteL", "Astro", "deDeezer", "Jayms", "v1anddrotate", "JGLafter", "UhKili", "Aceyy", "Zik", "RiNDiN", "Grandederp", "KawaiiTheo", "Senjogahara", "Th3FooL", "GusTn", "TheTyrant", "GoJeonPa", "DJJingYun", "Egotesticle", "IoveLu", "OGNEunJungCho", "kevybear", "ImJas", "Agrorenn", "Synxia", "DouyuTVForgottt", "GrimSamurai", "6666666666666", "RockleeCtrl", "Xode", "QQ459680082", "KittenAnya", "Zakard", "MARSIRELIA", "WallOfText", "SireSnoopy", "kelppowder", "Hxadecimal", "onelaugh", "MisoMango", "PiggyAzalea", "MisterDon", "VirginEmperor", "suzuXIII", "P18GEMEINV", "Kurumz", "kjin", "CcLiuShicC", "ExileOfTheBlade", "Iambbb", "Fubguns", "Asutarotto", "WhatisLove", "Niqhtmarea", "L0LWal", "JannaFKennedy", "Steffypoo", "KillerHeedonge", "AsianSGpotato", "whiteclaw", "GATOAmyTorin", "lovemyRMB", "Frostarix", "voyyboy", "Melo", "RiotZALE", "ElvishGleeman", "givesyouwiings", "LoveIy", "Packy", "Ntzsmgyu", "Susice", "Dontqqnubz", "mikeshiwuer", "Chulss", "MASTERDING", "Scorpionz", "KKOBONG", "Veeless", "NtzMoon", "Leesinwiches", "RefuseFate", "TP101", "ozoss0", "SeaShell", "Baesed", "Foolish", "jivhust1", "KMadKing", "CHRlSS", "jbraggs", "BeefTacos", "Xoqe", "Naeim", "Aerodactyl", "Triett", "194IQredditor", "Pulzar", "Windgelu", "Suadero", "Zulgor", "Senks", "cAbstracT", "SwagersKing", "AkameBestGirl", "ThePrimaryEdict", "arthasqt", "Lobstery", "MisterOombadu", "TheFriendlyDofu", "Oryziaslatipes", "ugg1", "Flandoor", "HawkStandard", "wimbis", "JimmerFredette", "VikingKarots", "Sorcerawr", "Ciscla", "Suffix", "MrCow", "METALCHOCOB0", "Dessias", "LevelPerfect", "midVox", "Junha", "Hickus", "gamepiong", "AirscendoSona", "HellooKittie", "Jesse", "Rainaa", "ILoveNASoloQ", "Colonelk1", "DeTRFZerost", "Szmao", "TacoKat", "1tzJustVictor", "HomedogPaws", "DioDeSol", "PeterBrown", "FrannyPack", "AbsoluteFridges", "TheBiddler", "ELMdamemitai", "Old", "Pavle", "nathanielbee", "MakiIsuzuSento", "nweHuang", "EvanRL", "yorozu", "forgivenbow", "alexxisss", "Cloverblood", "Entities", "Believe", "Chiruno", "Xiaobanma", "BestJanna", "Neko", "TheEyeofHorus", "IGotSunshine", "Shade20", "Sprusse", "Imacarebear", "Kenleebudouchu", "LockDownExec", "Chubymonkey", "HunterHagen", "Applum", "DaoKho", "MrBlackburn", "beatmymeat", "BestDota2Sona", "chubbiercheeks", "KillaKast", "Betsujin", "TheAmberTeahouse", "BellaFlica", "ManateeWaffles", "Babalew", "charmanderu", "TooSalty", "LotusBoyKiller", "Bulgogeeeee", "Nerzhu1", "Lovelyiris", "QuantumFizzics", "freakingnoodles", "Pdop1", "Bakudanx", "Martel", "DoctorDoom", "equalix", "CARDCAPTORCARD", "Dyad", "Papasmuff", "TheBroskie", "Wadenation", "Flyinpiggy", "Wingsofdeathx", "IamOsiris", "ArtThief", "LotusEdge", "fwii", "Kios", "Shampu", "Nickpappa", "Yukari", "RayXu", "Emeraldancer", "TwoPants", "EnzoIX", "Jacka", "Plumber", "Skadanton", "C9TGleebglarbu", "BonQuish", "GrimmmmmmmReaper", "SmoSmoSmo", "MewtMe", "Ramzlol", "Mruseless", "Eitori", "S0lipsism", "X1337Gm4uLk03rX", "lloveOreo", "MrChivalry", "Oyt", "AnVu", "RBbabbong", "MASTERROSHl", "dabestmelon", "Potatooooooooooo", "KasuganoHaru", "C9BalIs", "stainzoid", "MrArceeSenpaiSir", "sweetinnocence", "Firehazerd", "EpicLynx", "2011", "PandaCoupIe", "Moelon", "KingKenneth", "Skinathonian", "FelixCC", "snowmine", "Acme", "QmoneyAKAQdollas", "Fexir", "ImbaDreaMeR", "ImNovel", "ButtercupShawty", "touch", "penguin", "Promitio", "DeTRFMoyashi", "Hordstyle", "Iizard", "Jintae", "pichumy", "Upu", "Iemonlimesodas", "TwitchTvAuke", "Promises", "Jintea", "OMikasaAckermanO", "wompwompwompwomp", "Kiyoon", "LiquidNyjacky", "ATColdblood", "SandPaperX", "0Sleepless", "pr0llylol", "AxelsFinalFlame", "DrSeussGRINCH", "ZENPhooka", "oMizu", "HamSammiches", "Pcboy", "RamenWithCheese", "Yook", "Dafreakz", "Winno", "XxWarDoomxX", "LifelessEyes", "UrekMazin0", "FrenchLady", "Pillowesque", "GodOfZed", "D3cimat3r", "broIy", "1stTimeDraven", "Exxpression", "godofcontrol", "nokappazone", "Shoopufff", "IlIIlIIIlIIIIIII", "Fragnat1c", "Abidius", "irvintaype", "YellOwish", "japanman", "CaristinnQT", "LeithaI", "Kitzuo", "Akatsuki", "ROBERTZEBRONZE", "aenba", "Arcenius", "Torgun", "Ryden7", "Entus", "CutestNeo", "MonkeyDx", "Xerosenkio", "JHHoon", "DeTFMCeros", "Rakinas", "MetaRhyperior", "MegaMilkGG", "EmilyVanCamp", "SecretofMana", "Snidstrat", "SJAero", "Mixture", "Teaz89", "ArizonaGreenTea", "AKASIeepingDAWG", "sh4pa", "Hanjaro", "BestFelixNA", "Dragles", "TummyTuck", "sciberbia", "KLucid", "Isunari", "lAtmospherel", "Zwag", "yuBinstah", "ionz", "Nove", "Nickywu", "BlueRainn", "lilgrim", "Rekeri", "Kaichu", "Arnold", "ArcticPuffin11", "UnholyNirvana", "IREGlNALD"];
var ChatContent = ["Gimana caranya guys?", "Ada yang ude coba?", "Ngentot lo semua XD?", "Gampang injeknya?", "Mantap cheatnya, kukira palsu ternyata beneran.", "Perlu bayarkah?", "Aku pake ios kok ga bisa ya", "Ada yang bisa ajarin caranya?", "NTAB!", "ANJING!", "WAWKAWK", "Halo guys", "Stop Judi Hey~", "Work bro, gua barusan jackpot", "bro", "Gimana?", "Berisik lu semua jir", "Anjim!!", "Udah pada menang berapa sob?", "Android 8.0 bisa min?", "Yang udah JP bagi sawer dongg Xd", "Mesti nunggu berapa lama ini", "dgadaw", "Caranya?", "Iya gua tau", "Keren parah sih", "Oooo gtu", "Mungkin", "Mantap boss", "Ini seriusan uda pada jp?", "Mantap citnya boss", "Keren =)", "<message deleted>", "oh god", "damn", "I love this", "Never imagined this would work but damn its so simple", "saw this on forums pretty impressive", "Yang Indo Mana nihh?", "anyone up for a game?", "you think this will be patched any time soon", "Banyak banget orang bule", "Ajarin dong bro bro", "so happy i found this", "you guys watch nightblue?", "I have seen this website on twitch stream i think", "Banyak banget orang bule anjir", "Gimana cara injeknya?", "Ga bisa bahasa inggris xD", "thanks to whoever spams this website lol", "where i put in my code?", "so far I am cool with this", "can I get for free?", "bye guys", "Makassih min cheatnyaa", "how much can you even have", "incredible", "ten minutes", "need to go now", "brb", "You should give it a try", "dont regret being here", "fucking is real", "Wanjing keren parah cheatnya", "guys this is so easy, it takes less than a minute", "Can anyone do it for me? My username is brazilinaronaldo", "PM me pls", "shadow fight sucks noobs haha", "EA pls", "today is lucky day", "Mantap gila cheatnya brader", "Kok banyak banget orang bule?", "when can I play I am new to this", "Cheatnya gratis?", "Cheatnya bisa kadaluarsa?", "Mantap cheatnya broo", "man servers are always down fuk it", "funny how this works but it does like always", "Keren parah cheatnya", "Keren cheatnya sob", "this worked lol", "fuck i have no surveys left, had like 50k already on my acc", "where do all of you come from", "Keren bro cheatnya", "i was stuck in survey had to do again but it worked then", "Makasih yang infoin cara pakenya", "saw on stream yo", "Bisa cheatnya brooo", "I love you geesss", "this makes my game more enjoyable i hope", "Makasih brooothherrr", "thanks to whoever pmed me it worked", "Mantap jiwaaa", "when do you wanna play?", "imagine all the people waiting fo this", "any idea if this still works tomorrow", "best cheat website", "ini chat twitch?", "wow really many people online here", "Halo semua, cheatnya bisa?", "Udah pada inject cheatnya?", "adwdsgadawdasd", "Siapa yang liat ini dari iklan? hehe", "Salam dari Medan", "Yang mau disawer chat facebookku @sulaeman", "Gimana, ada yang sudah coba cheatnya?", "Gampang ternyata inject cheatnya", "Pada dari mana asalnya ni bro?", "i can only recommend this stuff", "great i can test the expansion before usin it", "can't wait for it to start!", "where do you come from?", "does this giveaway go forever?", "pretty good cheat guys", "i begin to like this very much. third pack i unlocked", "worth", "ok cool", "Depo 1jt jp 9jt wakowakoaw", "which country are you playing in guys?", "think so man", "Likely, but I think one day this will fail", "this still works at the moment", "i havent seen this before but im impressed with the result!", "my boyfriend will freak out :D", "nice ", "surveys dont appaer every time but i think its there to have enough mone", "actually i had no problem with any survey ever, just try?", "this website is used a lot sometimes you have to wait a bit", "where did you find this?", "Gimna cara pakenya?", "ty for the tips opt in guys!", "i wish i found this earlier", "Emang ini beneran bisa?", "how come i dont see any trolls here", "just dodged queue for this", "any bro needs help?", "i would do screenshot but maybe you report me then", "are there new weapons in this expansion pack?", "did you try 14,500 pack yet? I used on NA but maybe other locations can use it too", "Kok banyak orang bule disini jir", "i feel like this will be the best! it was starting to get boring lol", "think so", "Bisa gua dapet cheatnya kan?", "ok sounds good enough for me bros", "anyone reddit here?", "Wkowkowkawo mantapp cheatnya", "I had a bit trouble with some survy thing but no problem if you just choose an easy", "my friends on facebook spam this like every day they are rly happy about it", "Where do i put my phone", "what?", "yes i got it too", "Cheatnya boleh juga agan2, jp terus", "noobs pls if you dont know how to do it dont spam here okay", "great generator good i found this", "hope not too many kids in this chat", "josh are you here?", "unlocking takes some time for me", "derp", "i am curious is this legit?", "Works on OCE?", "had to reload page before it worked", "used this three times and applied for 3  14.500 coin packs, lol see you ingame suckers", "i see most people here write positive things it is true?", "All of you guys from indonesia?", "Exactly what I think", "Mantap cheatnya brooo", "when i came first to this website i was like most of you guys just spamming here the chat, in the end im glad that i tried it because now for next year or so i am not leaving my room", "if you want a proof add me on skype", "Hello from malaysia", "Bapak kau cheat", "So many indonesian right here?", "i am looking for a friend please pm me", "Gua kira boongan, ternyata beneran bisa kawokawo", "aasdasdasd", "Gila cheatnyaa jp mulu cookkk", "Worth my time omfg XD", "i agree", "Gua pake cheatnya work aja kok", "what i always disliked is when you get close to release date and they move it even further", "Cool as cheat brother", "i have tried too many surveys in my life finally i got lucky here ", "yeah free cheat is cool", "you like this?", "What you think about all this", "I want to play from korea", "Gak sia2 gua klik ini link wwkwkwk", "Siapa yang dateng dari Facebook??", "Gua dateng dari Fesbuk", "Beneran bisa?", "Mau dong, tolong caranya suhu-suhuku", "Anjay mabarrr", "Asli kah, atau iklan doang?", "Saya pake pc bisa?", "...^^", "Salang dari bekasi cok", "Mantap cheatnya gannnn", "Mantap soulll jp terus cok", "Halo saya dari malaysia", "Vietnamese here guys!", "i can imagine that", "okay", "Tak kira sue, benran bisa anjg wkwkwk", "Gak masuk akal sih sebenarnya, tapi beneran bisa dong xD", "uhm", "Ada yang uda coba cheatnya? Work?", "i think with the new game might become somewhat more interesting", "Cheatnya work agn2?.", "yayy", "Banyak banget bulenya wkwkw", "Mantap juga", "i think some offers easier in countries like Asia", "Hello my indonesian Fella"];
var ChatAntiBot = ["Kami bukan bot", "Emang ini keliatan kek bot? tolol XD", "Iye la kami semua bot", "Bot? Wkawkawkawk", "Bodoh kah? disini anti bot bro", "Iya  bot, terminator kali Bot xD", "Kmi bukan bot sayang"];


$(document).ready(function() {


    ChatStart();
    ChatLog("Selamat Datang di Chatroom, segela jenis spam akan dikick atau pesanmu tidak terbaca orang lain.");
    ChatAddEntry(ChatUserNames[Random(0, ChatUserNames['length'] - 1)], ChatContent[rng(0, ChatContent['length'] - 1)]);
    $('#livechatInputChat')['keypress'](function(_0xaa63xc) {
        if (_0xaa63xc['keyCode'] == 13) {
            $('#livechatButtonChat')['click']();
        };
    });
    $('#livechatButtonChat')['click'](function() {
        if (ChatUserName == '') {
            $('#livechatContainerChatUserName')['fadeIn'](250);
            $('.livechatOverlaySmall').fadeIn(200);
        } else {
            $msg = $('#livechatInputChat')['val']();

            ChatAddEntry('<span>' + ChatUserName + '</span>', $msg);
            $('#livechatInputChat')['val']('');
            if ($msg.indexOf("bots") >= 0 || $msg.indexOf("bot") >= 0 || $msg.indexOf("robots") >= 0) {
                setTimeout(function() {
                    ChatAddEntry(ChatUserNames[Random(0, ChatUserNames['length'] - 1)], '<span class="mention">@ ' + ChatUserName + ' &nbsp;</span>' + ChatAntiBot[rng(0, ChatAntiBot['length'] - 1)]);
                }, rng(7250, 9300));
            }
            if (!ChatReplied) {
                setTimeout(function() {
                    ChatAddEntry(ChatUserNames[Random(0, ChatUserNames['length'] - 1)], '<span class="mention">@ ' + ChatUserName + ' &nbsp;</span>  maaf bro, IP mu ga diizinin masuk chat server T.T');

                    setTimeout(function() {
                        ChatAddEntry(ChatUserNames[Random(0, ChatUserNames['length'] - 1)], '<span class="mention">@ ' + ChatUserName + ' &nbsp;</span>  sorry bro, chatnya ga bsa dibaca sama yang lain nih');
                        setTimeout(function() {
                            ChatAddEntry(ChatUserNames[Random(0, ChatUserNames['length'] - 1)], 'Wkwkwkw ' + '<span class="mention">@ ' + ChatUserName + ' &nbsp;</span> ' + ' Cuman kami yang bisa baca bro');

                        }, rng(11500, 19500));
                    }, rng(6500, 8500));
                }, rng(6000, 9500));
                ChatReplied = true;
            }
        };
    });
    $('#livechatButtonChatUserName')['click'](function() {
        ChatUserName = $('#livechatInputChatUserName')['val']();
        $('#livechatContainerChatUserName')['fadeOut'](250, function() {
            $('.livechatOverlaySmall').fadeOut(200, function() {
                $('#livechatButtonChat')['click']();
            });
        });
    });


});

Date.prototype.getFullMinutes = function() {
    if (this.getMinutes() < 10) {
        return '0' + this.getMinutes();
    }
    return this.getMinutes();
};

function rng(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}
$(function() {

    $('#livechatInputComment').focus(function() {
        $('#livechatContainerAdditional').slideDown(500);
    });
});

function Random(_0xaa63x2, _0xaa63x3) {
    return Math['floor'](Math['random']() * (_0xaa63x3 - _0xaa63x2) + _0xaa63x2);
};

function ChatAddEntry(_0xaa63x5, _0xaa63x6) {
    if (_0xaa63x5 == '' || _0xaa63x6 == '') {
        return;
    };
    $('<div class=\"livechatChatEntry\"><span class=\"livechatEntryUserName\">[' + ChatDate.getHours() + ':' + ChatDate.getFullMinutes() + ']  ' + _0xaa63x5 + ':</span><span class=\"livechatEntryContent\">' + _0xaa63x6 + '</span></div>')['appendTo']('#livechatChatContent')['hide'](0)['fadeIn'](250);
    $('#livechatChatContent')['scrollTop']($('#livechatChatContent')[0]['scrollHeight']);
};

function ChatLog(_0xaa63x6) {
    $('<div class=\"livechatChatEntry\"><span class=\"ChatNotification\">' + _0xaa63x6 + '</span></div>')['appendTo']('#livechatChatContent')['hide'](0)['fadeIn'](250);
    $('#livechatChatContent')['scrollTop']($('#livechatChatContent')[0]['scrollHeight']);
};

function ChatStart() {
    var _0xaa63x8 = function() {
        setTimeout(function() {
            var _0xaa63x9 = ChatUserNames[Random(0, ChatUserNames['length'] - 1)];
            var _0xaa63xa = ChatContent[Random(0, ChatContent['length'] - 1)];
            ChatAddEntry(_0xaa63x9, _0xaa63xa);
            _0xaa63x8();
        }, Random(1000, 15000));
    };
    _0xaa63x8();
};