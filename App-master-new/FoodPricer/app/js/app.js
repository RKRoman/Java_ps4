/**
 * Запускается, когда DOM готова
 */
$(document).ready(function() {
	initSettings();
	$('#settings-page').live('pagebeforehide',function(event, ui){
		checkSettings();
	});
});

/**
 * Запускается при переходе на страницу с магазинами из главного меню
 */	
function showShopsPage() {
	$.when(geoLocation.getLocation()).
		then(function(geodata) {
			currentPosition.latitude=geodata.coords.latitude;
			currentPosition.longitude=geodata.coords.longitude;
			initializeGMaps(currentPosition.latitude, currentPosition.longitude);
			fetchNextPage();
			$.mobile.changePage('#shops-page', { transition: 'flip' } );
		});
};

/**
	*Функция для нахождения расстояния
	*x,y - наше местоположение; x1,y1-координаты магазина, rad - заданный радиус
*/
function radius (x,y,x1,y1,rad){
  var r=Math.sqrt(Math.pow((x1-x)*111.111,2)+Math.pow((y1-y)*111.111,2)) ;
  tr=(r<rad);  //для вхождения в радиус 
  return (parseFloat(r.toFixed(1)));
}

/**
 * Настройки по умолчанию
 */	
var defaultSettings = {
	SEARCH_RADIUS: 3,
	ENABLE_HIGH_ACCURACY: false
},

/**
 * Хранит широту и долготу
 */	
	currentPosition = {},
	
/**
 * Получает геоданные
 */	
	geoLocation = {

	geoСonfig: { enableHighAccuracy: getSettings().enableHighAccuracy },
	
	getLocation: function() {
		var deferred = $.Deferred();

		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(deferred.resolve, this.getLocationError, this.geoСonfig);
		} else {
			alert('Устройство не поддерживает определение местоположения.');
		}
		return deferred.promise();
	},

	getLocationError: function(error) {
		var message = "";   

		switch (error.code) {
			case error.PERMISSION_DENIED:
				message = "Доступ к информации о географическом положении запрещен пользователем.";
				break;
			case error.POSITION_UNAVAILABLE:
				message = "Невозможно определить местоположение устройства.";
				break;
			case error.PERMISSION_DENIED_TIMEOUT:
				message = "Невозможно определить местоположение устройства (истек срок выполнения операции).";            
				break;
		}

		if (message == "")
		{
			var strErrorCode = error.code.toString();
			message = "Невозможно определить местоположение устройства из-за неизвестной ошибки (Код: " + strErrorCode + ").";
		}
		alert(message);
	}

};

/**
 * Инициализирует Google Maps
 */	
function initializeGMaps(longitude, latitude) {
	var mapStyles = [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}];
	var styledMap = new google.maps.StyledMapType(mapStyles, {name: "Grey map"});
  
	var mapLatlng = new google.maps.LatLng(longitude, latitude);
	var mapOptions = {
		zoom: 16,
		center: mapLatlng,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		},
		backgroundColor: "#fff",
		zoomControl: false, 
		scrollwheel: false, 
		disableDoubleClickZoom: true,
		disableDefaultUI: true
	}

	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	var infowindow = new google.maps.InfoWindow({
		content: '<div>Ваше местоположение</div>',
	});
   
	var marker = new google.maps.Marker({
		position: mapLatlng,
		map: map,
	});
	
	$('#map_canvas').css({'width':'100%','height':'200'});
	
	google.maps.event.addListenerOnce(map, 'idle', function(){
		google.maps.event.trigger(map, 'resize');
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
		map.setCenter(mapLatlng);
	});
	
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
};

/**
 * Выводит на экран диалоговое окно
 * @param {string} text - текст, появляющийся в диалоговом окне
 * @callback callback - функция обратного вызова
 */
