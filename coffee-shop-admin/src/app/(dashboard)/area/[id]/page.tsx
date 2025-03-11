import ProductTemplate from '../ProductTemplate';

export default async function EditAddressPage() {
  // console.log("params is : ", props.params);
  return <ProductTemplate />;
}

export async function generateStaticParams() {
  return [{ id: '_id_' }];
}
