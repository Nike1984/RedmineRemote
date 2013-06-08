$(document).ready(function()
{
	restore_options();
	console.log('javascript fired! Congrats!');

	$('#btnSave').click(function(event)
	{
		event.preventDefault();
		save_options();
	});
});

// Saves options to localStorage.
function save_options() {
  var APIKey = $('#txtAPIKey').val(); //API
  var URL = $('#txtURL').val(); //URL
  localStorage['RedmineAPIKey'] = APIKey;
  localStorage['RedmineAPIUrl'] = URL;
  EstablishAPIConnection(APIKey, URL);
}

function restore_options() {
	var APIKey = localStorage['RedmineAPIKey'];
	var URL = localStorage['RedmineAPIUrl'];
	if ((!APIKey) || (!URL)) {
		return;
	}

	$('#txtAPIKey').val(APIKey);
	$('#txtURL').val(URL);
}

function EstablishAPIConnection(key, url)
{
	$.ajax({
		url: url,
		dataType: 'jsonp',
		beforeSend: function(request)
	{
		request.setRequestHeader('X-Redmine-API-Key', key);
	},
}).done(function(data)
	{
		console.log('Connection Established');
}).fail(function()
	{
		console.log("Connection failed");
	})
}

function RetrieveUser(data)
{

}

function DisplayError(header, message)
{

}