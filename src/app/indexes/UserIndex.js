import { EsDocument } from 'gocool-elasticsearch';

const schema = {
  userId: 'Integer',
  name: 'String',
  email: 'String',
};

const userIndex = EsDocument.extends('User', schema);

export default userIndex;

export function transform(userModel) {
  const obj = userModel.pick(Object.keys(schema));
  // obj.id = userModel.id;
  obj.userId = userModel.id;

  return obj;
}
