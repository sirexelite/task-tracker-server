import {INestApplication, Injectable} from '@nestjs/common';
import {PrismaClient} from "@prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient<unknown, string> {
    async onOnModuleInit() {
        await this.$connect();
    }

    async onOnModuleDestroy() {
        await this.$disconnect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        })
    }
}
