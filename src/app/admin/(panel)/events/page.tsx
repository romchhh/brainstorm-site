import CollectionCrudView from '@/app/components/admin/CollectionCrudView';
import { eventFields } from '@/lib/admin/fields';

export default function AdminEventsPage() {
  return (
    <CollectionCrudView
      title="Події"
      description="Календар актуальних подій на сторінці «Актуальні події»."
      apiPath="/api/admin/events"
      fields={eventFields}
      createLabel="Нова подія"
    />
  );
}
