import CollectionCrudView from '@/app/components/admin/CollectionCrudView';
import { teamFields } from '@/lib/admin/fields';

export default function AdminTeamPage() {
  return (
    <CollectionCrudView
      title="Команда"
      description="Учасники команди на сторінці «Про нас»."
      apiPath="/api/admin/team"
      fields={teamFields}
      createLabel="Новий учасник"
    />
  );
}
