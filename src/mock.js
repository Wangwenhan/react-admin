import Mock from 'mockjs'
Mock.mock('/owl/api/baseMonWeb/v1/menus/getMenu?username=admin', 'get', () => (
    {
        "success": "1", "data": [
            { "title": "监控对象管理", "icon": "calendar", "page": "./SupervisoryObjControl/SupervisoryObjControl", "children": null, "path": "monitoringObjectManagement" },
            { "title": "数据分析中心", "icon": "line-chart", "page": "./DataCheck/DataCheck", "children": null, "path": "dataAnalysisCenter" },
            // { "title": "服务器监控页面", "icon": "solution", "page": "./ServerControl/ServerControl", "children": null, "path": "serverMonitoringPage" },
            {
                "title": "服务器监控页面", "icon": "solution", "page": null, "path": "serverMonitoringManagement",
                "children": [
                    { "title": "总览", "icon": null, "page": "./ServerMonitoring/ServerGlobalPage", "path": "serverGlobalPage", "children": null },
                    // { "title": "服务器详情", "icon": null, "page": "./ServerMonitoring/ServerDetails", "path": "serverDetailsPage", "children": null },
                    { "title": "服务器告警", "icon": null, "page": "./ServerMonitoring/ServerAlarm", "path": "serverAlarmPage", "children": null }
                ]
            },
            {
                "title": "采集器管理", "icon": "calendar", "page": null, "path": "collectorManagement",
                "children": [
                    { "title": "代理端管理", "icon": null, "page": "./CollectorConfig/ProxyPlug", "children": null, "path": "agentManagement" },
                    { "title": "采集器配置", "icon": null, "page": "./CollectorConfig/CollectorConfig", "children": null, "path": "collectorConfiguration" },
                    { "title": "当前采集器列表", "icon": null, "page": "./CollectorConfig/CurrentCollector", "children": null, "path": "currentCollectorList" }
                ]
            },
            {
                "title": "虚拟机管理", "icon": "bar-chart", "page": null, "path": "vmManagement",
                "children": [
                    { "title": "总览", "icon": null, "page": "./VmControl/GlobalPage", "path": "vmControlGlobalPage", "children": null },
                    { "title": "vCenter总览", "icon": null, "page": "./VmControl/Summary", "path": "vCenterSummary", "children": null },
                    { "title": "宿主机", "icon": null, "page": "./VmControl/Host", "path": "vmControlHostPage", "children": null },
                    { "title": "虚拟机", "icon": null, "page": "./VmControl/VmMachine", "path": "vmControlVmMachine", "children": null }
                ]
            },
            {
                "title": "策略管理", "icon": "solution", "page": null, "path": "strategicManagement",
                "children": [
                    { "title": "告警策略管理", "icon": null, "page": "./CollectorStrategy/AlarmStrategy", "children": null, "path": "alarmPolicyManagement" },
                    { "title": "告警接收组", "icon": null, "page": "./CollectorStrategy/AlarmReceive", "children": null, "path": "alarmReceivingGroup" },
                    { "title": "告警目的地", "icon": null, "page": "./CollectorStrategy/AlarmTarget", "children": null, "path": "alarmDestination" },
                    { "title": "监控组管理", "icon": null, "page": "./CollectorStrategy/CollectGroups", "children": null, "path": "monitoringGroupManagement" },
                    { "title": "采集策略管理", "icon": null, "page": "./CollectorStrategy/CollectStrategy", "children": null, "path": "acquisitionStrategyManagement" }
                ]
            },
            { "title": "告警控制台", "icon": "exclamation-circle-o", "page": "./AlarmConsole/AlarmConsole", "children": null, "path": "alarmConsole" },
            {
                "title": "负载均衡监控页面", "icon": "paper-clip", "page": null, "path": "loadBalanceMonitoringPage",
                "children": [
                    { "title": "巡检列表", "icon": null, "page": "./LoadBalanceControl/InspectionControl", "path": "inspectionList", "children": null },
                    { "title": "负载均衡监控", "icon": null, "page": "./LoadBalanceControl/LoadBalanceControl", "path": "loadBalanceMonitoring", "children": null },
                    { "title": "负载均衡告警", "icon": null, "page": "./LoadBalanceControl/LoadBalanceAlarm", "path": "loadBalancingAlarm", "children": null },
                    { "title": "设备信息管理", "icon": null, "page": "./LoadBalanceControl/LoadBalanceInfoManagement", "path": "loadBalanceControlLoadBalanceInfoManagement", "children": null },
                    { "title": "设备组管理", "icon": null, "page": "./LoadBalanceControl/LoadBalanceGroupManagement", "path": "loadBalanceControlLoadBalanceGroupManagement", "children": null }]
            },
            {
                "title": "端口监控页面", "icon": "solution", "page": null, "path": "portMonitoringPage",
                "children": [
                    { "title": "端口告警列表", "icon": null, "page": "./Custom/PortAlarm", "children": null, "path": "portAlarmList" }
                ]
            },
            {
                "title": "网络质量感知", "icon": "netQuality", "page": null, "path": "networkQualityPerception",
                "children": [
                    { "title": "Ping配置", "icon": null, "page": "./PingConfig", "children": null, "path": "pingConfig" },
                    { "title": "网络拓扑时延热力图", "icon": null, "page": "./NetTopologyDelayHeatmap", "children": null, "path": "netTopologyDelayHeatmap" },
                    { "title": "网络拓扑丢包热力图", "icon": null, "page": "./NetTopologyLossHeatmap", "children": null, "path": "netTopologyLossHeatmap" }
                ]
            },
            {
                "title": "权限管理", "icon": "setting", "page": null, "path": "authorityManagement",
                "children": [
                    { "title": "物理设备管理", "icon": null, "page": "./AuthorityManagement/AssetDeviceManagement", "children": null, "path": "assetDeviceManagement" },
                    { "title": "虚拟设备管理", "icon": null, "page": "./AuthorityManagement/VmDeviceManagement", "children": null, "path": "vmDeviceManagement" },
                    { "title": "应用管理", "icon": null, "page": "./AuthorityManagement/ApplicationManagement", "children": null, "path": "applicationManagement" },
                    { "title": "用户管理", "icon": null, "page": "./AuthorityManagement/UserManagement", "children": null, "path": "userManagement" },
                ]
            },
            {
                "title": "系统管理", "icon": "team", "page": null, "path": "systemManagement",
                "children": [
                    { "title": "计划任务管理", "icon": null, "page": "./UserInfo/Schedule", "children": null, "path": "planningTaskManagement" },
                    { "title": "用户组管理", "icon": null, "page": "./UserInfo/UserGroup", "children": null, "path": "userGroupManagement" },
                    { "title": "菜单管理", "icon": null, "page": "./UserInfo/UserMenu", "children": null, "path": "menuManagement" },
                ]
            }]
    }
))

Mock.mock('/owl/api/baseMonWeb/v1/users/getCurrentUser', 'get', () => (
    {
        "username": "admin",
        "realname": "管理员",
        "role": "管理员"
    }
))

Mock.mock('/owl/login', 'post', () => (
    {}
))