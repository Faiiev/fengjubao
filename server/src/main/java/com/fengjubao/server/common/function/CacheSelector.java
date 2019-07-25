package com.fengjubao.server.common.function;

@FunctionalInterface
public interface CacheSelector<T> {
    T select() throws Exception;
}
