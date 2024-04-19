import Cfg from './model/Cfg.js'
import _ from 'lodash'

// 支持锅巴
export function supportGuoba() {
  let groupList = Array.from(Bot.gl.values())
  groupList = groupList.map(item => item = { label: `${item.bot_id || Bot.uin}-${item.group_name}-${item.group_id}`, value: `${item.bot_id || Bot.uin}:${item.group_id}` })
  return {
    // 插件信息，将会显示在前端页面
    // 如果你的插件没有在插件库里，那么需要填上补充信息
    // 如果存在的话，那么填不填就无所谓了，填了就以你的信息为准
    pluginInfo: {
      name: 'bujidao',
      title: 'bujidao',
      author: '@RebateafeqaR',
      authorLink: 'https://github.com/babanbang',
      link: 'https://github.com/babanbang/bujidaoRUN',
      isV3: true,
      isV2: false,
      description: '寄·寄·寄',
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      icon: 'bx:atom',
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
      iconColor: 'rgb(241,212,152)',
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
      // iconPath: path.join(_paths.pluginRoot, 'resources/images/icon.png'),
    },
    // 配置项信息
    configInfo: {
      // 配置项 schemas
      schemas: [
        {
          component: 'Divider',
          label: '插件设置'
        },
        {
          field: 'config.priority',
          label: '插件优先级',
          component: 'InputNumber',
          required: true,
          componentProps: {
            placeholder: '请输入数字',
          },
        },
        {
          field: 'config.isLog',
          label: '请求日志',
          bottomHelpMessage: '显示所有请求日志',
          component: 'Switch',
        },
        {
          field: 'config.resLog',
          label: '返回日志',
          bottomHelpMessage: '显示所有返回日志',
          component: 'Switch',
        },
        {
          component: 'Divider',
          label: '游戏签到设置'
        },
        {
          field: 'config.AutoSign',
          label: '自动签到',
          bottomHelpMessage: '是否开启米游社签到福利每日自动签到',
          component: 'Switch',
        },
        {
          field: 'config.signTime',
          label: '自动签到cron',
          bottomHelpMessage: '自动签到定时表达式，不会写可以百度"cron定时表达式"',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入定时表达式',
          },
        },
        {
          field: 'config.game',
          label: '签到游戏',
          bottomHelpMessage: '可签到游戏设置，原神: gs；星铁: sr；崩三: bh3',
          component: 'GTags',
          componentProps: {
            allowAdd: true,
            allowDel: true,
          },
        },
        {
          field: 'config.retry',
          label: '签到重试次数',
          bottomHelpMessage: '签到失败后重试次数',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 0,
            placeholder: '请输入次数',
          },
        },
        {
          field: 'config.recall',
          label: '签到消息撤回',
          bottomHelpMessage: '签到消息撤回时间，单位秒',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 0,
            placeholder: '请输入时间',
          },
        },
        {
          component: 'Divider',
          label: '社区签到设置'
        },
        {
          field: 'config.AutobbsSign',
          label: '社区自动签到',
          bottomHelpMessage: '是否开启每日社区自动签到',
          component: 'Switch',
        },
        {
          field: 'config.bbsSignTime',
          label: '社区签到cron',
          bottomHelpMessage: '社区自动签到定时表达式，不会写可以百度"cron定时表达式"',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入定时表达式',
          },
        },
        {
          field: 'config.bbsRetry',
          label: '社区签到重试',
          bottomHelpMessage: '社区签到失败后重试次数',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 0,
            placeholder: '请输入次数',
          },
        },
        {
          field: 'config.ddos',
          label: '社区签到DDos',
          bottomHelpMessage: '开启后可加快社区自动签到速度，但不建议0-1点大量并发',
          component: 'Switch',
        },
        {
          field: 'config.ddostime',
          label: '社区ddos限制',
          bottomHelpMessage: '社区自动签到每15~30秒同时签到多少个',
          component: 'InputNumber',
          componentProps: {
            min: 0,
            placeholder: '请输入并发数',
          },
        },
        {
          component: 'Divider',
          label: '体力查询·推送设置'
        },
        {
          field: 'config.NoteTask',
          label: '体力推送',
          bottomHelpMessage: '是否开启体力推送，体力推送仅使用小组件查询',
          component: 'Switch',
        },
        {
          field: 'config.TaskTime',
          label: '体力推送cron',
          bottomHelpMessage: '体力推送定时表达式，不会写可以百度"cron定时表达式"',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入定时表达式',
          },
        },
        {
          field: 'config.sendCD',
          label: '体力推送CD',
          bottomHelpMessage: 'uid推送过一次后多久才能再次推送，单位小时',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 0,
            placeholder: '请输入CD',
          },
        },
        {
          field: 'config.TaskMsg',
          label: '体力推送文案',
          component: 'Input',
          componentProps: {
            placeholder: '请输入定时表达式',
          },
        },
        {
          field: 'config.gs_Resin',
          label: '原神默认阈值',
          bottomHelpMessage: '原神体力推送初始默认阈值，开启推送后变为每人单独配置',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 100,
            placeholder: '请输入阈值，最低100',
          },
        },
        {
          field: 'config.sr_Resin',
          label: '星铁默认阈值',
          bottomHelpMessage: '星铁体力推送初始默认阈值，开启推送后变为每人单独配置',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 120,
            placeholder: '请输入阈值，最低120',
          },
        },
        {
          field: 'config.forward',
          label: '体力合并转发',
          bottomHelpMessage: '体力查询时，单次发送的文字消息+图片大于几条时合并转发',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 2,
            placeholder: '请输入数字',
          },
        },
        {
          component: 'Divider',
          label: '白名单设置'
        },
        {
          field: 'config.whiteSign',
          label: '非自动签到群白名单',
          bottomHelpMessage: '非(签到福利|社区)自动签到时是否开启群白名单',
          component: 'Switch',
        },
        {
          field: 'config.whiteGroup',
          label: '自动签到群和QQ白名单',
          bottomHelpMessage: '(签到福利|社区)自动签到时是否同时开启群和QQ白名单，关闭则仅使用QQ白名单\n注意：部分适配器可能不支持群白名单',
          component: 'Switch',
        },
        {
          field: 'white.Group',
          label: '签到白名单群',
          bottomHelpMessage: '只让这些群可用签到',
          component: 'Select',
          componentProps: {
            allowAdd: true,
            allowDel: true,
            mode: 'multiple',
            options: groupList
          }
        },
        {
          field: 'white.signPush',
          label: '自动签到推送',
          bottomHelpMessage: '米游社签到福利自动签到消息推送至群',
          component: 'Select',
          componentProps: {
            allowAdd: true,
            allowDel: true,
            mode: 'multiple',
            options: groupList
          }
        },
        {
          field: 'white.bbsPush',
          label: '社区签到推送',
          bottomHelpMessage: '社区自动签到消息推送至群',
          component: 'Select',
          componentProps: {
            allowAdd: true,
            allowDel: true,
            mode: 'multiple',
            options: groupList
          }
        },
        {
          component: 'Divider',
          label: 'api设置'
        },
        {
          field: 'api.apikey',
          label: '人人',
          component: 'Input',
          componentProps: {
            placeholder: '请输入token',
          },
        },
        {
          component: 'Divider',
          label: '其他设置'
        },
        {
          field: 'config.retrytime',
          label: '本体过码重试',
          bottomHelpMessage: '本体过码重试次数，需已使用#寄替换才可本体过码',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 0,
            placeholder: '请输入数字',
          },
        },
        {
          field: 'config.invalid',
          label: '失效QQ每行显示',
          bottomHelpMessage: '(签到福利|社区)自动签到失效QQ每行显示个数',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 1,
            placeholder: '请输入数字',
          },
        },
      ],
      // 获取配置数据方法（用于前端填充显示数据）
      getConfigData() {
        return {
          api: Cfg.getConfig('api'),
          white: Cfg.getConfig('white'),
          config: Cfg.getConfig('config')
        }
      },
      // 设置配置的方法（前端点确定后调用的方法）
      setConfigData(data, { Result }) {
        for (const key in data) {
          let split = key.split('.')
          let config = Cfg.getConfig(split[0])
          if (_.isEqual(config[split[1]], data[key])) continue
          config[split[1]] = data[key]
          Cfg.setConfig(split[0], config)
        }
        return Result.ok({}, '保存成功~')
      },
    },
  }
}
