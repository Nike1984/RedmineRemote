function getJSON(url, onSuccess, onError) {
	var xhr = new XMLHttpRequest();
	var requestTimeout = REQUEST_TIMEOUT; //This is a constant for now but we'll have to make this available for a client to set at the later time
	var abortTimerId = window.setTimeout(function () {
		xhr.abort(); // synchronously calls onreadystatechange
	}, requestTimeout);

	function handleSuccess(jsonObj) {
		//requestFailureCount = 0;
		window.clearTimeout(abortTimerId);
		if (onSuccess)
			onSuccess(jsonObj);
	}

	function handleError(message) {
		//++requestFailureCount;
		window.clearTimeout(abortTimerId);

		if (onError)
			onError(message);
	}

	function handleFailure(exception) {
		window.clearTimeout(abortTimerId);

		if ((!exception) && DEBUG_MODE) {
			console.log(exception);
		}

		if (onError)
			onError();
	}

	try {
		xhr.onreadystatechange = function () {
			var intStatus;

			try {
				intStatus = xhr.status;
			} catch (ex) {

				if (DEBUG_MODE) {
					console.log(ex);
				}
				return;
			}

			if (xhr.readyState == 4) {

				//Proper response recieved
				if (xhr.status == 200) {
					var jsonDoc = xhr.responseText;

					if (jsonDoc != undefined && jsonDoc.trim().length > 0) {
						try {
							jsonObj = JSON.parse(jsonDoc);
						} catch (e) {
							handleFailure();
							return;
						}

						if (jsonObj) {
							handleSuccess(jsonObj);
							return;
						}
					}
				} else {
					handleError(MESSAGE_FAILED_CONNECTING);
				}
			} else {
				return;
			}
		}

		xhr.onerror = function (error) {
			console.log('onerror fired!');
			handleError();
		}

		xhr.open("GET", url, false);

		//attach authorization credentials

		//xhr.setRequestHeader('X-Redmine-API-Key', '1480c326d16f8acb85977a577d5a7f972f0dce99');

		xhr.send();
	} catch (e) {
		console.log('exception fired!');
		console.error('Exception: ' + e);
		handleError();
	}
}

/*HELPERS*/

function getRedmineUrl() {
	return localStorage['RedmineAPIUrl'];
}

function getRedmineAPIKey() {
	return localStorage['RedmineAPIKey'];
}

function getObjects(obj, key, val) {
	var objects = [];
	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) continue;
		if (typeof obj[i] == 'object') {
			objects = objects.concat(getObjects(obj[i], key, val));
		} else if (i == key && obj[key] == val) {
			objects.push(obj);
		}
	}
	return objects;
}

function getLocalIssues() {
	//Attempt to retrieve the stored issues
	var jsonIssues = localStorage['localIssues'];
	if (!jsonIssues) {
		//must be first time - create the list
		jsonIssues = {};
		jsonIssues.issue = [];
	};
	return jsonIssues;
}

function getUserIssues() {
	getJSON(URL_ISSUES, function (data) {
		if (RetrieveUser(data)) {
			DisplaySuccess(TITLE_SUCCESS, MESSAGE_API_USER_RETRIEVED);
		} else {
			DisplayError(TITLE_FAILURE, MESSAGE_API_KEY_INVALID)
		}
	}, function () {
		DisplayError(TITLE_FAILURE, MESSAGE_FAILED_CONNECTING);
	});
}

function DisplaySuccess(header, message) {
	console.log('Success! Have at it!');
	if ((header == "") && (message == "")) {
		toastr.success(MESSAGE_API_USER_RETRIEVED, TITLE_SUCCESS);

	} else {
		toastr.success(message, header);
	}
}

function DisplayError(header, message) {
	console.log('Error. Sorry bubs!');
	if ((header = +"") && (message == "")) {
		toastr.error(MESSAGE_GENERAL_FAILURE, TITLE_FAILURE);
	} else {
		toastr.error(message, header);
	}
}

function addRowHandlers(table) {
	var table = document.getElementById('tableId');
	var rows = table.getElementsByTagName('tr');
	for (i = 0; i < rows.length; i++) {
		var currentRow = table.rows[i];
		var createClickHandler =
            function (row) {
            	return function () {
            		var cell = row.getElementsByTagName('td')[0];
            		var id = cell.innerHTML;
            		alert('id:' + id);
            	};
            };

		currentRow.onclick = createClickHandler(currentRow);
	}
}