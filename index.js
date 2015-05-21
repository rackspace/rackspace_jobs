var fs = require('fs');
var joblint = require('joblint');

var glob = require("glob")
 
function handleInputFailure (msg) {
    console.error(msg);
    process.exit(1);
}

function handleInputSuccess (file, data) {
    var result = joblint(data);
    if ( (result.errors.length !== 0) || (result.warnings.length !== 0) ) {
        console.log('joblint failure: ' + file);
        console.log(result.errors);
        console.log(result.warnings);
        process.exit(1);
    }
}

// options is optional 
glob("**/*.md", {}, function (er, files) {
    files.forEach(function(file) {
        fs.readFile(file, {encoding: 'utf8'}, function (err, data) {
            var re = /readme|node_modules/i;
            if (!file.match(re)) {
                if (err) {
                    handleInputFailure('File "' + fileName + '" not found');
                } else {
                    handleInputSuccess(file, data);
                }
            }
        });
    });
  // files is an array of filenames. 
  // If the `nonull` option is set, and nothing 
  // was found, then files is ["**/*.js"] 
  // er is an error object or null. 
})