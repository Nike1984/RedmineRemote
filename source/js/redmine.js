var Redmine = function (apiKey, URL) {
	var apiKey = apiKey,
		url = URL,
		test = function () {
			console.log('this works!');
		},
		issues = function () {
			var data;
			getJSON(url + URL_ISSUES, function (result) {
				data = JSON.stringify(result);
			}, function () {
				data = null;
			});

			return data;
		},
		connectionEstablished = function () {
			var success;
			getJSON(url + URL_CURRENT_USER, function (data) {
				if (data.user) {
					success = true
				}
				else success = false;
			}, function (ex) {
				if (ex) {
					console.log(ex);
				};
				success = false;
			});
			return success;
		},
		currentUser = function () {
			url += URL_CURRENT_USER;
			getJSON(url, function (result) {
				return result;
			},
			function () {
				return;
			});
		},
		updateLocalIssues = function (localIssues) {
			if (connectionEstablished()) {
				return getJSON(url + URL_ISSUES, saveLocalIssues(localIssues, data), function () {
					console.log('update failed!');
					return;
				});
			}
		},
		saveLocalIssues = function (localIssues, remoteIssues) {
			var returnIssues = [];
			//loop through the freshly retrieved issues
			for (var remoteIssue in remoteIssues.issues) {
				var issue;
				//attempt to find local issue for the freshly retrieved one
				for (var localIssue in localissues.issues) {
					if (localIssue.id = remoteissue.id) {
						issue = localIssue;
					}
				}
				//Not a new issue, need to update
				if (issue) {
					issue = [];
					issue.push({ assigned_to: remoteIssue.assigned_to, description: remoteIssue.description, done_ratio: remoteIssue.done_ratio, due_date: remoteIssue.due_date, estimated_hours: remoteIssue.estimated_hours, priority: remoteIssue.priority, project: remoteIssue.project, start_date: remoteIssue.start_date, status: remoteIssue.status, subject: remoteIssue.subject, tracker: remoteIssue.tracker, updated_on: remoteIssue.updated_on });
				}
					//new issue = no need to do any manipulations
				else {
					issue = [];
					issue.push(remoteIssue);
					issue.push({ pinned: false, stopWatchStart: '', timeLogged: 0 });
				}
				returnIssues.push(issue);
			}
			return returnIssues;
		},
		testReturn = function () {
			return 'test';
		};


	return {
		test: test,
		connectionEstablished: connectionEstablished,
		currentUser: currentUser,
		issues: issues,
		testReturn: testReturn
	};
};
