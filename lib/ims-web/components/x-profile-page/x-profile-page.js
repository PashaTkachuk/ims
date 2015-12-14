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
    handleResponse: function (event, res) {
        if (res.response.status === 'success') {
            this.$.successUpdate.open();
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
    }
});