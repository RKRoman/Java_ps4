var 
remoteDB = new PouchDB(),
localDB = new PouchDB('shops'),
remoteDBOptions = {
	pageSize: 5,
	offset: 0,
	includeDocs: true
};
	
/**
 * Запускается, когда DOM готова
 */
$(document).ready(function() {
	$('#main-page').live('pagebeforeshow',function(event, ui){
		remoteDBOptions.pageSize = 5;
		remoteDBOptions.offset = 0;
		$("#shops-list").empty();
	});
});


/**
 * Загружает магазины из БД
 * Каждая ссылка имеет уникальный id 
 */
function fetchNextPage() {
	remoteDB.allDocs({limit : remoteDBOptions.pageSize, skip : remoteDBOptions.offset, include_docs : remoteDBOptions.includeDocs}, function (err, response) {
	remoteDBOptions.offset += remoteDBOptions.pageSize;
	
	}).then(function(response) {
		
		for (var i=0; i<5; i++) {
			$("#shops-list").append(
			'<li>'+
				'<a href=\'#categories-page\' data-transition=\'flip\' data-link-id=\'' + response.rows[i].doc._id + '\' style=\'text-decoration:none;\' >'+
					'<h2>'+
						response.rows[i].doc.name+
					'</h2>'+
					'<p>'+
						response.rows[i].doc.address+
					'</p>'+
					'<p class="ui-li-aside">'+
						radius(currentPosition.latitude, currentPosition.longitude,response.rows[i].doc.latitude,response.rows[i].doc.longitude,parseFloat(localStorage["search-range"]))+' км'+
					'</p>'+
				'</a>'+
			'</li>'
			).listview('refresh');
		}
		if (remoteDBOptions.offset != response.total_rows) {
			$("#shops-list").append('<li>' + "<a onclick=\"fetchNextPage(); $(this).closest('li').remove(); $('#shopsList').listview('refresh');\">Показать больше</a>" + '</li>').listview('refresh');
		}
	});
};