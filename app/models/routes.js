var express = require('express');
var router = express.Router();
var User = require( __dirname + '/user' );
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });


/***************************************************/
/****************** INDEX FORM *********************/
/***************************************************/
router.get( '/', function( req, res ){
    User.find({}, function( err, users ){
        if( err ) throw err;
        res.render( 'index', { users : users, page_title : 'User', title : 'User' } );
    });
});


/***************************************************/
/****************** CREATE FORM **********************/
/***************************************************/
router.get( '/create', function( req, res ){
    res.render( 'create', { page_title : 'Create', title : 'Create New User'} );
});

/***************************************************/
/*********** INSERT : USER INFORMATION *************/
/***************************************************/
router.post( '/insert', upload.single( 'image' ), function( req, res ){
    var user = new User({
        name      : req.body.name,
        user_name : req.body.user_name,
        password  : req.body.password,
        admin     : ( req.body.admin == 'Y' ),
        image     : ( req.file )? '/uploads/' + req.file.filename : '',
        created_at: new Date()
    });

    user.smile( function( err, name ){
        if( err ) throw err;

        console.log( 'Your new name is ' + name );
    });

    user.save( function( err ){
        if( err ) throw err;

        console.log( 'User saved successfully' );
        res.redirect( '/' );
    });
});

/***************************************************/
/****************** EDIT FORM **********************/
/***************************************************/
router.get( '/:id/edit', function( req, res ){
    if ( req.params.id.match(/^[0-9a-fA-F]{24}$/) ) {
        User.findById( req.params.id, function( err, user ){
            if( err ) throw err;

            res.render( 'edit', { user : user, page_title : 'Edit', title : 'Edit User' } );
        });
    }
});

/***************************************************/
/*********** UPDATE : USER INFORMATION *************/
/***************************************************/
router.put( '/:id', upload.single( 'image' ), function( req, res ){
    if ( req.params.id.match(/^[0-9a-fA-F]{24}$/) ) {
        User.findById( req.params.id, function( err, user ){
            if( err ) throw err;

            user.name       = req.body.name;
            user.user_name  = req.body.user_name;
            user.admin      = ( req.body.admin == 'Y' );
            user.image      = ( req.file )? '/uploads/' + req.file.filename : req.body.current_image;
            user.updated_at = new Date();

            user.save( function( err ){
                if( err ) throw err;

                console.log( 'User updated successfully!' );
                res.redirect( '/' );
            });
        });
    }
});

/***************************************************/
/*********** DELETE : USER INFORMATION *************/
/***************************************************/
router.get( '/:id', function( req, res ){
    if ( req.params.id.match(/^[0-9a-fA-F]{24}$/) ) {
        User.findByIdAndRemove( req.params.id, function( err ){
            if( err ) throw err;

            console.log( 'User deleted successfully!' );
            res.redirect( '/' );
        });
    }
});

module.exports = router;