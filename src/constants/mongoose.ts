const ModelName = {
  user: 'User',
  sku: 'Sku',
  category: 'Category',
  attribute: 'Attribute',
  uom: 'Uom',
  tag: 'Tag',
  product: 'Product',
  price: 'Price',
  coupon: 'Coupon',
  province: 'Province',
  district: 'District',
  ward: 'Ward',
};

const CollectionName = {
  user: 'user',
  sku: 'sku',
  category: 'category',
  attribute: 'attribute',
  uom: 'uom',
  tag: 'tag',
  product: 'product',
  price: 'price',
  coupon: 'coupon',
  province: 'province',
  district: 'district',
  ward: 'ward',
};

const TimestampSchema = {
  createDate: 'create_date',
  updateDate: 'update_date',
};

export const mongooseConstants = { ModelName, CollectionName, TimestampSchema };
