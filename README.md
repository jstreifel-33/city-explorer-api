# City-Explorer API

**Author**: Joseph Streifel

**Version**: 0.1.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

API to be used in tandem with [City Explorer](https://city-explorer-js.netlify.app/) application. Will serve data about an area, based on user location search!

## Getting Started

**Dependencies**: cors, dotenv, express

Ensure that `npm i` is run upon cloning project.

Set **environmental variables** before attempting to use server:

  *`PORT` - the port that the server will serve from.

## Architecture

* Technologies:
  * Node.js
  * JavaScript
* Libraries:
  * cors
  * dotenv
  * express

## Change Log

11-02-21 05:25 PM - Server spun up and local port proof of life completed successfully!
11-02-21 09:03 PM - Server is serving appropriate data array based on user search query!
11-02-21 10:39 PM - Error handling setup for 404
11-02-21 11:16 PM - Error handling for 500, 400, any other

## Credit and Collaborations

Collaboration with [Ben Mills](https://github.com/akkanben) during the planning phase for the web request-response cycle.

## WRRC Breakdown

![wrrc sketch](readme-img/11-02-wrrc.png)

When utilizing this server, the client (city explorer app) will send a request for weather with query parameters attached. When the server see the `/weather` path it will take those parameters and retrieve matching data from static JSON stored in this repository. Upon retrieving data, the server manipulates it a bit to get just date and weather descriptions, before sending the response back to the client in the form of an array.

## Feature Implementation Time Log

| Feature # | Feature Name | Estimated Time | Start Time | End Time | Total Time |
|-----------|--------------|----------------|------------|----------|------------|
| 1 | Set up server | 00:40 | 04:45 PM | 05:31 PM | 0:46 |
| 2 | Placeholder Weather | 01:30 | 05:41 PM | 09:00 PM | 03:19 |
| 3 | Error Handling | 1:00 | 09:10 PM | 11:16 PM | 02:06 |
