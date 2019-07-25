package com.fengjubao.service.impl;

import com.fengjubao.dao.SysUserMapper;
import com.fengjubao.entity.SysUser;
import com.fengjubao.service.SysUserService;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {

    @Override
    public Page<SysUser> queryUserIncludeRoles(Page page, String nick) {
        return page.setRecords(baseMapper.selectUserIncludeRoles(page,nick));
    }

}
