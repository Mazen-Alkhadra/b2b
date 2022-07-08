
const Model = require('../model');
const StringModel = require('../resource').String;

class Faq extends Model {
  static TABLE_NAME = 'faqs';
  static PRIMARY_KEY = 'id_faq';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        faqs;`
      

    let dataQuery =
      `SELECT
        id_faq idFaq,
				fun_get_string(NULL, question_str_id)	questionEn,
				fun_get_string(NULL, answer_str_id)	answerEn,
				is_active	isActive
      FROM
        faqs`;

    let queryStr = countQuery + dataQuery;

    queryStr = this.applyFilters(dataQuery, filters) || queryStr;
    queryStr += this.getOrderClause(sorts);
    queryStr += this.getLimitClause({ limit, skip });


    let dbRet = await this.directQuery(queryStr);

    return {
      allCount: dbRet[0][0].allCount,
      data: dbRet[1]
    };

  }

  async addNew({
    questionEn, answerEn, isActive
  }) {
    let strModel = StringModel.create();
    let questionStrId = await strModel.addNewString({enStr: questionEn});
    let answerStrId = await strModel.addNewString({enStr: answerEn});

    let dbRet = await this.directQuery (
      'CALL prc_add_faq(?, @new_record_id);',
      [questionStrId, answerStrId, isActive]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idFaq, questionEn, answerEn, isActive
  }) {
    let strModel = StringModel.create();
    await strModel.updateString({
      tableName: Faq.TABLE_NAME,
      idColName: Faq.PRIMARY_KEY,
      idColValue: idFaq,
      strColName: 'question_str_id',
      enStr: questionEn
    });

    await strModel.updateString({
      tableName: Faq.TABLE_NAME,
      idColName: Faq.PRIMARY_KEY,
      idColValue: idFaq,
      strColName: 'answer_str_id',
      enStr: answerEn
    });

    await this.directQuery (
      'CALL prc_update_faq(?);',
      [idFaq, isActive]
    );
  }

  async delete({ idFaq }) {
    await this.directQuery (
      'CALL prc_delete_faq(?);',
      idFaq
    );
  }

}

module.exports = {
  create: () => new Faq
};
