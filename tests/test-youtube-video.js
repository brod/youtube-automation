export default {

// Tests:
// Case 1: Search 
// Case 2: Playing and pausing a video 
// Case 3: Turn on close captioning (referenced in the photo below)
// Case 4: Change play speed (in settings referenced in the photo below)

  'Search': (browser) => {
    browser
      .url('https://youtube.com')
      .waitForElementPresent('input[id="search"]', 5000)
      .keys('vsauce homonym')
      .click('button[id="search-icon-legacy"]')
      .pause(3000)
      .waitForElementPresent('#video-title', 5000);
      // Checks is page successfully redirected to results page
    browser.expect.element('#result-count').text.to.contain('results')
  },

  'Playing and pausing a video': (browser) => {
    browser
      .click('[title="Homonyms"]')
      // Waiting for skip ad. Normally I would run an iterative check on this
      .pause(8000)
      .click(".videoAdUiSkipButton")

    browser
      .click(".videoAdUiSkipButton")
      .pause(1000)
      .click(".ytp-play-button")
      // Checks if video is playing
      .waitForElementPresent('[aria-label="Play"]', 5000)
      .pause(1000)
      .click(".ytp-play-button")
      // Checks if video is paused
      .waitForElementPresent('[aria-label="Pause"]', 5000)
      .pause(1000);
    browser.expect.element('[aria-label="Pause"]').to.be.present
  },

  'Turn on close captioning (referenced in the photo below)': (browser) => {
    browser
      .moveTo('[title="Subtitles/closed captions"]')
      .pause(1000)
      .click('[title="Subtitles/closed captions"]')
      // Checks Subtitles is toggled On
      .waitForElementPresent('[aria-pressed="true"]', 5000)
      .pause(1000);
  },

  'Change play speed (in settings referenced in the photo below)': (browser) => {
    browser
      .moveTo('[title="Settings"]')
      .pause(1000)
      .click('[title="Settings"]')
      .pause(1000);
      // Code block below is not working for some reason
      // Clicking Speed option
      // .moveTo('.ytp-menuitem-content'[2])
      // .click('.ytp-menuitem-content'[2])
      // .pause(3000)
      // Clicking 1.5 speed
      // .moveTo('.ytp-menuitem-label'[5]).click()
      // .click('.ytp-menuitem-label')[5].click()
    browser.execute(function(data) {
      document.querySelectorAll('.ytp-menuitem-label')[2].click()
      document.querySelectorAll('.ytp-menuitem-label')[6].click()
      return true;
    });
  }
}
