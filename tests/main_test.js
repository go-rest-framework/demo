Feature('Main');

Scenario('test main page work', (I) => {
    I.amOnPage('/');
    I.see('greeschenko/gulp-starter');
});
