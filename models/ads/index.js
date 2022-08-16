
const Model = require('../model');

class Ad extends Model {
  static TABLE_NAME = 'ads';
  static PRIMARY_KEY = 'id_ad';

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        ads;`
      

    let dataQuery =
      `SELECT
        id_ad	idAd,
				fun_get_img(img_id) imgUrl,
			  url,
			  duration_ms durationMs,
			  is_active isActive
      FROM
        ads`

    let queryStr = countQuery + dataQuery;

    let filteredQuery = this.applyFilters(dataQuery, filters);
    queryStr = filteredQuery.finalQuery || queryStr;
    queryStr += this.getOrderClause(sorts);
    queryStr += this.getLimitClause({ limit, skip });


    let dbRet = await this.directQuery(queryStr);

    return {
      allCount: dbRet[0][0].allCount,
      data: dbRet[1]
    };

  }

  async addNew({
    imgUrl, url, durationMs, isActive
  }) {

    let dbRet = await this.directQuery (
      'CALL prc_add_ad(?, @new_record_id);',
      [imgUrl, url, durationMs, isActive]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async update({
    idAd, imgUrl, url, durationMs, isActive
  }) {
    await this.directQuery (
      'CALL prc_update_ad(?);',
      [idAd, imgUrl, url, durationMs, isActive]
    );
  }

  async delete({ idAd }) {
    await this.directQuery (
      'CALL prc_delete_ad(?);',
      idAd
    );
  }

}

module.exports = {
  create: () => new Ad
};
