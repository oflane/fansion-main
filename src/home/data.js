/*
 * Copyright(c) Oflane Software 2017. All Rights Reserved.
 */

/**
 * Created by wanghongxiang on 2017/5/7.
 */
const config = [
  {
    'title': '组织管理',
    'cols': [
      {
        'name': '一级页面',
        'img': 'static/images/index/basic_setting.png',
        'url': '/org/first'
      },
      {
        'name': '基础设置',
        'img': 'static/images/index/basic_setting.png',
        'url': '/org/setting'
      }, {
        'name': '组织机构',
        'img': 'static/images/index/org.png',
        'url': '/home'
      }, {
        'name': '职务',
        'img': 'static/images/index/job.png',
        'url': '/home'
      }, {
        'name': '职位',
        'img': 'static/images/index/position.png',
        'url': '/home'
      }, {
        'name': '职级图谱',
        'img': 'static/images/index/grade_graph.png',
        'url': '/home'
      }, {
        'name': '职务图谱',
        'img': 'static/images/index/job_graph.png',
        'url': '/home'
      }
    ]
  },
  {
    'title': '员工管理',
    'cols': [
      {
        'name': '一级页面',
        'img': 'static/images/index/basic_setting.png',
        'url': '/staff/first'
      },
      {
        'name': '基础设置',
        'img': 'static/images/index/basic_setting.png',
        'url': '/staff/setting'
      },
      {
        'name': '员工信息',
        'img': 'static/images/index/staff_info.png',
        'url': '/staff/staff-info'
      },
      {
        'name': '员工入职',
        'img': 'static/images/index/2-org.png',
        'url': '/staff/entry'
      },
      {
        'name': '员工动态',
        'img': 'static/images/index/2-org.png',
        'url': '/staff/dynamic'
      },
      {
        'name': '员工离职',
        'img': 'static/images/index/2-org.png',
        'url': '/staff/dimission'
      },
      {
        'name': '交接配置',
        'img': 'static/images/index/2-org.png',
        'url': '/staff/handoverConfigure'
      },
      {
        'name': '入职办理',
        'img': 'static/images/index/2-org.png',
        'url': '/staff/handle-entry'
      },
      {
        'name': '离职办理',
        'img': 'static/images/index/2-org.png',
        'url': '/staff/handle-departure-op'
      },
      {
        'name': '离职交接',
        'img': 'static/images/index/2-org.png',
        'url': '/staff/handle-departure'
      },
      {
        'name': '离职细项',
        'img': 'static/images/index/2-org.png',
        'url': '/staff/leaveItems'
      },
      {
        'name': '员工变动',
        'img': 'static/images/index/staff_info.png',
        'url': '/staff/staff-change'
      },
      {
        'name': '数据导入',
        'img': 'static/images/index/dataimport.png',
        'url': '/staff/data-import'
      },
      {
        'name': '员工转正',
        'img': 'static/images/index/dataimport.png',
        'url': '/staff/positive'
      }
    ]
  },
  {
    'title': '员工假勤',
    'cols': [
      {
        'name': '一级页面',
        'img': 'static/images/index/basic_setting.png',
        'url': '/leave/first'
      }, {
        'name': '基础设置',
        'img': 'static/images/index/basic_setting.png',
        'url': '/leave/setting'
      }, {
        'name': '员工休假',
        'img': 'static/images/index/holiday.png',
        'url': '/leave/staff-leave'
      }, {
        'name': '假期结余',
        'img': 'static/images/index/job_graph.png',
        'url': '/leave/leavebalance'
      }, {
        'name': '考勤档案',
        'img': 'static/images/index/job_graph.png',
        'url': '/leave/attend-staffs'
      }, {
        'name': '考勤日报',
        'img': 'static/images/index/attend_day.png',
        'url': '/leave/daily'
      }, {
        'name': '考勤月报',
        'img': 'static/images/index/attend_month.png',
        'url': '/leave/monthly'
      }, {
        'name': '考勤方式',
        'img': 'static/images/index/job_graph.png',
        'url': '/leave/attend-mode'
      }, {
        'name': '考勤周期',
        'img': 'static/images/index/job_graph.png',
        'url': '/leave/attend-cycle'
      }, {
        'name': '休假类型',
        'img': 'static/images/index/job_graph.png',
        'url': '/leave/leave-type'
      }, {
        'name': '员工假勤档案',
        'img': 'static/images/index/job_graph.png',
        'url': '/leave/leave-records'
      }, {
        'name': '签到数据导入',
        'img': 'static/images/index/job_graph.png',
        'url': '/leave/signed-data'
      }, {
        'name': '休假额度',
        'img': 'static/images/index/job_graph.png',
        'url': '/leave/leave-quota'
      }, {
        'name': '日常考勤',
        'img': 'static/images/index/job_graph.png',
        'url': '/leave/daily-attendance'
      }
    ]
  },
  {
    'title': '共享服务',
    'cols': [
      {
        'name': '服务目录',
        'img': 'static/images/index/catagory.png',
        'url': '/home'
      }, {
        'name': '流程模型',
        'img': 'static/images/index/pro_model.png',
        'url': '/home'
      }, {
        'name': '流程中心',
        'img': 'static/images/index/pro_center.png',
        'url': '/home'
      }
    ]
  },
  {
    'title': '基础设置',
    'cols': [
      {
        'name': '自定义档案',
        'img': 'static/images/index/defdoc.png',
        'url': '/home'
      }, {
        'name': '个性化设置',
        'img': 'static/images/index/personalize.png',
        'url': '/home'
      }
    ]
  }
]

export default config