function confirmDialog(text, callback) {
	var popupDialogId = 'popupDialog';
	
	$('<div data-role="popup" id="' + popupDialogId + '" data-confirmed="no" data-transition="none"  data-dismissible="false" style="padding: 20px"> \
						<div role="main">\
							<p>' + text + '</p>\
							<a href="#" class="optionConfirm" data-role="button" data-icon="check" data-rel="back">Да</a>\
							<a href="#" class="optionCancel" data-role="button" data-icon="delete" data-rel="back" data-transition="none">Нет</a>\
						</div>\
	</div>').appendTo($.mobile.pageContainer);
	
	var popupDialogObj = $('#' + popupDialogId);
	
	popupDialogObj.trigger('create');
	popupDialogObj.popup({
		afterclose: function (event, ui) {
			popupDialogObj.find(".optionConfirm").first().off('click');
			var isConfirmed = popupDialogObj.attr('data-confirmed') === 'yes' ? true : false;
			$(event.target).remove();
			if (isConfirmed && callback) {
				callback();
			}
		}
	});
	popupDialogObj.popup('open');
	popupDialogObj.find(".optionConfirm").first().on('click', function () {
		popupDialogObj.attr('data-confirmed', 'yes');
	});
};

/**
 * Инициализирует настройки
 */
function initSettings() {
	// Настройки из локального хранилища
	if ( ( localStorage["search-range"] != null ) && ( localStorage["enable-high-accuracy"] != null ) ) {
		var settings = {
			searchRadius: parseFloat(localStorage["search-range"]),				// number
			enableHighAccuracy: localStorage["enable-high-accuracy"]=="true"	// boolean
		}
		
		settings.enableHighAccuracy === true ? $("#enable-high-accuracy").val("true").slider("refresh") : $("#search-range").val(settings.searchRadius).slider("refresh");
		$("#search-range").val(settings.searchRadius).slider("refresh");
	}
	// Настройки по умолчанию
	else {
		var settings = {
			searchRadius: defaultSettings.SEARCH_RADIUS,
			enableHighAccuracy: defaultSettings.ENABLE_HIGH_ACCURACY
		}
		
		localStorage["enable-high-accuracy"] = settings.enableHighAccuracy;
		localStorage["search-range"] = settings.searchRadius;
		
		$("#enable-high-accuracy").val("false").slider("refresh");
		$("#search-range").val(settings.searchRadius).slider("refresh");
	}
};

/**
 * Сохраняет настройки
 */	
function saveSettings() {
	var settings  = {
		searchRadius: parseFloat(document.getElementById("search-range").value),			// number
		enableHighAccuracy: document.getElementById("enable-high-accuracy").value=="true"	// boolean
	}

	localStorage["enable-high-accuracy"] = settings.enableHighAccuracy;
	localStorage["search-range"] = settings.searchRadius;
};

/**
 * Восстанавливает настройки по умолчанию
 */	
function restoreSettings() {
	var settings = {
		searchRadius: defaultSettings.SEARCH_RADIUS,
		enableHighAccuracy: defaultSettings.ENABLE_HIGH_ACCURACY
	}
	
	confirmDialog("Вы уверены, что хотите восстановить настройки по умолчанию?", function(){
		localStorage["search-range"] = settings.searchRadius;
		localStorage["enable-high-accuracy"] = settings.enableHighAccuracy;
		
		$("#enable-high-accuracy").val("false").slider("refresh");
		$("#search-range").val(settings.searchRadius).slider("refresh");
	});
};

/**
 * Проверяет, сохранены ли настройки
 */	
function checkSettings() {
	var settings  = {
		searchRadius: document.getElementById("search-range").value,				// string
		enableHighAccuracy: document.getElementById("enable-high-accuracy").value	// string
	}
	
	if ( ( settings.searchRadius != localStorage["search-range"] ) || ( settings.enableHighAccuracy != localStorage["enable-high-accuracy"] ) ){
		$.mobile.changePage( "#settings-unsaved-dialog", { role: "dialog", transition: "none" } );
	}
};

/**
 * Достает настройки из локального хранилища
 */	
function getSettings() {
	var settings = {
		searchRadius: parseFloat(localStorage["search-range"]), 			// number
		enableHighAccuracy: localStorage["enable-high-accuracy"]=="true"	// boolean
	}
	
	return (function callback () {
		return settings;
	})();
};