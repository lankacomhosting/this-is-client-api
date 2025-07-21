// src/app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { AdModule } from './ad/ad.module';
import { ApiKeyGuard } from './apiKey.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArchiveNewsArticlesModule } from './archive-news-articles/archive-news-articles.module';
import { CartoonModule } from './cartoon/cartoon.module';
import { HealthModule } from './health/health.module';
import { HoroscopeModule } from './horoscope/horoscope.module';
import { NewsArticleModule } from './news-article/news-article.module';
import { ResponseInterceptor } from './response.interceptor';
import { ThreadModule } from './thread/thread.module';
import { VideoArticleModule } from './video-article/video-article.module';
import { ConfigModule } from '@nestjs/config'; // <--- ADD THIS IMPORT

@Module({
  imports: [
    ConfigModule.forRoot({ // <--- ADD THIS CONFIGURATION
      isGlobal: true,
      // If your .env file is not in the root, you can specify its path:
      // envFilePath: '.env',
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    NewsArticleModule,
    VideoArticleModule,
    CartoonModule,
    HoroscopeModule,
    ThreadModule,
    AdModule,
    ArchiveNewsArticlesModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
