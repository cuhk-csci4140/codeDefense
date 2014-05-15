/**
 * Client-side script builder
 * build script
 */
var fs = require('fs');

// tools
var browserify = require("browserify");
var jsmin = require('jsmin').jsmin;

exports.build = function() {
    console.log("Client-side script builder");

    // args
    var DEV = false;
    var infile = "./game/client/main.js";
    var outfile = "./public/js/bundle.js";
   // var outfile2 = "./php/r/game/bundle.js";
    var useClosure = false;
    var args = Array.prototype.slice.call(process.argv, 2);
    while (args.length > 0) {
	var argv = args.shift();
	switch (argv) {
	case '-dev':
	    DEV = true;
	    console.log("DEV Build")
	    break;
	case '-infile':
	    if (args.length <= 0)
		console.log("please specify the infile : -infile example.js");
	    infile = args.shift();
	    break;
	case '-outfile':
	    if (args.length <= 0)
		console.log("please specify the outfile : -outfile export.js");
	    outfile = args.shift();
	    break;
	case '-closure':
	    useClosure = true;
	}
    }
	
	DEV = true;

    bundle = browserify(infile, {
	watch : DEV,
	debug : DEV ? true : false
    });

    function write() {
	// jsmin(text, options.level, options.comment)
	// var src = jsmin(bundle.bundle() , 2);
	var src;
	if (DEV) {
	    src = bundle.bundle();
	} else {
	    src = jsmin(bundle.bundle());
	}

	if (!bundle.ok) {
	   console.error("build FAILED , JS ERROR");
	   //return;
	}

	fs.writeFile(outfile, src, function() {
	    console.log((new Date().toTimeString()) + ' ' + Buffer(src).length
		    + ' bytes written');
	});
/*
    fs.writeFile(outfile2, src, function() {
		console.log((new Date()).toTimeString() + ' '
			+ Buffer(src).length + ' bytes written to PHP dir');
	    });
	
	*/
    }

    if (useClosure && !DEV) {
	console.log("USING Google Closure Compiler Service (DON'T USE IT)");
	compile(bundle.bundle(), function(err, code) {
	    if (err)
		throw err;

	    fs.writeFile(outfile, code, function() {
		console.log((new Date()).toTimeString() + ' '
			+ Buffer(code).length + ' bytes written');
	    });
	    /*
	    fs.writeFile(outfile2, code, function() {
			console.log((new Date()).toTimeString() + ' '
				+ Buffer(code).length + ' bytes written to PHP dir');
		    });*/
	});
    } else {
	write();
    }

    // if (DEBUG)
    if (DEV)
	bundle.on('bundle', write);
};


//script that use closure-compiler (not in use)


// https://github.com/weaver/scribbles/blob/master/node/google-closure/lib/closure.js
// / # Google Closure Compiler Service #
// /
// / Compress javascript with Node.js using the Closure Compiler
// / Service.

var sys = require('sys');

// Use the Google Closure Compiler Service to compress Javascript
// code.
//
// + code - String of javascript to compress
// + next - Function callback that accepts.
//
// This method will POST the `code` to the compiler service. If an
// error occurs, `next()` will be called with an `Error` object as the
// first argument. Otherwise, the `next()` will be called with `null`
// as the first argument and a String of compressed javascript as the
// second argument.
//
// compile('... javascript ...', function(err, result) {
// if (err) throw err;
//
// ... do something with result ...
// });
//
// Returns nothing.
function compile(code, next) {
    try {
	var qs = require('querystring'), http = require('http'), host = 'closure-compiler.appspot.com', body = qs
		.stringify({
		    js_code : code.toString('utf-8'),
		    compilation_level : 'ADVANCED_OPTIMIZATIONS',
		    output_format : 'json',
		    output_info : 'compiled_code'
		}), client = http.createClient(80, host).on('error', next), req = client
		.request('POST', '/compile', {
		    'Host' : host,
		    'Content-Length' : body.length,
		    'Content-Type' : 'application/x-www-form-urlencoded'
		});

	req.on('error', next).end(body);

	req.on('response', function(res) {
	    if (res.statusCode != 200)
		next(new Error('Unexpected HTTP response: ' + res.statusCode));
	    else
		capture(res, 'utf-8', parseResponse);
	});

	function parseResponse(err, data) {
	    err ? next(err) : loadJSON(data,
		    function(err, obj) {
			var error;
			if (err)
			    next(err);
			else if ((error = obj.errors || obj.serverErrors
				|| obj.warnings))
			    next(new Error('Failed to compile: '
				    + sys.inspect(error)));
			else
			    next(null, obj.compiledCode);
		    });
	}
    } catch (err) {
	next(err);
    }
}

// Convert a Stream to a String.
//
// + input - Stream object
// + encoding - String input encoding
// + next - Function error/success callback
//
// Returns nothing.
function capture(input, encoding, next) {
    var buffer = '';

    input.on('data', function(chunk) {
	buffer += chunk.toString(encoding);
    });

    input.on('end', function() {
	next(null, buffer);
    });

    input.on('error', next);
}

// Convert JSON.load() to callback-style.
//
// + data - String value to load
// + next - Function error/success callback
//
// Returns nothing.
function loadJSON(data, next) {
    var err, obj;

    try {
	obj = JSON.parse(data);
    } catch (x) {
	err = x;
    }
    next(err, obj);
}

exports.build();
