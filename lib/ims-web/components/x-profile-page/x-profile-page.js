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
    handleUploadResponse: function (event, res) {
        if (res.response.status === 'success') {
            this.$.successUpdate.open();
            this.$.profile_img.src = 'profile/'+this.user.avatar + '?' + new Date().getTime();
        } else if (res.response.status === 'error') {
            this.$.errorUpdate.open();
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
        var formData = new FormData();
        formData.append('avatar', this.$.file_avatar.files[0]);
        this.$.uploadNewAvatar.body = formData;
        this.$.uploadNewAvatar.generateRequest();
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