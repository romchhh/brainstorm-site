import { cmsEventById, eventRegistrationAvailability } from '@/lib/cms/registrations';
import { readDb, updateDb, uid, type EventRegistration } from '@/lib/cms/store';

type Body = {
  eventId?: string;
  name?: string;
  email?: string;
  phone?: string;
  age?: string;
  comment?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Body | null;
  const eventId = body?.eventId?.trim() ?? '';
  const name = body?.name?.trim() ?? '';
  const email = body?.email?.trim() ?? '';
  const phone = body?.phone?.trim() ?? '';

  if (!eventId || !name || !email || !phone) {
    return Response.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
  }

  const event = cmsEventById(eventId);
  if (!event || !event.published) {
    return Response.json({ ok: false, error: 'event_not_found' }, { status: 404 });
  }

  const availability = eventRegistrationAvailability(event);
  if (!availability.open) {
    return Response.json({ ok: false, error: 'registration_closed' }, { status: 403 });
  }

  const db = readDb();
  const duplicate = db.registrations.find(
    (r) =>
      r.eventId === eventId &&
      r.email.toLowerCase() === email.toLowerCase() &&
      r.status !== 'cancelled',
  );
  if (duplicate) {
    return Response.json({ ok: false, error: 'already_registered' }, { status: 409 });
  }

  const now = new Date().toISOString();
  const status = availability.waitlist ? 'waitlist' : 'new';

  const registration: EventRegistration = {
    id: uid('REG'),
    eventId: event.id,
    eventTitle: event.title,
    eventDate: event.date,
    name,
    email,
    phone,
    age: body?.age?.trim() ?? '',
    comment: body?.comment?.trim() ?? '',
    status,
    createdAt: now,
    updatedAt: now,
  };

  updateDb((cms) => {
    cms.registrations.unshift(registration);
    cms.analytics.push({
      id: uid('evt'),
      type: 'lead',
      path: `/media/#event-${event.id}`,
      leadSource: 'event_registration',
      createdAt: now,
    });
  });

  const after = eventRegistrationAvailability(event);

  return Response.json({
    ok: true,
    id: registration.id,
    status,
    waitlist: status === 'waitlist',
    spotsLeft: after.spotsLeft,
  });
}

export async function GET(request: Request) {
  const eventId = new URL(request.url).searchParams.get('eventId');
  if (!eventId) {
    return Response.json({ ok: false, error: 'missing_event_id' }, { status: 400 });
  }

  const event = cmsEventById(eventId);
  if (!event) {
    return Response.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  const availability = eventRegistrationAvailability(event);
  return Response.json({ ok: true, ...availability, note: event.registrationNote ?? '' });
}
