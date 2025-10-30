/**
 * CMS管理后台主脚本
 * 负责后台界面交互和数据管理
 */

document.addEventListener('DOMContentLoaded', function() {
    const Admin = {
        currentSection: 'home',
        hasUnsavedChanges: false,
        
        /**
         * 初始化
         */
        init() {
            console.log('CMS Admin: 初始化管理后台...');
            
            this.setupNavigation();
            this.setupButtons();
            this.loadAllContent();
            this.setupMediaUpload();
            this.setupAutoSave();
            this.setupFormTracking();
        },
        
        /**
         * 设置导航
         */
        setupNavigation() {
            const menuItems = document.querySelectorAll('.admin-menu-item');
            menuItems.forEach(item => {
                item.addEventListener('click', () => {
                    const section = item.dataset.section;
                    this.switchSection(section);
                });
            });
        },
        
        /**
         * 切换区块
         */
        switchSection(section) {
            // 移除所有active类
            document.querySelectorAll('.admin-menu-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.admin-section').forEach(sec => {
                sec.classList.remove('active');
            });
            
            // 添加active类
            const menuItem = document.querySelector(`[data-section="${section}"]`);
            const sectionElement = document.getElementById(`section-${section}`);
            
            if (menuItem && sectionElement) {
                menuItem.classList.add('active');
                sectionElement.classList.add('active');
                this.currentSection = section;
            }
        },
        
        /**
         * 设置按钮
         */
        setupButtons() {
            // 保存所有更改
            document.getElementById('save-all-btn').addEventListener('click', () => {
                this.saveAllChanges();
            });
            
            // 预览网站
            document.getElementById('preview-btn').addEventListener('click', () => {
                window.open('index.html', '_blank');
            });
            
            // 导出数据
            document.getElementById('export-btn')?.addEventListener('click', () => {
                CMSData.export();
                this.showToast('数据导出成功', 'success');
            });
            
            // 导入数据
            document.getElementById('import-btn')?.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        CMSData.importData(file).then(() => {
                            this.showToast('数据导入成功，页面将刷新', 'success');
                            setTimeout(() => location.reload(), 1500);
                        }).catch(() => {
                            this.showToast('数据导入失败', 'error');
                        });
                    }
                };
                input.click();
            });
            
            // 重置数据
            document.getElementById('reset-btn')?.addEventListener('click', () => {
                CMSData.reset();
            });
        },
        
        /**
         * 加载所有内容
         */
        loadAllContent() {
            const data = CMSData.getAll();
            if (!data) {
                this.showToast('数据加载失败！', 'error');
                return;
            }
            
            this.loadHomeContent(data.home);
            this.loadAboutContent(data.about);
            this.loadServicesContent(data.services);
            this.loadProductsContent(data.products);
            this.loadCasesContent(data.cases);
            this.loadContactContent(data.contact);
            this.loadSettingsContent(data.settings);
            this.loadMediaContent(data.media);
            
            console.log('CMS Admin: 所有内容已加载');
        },
        
        /**
         * 加载首页内容
         */
        loadHomeContent(data) {
            if (!data) return;
            
            // 英雄区域
            this.setValue('hero-title', data.hero.title);
            this.setValue('hero-subtitle', data.hero.subtitle);
            this.setValue('hero-cta-primary', data.hero.ctaPrimary);
            this.setValue('hero-cta-secondary', data.hero.ctaSecondary);
            
            // 核心优势
            this.setValue('features-title', data.features.title);
            this.setValue('features-subtitle', data.features.subtitle);
            this.renderList('features-list', data.features.items, 'feature');
            
            // 数据统计
            this.setValue('stat-clients', data.stats.clients);
            this.setValue('stat-experts', data.stats.experts);
            this.setValue('stat-solutions', data.stats.solutions);
            this.setValue('stat-satisfaction', data.stats.satisfaction);
            
            // CTA区域
            this.setValue('cta-title', data.cta.title);
            this.setValue('cta-description', data.cta.description);
        },
        
        /**
         * 加载关于我们内容
         */
        loadAboutContent(data) {
            if (!data) return;
            
            // Hero区域
            this.setValue('about-hero-title', data.hero.title);
            this.setValue('about-hero-subtitle', data.hero.subtitle);
            
            // 公司简介
            this.setValue('about-intro-title', data.intro.title);
            this.setValue('about-intro-large', data.intro.largeParagraph);
            this.setValue('about-intro-detail', data.intro.detailParagraph);
            
            // 核心价值观
            this.setValue('about-values-title', data.values.title);
            this.setValue('about-values-subtitle', data.values.subtitle);
            this.renderList('values-list', data.values.items, 'value');
            
            // 企业优势
            this.setValue('about-advantages-title', data.advantages.title);
            this.setValue('about-advantages-subtitle', data.advantages.subtitle);
            this.renderList('advantages-list', data.advantages.items, 'advantage');
            
            // CTA
            this.setValue('about-cta-title', data.cta.title);
            this.setValue('about-cta-description', data.cta.description);
        },
        
        /**
         * 加载服务内容
         */
        loadServicesContent(data) {
            if (!data) return;
            
            this.setValue('services-title', data.title);
            this.setValue('services-subtitle', data.subtitle);
            this.renderList('services-list', data.items, 'service');
        },
        
        /**
         * 加载产品内容
         */
        loadProductsContent(data) {
            if (!data) return;
            
            this.setValue('products-title', data.title);
            this.setValue('products-subtitle', data.subtitle);
            this.renderList('products-list', data.items, 'product');
        },
        
        /**
         * 加载案例内容
         */
        loadCasesContent(data) {
            if (!data) return;
            
            this.setValue('cases-title', data.title);
            this.setValue('cases-subtitle', data.subtitle);
            this.renderList('cases-list', data.items, 'case');
        },
        
        /**
         * 加载联系内容
         */
        loadContactContent(data) {
            if (!data) return;
            
            this.setValue('contact-address', data.address);
            this.setValue('contact-phone', data.phone);
            this.setValue('contact-email', data.email);
        },
        
        /**
         * 加载站点设置
         */
        loadSettingsContent(data) {
            if (!data) return;
            
            this.setValue('site-name', data.siteName);
            this.setValue('site-tagline', data.tagline);
            this.setValue('site-copyright', data.copyright);
        },
        
        /**
         * 加载媒体内容
         */
        loadMediaContent(media) {
            const gallery = document.getElementById('media-gallery');
            if (!gallery) return;
            
            gallery.innerHTML = '';
            
            if (!media || media.length === 0) {
                gallery.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 40px;">暂无媒体文件</p>';
                return;
            }
            
            media.forEach(item => {
                const div = document.createElement('div');
                div.className = 'media-item';
                div.innerHTML = `
                    <img src="${item.url}" alt="${item.name}">
                    <div class="media-item-overlay">
                        <div class="media-item-actions">
                            <button onclick="Admin.copyMediaUrl('${item.url}')">复制URL</button>
                            <button onclick="Admin.deleteMedia(${item.id})">删除</button>
                        </div>
                        <div class="media-item-name">${item.name}</div>
                    </div>
                `;
                gallery.appendChild(div);
            });
        },
        
        /**
         * 渲染列表
         */
        renderList(containerId, items, type) {
            const container = document.getElementById(containerId);
            if (!container || !items) return;
            
            container.innerHTML = '';
            
            items.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = `${type}-item-editor`;
                div.dataset.index = index;
                
                let html = `
                    <div class="item-header">
                        <h4>${this.getItemTitle(type, index, item)}</h4>
                        <button class="btn-icon btn-delete" onclick="Admin.deleteItem('${containerId}', ${index}, '${type}')">
                            🗑️ 删除
                        </button>
                    </div>
                `;
                
                html += this.getItemFields(type, item, index);
                div.innerHTML = html;
                container.appendChild(div);
            });
            
            this.setupFormTracking();
        },
        
        /**
         * 获取项目标题
         */
        getItemTitle(type, index, item) {
            const titles = {
                'feature': `优势 ${index + 1}`,
                'value': `价值观 ${index + 1}`,
                'advantage': `优势 ${index + 1} (编号: ${item.number || (index + 1).toString().padStart(2, '0')})`,
                'service': `服务 ${index + 1}`,
                'product': `产品 ${index + 1}`,
                'case': `案例 ${index + 1}`
            };
            return titles[type] || `项目 ${index + 1}`;
        },
        
        /**
         * 获取项目字段
         */
        getItemFields(type, item, index) {
            let html = '';
            
            switch (type) {
                case 'feature':
                case 'value':
                    html = `
                        <div class="form-group">
                            <label>标题</label>
                            <input type="text" class="form-control ${type}-title" value="${item.title || ''}" data-field="title">
                        </div>
                        <div class="form-group">
                            <label>描述</label>
                            <textarea class="form-control ${type}-description" rows="3" data-field="description">${item.description || ''}</textarea>
                        </div>
                    `;
                    break;
                    
                case 'service':
                    const serviceCategories = ['AI智能', '数据分析', '云计算', '区块链', '物联网', '咨询服务'];
                    html = `
                        <div class="form-group">
                            <label>服务名称</label>
                            <input type="text" class="form-control ${type}-title" value="${item.title || ''}" data-field="title">
                        </div>
                        <div class="form-group">
                            <label>服务分类</label>
                            <select class="form-control ${type}-category" data-field="category">
                                <option value="">请选择分类</option>
                                ${serviceCategories.map(cat => 
                                    `<option value="${cat}" ${item.category === cat ? 'selected' : ''}>${cat}</option>`
                                ).join('')}
                            </select>
                            <small class="form-hint">选择服务所属分类，用于前端筛选</small>
                        </div>
                        <div class="form-group">
                            <label>服务描述</label>
                            <textarea class="form-control ${type}-description" rows="3" data-field="description">${item.description || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>服务特性标签</label>
                            <input type="text" class="form-control ${type}-features" value="${item.features ? item.features.join(', ') : ''}" data-field="features" placeholder="用逗号分隔，如：图像识别, 语音识别, 自然语言处理">
                            <small class="form-hint">多个特性用逗号分隔，将显示为蓝色标签</small>
                        </div>
                        <div class="form-group">
                            <label>服务图片URL</label>
                            <input type="text" class="form-control ${type}-image" value="${item.image || ''}" data-field="image" placeholder="可从媒体管理复制图片URL">
                            <small class="form-hint">建议从"媒体管理"上传图片后复制URL，推荐尺寸：800x600px</small>
                        </div>
                    `;
                    break;
                    
                case 'advantage':
                    html = `
                        <div class="form-group">
                            <label>标题</label>
                            <input type="text" class="form-control ${type}-title" value="${item.title || ''}" data-field="title">
                        </div>
                        <div class="form-group">
                            <label>描述</label>
                            <textarea class="form-control ${type}-description" rows="3" data-field="description">${item.description || ''}</textarea>
                        </div>
                    `;
                    break;
                    
                case 'product':
                    const productCategories = ['抢答器', '评分器', '投票器', '答题器', '数字办公系统', '嘉宾接待系统', '现场互动系统', '大屏互动系统', '桌卡打印助手', 'AI同传翻译', '定制服务'];
                    html = `
                        <div class="form-group">
                            <label>产品名称</label>
                            <input type="text" class="form-control ${type}-title" value="${item.title || ''}" data-field="title">
                        </div>
                        <div class="form-group">
                            <label>产品分类</label>
                            <select class="form-control ${type}-category" data-field="category">
                                <option value="">请选择分类</option>
                                ${productCategories.map(cat => 
                                    `<option value="${cat}" ${item.category === cat ? 'selected' : ''}>${cat}</option>`
                                ).join('')}
                            </select>
                            <small class="form-hint">选择产品所属分类，用于前端筛选</small>
                        </div>
                        <div class="form-group">
                            <label>产品描述</label>
                            <textarea class="form-control ${type}-description" rows="3" data-field="description">${item.description || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>产品特性标签</label>
                            <input type="text" class="form-control ${type}-features" value="${item.features ? item.features.join(', ') : ''}" data-field="features" placeholder="用逗号分隔，如：实时评分, 数据统计, 公正透明">
                            <small class="form-hint">多个特性用逗号分隔，将显示为蓝色标签</small>
                        </div>
                        <div class="form-group">
                            <label>产品图片URL</label>
                            <input type="text" class="form-control ${type}-image" value="${item.image || ''}" data-field="image" placeholder="可从媒体管理复制图片URL">
                            <small class="form-hint">建议从"媒体管理"上传图片后复制URL，推荐尺寸：800x600px</small>
                        </div>
                    `;
                    break;
                    
                case 'case':
                    html = `
                        <div class="form-group">
                            <label>案例标题</label>
                            <input type="text" class="form-control ${type}-title" value="${item.title || ''}" data-field="title">
                        </div>
                        <div class="form-group">
                            <label>行业分类</label>
                            <input type="text" class="form-control ${type}-category" value="${item.category || ''}" data-field="category">
                        </div>
                        <div class="form-group">
                            <label>案例描述</label>
                            <textarea class="form-control ${type}-description" rows="3" data-field="description">${item.description || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>案例图片URL</label>
                            <input type="text" class="form-control ${type}-image" value="${item.image || ''}" data-field="image" placeholder="可从媒体管理复制图片URL">
                            <small class="form-hint">建议从"媒体管理"上传图片后复制URL</small>
                        </div>
                    `;
                    break;
            }
            
            return html;
        },
        
        /**
         * 删除项目
         */
        deleteItem(containerId, index, type) {
            if (!confirm('确定要删除这个项目吗？')) return;
            
            const container = document.getElementById(containerId);
            const items = container.querySelectorAll(`.${type}-item-editor`);
            
            if (items[index]) {
                items[index].remove();
                this.hasUnsavedChanges = true;
                this.showToast('项目已删除，请记得保存', 'success');
                
                // 重新编号
                container.querySelectorAll(`.${type}-item-editor`).forEach((item, i) => {
                    item.dataset.index = i;
                });
            }
        },
        
        /**
         * 添加项目
         */
        addItem(containerId, type) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            const index = container.children.length;
            const newItem = this.getDefaultItem(type);
            
            const div = document.createElement('div');
            div.className = `${type}-item-editor`;
            div.dataset.index = index;
            
            div.innerHTML = `
                <div class="item-header">
                    <h4>${this.getItemTitle(type, index, newItem)}</h4>
                    <button class="btn-icon btn-delete" onclick="Admin.deleteItem('${containerId}', ${index}, '${type}')">
                        🗑️ 删除
                    </button>
                </div>
                ${this.getItemFields(type, newItem, index)}
            `;
            
            container.appendChild(div);
            this.hasUnsavedChanges = true;
            this.setupFormTracking();
            this.showToast('项目已添加，请填写内容并保存', 'success');
        },
        
        /**
         * 获取默认项目
         */
        getDefaultItem(type) {
            const defaults = {
                'feature': { title: '新优势', description: '请输入描述' },
                'value': { title: '新价值观', description: '请输入描述' },
                'advantage': { number: '01', title: '新优势', description: '请输入描述' },
                'service': { title: '新服务', category: '', description: '请输入描述', image: '', features: [] },
                'product': { title: '新产品', category: '', description: '请输入描述', image: '', features: [] },
                'case': { title: '新案例', category: '行业', description: '请输入描述', image: '' }
            };
            return defaults[type] || {};
        },
        
        /**
         * 收集列表数据
         */
        collectListData(containerId, type) {
            const container = document.getElementById(containerId);
            if (!container) return [];
            
            const items = [];
            const editors = container.querySelectorAll(`.${type}-item-editor`);
            
            editors.forEach((editor, index) => {
                const item = {};
                const fields = editor.querySelectorAll('[data-field]');
                
                fields.forEach(field => {
                    const fieldName = field.dataset.field;
                    
                    // 特殊处理：产品/服务特性标签，将逗号分隔字符串转为数组
                    if (fieldName === 'features' && (type === 'product' || type === 'service')) {
                        if (field.value && field.value.trim()) {
                            item[fieldName] = field.value.split(',').map(f => f.trim()).filter(f => f);
                        } else {
                            item[fieldName] = [];
                        }
                    } else {
                        item[fieldName] = field.value;
                    }
                });
                
                // 特殊处理
                if (type === 'advantage') {
                    item.number = (index + 1).toString().padStart(2, '0');
                }
                
                items.push(item);
            });
            
            return items;
        },
        
        /**
         * 保存所有更改
         */
        saveAllChanges() {
            try {
                const data = CMSData.getAll() || {};
                
                // 保存首页
                data.home = data.home || {};
                data.home.hero = {
                    title: this.getValue('hero-title'),
                    subtitle: this.getValue('hero-subtitle'),
                    ctaPrimary: this.getValue('hero-cta-primary'),
                    ctaSecondary: this.getValue('hero-cta-secondary')
                };
                data.home.features = {
                    title: this.getValue('features-title'),
                    subtitle: this.getValue('features-subtitle'),
                    items: this.collectListData('features-list', 'feature')
                };
                data.home.stats = {
                    clients: this.getValue('stat-clients'),
                    experts: this.getValue('stat-experts'),
                    solutions: this.getValue('stat-solutions'),
                    satisfaction: this.getValue('stat-satisfaction')
                };
                data.home.cta = {
                    title: this.getValue('cta-title'),
                    description: this.getValue('cta-description')
                };
                
                // 保存关于我们
                data.about = data.about || {};
                data.about.hero = {
                    title: this.getValue('about-hero-title'),
                    subtitle: this.getValue('about-hero-subtitle')
                };
                data.about.intro = {
                    title: this.getValue('about-intro-title'),
                    largeParagraph: this.getValue('about-intro-large'),
                    detailParagraph: this.getValue('about-intro-detail')
                };
                data.about.values = {
                    title: this.getValue('about-values-title'),
                    subtitle: this.getValue('about-values-subtitle'),
                    items: this.collectListData('values-list', 'value')
                };
                data.about.advantages = {
                    title: this.getValue('about-advantages-title'),
                    subtitle: this.getValue('about-advantages-subtitle'),
                    items: this.collectListData('advantages-list', 'advantage')
                };
                data.about.cta = {
                    title: this.getValue('about-cta-title'),
                    description: this.getValue('about-cta-description')
                };
                
                // 保存服务
                const servicesData = CMSData.get('services') || {};
                data.services = {
                    title: this.getValue('services-title'),
                    subtitle: this.getValue('services-subtitle'),
                    categories: servicesData.categories || ['全部服务', 'AI智能', '数据分析', '云计算', '区块链', '物联网', '咨询服务'],
                    items: this.collectListData('services-list', 'service')
                };
                
                // 保存产品
                const productsData = CMSData.get('products') || {};
                data.products = {
                    title: this.getValue('products-title'),
                    subtitle: this.getValue('products-subtitle'),
                    categories: productsData.categories || ['全部产品', '抢答器', '评分器', '投票器', '答题器', '数字办公系统', '嘉宾接待系统', '现场互动系统', '大屏互动系统', '桌卡打印助手', 'AI同传翻译', '定制服务'],
                    items: this.collectListData('products-list', 'product')
                };
                
                // 保存案例
                data.cases = {
                    title: this.getValue('cases-title'),
                    subtitle: this.getValue('cases-subtitle'),
                    items: this.collectListData('cases-list', 'case')
                };
                
                // 保存联系方式
                data.contact = {
                    address: this.getValue('contact-address'),
                    phone: this.getValue('contact-phone'),
                    email: this.getValue('contact-email')
                };
                
                // 保存站点设置
                data.settings = {
                    siteName: this.getValue('site-name'),
                    tagline: this.getValue('site-tagline'),
                    copyright: this.getValue('site-copyright')
                };
                
                // 保存到localStorage
                const success = CMSData.saveAll(data);
                
                if (success) {
                    this.hasUnsavedChanges = false;
                    this.showToast('✅ 保存成功！前端页面将自动更新', 'success');
                    
                    // 延迟提示刷新前端页面
                    setTimeout(() => {
                        this.showToast('💡 提示：如果前端页面已打开，请刷新查看最新内容', 'info');
                    }, 2000);
                } else {
                    this.showToast('❌ 保存失败！请检查控制台错误', 'error');
                }
            } catch (error) {
                console.error('保存失败:', error);
                this.showToast('❌ 保存失败：' + error.message, 'error');
            }
        },
        
        /**
         * 设置媒体上传
         */
        setupMediaUpload() {
            const uploadArea = document.getElementById('upload-area');
            const fileInput = document.getElementById('file-input');
            
            if (!uploadArea || !fileInput) return;
            
            uploadArea.addEventListener('click', () => fileInput.click());
            
            fileInput.addEventListener('change', (e) => {
                this.handleFiles(e.target.files);
            });
            
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('drag-over');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                this.handleFiles(e.dataTransfer.files);
            });
        },
        
        /**
         * 处理上传文件
         */
        async handleFiles(files) {
            const fileArray = Array.from(files);
            
            for (const file of fileArray) {
                if (!file.type.startsWith('image/')) {
                    this.showToast(`${file.name} 不是图片文件`, 'error');
                    continue;
                }
                
                if (file.size > 2 * 1024 * 1024) {
                    this.showToast(`${file.name} 超过2MB限制`, 'error');
                    continue;
                }
                
                try {
                    await CMSData.addMedia(file);
                } catch (error) {
                    this.showToast(`上传 ${file.name} 失败`, 'error');
                }
            }
            
            this.showToast('图片上传成功', 'success');
            this.loadMediaContent(CMSData.getMedia());
        },
        
        /**
         * 复制媒体URL
         */
        copyMediaUrl(url) {
            navigator.clipboard.writeText(url).then(() => {
                this.showToast('URL已复制到剪贴板', 'success');
            }).catch(() => {
                this.showToast('复制失败', 'error');
            });
        },
        
        /**
         * 删除媒体
         */
        deleteMedia(id) {
            if (!confirm('确定要删除这个媒体文件吗？')) return;
            
            CMSData.deleteMedia(id);
            this.loadMediaContent(CMSData.getMedia());
            this.showToast('媒体文件已删除', 'success');
        },
        
        /**
         * 设置自动保存
         */
        setupAutoSave() {
            // 每5分钟自动保存一次
            setInterval(() => {
                if (this.hasUnsavedChanges) {
                    console.log('自动保存...');
                    this.saveAllChanges();
                }
            }, 5 * 60 * 1000);
        },
        
        /**
         * 设置表单追踪
         */
        setupFormTracking() {
            document.querySelectorAll('.form-control').forEach(input => {
                input.addEventListener('input', () => {
                    this.hasUnsavedChanges = true;
                });
            });
        },
        
        /**
         * 显示提示
         */
        showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            if (!toast) return;
            
            toast.textContent = message;
            toast.className = `toast ${type} show`;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        },
        
        /**
         * 工具函数
         */
        getValue(id) {
            const el = document.getElementById(id);
            return el ? el.value : '';
        },
        
        setValue(id, value) {
            const el = document.getElementById(id);
            if (el) el.value = value || '';
        }
    };
    
    // 初始化
    Admin.init();
    
    // 暴露到全局
    window.Admin = Admin;
    
    // 页面卸载前提示
    window.addEventListener('beforeunload', (e) => {
        if (Admin.hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '您有未保存的更改，确定要离开吗？';
        }
    });
});
