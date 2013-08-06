var storage = function () {
	var localStore = localStorage;
	var apiKey = function () {
		return localStore[STORAGE_API_KEY];
	},
	apiURL = function () {
		//return '';
		return localStore[STORAGE_URL];
	},
	dateLastUpdated = function () {
		return localStore[DATE_LAST_UPDATE];
	}
	issues = function () {
		return localStore[STORAGE_ISSUES]
	},
	issueByID = function (id) {
		//TODO:
		console.log('issueByID not implemented!');
	},
	setValue = function(valueType, value) {
		localStore[valueType] = value;
	};

	return	{
		apiKey: apiKey,
		apiURL: apiURL,
		dateLastUpdated: dateLastUpdated,
		issues: issues,
		issueByID: issueByID,
		setValue: setValue
	};
}();

var Test = function () {
	this.test = '';
};

