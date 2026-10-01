import CollectionCrudView from '@/app/components/admin/CollectionCrudView';
import { newsFields } from '@/lib/admin/fields';

export default function AdminNewsPage() {
  return (
    <CollectionCrudView
      title="Новини"
      description="Новини та анонси на /media."
      apiPath="/api/admin/news"
      fields={newsFields}
      createLabel="Нова новина"
    />
  );
}
