"use strict";
var common=(function (){
	var xml ="";
	
	var init=function(){
		common.bindpageEvents();
	};
	
	var bindpageEvents=function(){		
		//var $uploadObj = $("#videouploader").uploadFile({
		//	url:"https://194.95.158.74:5000/getVideoStats",
		//	fileName:"videoupload",
		//	acceptFiles:"video/*"
		//	}); 
		//$uploadObj.startUpload();
		$("#btn_image_uplaod").off().on( "click", function(obj) {
			//debugger; //can add debugger liek this whiel debugging and pausing code at specific locations
			alert("alert by clicking image_uplaod button")
		});
		
		$("#btn_image_uplaod").off().on( "change", function(obj) {
			var filesLen=$(this)[0].files.length;
			var fiel1=$(this)[0].files[0];
			var reader = new FileReader();
			reader.onload = function(){
		      var dataURL = reader.result;
		      debugger;
		    };
			reader.readAsDataURL($("#btn_image_uplaod")[0].files[0]);
		});
	};
	
	var doSomething=function(arg1){
		// functionality of this function and can be called like //common.doSomething(arg1);
	};
	return{
		init:init,
		bindpageEvents:bindpageEvents,
		doSomething:doSomething
	}
})();

$(document).ready(function(){
	common.init()
	});