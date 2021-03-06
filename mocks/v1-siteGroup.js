/**
 * Created by AXH12 on 11/9/2016.
 */
var mocks = [];
var schemas = require('../schemas/schemas');

var getSiteGroupsByOrganizationID = {
    name: 'getSiteGroupsByUser',
    mockRoute: '\/api\/v1\/site-groups\/organization-id\/\\d+$', //a regex for the route, ex. '\/api\/steps\/.*\/users' is a valid
    // route
    testScope: 'success', //success=200 & a scenario response | notFound=404 | error=500 and there's many more...
    testScenario: 'multipleResults',  //change this to one of hte scenario names below and restart the mock server to get new data
    latency: '500-3000', //add this line ot implement 1-5 seconds of random latency per call
    jsonTemplate: [
        {
            //you can use regular javascript to create objects to be served
            multipleResults: function () {
                var result = [];
                var count = 30;
                for (var i = 0; i < count; i++) {
                    result.push(schemas.siteGroup);
                }
                var wellKnown = JSON.parse(JSON.stringify(schemas.siteGroup));
                wellKnown.siteGroupID = schemas.wellKnown.siteGroup;
                result[0] = wellKnown;
                return JSON.stringify({
                    result:result,
                    count: count
                });
            }
        },
        {
            noResults: function(){
                return JSON.stringify({
                    result:[],
                    count:0
                });
            }
        }
    ]
};
mocks.push(getSiteGroupsByOrganizationID);

var getSiteGroupsSitesBySiteGroupID = {
    name: 'getSiteGroupsSitesBySiteGroupID',
    mockRoute: '\/api\/v1\/site-group-sites\/site-group-id\/\\d+$', //a regex for the route, ex. '\/api\/steps\/.*\/users' is a valid
    // route
    testScope: 'success', //success=200 & a scenario response | notFound=404 | error=500 and there's many more...
    testScenario: 'multipleResults',  //change this to one of hte scenario names below and restart the mock server to get new data
    latency: '500-3000', //add this line ot implement 1-5 seconds of random latency per call
    jsonTemplate: [
        {
	        singleResult: function () {
		        var result = [];
		        result.push(schemas.siteGroupBySiteGroupID);
		        return JSON.stringify({
			        result: result,
			        count: 1
		        });
	        }
        },
        {
	        multipleResults: function () {
		        var result = [];
		        var count = 30;
		        for (var i = 0; i < count; i++) {
			        result.push(schemas.siteGroupBySiteGroupID);
		        }
		        return JSON.stringify({
			        result:result,
			        count: count
		        });
	        }
        },
        {
            noResults: function(){
                return JSON.stringify({
                    result:[],
                    count:0
                });
            }
        }
    ]
};
mocks.push(getSiteGroupsSitesBySiteGroupID);

var deleteSiteGroups = {
    name: 'getSiteGroupsByUser',
    mockRoute: '\/api\/v1\/site-groups\/\\d+$',
    testScope: 'conflict',
    testScenario: 'noResults',
    latency: '500-3000',
    method: 'DELETE',
    jsonTemplate: [
        {
            noResults: function(){
                return JSON.stringify({
                    result:[],
                    count:0
                });
            }
        }
    ]
};
mocks.push(deleteSiteGroups);


exports.mocks = mocks;
