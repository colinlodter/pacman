'use strict';

const opentelemetry = require('@opentelemetry/api');
const tracer = opentelemetry.trace.getTracer('clodter_pacman');

var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
var _db;

function Database() {
    tracer.startActiveSpan('database.connect', (span) => {
        this.connect = function(app, callback) {
            MongoClient.connect(config.database.url, config.database.options, function (err, db) {
                if (err) {
                    span.setAttribute('database.accesible', 'false');
                    span.setStatus({ code: opentelemetry.SpanStatusCode.ERROR, message: err });
                    span.addEvent('Failed to connect to database server', { 'log.severity': 'error', 'log.message': err });
                    console.log(err);
                    console.log(config.database.url);
                    console.log(config.database.options);
                } else {
                    span.setAttribute('database.accesible', 'true');
                    _db = db;
                    app.locals.db = db;
                }
                callback(err);
            });

            span.end();
        }
    });

    tracer.startActiveSpan('database.getDb', (span) => {
        this.getDb = function(app, callback) {
            if (!_db) {
                this.connect(app, function(err) {
                    if (err) {
                        span.setAttribute('database.accesible', 'false');
                        span.setStatus({ code: opentelemetry.SpanStatusCode.ERROR, message: err });
                        span.addEvent('Failed to connect to database server', { 'log.severity': 'error', 'log.message': err });
                        console.log('Failed to connect to database server');
                    } else {
                        span.setAttribute('database.accesible', 'true');
                        console.log('Connected to database server successfully');
                    }

                    callback(err, _db);
                });
            } else {
                callback(null, _db);
            }
        }

        span.end();
    });
}

module.exports = exports = new Database(); // Singleton
