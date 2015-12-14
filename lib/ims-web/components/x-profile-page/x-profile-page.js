Polymer({
    is: "x-profile-page",
    attached: function() {
      this.$.profile_img.src = 'profile/'+this.user.avatar;
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
    handleResponse: function (event, res) {
        if (res.response.status === 'success') {
            this.$.successUpdate.open();
        } else if (res.response.status === 'error') {
            this.$.errorUpdate.open();
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
        this.reqBody = '{"email":"' + this.user.email + '"}';
        this.$.changeProfileReq.generateRequest();
    },
    saveName: function(){
        this.reqBody = '{"name":"' + this.user.name + '"}';
        this.$.changeProfileReq.generateRequest();
    },
    savePhone: function(){
        this.reqBody = '{"phone":"' + this.user.phone + '"}';
        this.$.changeProfileReq.generateRequest();
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
            this.reqBody = '{"password":"' + this.password + '"}';
            this.$.changeProfileReq.generateRequest();
        }
    }
});