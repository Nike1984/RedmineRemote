//Global
var PREFIX = '';
//DEBUG MODE
var DEBUG_MODE = true;

//Local Storage
var STORAGE_URL = PREFIX + 'redmineURL';
var STORAGE_API_KEY = PREFIX + 'redmineAPIKey';
var DATE_LAST_UPDATE = PREFIX + 'dateLastUpdated';
var STORAGE_ISSUES = PREFIX + 'redmineIssues';
var STORAGE_USER = PREFIX + 'redmineUser';


//Navigation
var URL_CURRENT_USER = "response/users/current.json";
var URL_USERS = "response/users.json";
var URL_ISSUES = "response/issues/issues.json"

//Constant arbitrary values
var REQUEST_TIMEOUT = 60;
var UPDATE_FREQUENCY = 200;

//Messages (Success)
var TITLE_SUCCESS = "Success!"
var MESSAGE_API_USER_RETRIEVED = "User was retrieved successfully!";
var MESSAGE_CREDENTIALS_VERIFIED = "Credentials have been verified!";


//Messages (Failures)
var TITLE_ERROR = "Error!";
var TITLE_FAILURE = "Failure!";
var MESSAGE_VALUE_IS_EMPTY = "Required value. Cannot be empty!";
var MESSAGE_GENERAL_FAILURE = "Whatever you were trying to do failed along the way. Give it another try in a bit.";
var MESSAGE_API_KEY_INVALID = "Failed to retrieve the user for this API key!";
var MESSAGE_FAILED_CONNECTING = "Failed to establish the connection with Redmine. Check the URL and/or certificates!";
var MESSAGE_FAILED_PARSING_RESPONSE = "Failed to process the response from Redmine. Please check the URL."


//Messages (Neutral)