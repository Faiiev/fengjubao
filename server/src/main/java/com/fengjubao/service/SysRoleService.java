package com.fengjubao.service;

import com.fengjubao.entity.SysRole;
import com.fengjubao.vo.AuthVo;
import com.baomidou.mybatisplus.service.IService;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Set;

public interface SysRoleService extends IService<SysRole> {

    Set<AuthVo> getRolesByUserId(String userId);

    List<String> getRoleIdsByUserId(String userId);

    boolean checkRidsContainRval(List<String> rids, String rval);

    boolean checkUidContainRval(String uid, String rval);

}
