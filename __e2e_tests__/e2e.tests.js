/*
 * Empty for now...
 */
var Application = require('spectron').Application;
var assert = require('assert');

describe('Application launch', function () {
    this.timeout(10000)
   
    beforeEach(function () {

      this.app = new Application({
        path: '/Users/dylandibenedetto/Documents/School/Oberlin2018-19/hci/final_project/tm_clean/tm_erw/dist/mac/task_manager.app/Contents/MacOS/task_manager'
      }); 
      
      return this.app.start()
    })
   
    afterEach(function () {
      if (this.app && this.app.isRunning()) {
        return this.app.stop()
      }
    })
   
    it('shows an initial window', function () {
      return this.app.client.getWindowCount().then(function (count) {
        assert.equal(count, 1)
        // Please note that getWindowCount() will return 2 if `dev tools` are opened.
        // assert.equal(count, 2)
      })
    })
  })