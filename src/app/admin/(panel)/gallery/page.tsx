import CollectionCrudView from '@/app/components/admin/CollectionCrudView';
import { galleryFields } from '@/lib/admin/fields';

export default function AdminGalleryPage() {
  return (
    <CollectionCrudView
      title="Фотогалерея"
      description="Альбоми подій у каталозі проєктів."
      apiPath="/api/admin/gallery"
      fields={galleryFields}
      createLabel="Новий альбом"
    />
  );
}
