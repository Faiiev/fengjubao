package com.fengjubao.server.common.function;

import com.fengjubao.server.common.exception.RedisConnectException;

@FunctionalInterface
public interface JedisExecutor<T, R> {
    R excute(T t) throws RedisConnectException;
}
