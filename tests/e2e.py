import os

import requests
from selenium import webdriver
from flask_testing import LiveServerTestCase
from application import app, db
from application.library.fixtures import generate
from config import Config


class BaseLiveTestCase(LiveServerTestCase):
    driver = None

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
        drv.implicitly_wait(1)
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
        self.assertEqual(drv.current_url, self.get_server_url() + '/home')
        self.assertEqual(drv.find_element_by_css_selector('#home-author-link .counter').text, '10')
        self.assertEqual(drv.find_element_by_css_selector('#home-book-link .counter').text, '20')


class AuthorTestCase(BaseLiveTestCase):
    def setUp(self):
        generate(30, 0)
        BaseLiveTestCase.setUp(self)
        self.driver.get(self.get_server_url())
        self.driver.find_element_by_css_selector('#author-menu-link').click()

    def test_author_list_page(self):
        self.assertEqual(len(self.driver.find_elements_by_css_selector('author table tbody tr')), 10)

    def test_author_pagination(self):
        paginator = self.driver.find_element_by_css_selector('paginator')
        last_link = paginator.find_element_by_css_selector('li:last-child a')
        self.assertEqual(last_link.text, '3')

        get_first_author_id = lambda: self.driver.find_element_by_css_selector('author tbody tr:first-child td').text
        first_author_id = get_first_author_id()
        last_link.click()
        self.assertNotEqual(first_author_id, get_first_author_id())
        self.assertEqual(self.driver.find_element_by_css_selector('author tbody tr:last-child td').text, '30')
