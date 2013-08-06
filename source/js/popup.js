// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


/*function click(e) {
  chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
*/

//$scope.issues = {
//	"issue": [
//		{
//			"name": "test",
//			"dueDate": "2012-05-05",
//			"timeSpent": 52
//		},
//		{
//			"name": "test",
//			"dueDate": "2012-05-05",
//			"timeSpent": 52
//		},
//		{
//			"name": "test",
//			"dueDate": "2012-05-05",
//			"timeSpent": 52
//		}
//	]
//}

function PinnedIssues($scope) {
	$scope.test = "what's up";
	var issues = getLocalIssues();
	if (issues.issue.length == 0) {
		for (var i = 0; i < 3; i++) {
			var tempIssue = { 'id': i, 'name': 'testname', 'timeSpent': 0 };
			issues.issue.push(tempIssue);
		};
	};

	$scope.testIssues = issues;


};
function MostRecentIssues($scope) {
	$scope.test = "test";
	//var redmine = new Redmine(storage.apiKey(), storage.apiURL());
	//if (redmine.connectionEstablished()) {
	//	getJSON(storage.apiURL() + URL_ISSUES, function (data) {
	//		if ((data) && (data.issues) && data.issues.length > 0) {
	//			$scope.issues = data.issues;
	//		} else {
	//			$scope.issues = {};
	//		}
	//	}, function () {
	//		$scope.issues = {};
	//	});
	//}
	//else {
	//	$scope.issues = {};
	//}
	$scope.issues = GetUpdateIssues(storage);
}

function GetUpdateIssues(storage) {
	console.log('Get issues fired!');
	var dateNow = new Date();
	if ((!storage.dateLastUpdated()) || ((storage.dateLastUpdated() - dateNow) > UPDATE_FREQUENCY)) {
		var redmine = new Redmine(storage.apiKey(), storage.apiURL());
		var issues = JSON.parse(redmine.issues());
		var test = redmine.testReturn();
		for (var i = 0; i < issues.issues.length - 1; i++) {
			var issue;
			remoteIssue = issues.issues[i];

			//attempt to find local issue for the freshly retrieved one
			for (var localIssue in storage.issues()) {
				if (localIssue.id = remoteIssue.id) {
					issue = localIssue;
				}
			}

			//Not a new issue, need to update
			if (issue) {
				issue = [];
				issue.push({ assigned_to: remoteIssue.assigned_to, description: remoteIssue.description, done_ratio: remoteIssue.done_ratio, due_date: remoteIssue.due_date, estimated_hours: remoteIssue.estimated_hours, priority: remoteIssue.priority, project: remoteIssue.project, start_date: remoteIssue.start_date, status: remoteIssue.status, subject: remoteIssue.subject, tracker: remoteIssue.tracker, updated_on: remoteIssue.updated_on });
			}
				//new issue = no need to do any manipulations, just push
			else {
				remoteIssue.pinned = false;
				remoteIssue.stopWatchStart = '';
				remoteIssue.timeLogged = 0;
				issue = [];
				issue.push(remoteIssue);

			}
			returnIssues.push(issue);
		}
		return returnIssues;
	};
	return storage.issues;
}




