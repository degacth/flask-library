import os

import requests
from selenium import webdriver
from flask_testing import LiveServerTestCase
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from application import app, db
from application.library.fixtures import generate
from config import Config


class BaseLiveTestCase(LiveServerTestCase):
    driver = None
    wait_time = 1

    def create_app(self):
        app.config['LIVESERVER_PORT'] = 5500
        app.config['LIVESERVER_TIMEOUT'] = 10
        db.create_all()
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    @classmethod
    def setUpClass(cls):
        drv = webdriver.Chrome(os.path.join(Config.BASE_DIR, 'tests', 'chromedriver'))
        drv.implicitly_wait(cls.wait_time)
        cls.driver = drv

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()


class MainTestCase(BaseLiveTestCase):
    def test_urls_on_same_index(self):
        res = requests.get(self.get_server_url())
        self.assertEqual(res.status_code, 200)

        res = requests.get(self.get_server_url() + '/some/other/page')
        self.assertEqual(res.status_code, 200)
        self.assertTrue('<app>' in res.text)

    def test_home_page(self):
        generate(10, 20)
        drv = self.driver
        drv.get(self.get_server_url())

        self.assertEqual(drv.find_element_by_css_selector('.uk-heading-large').text, 'Flask Library')
        self.assertEqual(drv.current_url, self.get_server_url() + '/')
        self.assertEqual(drv.find_element_by_css_selector('#home-author-link .counter').text, '10')
        self.assertEqual(drv.find_element_by_css_selector('#home-book-link .counter').text, '20')

    def test_not_found(self):
        self.driver.get(self.get_server_url() + '/page/not/found/')
        self.assertTrue(self.driver.find_element_by_css_selector('h3').text.startswith('404'))


class AuthorTestCase(BaseLiveTestCase):
    authors_count = 30
    list_items = 10
    name_author_control = '[formcontrolname=name]'
    submit_button = 'button[type=submit]'

    def setUp(self):
        generate(self.authors_count, 0)
        BaseLiveTestCase.setUp(self)
        self.driver.get(self.get_server_url())
        self.driver.find_element_by_css_selector('#author-menu-link').click()

    def test_author_list_page(self):
        self.assertEqual(len(self.driver.find_elements_by_css_selector('author table tbody tr')), self.list_items)

    def test_author_pagination(self):
        paginator = self.driver.find_element_by_css_selector('paginator')
        last_link = paginator.find_element_by_css_selector('li:last-child a')
        self.assertEqual(last_link.text, str(int(self.authors_count / self.list_items)))

        get_first_author_id = lambda: self.driver.find_element_by_css_selector('author tbody tr:first-child td').text
        first_author_id = get_first_author_id()
        last_link.click()
        self.assertNotEqual(first_author_id, get_first_author_id())
        self.assertEqual(self.driver.find_element_by_css_selector('author tbody tr:last-child td').text,
                         str(self.authors_count))

    def test_edit_author(self):
        first_author = self.driver.find_element_by_css_selector('author tbody tr:first-child')
        first_author_name = first_author.find_element_by_css_selector('td:nth-child(2)').text
        first_author.find_element_by_css_selector('a.edit-link').click()

        addition_text = 'test'
        self.driver.find_element_by_css_selector(self.name_author_control).send_keys(addition_text)
        self.driver.find_element_by_css_selector(self.submit_button).click()

        self.assertEqual(first_author_name + addition_text, self.get_first_author_name())

    def test_add_author(self):
        author_name = 'test author name'
        self.driver.find_element_by_css_selector('#author-menu-add').click()
        self.driver.find_element_by_css_selector(self.name_author_control).send_keys(author_name)
        self.driver.find_element_by_css_selector(self.submit_button).click()

        self.driver.find_element_by_css_selector('paginator li:last-child a').click()
        self.assertEqual(author_name, self.get_last_author_name())

    def test_delete_author(self):
        get_first_autor_row = lambda: self.driver.find_element_by_css_selector('author tbody tr:first-child')
        get_first_author_id = lambda: get_first_autor_row().find_element_by_css_selector('td:first-child')
        OK_button_selector = '.uk-modal-dialog .js-modal-confirm'

        id = get_first_author_id()
        get_first_autor_row().find_element_by_css_selector('a.remove-link').click()
        self.driver.find_element_by_css_selector(OK_button_selector).click()

        # check for TR is removed
        WebDriverWait(self.driver, self.wait_time) \
            .until_not(EC.presence_of_element_located(
            (By.CSS_SELECTOR, 'author tbody tr:nth-child(%s)' % self.list_items))
        )
        self.assertNotEqual(id, get_first_author_id())

    def get_first_author_name(self):
        return self.get_nth_author_name('first-child')

    def get_last_author_name(self):
        return self.get_nth_author_name('last-child')

    def get_nth_author_name(self, nth):
        return self.driver.find_element_by_css_selector('author tbody tr:%s td:nth-child(2)' % nth).text
