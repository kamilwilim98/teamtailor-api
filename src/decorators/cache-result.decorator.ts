import { Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

/**
 * CacheResult Decorator
 * @param ttl Time to live for the cache (in seconds)
 */
export function CacheResult(ttl: number): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const logger = new Logger(CacheResult.name);

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheManager = (this as { cacheManager: Cache }).cacheManager;

      if (!cacheManager) {
        throw new Error(
          `Class ${target.constructor.name} must have a 'cacheManager' property to use the CacheResult decorator.`,
        );
      }

      const cacheKey = propertyKey.toString();

      const cachedData = await cacheManager.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await originalMethod.apply(this, args);

      await cacheManager.set(cacheKey, result, ttl);

      logger.debug('Cached value', { cacheKey, ttl });

      return result;
    };

    return descriptor;
  };
}
