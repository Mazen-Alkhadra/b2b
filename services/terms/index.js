const TermModel = require('../../models').Terms;

class Term {
  termModel = TermModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.termModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    contentEn, isActive
  }) {
    await this.termModel.addNew({
      contentEn, isActive
    });
  }

  async update({
    idTerm, contentEn, isActive
  }) {
    await this.termModel.update({
      idTerm, contentEn, isActive
    });
  }

  async delete({ idTerm }) {
    await this.termModel.delete({ idTerm });
  }

}


module.exports = {
  create: () => new Term
};