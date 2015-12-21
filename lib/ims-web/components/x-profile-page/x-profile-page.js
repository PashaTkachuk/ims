Polymer({
    is: "x-profile-page",
    attached: function() {
        this.$.profile_img.src = 'profile/'+this.user.avatar;
        app.socket.on('update user feedback', this.handleUpdateEvent.bind(this));
    },
    openEditEmailDialog: function() {
        this.$.editEmailDial.open();
    },
    openEditNameDialog: function() {
        this.$.editNameDial.open();
    },
    openEditPhoneDialog: function() {
        this.$.editPhoneDial.open();
    },
    openEditPasswordDialog: function() {
        this.$.editPasswordDial.open();
    },
    handleUpdateEvent: function (data) {
        if (data.status) {
            this.$.successUpdate.show();
        } else {
            this.$.errorUpdate.show();
        }
    },
    handleUploadResponse: function (data) {
        if (data.status) {
            this.$.successUpdate.show();
            this.$.profile_img.src = 'profile/'+this.user.avatar + '?' + new Date().getTime();
        } else {
            this.$.errorUpdate.show();
        }
    },
    saveEmail: function(){
        var body = {email: this.user.email};
        app.socket.emit('update user', {user_id: this.user.user_id, field: body});
    },
    saveName: function(){
        var body = {name: this.user.name};
        app.socket.emit('update user', {user_id: this.user.user_id, field: body});
    },
    savePhone: function(){
        var body = {phone: this.user.phone};
        app.socket.emit('update user', {user_id: this.user.user_id, field: body});
    },
    changeProfileImage: function(event){
        var file = this.$.file_avatar.files[0];
        var stream = ss.createStream();

        // upload a file to the server.
        ss(app.socket).on('profile-image changed', this.handleUploadResponse.bind(this));
        ss(app.socket).emit('profile-image', stream, {size: file.size, user_id: this.user.user_id});
        ss.createBlobReadStream(file).pipe(stream);
    },
    handleConfirm: function () {
        if (this.password != this.confirmPassword) {
            this.$.pcinput.invalid = true;
        } else if (this.password === this.confirmPassword) {
            this.$.pcinput.invalid = false;
        }
    },
    savePassword: function() {
        if (this.password && this.password == this.confirmPassword) {
            app.socket.emit('update user', {user_id: this.user.user_id, password: this.password});
        }
    }
});