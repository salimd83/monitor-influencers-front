import _ from "lodash";

/**
 * Better foreach item in object or array.
 *
 * Each item is passed to the function, and additional param can be passed through opts.
 *
 * @param dataArr The data array to be processed
 * @param func The function to be applied. Remember to add async if async is needed.
 * @param opts Additional options that should provided for each item.
 */
export async function betterForEach(dataArr, func, opts = []) {
  return new Promise(function(resolve, reject) {
    var itemsProcessed = 0;
    var resArr = [];

    if (typeof dataArr === "string") {
      dataArr = [dataArr];
    }

    dataArr.forEach((item, index, array) => {
      func(item, opts)
        .then(res => {
          if (!_.isEmpty(res)) {
            resArr.push(res);
          }
          itemsProcessed++;
          if (itemsProcessed === array.length) {
            resolve(resArr);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}
