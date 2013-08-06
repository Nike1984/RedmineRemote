$(document).ready(function () {
	restore_options();
	console.log('javascript fired! Congrats!');

	$('#btnSave').click(function (event) {
		event.preventDefault();
		save_options();
	});
});

// Saves options to localStorage.

function save_options() {
	var url = $('#txtURL').val().trim();
	//Make sure that our URLs always end in a /
	//it is a business rule, so I don't think this is a place to check for it. But we'll leave it here for now
	if (url) {
		if (!(url[url.length - 1] == '/')) {
			url += '/';
		}
	}
	else {
		DisplayError(TITLE_ERROR, MESSAGE_VALUE_IS_EMPTY);
		//no sense to proceed
		$('#txtURL').addClass('error');
		e.preventDefault();
		return;
	};

	var key = $('#txtAPIKey').val().trim();
	if (!key) {
		DisplayError(TITLE_ERROR, MESSAGE_VALUE_IS_EMPTY);
		$('#txtAPI').addClass('error');
		e.preventDefault();
		return;
	};

	storage.setValue(STORAGE_API_KEY, key);
	storage.setValue(STORAGE_URL, url);

	var redmine = new Redmine(storage.apiKey(), storage.apiURL());

	if (redmine.connectionEstablished()) {
		//alert('connection established!');
		console.log('connection established!')
		DisplaySuccess(TITLE_SUCCESS, MESSAGE_CREDENTIALS_VERIFIED);
	}
	else {
		console.log('connection failed to establish!');
		DisplayError(TITLE_FAILURE, MESSAGE_FAILED_CONNECTING);
	};
}

function restore_options() {
	$('#txtURL').val(storage.apiURL);
	$('#txtAPIKey').val(storage.apiKey);
}

/*chrome.webRequest.onBeforeRequest.addListener(
  function(details) { return {cancel: true}; },
  {urls: ["*://www.evil.com/*"]},
  ["blocking"]);
*/

