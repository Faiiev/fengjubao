package com.fengjubao.server.system.service;

import com.fengjubao.server.system.domain.Test;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface TestService extends IService<Test> {

    List<Test> findTests();

    /**
     * 批量插入
     * @param list List<Test>
     */
    void batchInsert(List<Test> list);
}
