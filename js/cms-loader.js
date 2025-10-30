/**
 * CMS内容加载器
 * 负责将CMS数据动态加载到前端页面
 */

document.addEventListener('DOMContentLoaded', function() {
    const CMSLoader = {
        /**
         * 初始化加载器
         */
        init() {
            console.log('CMS Loader: 初始化...');
            
            // 加载所有内容
            this.loadAllContent();
            
            // 监听数据更新事件
            window.addEventListener('cms-data-updated', () => {
                console.log('CMS Loader: 检测到数据更新，重新加载...');
                this.loadAllContent();
            });
            
            // 监听storage事件（跨标签页同步）
            window.addEventListener('storage', (e) => {
                if (e.key === 'zhihui_cms_data_v2') {
                    console.log('CMS Loader: 检测到跨标签页数据更新');
                    location.reload();
                }
            });
        },
        
        /**
         * 加载所有内容
         */
        loadAllContent() {
            this.loadHomeContent();
            this.loadAboutContent();
            this.loadServicesContent();
            this.loadProductsContent();
            this.loadCasesContent();
            this.loadContactContent();
            this.loadFooter();
        },
        
        /**
         * 加载首页内容
         */
        loadHomeContent() {
            const data = CMSData.get('home');
            if (!data) return;
            
            // 英雄区域
            if (data.hero) {
                this.updateElement('.hero-section h1', data.hero.title, true);
                this.updateElement('.hero-section p', data.hero.subtitle);
                const ctaButtons = document.querySelectorAll('.hero-section .btn');
                if (ctaButtons.length > 0 && data.hero.ctaPrimary) {
                    ctaButtons[0].textContent = data.hero.ctaPrimary;
                }
                if (ctaButtons.length > 1 && data.hero.ctaSecondary) {
                    ctaButtons[1].textContent = data.hero.ctaSecondary;
                }
            }
            
            // 核心优势
            if (data.features) {
                this.updateElement('.home-features .section-header h2', data.features.title, true);
                this.updateElement('.home-features .section-header p', data.features.subtitle);
                
                const featureItems = document.querySelectorAll('.home-features .feature-item');
                if (data.features.items && featureItems.length > 0) {
                    data.features.items.forEach((feature, index) => {
                        if (featureItems[index]) {
                            this.updateElement(featureItems[index], 'h3', feature.title);
                            this.updateElement(featureItems[index], 'p', feature.description);
                        }
                    });
                }
            }
            
            // 数据统计
            if (data.stats) {
                const statBoxes = document.querySelectorAll('.home-stats .stat-box');
                if (statBoxes.length >= 4) {
                    if (data.stats.clients) {
                        this.updateElement(statBoxes[0], '.stat-number', data.stats.clients);
                    }
                    if (data.stats.experts) {
                        this.updateElement(statBoxes[1], '.stat-number', data.stats.experts);
                    }
                    if (data.stats.solutions) {
                        this.updateElement(statBoxes[2], '.stat-number', data.stats.solutions);
                    }
                    if (data.stats.satisfaction) {
                        this.updateElement(statBoxes[3], '.stat-number', data.stats.satisfaction);
                    }
                }
            }
            
            // CTA区域
            if (data.cta) {
                this.updateElement('.home-cta h2', data.cta.title);
                this.updateElement('.home-cta .cta-content p', data.cta.description);
            }
            
            console.log('CMS Loader: 首页内容已加载');
        },
        
        /**
         * 加载关于我们内容
         */
        loadAboutContent() {
            const data = CMSData.get('about');
            if (!data) return;
            
            // Hero区域
            if (data.hero) {
                this.updateElement('.about-hero h1', data.hero.title, true);
                this.updateElement('.about-hero .about-hero-subtitle', data.hero.subtitle);
            }
            
            // 公司简介
            if (data.intro) {
                this.updateElement('.about-intro h2', data.intro.title, true);
                this.updateElement('.about-intro .about-large-text', data.intro.largeParagraph);
                const detailP = document.querySelector('.about-intro-text p:not(.about-large-text)');
                if (detailP && data.intro.detailParagraph) {
                    detailP.textContent = data.intro.detailParagraph;
                }
            }
            
            // 核心价值观
            if (data.values) {
                this.updateElement('.about-values .section-header h2', data.values.title, true);
                this.updateElement('.about-values .section-header p', data.values.subtitle);
                
                const valueCards = document.querySelectorAll('.about-values .value-card');
                if (data.values.items && valueCards.length > 0) {
                    data.values.items.forEach((value, index) => {
                        if (valueCards[index]) {
                            this.updateElement(valueCards[index], 'h3', value.title);
                            this.updateElement(valueCards[index], 'p', value.description);
                        }
                    });
                }
            }
            
            // 企业优势
            if (data.advantages) {
                this.updateElement('.about-advantages .section-header h2', data.advantages.title, true);
                this.updateElement('.about-advantages .section-header p', data.advantages.subtitle);
                
                const advantageItems = document.querySelectorAll('.about-advantages .advantage-item');
                if (data.advantages.items && advantageItems.length > 0) {
                    data.advantages.items.forEach((advantage, index) => {
                        if (advantageItems[index]) {
                            this.updateElement(advantageItems[index], '.advantage-number', advantage.number);
                            this.updateElement(advantageItems[index], 'h3', advantage.title);
                            this.updateElement(advantageItems[index], 'p', advantage.description);
                        }
                    });
                }
            }
            
            // CTA区域
            if (data.cta) {
                this.updateElement('.about-cta h2', data.cta.title);
                this.updateElement('.about-cta .about-cta-content p', data.cta.description);
            }
            
            console.log('CMS Loader: 关于我们内容已加载');
        },
        
        /**
         * 加载服务内容
         */
        loadServicesContent() {
            const data = CMSData.get('services');
            if (!data) return;
            
            this.updateElement('.services-section .section-header h2', data.title, true);
            this.updateElement('.services-section .section-header p', data.subtitle);
            
            // 动态渲染服务列表
            if (data.items && data.items.length > 0) {
                const servicesGrid = document.querySelector('.services-grid');
                if (servicesGrid) {
                    // 清空现有内容
                    servicesGrid.innerHTML = '';
                    
                    // 渲染每个服务
                    data.items.forEach(service => {
                        const serviceCard = document.createElement('div');
                        serviceCard.className = 'service-card';
                        serviceCard.setAttribute('data-category', service.category || '');
                        
                        serviceCard.innerHTML = `
                            <div class="service-card-image">
                                ${service.image ? 
                                    `<img src="${service.image}" alt="${service.title || ''}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                     <div class="image-placeholder" style="display: none;">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                            <polyline points="21 15 16 10 5 21"></polyline>
                                        </svg>
                                     </div>` :
                                    `<div class="image-placeholder">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                            <polyline points="21 15 16 10 5 21"></polyline>
                                        </svg>
                                     </div>`
                                }
                            </div>
                            <div class="service-card-content">
                                <h3>${service.title || '服务名称'}</h3>
                                <p>${service.description || '服务描述'}</p>
                                ${service.features && service.features.length > 0 ? `
                                    <div class="service-features">
                                        ${service.features.map(feature => `<span class="service-feature-tag">${feature}</span>`).join('')}
                                    </div>
                                ` : ''}
                                <a href="#" class="service-link">了解更多 →</a>
                            </div>
                        `;
                        
                        servicesGrid.appendChild(serviceCard);
                    });
                }
            }
            
            console.log('CMS Loader: 服务内容已加载');
        },
        
        /**
         * 加载产品内容
         */
        loadProductsContent() {
            const data = CMSData.get('products');
            if (!data) return;
            
            this.updateElement('.products-section .section-header h2', data.title, true);
            this.updateElement('.products-section .section-header p', data.subtitle);
            
            // 动态渲染产品分类导航
            if (data.categories && data.categories.length > 0) {
                const categoriesContainer = document.querySelector('.product-categories');
                if (categoriesContainer) {
                    categoriesContainer.innerHTML = '';
                    
                    // 添加"全部产品"按钮
                    const allBtn = document.createElement('button');
                    allBtn.className = 'category-btn active';
                    allBtn.setAttribute('data-category', 'all');
                    allBtn.textContent = '全部产品';
                    categoriesContainer.appendChild(allBtn);
                    
                    // 添加其他分类按钮
                    data.categories.slice(1).forEach(category => {
                        const btn = document.createElement('button');
                        btn.className = 'category-btn';
                        btn.setAttribute('data-category', category);
                        btn.textContent = category;
                        categoriesContainer.appendChild(btn);
                    });
                }
            }
            
            // 动态渲染产品列表
            if (data.items && data.items.length > 0) {
                const productsGrid = document.querySelector('.products-grid');
                if (productsGrid) {
                    // 清空现有内容
                    productsGrid.innerHTML = '';
                    
                    // 渲染每个产品
                    data.items.forEach(product => {
                        const productCard = document.createElement('div');
                        productCard.className = 'product-card';
                        productCard.setAttribute('data-category', product.category || '');
                        
                    productCard.innerHTML = `
                        <div class="product-card-image">
                            ${product.image ? 
                                `<img src="${product.image}" alt="${product.title || ''}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                 <div class="image-placeholder" style="display: none;">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                        <polyline points="21 15 16 10 5 21"></polyline>
                                    </svg>
                                 </div>` :
                                `<div class="image-placeholder">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                        <polyline points="21 15 16 10 5 21"></polyline>
                                    </svg>
                                 </div>`
                            }
                        </div>
                        <div class="product-card-content">
                            <h3>${product.title || '产品名称'}</h3>
                            <p>${product.description || '产品描述'}</p>
                            ${product.features && product.features.length > 0 ? `
                                <div class="product-features">
                                    ${product.features.map(feature => `<span class="product-feature-tag">${feature}</span>`).join('')}
                                </div>
                            ` : ''}
                            <a href="#" class="product-link">了解更多 →</a>
                        </div>
                    `;
                        
                        productsGrid.appendChild(productCard);
                    });
                }
            }
            
            // 在产品卡片渲染完成后，绑定分类筛选事件
            this.setupCategoryFilter();
            
            console.log('CMS Loader: 产品内容已加载');
        },
        
        /**
         * 设置产品分类筛选功能
         */
        setupCategoryFilter() {
            const categoryBtns = document.querySelectorAll('.category-btn');
            const productCards = document.querySelectorAll('.product-card');
            const productsGrid = document.querySelector('.products-grid');
            const scrollArrows = document.querySelectorAll('.products-section .scroll-arrow');
            
            console.log('CMS Loader: 设置分类筛选', {
                分类按钮数量: categoryBtns.length,
                产品卡片数量: productCards.length
            });
            
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // 更新按钮状态
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // 获取选中的分类
                    const selectedCategory = btn.getAttribute('data-category');
                    console.log('CMS Loader: 选中分类 =', selectedCategory);
                    
                    // 筛选产品
                    let visibleCount = 0;
                    productCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');
                        
                        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                            card.style.display = 'flex';
                            visibleCount++;
                            // 添加淡入动画
                            card.style.opacity = '0';
                            setTimeout(() => {
                                card.style.transition = 'opacity 0.3s ease';
                                card.style.opacity = '1';
                            }, 10);
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    
                    console.log('CMS Loader: 显示产品数量 =', visibleCount);
                    
                    // 根据分类和产品数量切换布局模式
                    if (selectedCategory === 'all') {
                        // 全部产品：多行网格布局
                        productsGrid.classList.remove('single-row');
                        productsGrid.classList.remove('single-row-no-scroll');
                        // 隐藏滚动箭头
                        scrollArrows.forEach(arrow => {
                            arrow.style.display = 'none';
                        });
                    } else if (visibleCount === 4) {
                        // 特定分类恰好4个产品：单行显示，无滚动箭头
                        productsGrid.classList.remove('single-row');
                        productsGrid.classList.add('single-row-no-scroll');
                        // 隐藏滚动箭头
                        scrollArrows.forEach(arrow => {
                            arrow.style.display = 'none';
                        });
                    } else if (visibleCount > 4) {
                        // 特定分类且>4个产品：单行横向滚动
                        productsGrid.classList.remove('single-row-no-scroll');
                        productsGrid.classList.add('single-row');
                        // 显示滚动箭头
                        scrollArrows.forEach(arrow => {
                            arrow.style.display = 'flex';
                        });
                    } else {
                        // 特定分类且<4个产品：多行布局（居中显示）
                        productsGrid.classList.remove('single-row');
                        productsGrid.classList.remove('single-row-no-scroll');
                        // 隐藏滚动箭头
                        scrollArrows.forEach(arrow => {
                            arrow.style.display = 'none';
                        });
                    }
                });
            });
        },
        
        /**
         * 加载案例内容
         */
        loadCasesContent() {
            const data = CMSData.get('cases');
            if (!data) return;
            
            this.updateElement('.case-studies-section .section-header h2', data.title, true);
            this.updateElement('.case-studies-section .section-header p', data.subtitle);
            
            // 加载案例列表
            if (data.items && data.items.length > 0) {
                const casesGrid = document.querySelector('.case-studies-grid');
                if (casesGrid) {
                    // 清空现有内容
                    casesGrid.innerHTML = '';
                    
                    // 渲染每个案例
                    data.items.forEach(caseItem => {
                        const caseCard = document.createElement('div');
                        caseCard.className = 'case-card';
                        caseCard.setAttribute('data-category', caseItem.category || '');
                        
                        caseCard.innerHTML = `
                            <div class="case-wrapper">
                                <div class="case-image">
                                    ${caseItem.image ? 
                                        `<img src="${caseItem.image}" alt="${caseItem.title || ''}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                         <div class="image-placeholder" style="display: none;">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                            </svg>
                                         </div>` :
                                        `<div class="image-placeholder">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                            </svg>
                                         </div>`
                                    }
                                    <div class="case-overlay">
                                        <div class="overlay-content">
                                            <span class="case-category">${caseItem.category || '案例'}</span>
                                            <a href="#" class="view-details">查看详情</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="case-content">
                                    <h3>${caseItem.title || '案例标题'}</h3>
                                    <p>${caseItem.description || '案例描述'}</p>
                                </div>
                            </div>
                        `;
                        
                        casesGrid.appendChild(caseCard);
                    });
                }
            }
            
            console.log('CMS Loader: 案例内容已加载');
        },
        
        /**
         * 加载联系方式
         */
        loadContactContent() {
            const data = CMSData.get('contact');
            if (!data) return;
            
            // 页脚联系信息也会更新
            console.log('CMS Loader: 联系信息已加载');
        },
        
        /**
         * 加载页脚
         */
        loadFooter() {
            const settings = CMSData.get('settings');
            const contact = CMSData.get('contact');
            
            if (settings) {
                this.updateElement('.footer-logo .logo-text', settings.siteName);
                this.updateElement('.footer-logo p', settings.tagline);
                this.updateElement('.footer-bottom p', settings.copyright);
            }
            
            if (contact) {
                const contactList = document.querySelectorAll('.footer-contact ul li');
                if (contactList.length >= 3) {
                    if (contact.address) contactList[0].textContent = contact.address;
                    if (contact.phone) contactList[1].textContent = contact.phone;
                    if (contact.email) contactList[2].textContent = contact.email;
                }
            }
            
            console.log('CMS Loader: 页脚内容已加载');
        },
        
        /**
         * 更新元素内容
         */
        updateElement(selector, content, isHTML = false) {
            let element;
            
            // 如果selector是元素对象，且content是选择器字符串
            if (typeof selector === 'object' && typeof content === 'string' && arguments.length === 3) {
                element = selector.querySelector(content);
                content = arguments[2];
                isHTML = arguments.length > 3 ? arguments[3] : false;
            } else {
                element = typeof selector === 'string' ? document.querySelector(selector) : selector;
            }
            
            if (element && content !== undefined && content !== null) {
                if (isHTML) {
                    element.innerHTML = content;
                } else {
                    element.textContent = content;
                }
            }
        }
    };
    
    // 初始化
    CMSLoader.init();
    
    // 暴露到全局
    window.CMSLoader = CMSLoader;
});
