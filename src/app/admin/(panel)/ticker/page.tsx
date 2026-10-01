import CollectionCrudView from '@/app/components/admin/CollectionCrudView';
import { tickerFields } from '@/lib/admin/fields';

export default function AdminTickerPage() {
  return (
    <CollectionCrudView
      title="Бігучий рядок"
      description="Тексти на стрічці під hero-блоками по всьому сайту."
      apiPath="/api/admin/ticker"
      fields={tickerFields}
      createLabel="Новий пункт"
    />
  );
}
