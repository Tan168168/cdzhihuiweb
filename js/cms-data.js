/**
 * CMS数据管理核心
 * 负责所有数据的存储、读取、更新
 */

const CMSData = {
    // 存储键名
    STORAGE_KEY: 'zhihui_cms_data_v2',
    VERSION: '2.0.0',
    
    // 默认数据结构
    defaultData: {
        // 首页
        home: {
            hero: {
                title: '引领<span class="highlight">智能科技</span>未来',
                subtitle: '智会科技专注于为企业提供创新的人工智能、大数据分析和云计算解决方案，助力企业数字化转型，开启智能未来。',
                ctaPrimary: '探索解决方案',
                ctaSecondary: '联系我们'
            },
            features: {
                title: '为什么选择<span class="highlight">智会科技</span>',
                subtitle: '我们的核心优势',
                items: [
                    {
                        title: '技术创新',
                        description: '持续研发前沿技术，拥有多项核心专利，保持行业领先水平',
                        icon: 'clock'
                    },
                    {
                        title: '专业团队',
                        description: '汇聚行业精英，平均拥有8年以上相关领域经验',
                        icon: 'heart'
                    },
                    {
                        title: '客户至上',
                        description: '95%的客户满意度，提供7×24小时技术支持服务',
                        icon: 'users'
                    },
                    {
                        title: '定制方案',
                        description: '根据企业实际需求，提供个性化解决方案',
                        icon: 'edit'
                    }
                ]
            },
            stats: {
                clients: '500+',
                experts: '100+',
                solutions: '10+',
                satisfaction: '95%'
            },
            cta: {
                title: '开启数字化转型之旅',
                description: '联系我们，了解如何通过智能科技赋能您的业务'
            }
        },
        
        // 关于我们
        about: {
            hero: {
                title: '关于<span class="highlight">智会科技</span>',
                subtitle: '引领智能科技创新，驱动企业数字化转型'
            },
            intro: {
                title: '我们的<span class="highlight">使命</span>',
                largeParagraph: '智会科技成立于2015年，是一家专注于人工智能、大数据分析和云计算领域的高科技企业。',
                detailParagraph: '我们致力于通过技术创新，为企业提供全方位的数字化转型解决方案，帮助企业提高运营效率，降低成本，创造更大的商业价值。我们相信科技的力量能够改变世界，让每一个企业都能享受到智能化带来的便利。'
            },
            values: {
                title: '核心<span class="highlight">价值观</span>',
                subtitle: '这是我们坚守的信念，也是我们不断前进的动力',
                items: [
                    {
                        title: '创新驱动',
                        description: '持续投入研发，保持技术领先，用创新推动行业发展'
                    },
                    {
                        title: '客户至上',
                        description: '以客户需求为中心，提供超预期的产品和服务'
                    },
                    {
                        title: '团队协作',
                        description: '汇聚行业精英，共同创造卓越成果'
                    },
                    {
                        title: '持续进化',
                        description: '不断学习提升，适应快速变化的市场环境'
                    }
                ]
            },
            advantages: {
                title: '为什么选择<span class="highlight">我们</span>',
                subtitle: '专业、创新、可靠的技术合作伙伴',
                items: [
                    {
                        number: '01',
                        title: '技术领先',
                        description: '拥有多项核心专利技术，持续的研发投入确保技术领先'
                    },
                    {
                        number: '02',
                        title: '专业团队',
                        description: '汇聚行业精英，平均拥有8年以上相关领域工作经验'
                    },
                    {
                        number: '03',
                        title: '完善服务',
                        description: '7×24小时技术支持，提供从咨询到实施的全流程服务'
                    },
                    {
                        number: '04',
                        title: '成功案例',
                        description: '服务超过500家企业客户，积累了丰富的行业实践经验'
                    }
                ]
            },
            cta: {
                title: '开启合作之旅',
                description: '让我们一起探索智能科技的无限可能'
            }
        },
        
        // 服务
        services: {
            title: '服务与<span class="highlight">解决方案</span>',
            subtitle: '全方位的技术服务，满足您的业务需求',
            categories: ['全部服务', 'AI智能', '数据分析', '云计算', '区块链', '物联网', '咨询服务'],
            items: [
                {
                    title: '人工智能解决方案',
                    category: 'AI智能',
                    description: '提供图像识别、自然语言处理、语音识别等AI技术应用，帮助企业实现智能化转型。',
                    image: '',
                    features: ['图像识别', '自然语言处理', '语音识别']
                },
                {
                    title: '大数据分析服务',
                    category: '数据分析',
                    description: '通过高级数据分析技术，挖掘企业数据价值，提供精准的商业洞察和决策支持。',
                    image: '',
                    features: ['商业智能', '数据挖掘', '预测分析']
                },
                {
                    title: '云计算架构设计',
                    category: '云计算',
                    description: '设计和部署稳定、高效、可扩展的云基础设施，降低IT成本，提高业务灵活性。',
                    image: '',
                    features: ['弹性伸缩', '高可用', '成本优化']
                },
                {
                    title: '区块链技术应用',
                    category: '区块链',
                    description: '构建安全、透明、不可篡改的分布式账本系统，适用于供应链、金融、物联网等领域。',
                    image: '',
                    features: ['去中心化', '安全透明', '智能合约']
                },
                {
                    title: '物联网系统集成',
                    category: '物联网',
                    description: '连接各类智能设备和传感器，实现数据采集、分析和智能控制，打造物联网应用生态。',
                    image: '',
                    features: ['设备连接', '数据采集', '智能控制']
                },
                {
                    title: '数字化转型咨询',
                    category: '咨询服务',
                    description: '提供全方位的数字化转型战略咨询，帮助企业制定适合自身发展的数字化路线图。',
                    image: '',
                    features: ['战略规划', '流程优化', '技术选型']
                }
            ]
        },
        
        // 产品
        products: {
            title: '产品<span class="highlight">中心</span>',
            subtitle: '创新科技产品，赋能企业发展',
            categories: ['全部产品', '抢答器', '评分器', '投票器', '答题器', '数字办公系统', '嘉宾接待系统', '现场互动系统', '大屏互动系统', '桌卡打印助手', 'AI同传翻译', '定制服务'],
            items: [
                {
                    title: '会伴评分系统',
                    category: '评分器',
                    description: '专业的现场评分解决方案，支持多种评分模式，实时数据统计，广泛应用于文艺比赛、专业评审等场景。高效、公正、便捷。',
                    image: '',
                    features: ['实时评分', '数据统计', '公正透明']
                },
                {
                    title: 'XC-35无线抢答器',
                    category: '抢答器',
                    description: '专业的知识竞赛抢答设备，毫秒级响应，公平公正，支持团队赛、个人赛等多种模式，让竞赛更加激烈精彩。',
                    image: '',
                    features: ['毫秒响应', '多种模式', '公平竞技']
                },
                {
                    title: 'XC-30无线抢答器',
                    category: '抢答器',
                    description: '经济型无线抢答设备，适用于中小型比赛和课堂互动，操作简单，性能稳定，支持多种抢答模式。',
                    image: '',
                    features: ['经济实惠', '操作简单', '稳定可靠']
                },
                {
                    title: 'XC-60有线抢答器',
                    category: '抢答器',
                    description: '有线连接抢答系统，信号稳定，抗干扰能力强，适用于大型正式比赛，支持多组同时比赛。',
                    image: '',
                    features: ['信号稳定', '抗干扰强', '支持多组']
                },
                {
                    title: 'XC-50便携抢答器',
                    category: '抢答器',
                    description: '轻便易携带的抢答设备，内置电池长续航，适合户外活动和流动比赛，快速部署，即插即用。',
                    image: '',
                    features: ['便携轻巧', '长续航', '快速部署']
                },
                {
                    title: '会议投票表决器',
                    category: '投票器',
                    description: '高效的会议表决解决方案，支持实名/匿名投票，实时统计结果，适用于股东大会、理事会、评审会等正式会议场景。',
                    image: '',
                    features: ['实时统计', '保密安全', '高效便捷']
                },
                {
                    title: '互动答题系统',
                    category: '答题器',
                    description: '智能化答题互动平台，支持单选、多选、判断等多种题型，实时统计答题数据，适用于课堂教学、培训考核等场景。',
                    image: '',
                    features: ['多种题型', '实时统计', '数据分析']
                },
                {
                    title: '数字化办公系统',
                    category: '数字办公系统',
                    description: '集成会议管理、文档协作、流程审批等功能的一体化办公平台，提升企业办公效率，实现无纸化办公。',
                    image: '',
                    features: ['一体化管理', '高效协作', '无纸化']
                },
                {
                    title: '嘉宾接待系统',
                    category: '嘉宾接待系统',
                    description: '智能化嘉宾接待解决方案，包含签到、引导、服务跟踪等功能，提供专业贴心的VIP接待体验。',
                    image: '',
                    features: ['智能签到', '专业服务', '全程跟踪']
                },
                {
                    title: 'AIGC互动拍照',
                    category: '现场互动系统',
                    description: '基于AI生成技术的创意拍照服务，多种风格模板，即拍即得，打造独特的活动记忆。适用于展会、艺术节、品牌活动等场景。',
                    image: '',
                    features: ['AI生成', '即拍即得', '创意十足']
                },
                {
                    title: '大屏互动展示系统',
                    category: '大屏互动系统',
                    description: '多点触控大屏互动解决方案，支持多人同时操作，丰富的互动效果，适用于展厅、发布会、产品展示等场景。',
                    image: '',
                    features: ['多点触控', '互动展示', '视觉震撼']
                },
                {
                    title: '智能桌卡打印助手',
                    category: '桌卡打印助手',
                    description: '一键式智能桌卡制作与打印系统，支持多种模板，快速生成专业桌卡，适用于会议、宴会、展会等场景。',
                    image: '',
                    features: ['一键生成', '多种模板', '快速打印']
                },
                {
                    title: 'AI同传翻译系统',
                    category: 'AI同传翻译',
                    description: '基于人工智能的实时同声传译系统，支持多语种互译，高准确率，适用于国际会议、跨国商务洽谈等场景。',
                    image: '',
                    features: ['实时翻译', '多语种', '高准确率']
                },
                {
                    title: '定制化解决方案',
                    category: '定制服务',
                    description: '根据客户需求提供专属定制服务，从方案设计到系统开发，一站式满足企业个性化需求，打造独特的活动体验。',
                    image: '',
                    features: ['专属定制', '一站式', '个性化']
                }
            ]
        },
        
        // 案例
        cases: {
            title: '案例<span class="highlight">展示</span>',
            subtitle: '成功案例，见证实力',
            items: [
                {
                    title: '会伴评分系统助力眉山第二届文艺新作大赛决赛',
                    category: '文化活动',
                    description: '本次大赛依托会伴科技评分系统的高效支持，本次大赛顺利精简程，整集核心——让观众专注欣赏艺术之美，让选手更安心投入比赛。',
                    image: ''
                },
                {
                    title: '会伴机器人电子签约助力第十三届绵阳科博会航电产业恳谈会',
                    category: '商务会议',
                    description: '会伴科技的机器人电子签约服务助力航电产业作投资恳谈会的成功举办，为绵阳航空电子产业搭建了优质的合作平台。',
                    image: ''
                },
                {
                    title: '会伴科技助力第十四届中国艺术节第二十届群星奖-群众文艺品牌活动展',
                    category: '艺术展览',
                    description: '会伴科技带来的AIGC拍照互动环节在展引人注目，成为众多嘉宾的"必打卡"项目。不同于传统拍照需要复杂路器度、寻找场，会伴…',
                    image: ''
                },
                {
                    title: '组瑞特核药展台人气爆棚！会伴科技三大智能设备赋能质优展体验',
                    category: '展会活动',
                    description: '会伴科技赋能互动拍机、发光机、客套核药展三大智能设备，为组瑞特"索医+锗创药未来"主题展台提供了有力支持。',
                    image: ''
                },
                {
                    title: '会伴电子签约服务助力乐山农业投融资大会',
                    category: '农业投资',
                    description: '会伴科技作为独家电子签约服务提供商，以自主研发的专业投设备与数字化解决方案，为本会全服投资与数字化签约场景的强大突破。',
                    image: ''
                },
                {
                    title: '会伴电子签约助力四川平台经济产业链合作伙伴大会',
                    category: '产业合作',
                    description: '会伴科技带来的电子签约服务，充分展现了科技赋能服务场景的强大实力。其电子签约解决方案万营智能非凡单的"线上签字"而是融合了…',
                    image: ''
                }
            ]
        },
        
        // 联系方式
        contact: {
            address: '北京市海淀区中关村科技园区',
            phone: '400-888-8888',
            email: 'info@zhihuikeji.com'
        },
        
        // 网站设置
        settings: {
            siteName: '智会科技',
            tagline: '引领智能科技，创造无限可能',
            copyright: '© 2024 智会科技. 保留所有权利.'
        },
        
        // 媒体库
        media: []
    },
    
    /**
     * 初始化CMS数据
     */
    init() {
        const stored = this.getAll();
        if (!stored || Object.keys(stored).length === 0) {
            console.log('CMS: 首次初始化，使用默认数据');
            this.saveAll(this.defaultData);
            return this.defaultData;
        }
        console.log('CMS: 数据已存在');
        return stored;
    },
    
    /**
     * 获取所有数据
     */
    getAll() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                return parsed;
            }
            return null;
        } catch (error) {
            console.error('CMS: 读取数据失败', error);
            return null;
        }
    },
    
    /**
     * 保存所有数据
     */
    saveAll(data) {
        try {
            const dataStr = JSON.stringify(data);
            localStorage.setItem(this.STORAGE_KEY, dataStr);
            console.log('CMS: 数据保存成功', {
                size: (dataStr.length / 1024).toFixed(2) + 'KB'
            });
            
            // 触发自定义事件，通知数据已更新
            window.dispatchEvent(new CustomEvent('cms-data-updated', { 
                detail: { data } 
            }));
            
            return true;
        } catch (error) {
            console.error('CMS: 保存数据失败', error);
            if (error.name === 'QuotaExceededError') {
                alert('存储空间已满！请删除一些媒体文件。');
            }
            return false;
        }
    },
    
    /**
     * 获取特定部分数据
     */
    get(section) {
        const allData = this.getAll();
        return allData ? allData[section] : null;
    },
    
    /**
     * 保存特定部分数据
     */
    save(section, data) {
        const allData = this.getAll() || {};
        allData[section] = data;
        return this.saveAll(allData);
    },
    
    /**
     * 更新特定部分数据（别名）
     */
    update(section, data) {
        return this.save(section, data);
    },
    
    /**
     * 重置为默认数据
     */
    reset() {
        const confirmed = confirm('确定要重置所有数据吗？此操作不可恢复！');
        if (confirmed) {
            this.saveAll(this.defaultData);
            location.reload();
            return true;
        }
        return false;
    },
    
    /**
     * 导出数据（备份）
     */
    export() {
        const data = this.getAll();
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cms-backup-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    /**
     * 导入数据（恢复）
     */
    async importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    this.saveAll(data);
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    },
    
    /**
     * 添加媒体文件
     */
    async addMedia(file) {
        return new Promise((resolve, reject) => {
            if (file.size > 2 * 1024 * 1024) {
                reject(new Error('文件大小不能超过2MB'));
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const allData = this.getAll() || {};
                    if (!allData.media) {
                        allData.media = [];
                    }
                    
                    const mediaItem = {
                        id: Date.now(),
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        url: e.target.result,
                        uploadedAt: new Date().toISOString()
                    };
                    
                    allData.media.push(mediaItem);
                    this.saveAll(allData);
                    resolve(mediaItem);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },
    
    /**
     * 删除媒体文件
     */
    deleteMedia(id) {
        const allData = this.getAll();
        if (allData && allData.media) {
            allData.media = allData.media.filter(item => item.id !== id);
            return this.saveAll(allData);
        }
        return false;
    },
    
    /**
     * 获取所有媒体文件
     */
    getMedia() {
        const allData = this.getAll();
        return allData && allData.media ? allData.media : [];
    },
    
    /**
     * 清空所有数据
     */
    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
        console.log('CMS: 所有数据已清空');
    }
};

// 初始化
CMSData.init();

// 暴露到全局
window.CMSData = CMSData;
