import type { Stream } from "../types/Admin";

export const mockStreams: Stream[] = [
  { id: 's1', rtspUrl: 'rtsp://camera1/stream', address: 'г. Екатеринбург, ул. Гагарина, д. 23', entrance: 'под. 2', userCount: 2, isOnline: true, lastActive: '', assignedUsers: ['u1','u2'] },
  { id: 's2', rtspUrl: 'rtsp://camera2/stream', address: 'г. Екатеринбург, ул. Ленина, д. 10', entrance: 'под. 1', userCount: 0, isOnline: true, lastActive: '', assignedUsers: [] },
  { id: 's3', rtspUrl: 'rtsp://camera3/stream', address: 'г. Екатеринбург, ул. Мира, д. 7', entrance: 'под. 3', userCount: 1, isOnline: false, lastActive: '', assignedUsers: ['u1'] },

  { id: 's4', rtspUrl: 'rtsp://camera4/stream', address: 'г. Казань, ул. Пушкина, д. 12', entrance: 'под. 1', userCount: 0, isOnline: true, lastActive: '', assignedUsers: [] },
  { id: 's5', rtspUrl: 'rtsp://camera5/stream', address: 'г. Москва, ул. Тверская, д. 5', entrance: 'под. 2', userCount: 0, isOnline: true, lastActive: '', assignedUsers: [] },
  { id: 's6', rtspUrl: 'rtsp://camera6/stream', address: 'г. Санкт-Петербург, Невский пр., д. 45', entrance: 'под. 1', userCount: 1, isOnline: true, lastActive: '', assignedUsers: ['u3'] },
  { id: 's7', rtspUrl: 'rtsp://camera7/stream', address: 'г. Новосибирск, ул. Советская, д. 2', entrance: 'под. 1', userCount: 0, isOnline: false, lastActive: '', assignedUsers: [] },
  { id: 's8', rtspUrl: 'rtsp://camera8/stream', address: 'г. Екатеринбург, ул. Гагарина, д. 25', entrance: 'под. 1', userCount: 3, isOnline: true, lastActive: '', assignedUsers: ['u4','u5','u6'] },
  { id: 's9', rtspUrl: 'rtsp://camera9/stream', address: 'г. Краснодар, ул. Лесная, д. 9', entrance: 'под. 2', userCount: 0, isOnline: true, lastActive: '', assignedUsers: [] },
  { id: 's10', rtspUrl: 'rtsp://camera10/stream', address: 'г. Ростов-на-Дону, ул. Садовая, д. 3', entrance: 'под. 1', userCount: 1, isOnline: true, lastActive: '', assignedUsers: ['u7'] },
  { id: 's11', rtspUrl: 'rtsp://camera11/stream', address: 'г. Уфа, ул. Ленина, д. 8', entrance: 'под. 2', userCount: 0, isOnline: false, lastActive: '', assignedUsers: [] },
  { id: 's12', rtspUrl: 'rtsp://camera12/stream', address: 'г. Воронеж, пр. Революции, д. 14', entrance: 'под. 1', userCount: 2, isOnline: true, lastActive: '', assignedUsers: ['u8','u9'] },
  { id: 's13', rtspUrl: 'rtsp://camera13/stream', address: 'г. Самара, ул. Солнечная, д. 6', entrance: 'под. 3', userCount: 0, isOnline: true, lastActive: '', assignedUsers: [] },
  { id: 's14', rtspUrl: 'rtsp://camera14/stream', address: 'г. Ярославль, ул. Лермонтова, д. 11', entrance: 'под. 1', userCount: 0, isOnline: false, lastActive: '', assignedUsers: [] },
  { id: 's15', rtspUrl: 'rtsp://camera15/stream', address: 'г. Тюмень, ул. Мира, д. 18', entrance: 'под. 2', userCount: 1, isOnline: true, lastActive: '', assignedUsers: ['u10'] },
  { id: 's16', rtspUrl: 'rtsp://camera16/stream', address: 'г. Омск, ул. Петрова, д. 7', entrance: 'под. 1', userCount: 0, isOnline: true, lastActive: '', assignedUsers: [] },
  { id: 's17', rtspUrl: 'rtsp://camera17/stream', address: 'г. Челябинск, ул. Победы, д. 4', entrance: 'под. 2', userCount: 2, isOnline: true, lastActive: '', assignedUsers: ['u11','u12'] },
  { id: 's18', rtspUrl: 'rtsp://camera18/stream', address: 'г. Пермь, ул. Комсомольская, д. 20', entrance: 'под. 1', userCount: 0, isOnline: false, lastActive: '', assignedUsers: [] },
  { id: 's19', rtspUrl: 'rtsp://camera19/stream', address: 'г. Томск, ул. Кирова, д. 9', entrance: 'под. 3', userCount: 1, isOnline: true, lastActive: '', assignedUsers: ['u13'] },
  { id: 's20', rtspUrl: 'rtsp://camera20/stream', address: 'г. Владивосток, ул. Океанская, д. 2', entrance: 'под. 1', userCount: 0, isOnline: true, lastActive: '', assignedUsers: [] },
  { id: 's21', rtspUrl: 'rtsp://camera21/stream', address: 'г. Нижний Новгород, ул. Большая Покровская, д. 10', entrance: 'под. 1', userCount: 0, isOnline: true, lastActive: '', assignedUsers: [] },
  { id: 's22', rtspUrl: 'rtsp://camera22/stream', address: 'г. Ижевск, ул. Горького, д. 5', entrance: 'под. 2', userCount: 0, isOnline: false, lastActive: '', assignedUsers: [] },
  { id: 's23', rtspUrl: 'rtsp://camera23/stream', address: 'г. Иркутск, ул. Байкальская, д. 30', entrance: 'под. 1', userCount: 1, isOnline: true, lastActive: '', assignedUsers: ['u14'] },
];
