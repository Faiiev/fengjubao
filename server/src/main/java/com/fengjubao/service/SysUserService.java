package com.fengjubao.service;

import com.fengjubao.entity.SysUser;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.IService;

public interface SysUserService extends IService<SysUser> {

    Page<SysUser> queryUserIncludeRoles(Page page, String nick);

}
