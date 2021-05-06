import redis from 'redis';

// Локальное подключение
// export const client = redis.createClient(process.env.REDIS_PORT);

// Удаленное подключение на аддон хероку
// export const client = redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true });
export const client = redis.createClient(process.env.REDISCLOUD_URL);

// client.set('foo', 'bar');
// client.get('foo', (e, reply) => {
//     if (e) return console.log('redis error', e);

//     console.log(reply.toString());
// });
