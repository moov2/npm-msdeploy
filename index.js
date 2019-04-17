'use strict';

const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

var deploy = function (args, options) {

	var params = '',
		index = 0;

	for (var value in options) {
		// Check if the option passed from user
		var key = options[value];
		if (key === true) {
			var argValue = args[index];
			if ("source" === value) {
				argValue = processSource(argValue);
			}
			var param = "-" + value + ":" + argValue;
			params = params + ' ' + param;
			index++;
		}
		
		if (param === 'source') {
			params += ':' + processSource(process.argv[i + 1]) + ' ';
			continue;
		}

		params += ':' + process.argv[i + 1] + ' ';
	}

	runMSDeploy(params);
};

/**
 * Provide better source behaviour. Let MSDeploy work with relative content paths!
 */
function processSource(source) {
	if (typeof (source) === "undefined" || source.indexOf("contentPath=") !== 0) {
		return source;
	}
	var sourcePath = source.replace("contentPath=", "");
	if (path.isAbsolute(sourcePath)) {
		return source;
	}
	sourcePath = path.resolve(sourcePath);
	return "contentPath=" + sourcePath;
}

/*
 * Get MS deploy path
 * Solution from: 
 * https://github.com/mrjackdavis/grunt-msdeploy/blob/master/tasks/msdeploy.js
*/
function getExePath() {

	if (!process.env.ProgramFiles || !process.env["ProgramFiles(x86)"]) {
		throw new Error("This script is only available on Windows environment.");
	}

	var relativeMsDeployPath = "IIS/Microsoft Web Deploy V3/msdeploy.exe",
		path64 = path.join(process.env.ProgramFiles, relativeMsDeployPath),
		path32 = path.join(process.env["ProgramFiles(x86)"], relativeMsDeployPath),
		msDeploy64Path, msDeploy32Path;

	if (path64 != null) {
		msDeploy64Path = path.resolve(path.join(process.env.ProgramFiles, relativeMsDeployPath));
		if (fs.existsSync(msDeploy64Path)) {
			return msDeploy64Path;
		}
	}

	if (path32 != null) {
		msDeploy32Path = path.resolve(path.join(process.env["ProgramFiles(x86)"], relativeMsDeployPath));
		if (fs.existsSync(msDeploy32Path)) {
			return msDeploy32Path;
		}
	}

	throw new Error("MSDeploy doesn't seem to be installed. Could not find msdeploy in \"" + msDeploy64Path + "\" or \"" + msDeploy32Path + "\". You can install it from http://www.iis.net/downloads/microsoft/web-deploy");
}


/*
 * Run MSdeploy with params
*/
function runMSDeploy(param) {

	param = param || '';

	var msDeployPath = '"' + getExePath() + '"';
	exec(msDeployPath + ' ' + param, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			throw new Error('msdeploy.exe error. Incorrect params.');
		}
		console.log(`stdout: ${stdout}`);
	});
}


module.exports = deploy;
