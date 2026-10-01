import CollectionCrudView from '@/app/components/admin/CollectionCrudView';
import { projectFields } from '@/lib/admin/fields';

export default function AdminProjectsPage() {
  return (
    <CollectionCrudView
      title="Проєкти"
      description="Каталог і детальні сторінки проєктів на сайті."
      apiPath="/api/admin/projects"
      fields={projectFields}
      createLabel="Новий проєкт"
    />
  );
}
