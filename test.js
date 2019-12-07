const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const request = {
    config: {
	encoding: encoding,
	sampleRateHertz: sampleRateHertz,
	languageCode: languageCode,
    },
    interimResults: false, // If you want interim results, set this to true
};

// Create a recognize stream
    const recognizeStream = client
.streamingRecognize(request)
    .on('error', console.error)
    .on('data', data =>
	    process.stdout.write(
		data.results[0] && data.results[0].alternatives[0]
		? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
		: `\n\nReached transcription time limit, press Ctrl+C\n`
		)
       );

    /*
    // Start recording and send the microphone input to the Speech API
    record
    .record({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    recorder: 'rec', // Try also "arecord" or "sox"
    silence: '10.0',
    })
    .stream()
    .on('error', console.error)
    .pipe(recognizeStream);

    console.log('Listening, press Ctrl+C to stop.');
    */

    var http = require('http');
    var fs = require('fs');
    var app = http.createServer(function(request,response){
	var url = request.url;
	if(request.url == '/'){
	    url = '/index.html';
	}
	if(request.url == '/favicon.ico'){
	    response.writeHead(404);
	    response.end();
	    return;
	}
	response.writeHead(200);
	response.end(fs.readFileSync(__dirname + url));

    });
app.listen(3000);

function hello() {
    console.log('haha');
}
