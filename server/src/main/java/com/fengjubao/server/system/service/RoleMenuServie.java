package com.fengjubao.server.system.service;

import com.fengjubao.server.system.domain.RoleMenu;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface RoleMenuServie extends IService<RoleMenu> {

    void deleteRoleMenusByRoleId(String[] roleIds);

    void deleteRoleMenusByMenuId(String[] menuIds);

    List<RoleMenu> getRoleMenusByRoleId(String roleId);
}
