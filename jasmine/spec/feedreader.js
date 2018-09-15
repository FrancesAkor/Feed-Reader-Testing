/* All the tests are placed within the $() function,
 * so as to ensure they don't run until the DOM is ready  
 * since some of these tests may require DOM elements.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions and
     * the allFeeds variable in the application.
     */
    describe('RSS Feeds', function() {
        /* It defines the spec and tests to make sure that the allFeeds 
         * variable has been defined and that it is not empty.
         */ 
        it('are defined', function() {
    		expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
 
        /* It defines the spec and tests to ensure that each feed in the       
         * allFeeds object has a URL defined and that the URL is not empty.
         */
    	it('each feed URL should be defined and not empty', function() {
           	for(let feed of allFeeds) {
            	expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            } 
        });

        /* It defines the spec and tests to ensure that each feed in the       
         * allFeeds object has a name defined and that the name is not empty.
         */
        it('each feed name should be defined and not empty', function() {
        	for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });

    // This suite is all about the application's menu 
    describe('The menu', function() {
        let menu = $('body').hasClass('menu-hidden');// This returns a boolean.
        // This test ensures that the menu element is hidden by default.
        it('should be hidden by default', function() {
            expect(menu).toBe(true);
        });
         
        // This test ensures that the menu changes visibility when the menu is clicked.
    	it('should change when clicked', function() {
        	const menuIcon = $('.menu-icon-link');
            
            // On the first simulated click
            menuIcon.click();// the click method simulates a mouse click on the menu icon
            menu = $('body').hasClass('menu-hidden');
            
            expect(menu).toBe(false);  
            
            // On the second simulated click
            menuIcon.click();
            menu = $('body').hasClass('menu-hidden');
            
            expect(menu).toBe(true);   
      	});
    });
   
    // This test suite is about Initial Entries
    describe('Initial Entries', function() {
       /* This test to ensure that when loadFeed function is called and completes its work,
        * there is at least a single .entry element within the .feed container.
        */
        let container = $('.feed');// Selects the feed container
        let entry = [];
        // This function finish executing before the spec is run.
        beforeEach(function(done) {
            loadFeed(0, function() {
                entry.push(container.html());// Gets and pushes the first element in the feed container into the entry array
                done(); // The spec would not run until this function is called
            });
        });

        it('should have at least an entry in the feed container', function(done) {
            expect(entry.length).not.toBe(0);
            done(); // The spec won't complete until this function is called.
        }); 
    });

    // This suite is about New Feed Selection
    describe('New Feed Selection', function() {
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */
        let container = $('.feed');
        let entry = [];
        let newEntry = [];
        // This function runs before the spec
        beforeEach(function(done) {
            // This loads the feed and pushes its content into entry array
            loadFeed(0, function() {
                entry.push(container.html());
                done();
            });
            // This loads the second feed and pushes its content into newEntry array
            loadFeed(1, function() {{
                newEntry.push(container.html());
                done();
            }});
        });
         
        // The specification and test
        it('should change content when a new feed is loaded', function(done) {
            expect(entry[0]).not.toEqual(newEntry[0]);
            done();
        });
    });
        
}());
