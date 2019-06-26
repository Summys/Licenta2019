import fs from 'fs'
import mkdirp from 'mkdirp'
import shortid from 'shortid'
import uri from 'path'
const UPLOAD_DIR = uri.resolve('.').split(uri.sep + '.meteor')[0]+'/public/images'
// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR)

const storeFS = ({ stream, filename }) => {
  const id = `${shortid.generate()}-${filename}`;
  let path = `${UPLOAD_DIR}/${id}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => {
        path = `http://192.168.0.118:3000/images/${id}` //Meteor.settings
        resolve({ id, path })
      })
  );
};

const storeDB = (file, db) => {
  const _id = db.uploads.insert({ ...file })
  return db.uploads.findOne(_id)
}

const processUpload = async (upload, db) => {
  console.log('UPLOAD', upload)
    const { stream, filename, mimetype } = await upload
    const { id, path } = await storeFS({ stream, filename })
    console.log('id', id)
    return storeDB({ id, path, filename, mimetype }, db)
  }

export default {
  Query: {
    uploads(_, { filters, options }, { db }, ast) {
      $filters = filters;
      $options = options;
      const upload = db.uploads
        .astToQuery(ast, {
          $filters,
          $options,
        })
        .fetch();
      return upload;
    },
  },
  Mutation: {
    singleUpload: (obj, { file }, { db }) => processUpload(file, db)
  }
};
