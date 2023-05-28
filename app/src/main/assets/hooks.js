var gradle = { log: function(val){val && console.log( gradle.isMobile && (typeof val === 'object') ? JSON.stringify(val) : val );},
/**
	GRADLE - KNOWLEDGE IS POWER
	***** MonkeyCreative ***
    ***** PROPRIETARY CODE *****
    @author : MonkeyCreative (monkeyCreative@outlook.com)
	@date: 01/26/2021 14:43:00
	@version: 7.0.0
	copyright @2022
*/

    intervalAds    : 3,     //Ads each interval for example each 3 times
	fullsize	   : true,

	//Events manager :
	//================
    event: function(ev, msg){
		if(gradle.process(ev,msg)) switch(ev){

		case 'first_start':   //First start
			//gradle.showInter();
			break;

		case 'ShowInterstitial': //Button play
			gradle.showInter();
			break;
			
		case 'ShowInterstitial2':  //when you win a level
			gradle.showInter();
			break;
			
		case 'ShowInterstitial3':  //when you win a level
			gradle.showInter();
			break;
			
		case 'ShowInterstitial4':  //when you win a level
			gradle.showInter();
			break;
			
		case 'ShowInterstitial_interval':  //when you win a level
			gradle.checkInterval() && gradle.showInter();
			break;

        case 'ShowMoregames':  //when you win a level
            gradle.event('btn_more');
            break;


		case 'test':
			//gradle.checkInterval() && gradle.showInter();
			break;
		
        }
    },





    //Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
    //=========================
	start: function(){
		jQuery(document).ready(function (){
			cr_createRuntime("c2canvas");
			setTimeout(function(){gradle.event_ext('hide_splash');}, 5000);
		});
		//cr_sizeCanvas()
    },
	pause: function(){
		console.log('gradle pause ...');
		cr_setSuspended(true);
    },
	resume: function(){
		console.log('gradle resume ...');
		cr_setSuspended(false);
    },
	
	trackStats: function(a, b){
		gradle.event(a, b);
	},

	trackScreen: function(a,b){
		gradle.event(a,b);
	},

	trackEvent: function(a,b){
		gradle.event(a,b);
	},

	showAd: function(){
		gradle.event('showAd');
	},

	__: function(t){
		return null;//t;
	},

    run: function() {
        gradle.event('first_start');
		gradle.isMobile = ( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) );
        document.addEventListener("visibilitychange", gradle.onVisibilityChanged, false);
		gradle.start();
		setTimeout(function(){gradle.save_score(0,0);}, 1000);
    },
	score : 0,
    save_score(score, level){
        gradle.event_ext('save_score|'+score+'|'+level);
    },

	mute: false,
    event_ext: function(val){
		if(this.isMobile && typeof jacob!='undefined'){
			jacob.do_event(val);
		}
	},

	old_ev: null,
    process: function(ev, msg){
        if(ev=='game_loaded'){

        }
		if(gradle.old_ev ==ev){
			if(ev=='button_share' || ev=='button_play'){
				console.log('repeat');
				//return false;
			}
		}
        switch(ev){
            case 'btn_more':
                gradle.event_ext('show_more');
                break;
            case 'btn_privacy':
                gradle.event_ext('show_privacy');
                break;
            case 'btn_share':
                gradle.event_ext('show_share');
                break;
            case 'btn_profile':
                gradle.event_ext('show_profile');
                break;
            case 'btn_exit_game':
                gradle.event_ext('exit_game');
                break;
        }
		gradle.old_ev = ev;
		gradle.log(ev,msg);
		return true;
    },

    showInter: function(){
        if(!gradle.isMobile) return;
        gradle.log('jacob|show_inter');
    },

    enable_pause: true,
	onVisibilityChanged : function(){
	    if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden){
	        gradle.pause();
	        setTimeout(function(){
	            if(!gradle.enable_pause){
                    gradle.resume();
                }
	        }, 500);
		}else{
		    gradle.enable_pause = true;
			gradle.resume();
		}
	},

	currentInterval : 0,
	checkInterval: function(){
		return (++gradle.currentInterval==gradle.intervalAds) ? !(gradle.currentInterval=0) : !1;
	},
	
	prefix : "gd.4026.",
	buildKey: function(key){
		return gradle.prefix + key;
	},

	getItem: function(key, default_value){
		var value;
		try {
			value = localStorage.getItem(gradle.buildKey(key));
		}
		catch(error){
			return default_value;
		}
		if(value !== undefined && value !=null){
			value = window.atob(value);
		}
		else{
			value = default_value;
		}
		return value;
	},

	setItem: function(key, value){
		var v = value;
		if(v !== undefined){
			v = window.btoa(v);
		}
		try{
			localStorage.setItem(gradle.buildKey(key), v);
			return value;
		}
		catch(error){
			return undefined;
		}
	}
};
gradle.run();
