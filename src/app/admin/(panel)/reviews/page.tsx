import CollectionCrudView from '@/app/components/admin/CollectionCrudView';
import { reviewFields } from '@/lib/admin/fields';

export default function AdminReviewsPage() {
  return (
    <CollectionCrudView
      title="Відгуки"
      description="Блок відгуків спільноти на сторінці «Про нас»."
      apiPath="/api/admin/reviews"
      fields={reviewFields}
      createLabel="Новий відгук"
    />
  );
}
