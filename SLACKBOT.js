var FS = require('fs');
var MARKOV = require('markoff');
var MARK = new MARKOV();
var API = require('slack-api');
var sample = require( 'lodash/collection/sample' );

function ISLOUD(MSG)
{
    return MSG !== MSG.toLowerCase() && MSG === MSG.toUpperCase();
}

var STARTERFILE = __dirname + '/STARTERS';
var STARTERS = FS.readFileSync(STARTERFILE, 'UTF8');
STARTERS = STARTERS.trim().split(/\n/);

var SAVEFILE = __dirname + '/LOUDS';
var SAVING = false;
var WAITING = [];

var LOUDBOT = module.exports = function LOUDBOT()
{
    if (!(this instanceof LOUDBOT))
        return new LOUDBOT();

    var THIS = this;

    try
    {
        THIS.LOUDS = FS.readFileSync(SAVEFILE, 'UTF8').trim().split('\n');
    }
    catch (ERRRRROR)
    {
        THIS.LOUDS = [];
    }

    THIS.LOUDS = THIS.LOUDS.concat(STARTERS);

    THIS.LOUDS.forEach(function(LOUD)
    {
        MARK.addTokens(LOUD.split(/\s+/g));
    });
};

LOUDBOT.prototype.LISTENUP = function LISTENUP(DATA)
{
    return sample( this.LOUDS );
};

LOUDBOT.prototype.THELOUDS = function THELOUDS()
{
    return this.LOUDS;
};
