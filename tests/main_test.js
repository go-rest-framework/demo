Feature('Main Backend');

Scenario('TestLogin', async (I) => {
    I.amOnPage('/');
    I.waitForElement('#loginsubmit', 5);
    I.click('#loginsubmit');
    I.wait(3);
    I.see('non zero value required');
    I.fillField('#loginemail', 'wrongemail');
    I.click('#loginsubmit');
    I.wait(3);
    I.see('does not validate as email');
    I.fillField('#loginemail', 'wrongemail@email.com');
    I.fillField('#loginpassword', 'wrongpassword');
    I.click('#loginsubmit');
    I.wait(3);
    I.see('User not found or wrong password');
    I.fillField('#loginemail', 'admin@admin.a');
    I.fillField('#loginpassword', 'adminpass');
    I.click('#loginsubmit');
    I.wait(3);
    I.see('Statistic');
});

Scenario('TestUsersSuccess', async (I) => {
    I.amOnPage('/');
    I.waitForElement('#loginsubmit', 5);
    I.fillField('#loginemail', 'admin@admin.a');
    I.fillField('#loginpassword', 'adminpass');
    I.click('#loginsubmit');
    I.wait(3);
    I.click('#users_menu_btn');
    I.waitForElement('#users_search_all', 5);
    let n = await I.grabNumberOfVisibleElements('.card');
    if (n == 0) {
        I.see('dont see any card elements');
    }

    I.click('#user_add_btn');
    I.waitForElement('#user_form', 5);

    I.fillField('#user_form_email', 'testemail1@test.com');
    I.fillField('#user_form_password', 'testpass');
    I.fillField('#user_form_repassword', 'testpass');
    I.selectOption('#user_form_role', 'user');

    I.fillField('#user_form_firstname', 'test_firstname');
    I.fillField('#user_form_middlename', 'test_middlename');
    I.fillField('#user_form_lastname', 'test_lastname');
    I.fillField('#user_form_phone', '555 55 55');

    I.attachFile('#user_form_avatar', 'data/test_pic.png');

    I.click('#user_form_submit');
    I.waitForText('New user successfully created', 10);
    I.see('testemail1@test.com');
    I.see('#users_search_all');

    I.fillField('#users_search_all', 'testtesttest');
    I.wait(5);
    let n1 = await I.grabNumberOfVisibleElements('.card');
    if (n1 != 0) {
        I.see('search not existing user error');
    }

    I.fillField('#users_search_all', 'testemail1');
    I.wait(5);
    let n2 = await I.grabNumberOfVisibleElements('.card');
    if (n2 != 1) {
        I.see('search existing user error');
    }

    //TODO test sort

    I.click('.edit_btn');
    I.waitForElement('#user_form', 5);
    I.fillField('#user_form_firstname', 'test_firstname2');
    I.fillField('#user_form_password', 'newtestpass');
    I.fillField('#user_form_repassword', 'newtestpass');
    I.click('#user_form_submit');
    I.waitForText('User successfully updated', 10);
    I.fillField('#users_search_all', 'test_firstname2');
    I.wait(5);
    let n3 = await I.grabNumberOfVisibleElements('.card');
    if (n3 != 1) {
        I.see('search by new firstname not work');
    }

    I.click('#logout');
    I.waitForElement('#loginsubmit', 5);

    I.fillField('#loginemail', 'testemail1@test.com');
    I.fillField('#loginpassword', 'newtestpass');
    I.click('#loginsubmit');
    I.waitForElement('#logout', 5);

    I.click('#logout');
    I.waitForElement('#loginsubmit', 5);

    I.fillField('#loginemail', 'admin@admin.a');
    I.fillField('#loginpassword', 'adminpass');
    I.click('#loginsubmit');
    I.wait(3);
    I.click('#users_menu_btn');
    I.waitForElement('#users_search_all', 5);
    let n4 = await I.grabNumberOfVisibleElements('.card');
    if (n4 != 1) {
        I.see('search by test user not work');
    }

    I.click('#delete_btn');
    I.wait(3);
    I.acceptPopup();
    I.waitForText('User delete successfully', 10);
});

Scenario('TestElementsSuccess', async (I) => {
    I.amOnPage('/');
    I.waitForElement('#loginsubmit', 5);
    I.fillField('#loginemail', 'admin@admin.a');
    I.fillField('#loginpassword', 'adminpass');
    I.click('#loginsubmit');
    I.wait(3);
    I.click('#contents_menu_btn');
    I.waitForElement('#elements_search_all', 5);

    I.click('#element_add_btn');
    I.waitForElement('#element_form', 5);
    I.fillField('#element_form_urld', 'testelement');
    I.fillField('#element_form_title', 'testelement title');
    I.fillField('#element_form_description', 'testelement description');
    I.fillField('#element_form_content', 'test test test');
    I.fillField('#element_form_meta_title', 'testelement meta title');
    I.fillField('#element_form_meta_descr', 'testelement meta description');
    I.fillField('#element_form_tags', 'test, testing');
    I.selectOption('#element_form_status', 'active');
    I.click('#element_form_submit');
    I.waitForText('New element successfully created', 10);
    I.see('testelement title');
    I.see('#users_search_all');

    I.fillField('#users_search_all', 'no testelement title');
    I.wait(5);
    let n1 = await I.grabNumberOfVisibleElements('.card');
    if (n1 != 0) {
        I.see('search not existing element error');
    }

    I.fillField('#users_search_all', 'testelement title');
    I.wait(5);
    let n2 = await I.grabNumberOfVisibleElements('.card');
    if (n2 != 1) {
        I.see('search existing element error');
    }

    //TODO test sort

    I.click('.edit_btn');
    I.waitForElement('#element_form', 5);

    I.fillField('#element_form_title', 'testelement title2');

    I.click('#user_form_submit');
    I.waitForText('Element successfully updated', 10);
    I.fillField('#users_search_all', 'testelement title2');
    I.wait(5);
    let n3 = await I.grabNumberOfVisibleElements('.card');
    if (n3 != 1) {
        I.see('search by new title not work');
    }

    I.click('#delete_btn');
    I.wait(3);
    I.acceptPopup();
    I.waitForText('Element delete successfully', 10);

});
