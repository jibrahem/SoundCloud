from flask import Blueprint, jsonify, redirect, render_template
from flask_login import login_required, current_user
from ..models import Image, User, db
from app.forms import ImageForm

image_routes = Blueprint("images", __name__)

#get all images, add user info to their image
@image_routes.route('/')
@login_required
def get_all_images():
    images = Image.query.all()
    for image in images:
        return {'images' : [image.to_dict() for image in images]}


#get image by id
@image_routes.route('/<int:id>')
@login_required
def get_image(id):
    image = Image.query.get(id)
    return image.to_dict()


#Delete a users image
@image_routes.route('/delete/<int:id>')
@login_required
def delete_image(id):
    image_to_delete = Image.query.get(id)
    db.session.delete(image_to_delete)
    db.session.commit()
    return {'image': 'your image has been deleted'}


#Edit an image for user, DOESNT WORK
@image_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_image(id):
    form = ImageForm()
    print('gtryhfueijdHELOOOOOOOOO', Image.query.get(id))

    if form.validate_on_submit():
        image_to_update = Image.query.get(id)
        print('IMAGEEEEEEEEEE')

        image_to_update.img = form.data['img']
        image_to_update.view_count = form.data['view_count']
        image_to_update.user_id = current_user.id
        image_to_update.title = form.data['title']
        image_to_update.description = form.data['description']
        db.session.commit()
        return render_template('simple_form', form=form)
    return {'bye': 'bad data'}


#get all images for logged in user
@image_routes.route('/current')
@login_required
def get_logged_user_images():
    images = Image.query.filter(Image.user_id == current_user.id).all()
    return {'images' : [image.to_dict() for image in images]}


#Get all images for a certain user
@image_routes.route('/user/<int:userId>')
@login_required
def get_user_images(userId):
    images = Image.query.filter(Image.user_id == userId).all()
    return {'images' : [image.to_dict() for image in images]}


#post an image
@image_routes.route('/<int:userId>/images', methods=['POST'])
@login_required
def post_image(userId):
    form = ImageForm()
    if form.validate_on_submit():
        title = form.data['title']
        description = form.data['description']
        img = form.data['img']
        new_image = Image(title=title, description=description, img=img, view_count=0, user_id=userId)
        db.session.add(new_image)
        db.session.commit()
        return 'that worked'
    return 'bad data'