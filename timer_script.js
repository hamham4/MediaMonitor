// this content script will be located in our extension's /data folder.
function pageLoading(tab){

/*
	-pause the page load
	-get the url of the page that is loading
	-call function to verify that the page is allowed and return the website category
	-verify that there is time remaining to browse a site in this category
	-create a timer that expires after the remaining category time allotment expires
	-if new page is loaded, cancel timer and decrement remaining time allotment from category
	-when the timer's callback function is called it needs to remove all content from the DOM,
	 set the remaining time to zero, and notify the user that time has expired.
*/
};
