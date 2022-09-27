
const SettingModel = require('../../models').Setting;

class Setting {

  settingModel  = SettingModel.create();

  async getAll ({limit, skip, filters, sorts}) {
    return await this.settingModel.getAll({limit, skip, filters, sorts});
  }

  async add ({idSetting, nameEn, value}) {
    return await this.settingModel.add({idSetting, nameEn, value});
  }

  async update ({idSetting, nameEn, value}) {
    return await this.settingModel.update({idSetting, nameEn, value});
  }

  async delete ({idSetting}) {
    return await this.settingModel.delete({idSetting});
  }
}

module.exports = {
  create: () => new Setting
};
