/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('send notification', () => {
  it('should be able to send notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
