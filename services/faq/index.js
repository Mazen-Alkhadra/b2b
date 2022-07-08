const FaqModel = require('../../models').Faq;

class Faq {
  faqModel = FaqModel.create();

  async getAllFullInfo({ limit, skip, filters, sorts }) {
    return await this.faqModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async addNew({
    questionEn, answerEn, isActive
  }) {
    await this.faqModel.addNew({
      questionEn, answerEn, isActive
    });
  }

  async update({
    idFaq, questionEn, answerEn, isActive
  }) {
    await this.faqModel.update({
      idFaq, questionEn, answerEn, isActive
    });
  }

  async delete({ idFaq }) {
    await this.faqModel.delete({ idFaq });
  }

}


module.exports = {
  create: () => new Faq
};