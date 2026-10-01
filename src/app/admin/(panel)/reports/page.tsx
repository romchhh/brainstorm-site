import CollectionCrudView from '@/app/components/admin/CollectionCrudView';
import { reportFields } from '@/lib/admin/fields';

export default function AdminReportsPage() {
  return (
    <CollectionCrudView
      title="Публічні звіти"
      description="PDF-звіти на сторінці «Прозорість»."
      apiPath="/api/admin/reports"
      fields={reportFields}
      createLabel="Новий звіт"
    />
  );
}
