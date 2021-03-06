import os

from flask import Blueprint, render_template
from config import Config

SRC_DIR = os.path.join(Config.BASE_DIR, 'src')
main_bp = Blueprint('main', __name__, template_folder=SRC_DIR, static_folder=SRC_DIR)


@main_bp.route('/')
@main_bp.route('/<path:page>')
def main(page=None):
    return render_template('index.html')
