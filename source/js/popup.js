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

//Wire up some events

$(document).ready(function () {
	$('tr').click(function () {
		$(this).closest('tr').siblings().
	});
});

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
	$scope.issues = GetUpdateIssues(storage);

	function GetUpdateIssues(storage) {
		console.log('Get issues fired!');
		var returnIssues = [];
		var dateNow = new Date();
		if ((!storage.dateLastUpdated()) || ((storage.dateLastUpdated() - dateNow) > UPDATE_FREQUENCY)) {
			var redmine = new Redmine(storage.apiKey(), storage.apiURL());
			var issues = JSON.parse(redmine.issues());
			var test = redmine.testReturn();
			for (var i = 0; i < issues.issues.length - 1; i++) {
				var issue = null;
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
					issue.assigned_to = remoteIssue.assigned_to;
					issue.description = remoteIssue.description;
					issue.done_ratio = remoteIssue.done_ratio;
					issue.due_date = remoteIssue.due_date;
					issue.estimated_hours = remoteIssue.estimated_hours;
					issue.priority = remoteIssue.priority
					issue.project = remoteIssue.project
					issue.start_date = remoteIssue.start_date
					issue.status = remoteIssue.status;
					issue.subject = remoteIssue.subject;
					issue.tracker = remoteIssue.tracker;
					issue.updated_on = remoteIssue.updated_on;
				}
					//new issue = no need to do any manipulations, just push
				else {
					remoteIssue.pinned = false;
					remoteIssue.stopWatchStart = '';
					remoteIssue.timeLogged = 0;
					issue = remoteIssue;
				}
				console.log(i);

				issue.shortSubject = issue.subject.substring(0, 26);
				if (issue.subject.length > 26) {
					issue.shortSubject += ' ...';
				}

				if (!issue.due_date) {
					issue.due_date_formatted = 'Not Set!';
				}
				else {
					issue.due_date_formatted = issue.due_date;
				}
				if (!issue.timeLogged) {
					issue.timeLogged = '0:00'
				}

				returnIssues.push(issue);
			};
			storage.setValue(STORAGE_ISSUES, returnIssues);
			return returnIssues;
		};
		return storage.issues;
	}
}






