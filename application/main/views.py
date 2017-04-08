from flask import Blueprint, render_template

main_bp = Blueprint('main', __name__, static_folder='src', template_folder='src')


@main_bp.route('/*')
def main():
    return render_template('index.html')
