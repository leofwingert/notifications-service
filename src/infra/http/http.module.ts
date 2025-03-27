import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { DataBaseModule } from '../database/database.module';
import { CancelNotification } from '@app/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/use-cases/get-recipient-notification';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';

@Module({
  imports: [DataBaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
