const NotificationModel = require('../../../models/notification');

class NotifyDevice {
  
  notifyDeviceModel = NotificationModel.NotifyDevice.create();

  async getNotifyUsersDevices ({
    usersIds
  }) {
    return await this.notifyDeviceModel.getNotifyUsersDevices ({
      usersIds
    });
  }
 
  async addNew ({
    userId, token
  }) {
  
    return await this.notifyDeviceModel.addNew ({
      userId, token
    });
  }

  async delete ({
    deviceId, userId, token
  }) {
    await this.notifyDeviceModel.delete({
      deviceId, userId, token
    });
  }

  async reset ({ 
    userId, tokens
  }) {
    await this.notifyDeviceModel.reset({userId, tokens});
  }

}


module.exports = {
  create: () => new NotifyDevice
};