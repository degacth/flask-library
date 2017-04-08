import os

import requests
from selenium import webdriver
from flask_testing import LiveServerTestCase
from application import app, db
from config import Config


class BaseLiveTestCase(LiveServerTestCase):
    driver = None

    def create_app(self):
        app.config['LIVESERVER_PORT'] = 5500
        app.config['LIVESERVER_TIMEOUT'] = 10
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    @classmethod
    def setUpClass(cls):
        LiveServerTestCase.setUpClass()
        cls.driver = webdriver.Chrome(os.path.join(Config.BASE_DIR, 'tests', 'chromedriver'))

    @classmethod
    def tearDownClass(cls):
        LiveServerTestCase.tearDownClass()
        cls.driver.quit()


class MainTestCase(BaseLiveTestCase):
    def test_urls_on_same_index(self):
        res = requests.get(self.get_server_url())
        self.assertEqual(res.status_code, 200)

        res = requests.get(self.get_server_url() + '/some/other/page')
        self.assertEqual(res.status_code, 200)
        self.assertTrue('<my-app>' in res.text)
