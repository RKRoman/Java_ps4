/**
 * Запускается, когда DOM готова
 */
$(document).ready(function() { 
	initSettings();
	console.log( typeof getSettings().enableHighAccuracy);
	$('#settings-page').live('pagebeforehide',function(event, ui){
		checkSettings();
	});
});

/**
 * Хранит широту и долготу
 */	
var currentPosition = {}

/**
 * Объект, получающий геоданные
 */	
var geoLocation = {

    geoСonfig: { enableHighAccuracy: getSettings().enableHighAccuracy },
	
	getLocation: function() {
        var deferred = new $.Deferred();

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(deferred.resolve, this.geoLocationError, this.geoСonfig);
        } else {
            alert('Устройство не поддерживает определение местоположения.');
        }
        return deferred.promise();
    },

    geoLocationError: function(error) {
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
                    </div>')
        .appendTo($.mobile.pageContainer);
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
}

/**
 * Инициализирует настройки
 */
function initSettings() {
	// Настройки из локального хранилища
	if ( ( localStorage["search-range"] != null ) && ( localStorage["enable-high-accuracy"] != null ) ) {
		var settings = {
			searchRadius: JSON.parse(localStorage["search-range"]),
			enableHighAccuracy: JSON.parse(localStorage["enable-high-accuracy"])
		}
		
		if (settings.enableHighAccuracy === true) {
			$("#enable-high-accuracy").val("true").slider("refresh");
		}
		else {
			$("#enable-high-accuracy").val("false").slider("refresh");
		}
		$("#search-range").val(settings.searchRadius).slider("refresh");
	}
	// Настройки по умолчанию
	else {
		var settings = {
			searchRadius: 3,
			enableHighAccuracy: false
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
		searchRadius: JSON.parse(document.getElementById("search-range").value),
		enableHighAccuracy: JSON.parse(document.getElementById("enable-high-accuracy").value)
	}
	console.log(getSettings().enableHighAccuracy);
	localStorage["enable-high-accuracy"] = settings.enableHighAccuracy;
	localStorage["search-range"] = settings.searchRadius;
};

/**
 * Восстанавливает настройки по умолчанию
 */	
function restoreSettings() {
	var settings = {
		searchRadius: 3,
		enableHighAccuracy: false
	}
	
	confirmDialog("Вы уверены, что хотите восстановить настройки по умолчанию?", function(){
		localStorage["search-range"] = settings.searchRadius;
		localStorage["enable-high-accuracy"] = settings.enableHighAccuracy;
		
		$("#enable-high-accuracy").val("false").slider("refresh");
		$("#search-range").val(settings.searchRadius).slider("refresh");
    });
}

/**
 * Проверяет, сохранены ли настройки
 */	
function checkSettings() {
	var settings  = {
		searchRadius: document.getElementById("search-range").value,
		enableHighAccuracy: document.getElementById("enable-high-accuracy").value
	}
	
	if ( ( settings.searchRadius != localStorage["search-range"] ) || ( settings.enableHighAccuracy != localStorage["enable-high-accuracy"] ) ){
		$.mobile.changePage( "#settings-unsaved-dialog", { role: "dialog", transition: "none" } );
	}
}

/**
 * Достает настройки из локального хранилища
 */	
function getSettings() {
	var settings = {
		//searchRadius: JSON.parse(localStorage["search-range"]),
		enableHighAccuracy: localStorage["enable-high-accuracy"] == "true"
	}
	
	return (function callback () {
		return settings;
	})();
}